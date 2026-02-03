import { useCallback, useRef, useState } from "react";
import { ConsoleOutput } from "../types/types";

type OutputState = Record<string, ConsoleOutput[]>;

export function useBufferedOutput(
  initialState: OutputState,
  clearDelay = 400
) {
  const [output, setOutputState] = useState<OutputState>(initialState);

  const pendingClearRef = useRef<Set<string>>(new Set());
  const clearTimeoutRef = useRef<Record<string, number>>({});

  const setOutput = useCallback(
    (
      instanceId: string,
      updater: React.SetStateAction<ConsoleOutput[]>,
      forceClear: boolean = false
    ) => {
      setOutputState((prev) => {
        const currentOutput = prev[instanceId] || [];
        const newOutput =
          typeof updater === "function" ? updater(currentOutput) : updater;

        if (forceClear) {
          if (clearTimeoutRef.current[instanceId]) {
            clearTimeout(clearTimeoutRef.current[instanceId]);
            delete clearTimeoutRef.current[instanceId];
          }

          pendingClearRef.current.delete(instanceId);

          return {
            ...prev,
            [instanceId]: newOutput,
          };
        }

        if (Array.isArray(newOutput) && newOutput.length === 0 && currentOutput.length > 0) {
          pendingClearRef.current.add(instanceId);

          if (clearTimeoutRef.current[instanceId]) {
            clearTimeout(clearTimeoutRef.current[instanceId]);
          }

          clearTimeoutRef.current[instanceId] = window.setTimeout(() => {
            if (pendingClearRef.current.has(instanceId)) {
              pendingClearRef.current.delete(instanceId);
              delete clearTimeoutRef.current[instanceId];

              setOutputState((prevState) => ({
                ...prevState,
                [instanceId]: [],
              }));
            }
          }, clearDelay);

          return prev;
        }

        if (pendingClearRef.current.has(instanceId)) {
          pendingClearRef.current.delete(instanceId);

          if (clearTimeoutRef.current[instanceId]) {
            clearTimeout(clearTimeoutRef.current[instanceId]);
            delete clearTimeoutRef.current[instanceId];
          }

          const finalOutput =
            typeof updater === "function" ? updater([]) : updater;

          return {
            ...prev,
            [instanceId]: finalOutput,
          };
        }

        return {
          ...prev,
          [instanceId]: newOutput,
        };
      });
    },
    [clearDelay]
  );

  const clearAllTimeouts = useCallback(() => {
    Object.values(clearTimeoutRef.current).forEach(clearTimeout);
    clearTimeoutRef.current = {};
    pendingClearRef.current.clear();
  }, []);

  return {
    output,
    setOutput,
    clearAllTimeouts,
  };
}