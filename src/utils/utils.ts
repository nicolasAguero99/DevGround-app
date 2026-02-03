import { Store } from '@tauri-apps/plugin-store';
import type * as Monaco from "monaco-editor";
import { EditorTechnologiesValuesSaved } from '../types/types';
import { ITEMS_CUSTOM_THEMES_CONFIG } from '../constants/items-main-config';
import { INITIAL_EDITOR_CONFIG } from '../constants/initial-config-editor';
import { updateCustomTheme } from './editor-themes';
import { DEBOUNCE_DELAY, INSTANCE_ID } from '../constants/constants';
import { DISABLE_PERSIST } from '../constants/persist-keys';

type StoreLike = {
  get: (key: string) => Promise<unknown>;
  set: (key: string, value: unknown) => Promise<void>;
  delete: (key: string) => Promise<boolean | void>;
  clear: () => Promise<void>;
  save: () => Promise<void>;
  keys: () => Promise<string[]>;
  has: (key: string) => Promise<boolean>;
};

let rawStorePromise: Promise<StoreLike> | null = null;

function getRawStore(): Promise<StoreLike> {
  if (!rawStorePromise) {
    rawStorePromise = Store.load('devground.json')
      .then((s) => s as unknown as StoreLike)
      .catch(() => createMemoryStore());
  }
  return rawStorePromise;
}

function createMemoryStore(): StoreLike {
  const map = new Map<string, unknown>();
  return {
    get: async (key: string) => map.get(key) ?? null,
    set: async (key: string, value: unknown) => { map.set(key, value); },
    delete: async (key: string) => { map.delete(key); },
    clear: async () => { map.clear(); },
    save: async () => {},
    keys: async () => Array.from(map.keys()),
    has: async (key: string) => map.has(key),
  };
}

let disablePersistCleared = false;

async function getStore(): Promise<StoreLike> {
  const raw = await getRawStore();
  if (DISABLE_PERSIST) {
    if (!disablePersistCleared) {
      await raw.clear();
      await raw.save();
      disablePersistCleared = true;
    }
    return {
      ...raw,
      set: async () => {},
      save: async () => {},
    };
  }
  return raw;
}

export const tauriStore = {
  get: (key: string) => getStore().then((s) => s.get(key)),
  set: (key: string, value: unknown) => getStore().then((s) => s.set(key, value)),
  delete: (key: string) => getStore().then((s) => s.delete(key)),
  clear: () => getStore().then((s) => s.clear()),
  save: () => getStore().then((s) => s.save()),
  keys: () => getStore().then((s) => s.keys()),
  has: (key: string) => getStore().then((s) => s.has(key)),
};

export async function clearAllPersistedState() {
  const raw = await getRawStore();
  await raw.clear();
  await raw.save();
}
interface GenerateDocumentCodeProps {
  html: string
  css: string
  javascript: string
}

