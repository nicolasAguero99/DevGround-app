import { useEffect, useRef } from "react";
import { INSTANCE_ID } from "../constants/constants";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { showCustomAlertModal } from "../utils/utils";
import { ConsoleOutput } from "../types/types";

type SetOutputFn = (instanceId: string, updater: React.SetStateAction<ConsoleOutput[]>, forceClear?: boolean) => void;

export const useHandlerMessages = (setOutput: SetOutputFn) => {
  const messageListenerRef = useRef<((e: MessageEvent) => void) | null>(null);
  const isListenerAddedRef = useRef(false);
  const setOutputRef = useRef(setOutput);
  setOutputRef.current = setOutput;

  const serializeMessageToString = (parsedMsg: any[]): string => {
    if (!Array.isArray(parsedMsg) || parsedMsg.length === 0) {
      return '';
    }

    return parsedMsg.map((item) => {
      if (!item || typeof item !== 'object') {
        return String(item);
      }

      switch (item.type) {
        case 'string':
          return String(item.value || '');
        case 'number':
        case 'boolean':
        case 'null':
          return String(item.value);
        case 'undefined':
          return 'undefined';
        case 'object':
          return JSON.stringify(item.value, null, 2);
        case 'array':
          return Array.isArray(item.value)
            ? `[${item.value.map((v: any) => serializeMessageToString([v])).join(', ')}]`
            : String(item.value);
        case 'function':
          return String(item.value || 'function');
        case 'error':
          return `Error: ${item.value || 'Unknown error'}${item.stack ? `\n${item.stack}` : ''}`;
        default:
          return JSON.stringify(item.value || item, null, 2);
      }
    }).join(' ');
  };

  useEffect(() => {
    if (isListenerAddedRef.current && messageListenerRef.current) {
      window.removeEventListener('message', messageListenerRef.current);
      isListenerAddedRef.current = false;
    }

    const messageListener = (e: MessageEvent) => {
      const allowedOrigins = ['null', window.location.origin];
      if (e.origin && !allowedOrigins.includes(e.origin)) {
        return;
      }

      if (!e.data || typeof e.data !== 'object') {
        return;
      }

      const { type, msg, instanceId } = e.data;

      if (!type || typeof type !== 'string') {
        return;
      }

      const allowedTypes = ['log', 'info', 'warn', 'error', 'time', 'alert'];
      if (!allowedTypes.includes(type)) {
        return;
      }

      if (msg === undefined || msg === null) {
        return;
      }

      const validInstanceId = instanceId === INSTANCE_ID.FULL || instanceId === INSTANCE_ID.JS_ONLY ? instanceId : INSTANCE_ID.FULL;

      let parsedMsg = msg;
      if (typeof msg === 'string') {
        try {
          parsedMsg = JSON.parse(msg);
        } catch (err) {
          parsedMsg = msg;
        }
      }

      if (!Array.isArray(parsedMsg)) {
        return;
      }

      if (parsedMsg.length > 1000) {
        console.warn('Message console too large, ignored');
        return;
      }

      if (type === 'error' && Array.isArray(parsedMsg) && parsedMsg.length > 0) {
        const firstItem = parsedMsg[0];
        if (firstItem && typeof firstItem === 'object' && firstItem.value) {
          const errorValue = String(firstItem.value || '');
          if (errorValue.includes('__TAURI_INTERNALS__') ||
            errorValue.includes('__TAURI__') ||
            (errorValue.includes('tauri') && errorValue.toLowerCase().includes('invoke'))) {
            return;
          }
        }
      }

      if (type === 'alert') {
        const alertMessage = serializeMessageToString(parsedMsg);
        const safeMessage = alertMessage.length > 5000
          ? alertMessage.substring(0, 5000) + '... (mensaje truncado)'
          : alertMessage;

        getCurrentWindow().innerSize().then((size) => {
          const windowWidth = size.width;
          const windowHeight = size.height;

          const modalWidth = Math.max(300, Math.min(windowWidth * 0.6, 600));
          const modalHeight = Math.max(150, Math.min(windowHeight * 0.4, 500));

          showCustomAlertModal(safeMessage || 'Alert', modalWidth, modalHeight);
        }).catch(() => {
          showCustomAlertModal(safeMessage || 'Alert', 400, 200);
        });

        return;
      }

      setOutputRef.current(validInstanceId, (prev) => {
        return [...prev, { type: type, msg: parsedMsg }];
      });
    };

    messageListenerRef.current = messageListener;

    if (!isListenerAddedRef.current) {
      window.addEventListener('message', messageListener);
      isListenerAddedRef.current = true;
    }

    return () => {
      if (messageListenerRef.current) {
        window.removeEventListener('message', messageListenerRef.current);
        isListenerAddedRef.current = false;
      }
    };
  }, [setOutput]);

  return {
    messageListenerRef,
    isListenerAddedRef
  }
}