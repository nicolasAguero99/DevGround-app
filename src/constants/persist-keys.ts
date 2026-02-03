export const PERSIST_EDITORS_CONFIG_TAURI_KEY = "editors-config-saved";
export const PERSIST_EDITORS_VALUE_TAURI_KEY = "editors-values-saved";
export const PERSIST_ONLY_JS_EDITOR_VALUE_TAURI_KEY = "only-js-editor-value-saved";
export const PERSIST_CUSTOM_THEME_VALUES_TAURI_KEY = "custom-theme-values-saved";
export const PERSIST_SPLIT_EDITORS_VALUE_TAURI_KEY = "split-editors-values-saved";
export const PERSIST_LAYOUT_MAIN_SCREEN_TAURI_KEY = "layout-main-screen-saved";
export const PERSIST_DEBOUNCE_DELAY_TAURI_KEY = "debounce-delay-saved";
export const PERSIST_IS_FIRST_TIME_TAURI_KEY = "is-first-time-saved";
export const PERSIST_CHOSEN_MODE_TAURI_KEY = "chosen-mode-saved";
export const PERSIST_SG_TAURI_KEY = "sg-saved";

export const DISABLE_PERSIST = false;

export const ALL_PERSIST_KEYS = [
  PERSIST_EDITORS_CONFIG_TAURI_KEY,
  PERSIST_EDITORS_VALUE_TAURI_KEY,
  PERSIST_ONLY_JS_EDITOR_VALUE_TAURI_KEY,
  PERSIST_CUSTOM_THEME_VALUES_TAURI_KEY,
  PERSIST_SPLIT_EDITORS_VALUE_TAURI_KEY,
  PERSIST_LAYOUT_MAIN_SCREEN_TAURI_KEY,
  PERSIST_DEBOUNCE_DELAY_TAURI_KEY,
  PERSIST_IS_FIRST_TIME_TAURI_KEY,
  PERSIST_CHOSEN_MODE_TAURI_KEY,
  PERSIST_SG_TAURI_KEY,
] as const;