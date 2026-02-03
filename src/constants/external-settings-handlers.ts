import { DEBOUNCE_DELAY } from "./constants";

export interface ExternalSettingsStores {
  debounceDelay: number;
  setDebounceDelay: (value: number) => void;
}

export interface ExternalSettingHandler {
  getValue: (stores: ExternalSettingsStores) => string | number | boolean;
  setValue: (stores: ExternalSettingsStores, value: string | number | boolean) => void;
  getInitialValue: () => string | number | boolean;
}

export const EXTERNAL_SETTINGS_HANDLERS: Record<
  string,
  ExternalSettingHandler
> = {
  debounceDelay: {
    getValue: (stores) => stores.debounceDelay,
    setValue: (stores, value) => stores.setDebounceDelay(value as number),
    getInitialValue: () => DEBOUNCE_DELAY,
  },
};

export function getExternalHandler(
  key: string
): ExternalSettingHandler | undefined {
  return EXTERNAL_SETTINGS_HANDLERS[key];
}

export function isExternalSettingKey(key: string): boolean {
  return key in EXTERNAL_SETTINGS_HANDLERS;
}
