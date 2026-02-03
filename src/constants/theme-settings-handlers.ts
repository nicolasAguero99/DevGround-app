import type { InitialEditorConfig } from "./initial-config-editor";

export interface ThemeSettingHandler {
  getValue: (config: InitialEditorConfig) => string | boolean;
  setValue: (
    setConfig: (fn: (prev: InitialEditorConfig) => InitialEditorConfig) => void,
    value: string | boolean
  ) => void;
}

export const THEME_SETTINGS_HANDLERS: Record<string, ThemeSettingHandler> = {
  base: {
    getValue: (config) => config.theme,
    setValue: (setConfig, value) =>
      setConfig((prev) => ({ ...prev, theme: value as string })),
  },
};

export function getThemeHandler(key: string): ThemeSettingHandler | undefined {
  return THEME_SETTINGS_HANDLERS[key];
}