export const generateDocumentCode = ({ html, css, javascript }: GenerateDocumentCodeProps, instanceId: typeof INSTANCE_ID[keyof typeof INSTANCE_ID] = INSTANCE_ID.FULL) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
    <style>
    ${css}
    </style>
    </head>
    <body>
    ${html}
    <script>
    window.__sendToParent = (type, msg) => {
      window.parent.postMessage({ type, msg: JSON.stringify(msg), instanceId: '${instanceId}' }, '*');
    };

    window.onerror = function(message, source, lineno, colno, error) {
      const errorMessage = error ? error.message : message;
      const errorString = String(errorMessage || message);
      
      if (errorString.includes('__TAURI_INTERNALS__') || 
          errorString.includes('__TAURI__') ||
          errorString.includes('tauri') && errorString.toLowerCase().includes('invoke')) {
        // Silenciar errores internos de Tauri
        return true;
      }
      
      window.__sendToParent('error', [{
        type: 'error',
        typeof: 'object',
        value: errorMessage,
        stack: error ? error.stack : undefined,
        source: source,
        lineno: lineno,
        colno: colno
      }]);
      return true;
    };

    window.onunhandledrejection = function(event) {
      const errorMessage = event.reason ? (event.reason.message || String(event.reason)) : 'Unhandled Promise Rejection';
      const errorString = String(errorMessage);
      
      // Filtrar errores relacionados con Tauri internals
      if (errorString.includes('__TAURI_INTERNALS__') || 
          errorString.includes('__TAURI__') ||
          errorString.includes('tauri') && errorString.toLowerCase().includes('invoke')) {
        // Silenciar errores internos de Tauri
        return;
      }
      
      window.__sendToParent('error', [{
        type: 'error',
        typeof: 'object',
        value: errorMessage,
        stack: event.reason ? event.reason.stack : undefined
      }]);
    };
    </script>
    <script>
    ${generateJsCodeForScriptTag(javascript)}
    </script>
    </body>
    </html>
  `;
};

const generateJsCodeForScriptTag = (javascript: string) => {
  return `
    const send = window.__sendToParent;

      const serialize = (v) => {
        const t = typeof v;

        if (v === null) return { type: "null", typeof: "object", value: null };
        if (v === undefined) return { type: "undefined", typeof: "undefined", value: undefined };

        if (t === "number") {
          if (Number.isNaN(v)) return { type: "nan", typeof: "number", value: "NaN" };
          if (v === Infinity) return { type: "infinity", typeof: "number", value: "Infinity" };
          if (v === -Infinity) return { type: "infinity", typeof: "number", value: "-Infinity" };
          return { type: "number", typeof: "number", value: v };
        }

        if (t === "string") return { type: "string", typeof: "string", value: v };
        if (t === "boolean") return { type: "boolean", typeof: "boolean", value: v };
        if (t === "bigint") return { type: "bigint", typeof: "bigint", value: v.toString() + "n" };
        if (t === "symbol") return { type: "symbol", typeof: "symbol", value: v.toString() };
        if (t === "function") return { type: "function", typeof: "function", value: v.toString() };

        // Arrays
        if (Array.isArray(v)) {
          return { type: "array", typeof: "object", value: v.map(serialize) };
        }

        // Maps
        if (v instanceof Map) {
          return { type: "map", typeof: "object", value: Array.from(v.entries()).map(([k, val]) => [serialize(k), serialize(val)]) };
        }

        // Sets
        if (v instanceof Set) {
          return { type: "set", typeof: "object", value: Array.from(v.values()).map(serialize) };
        }

        // Date
        if (v instanceof Date) {
          return { type: "date", typeof: "object", value: v.toISOString() };
        }

        // Error
        if (v instanceof Error) {
          return { type: "error", typeof: "object", value: v.message, stack: v.stack };
        }

        // Regex
        if (v instanceof RegExp) {
          return { type: "regexp", typeof: "object", value: v.toString() };
        }

        // TypedArray
        if (ArrayBuffer.isView(v)) {
          return { type: "typedarray", typeof: "object", value: Array.from(v).map(serialize) };
        }

        // Promise (no ejecutamos)
        if (v instanceof Promise) {
          return { type: "promise", typeof: "object", value: "Promise { <pending> }" };
        }

        // Clases personalizadas
        if (v?.constructor?.name && v.constructor !== Object) {
          return { type: "class-instance", typeof: "object", value: v.constructor.name };
        }

        // Object normal
        try {
          const serialized = {};
          for (const key in v) {
            if (v.hasOwnProperty(key)) {
              serialized[key] = serialize(v[key]);
            }
          }
          return { type: "object", typeof: "object", value: serialized };
        } catch {
          return { type: "object", typeof: "object", value: "Unserializable object" };
        }
      };

      // Sistema de tracking de tiempos para console.time/timeEnd
      const timeTracker = {};

      // Función helper para detectar si hay errores en los argumentos serializados
      const hasErrorInSerialized = (serialized) => {
        return serialized.some(item => item && item.type === 'error');
      };

      // Función helper para determinar el tipo de evento basado en el contenido
      const determineEventType = (defaultType, serialized) => {
        if (hasErrorInSerialized(serialized)) {
          return 'error';
        }
        return defaultType;
      };

      console.log = (...args) => {
        const serialized = args.map(arg => serialize(arg));
        const eventType = determineEventType('log', serialized);
        send(eventType, serialized);
      };

      console.info = (...args) => {
        const serialized = args.map(arg => serialize(arg));
        const eventType = determineEventType('info', serialized);
        send(eventType, serialized);
      };

      console.error = (...args) => {
        const serialized = args.map(arg => serialize(arg));
        send('error', serialized);
      };

      console.warn = (...args) => {
        const serialized = args.map(arg => serialize(arg));
        const eventType = determineEventType('warn', serialized);
        send(eventType, serialized);
      };

      console.time = (label = 'default') => {
        timeTracker[label] = performance.now();
      };

      console.timeEnd = (label = 'default') => {
        if (timeTracker[label] !== undefined) {
          const elapsed = performance.now() - timeTracker[label];
          const serialized = [{
            type: 'string',
            typeof: 'string',
            value: label + ': ' + elapsed.toFixed(2) + ' ms'
          }];
          send('time', serialized);
          delete timeTracker[label];
        } else {
          const serialized = [{
            type: 'string',
            typeof: 'string',
            value: 'Timer "' + label + '" does not exist'
          }];
          send('warn', serialized);
        }
      };

      alert = (...args) => {
        const serialized = args.map(arg => serialize(arg));
        send('alert', serialized);
      };

      // Intentar ejecutar el código del usuario
      try {
        (function() {
          ${javascript}
        })();
      } catch (err) {
        const errorMessage = err.message || String(err);
        const errorString = String(errorMessage);
        
        // Filtrar errores relacionados con Tauri internals
        if (!errorString.includes('__TAURI_INTERNALS__') && 
            !errorString.includes('__TAURI__') &&
            !(errorString.includes('tauri') && errorString.toLowerCase().includes('invoke'))) {
          send('error', [{
            type: 'error',
            typeof: 'object',
            value: errorMessage,
            stack: err.stack
          }]);
        }
      }
  `;
};

export const generateDocument = (editorTechnologiesValues: EditorTechnologiesValuesSaved, setDocument: (document: string) => void) => {
  const { html, css, javascript } = editorTechnologiesValues;
  const updatedDocument = generateDocumentCode({ html, css, javascript }, INSTANCE_ID.FULL);
  setDocument(updatedDocument);
}

export const generateSandboxDocument = (javascript: string, setDocument: (document: string) => void) => {
  const updatedDocument = generateDocumentCode({ html: '', css: '', javascript }, INSTANCE_ID.JS_ONLY);
  setDocument(updatedDocument);
}

export const generateCustomThemeObject = (savedCustomThemeValues: Record<string, string>) => {
  const items = Object.entries(savedCustomThemeValues).map(([key, value]) => ({
    key,
    value,
    type: ITEMS_CUSTOM_THEMES_CONFIG
      .flatMap(section => section.items)
      .find(item => item.key === key)?.type || 'color'
  }));
  return items;
}

interface UpdateCustomThemeProps {
  monaco: typeof Monaco;
  customThemeValues: Record<string, string>;
  configEditors: typeof INITIAL_EDITOR_CONFIG;
}

export const handleUpdateCustomTheme = ({ monaco, customThemeValues, configEditors }: UpdateCustomThemeProps) => {
  if (monaco && configEditors.theme === 'custom-theme') {
    const items = generateCustomThemeObject(customThemeValues);
    updateCustomTheme(monaco, items);
  }
}

export const handleUpdateCustomThemeValues = (customThemeValues: Record<string, string>, setCustomThemeValues: (customThemeValues: Record<string, string>) => void) => {
  let initialValues: Record<string, string> = {};
  ITEMS_CUSTOM_THEMES_CONFIG.forEach((section) => {
    section.items.forEach((item) => {
      initialValues[item.key] = item.defaultValue;
    });
  });

  initialValues = { ...initialValues, ...customThemeValues };

  setCustomThemeValues(initialValues);
}

export const showCustomAlertModal = (message: string, width: number, height: number) => {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.zIndex = '99999';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';

  const modal = document.createElement('div');
  modal.style.width = `${width}px`;
  modal.style.maxHeight = `${height}px`;
  modal.style.backgroundColor = 'var(--color-header-section-block)';
  modal.style.border = '1px solid var(--color-border-section-block)';
  modal.style.borderRadius = '8px';
  modal.style.padding = '20px';
  modal.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
  modal.style.display = 'flex';
  modal.style.flexDirection = 'column';
  modal.style.gap = '16px';

  const title = document.createElement('div');
  title.textContent = 'Alert';
  title.style.fontSize = '18px';
  title.style.fontWeight = 'bold';
  title.style.color = '#ffffff';

  const content = document.createElement('div');
  content.textContent = message;
  content.style.color = 'var(--color-secondary)';
  content.style.fontSize = '14px';
  content.style.lineHeight = '1.5';
  content.style.overflowY = 'auto';
  content.style.paddingRight = '10px';
  content.style.flex = '1';
  content.style.wordWrap = 'break-word';

  const button = document.createElement('button');
  button.textContent = 'Accept';
  button.style.padding = '4px 80px';
  button.style.borderRadius = '50px';
  button.style.cursor = 'pointer';
  button.style.fontSize = '14px';
  button.style.alignSelf = 'center';
  button.style.marginTop = '8px';
  button.classList.add('custom-alert-modal-button');

  const closeModal = () => {
    document.body.removeChild(overlay);
  };

  button.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });

  modal.appendChild(title);
  modal.appendChild(content);
  modal.appendChild(button);
  overlay.appendChild(modal);

  document.body.appendChild(overlay);

  button.focus();
  button.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      closeModal();
    }
  });
};

export const debounce = (func: (...args: any[]) => void, delay: number = DEBOUNCE_DELAY) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}