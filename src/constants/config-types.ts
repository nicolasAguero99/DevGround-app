export type ConfigSource = "editor" | "external";

export interface BaseConfigItem {
  key: string;
  label: string;
  type: "number" | "text" | "select" | "toggle";
  min?: number;
  max?: number;
  step?: number;
  typeValue?: string;
  options?: string[];
}

export interface EditorOptionItem extends BaseConfigItem {
  source: "editor";
}

export interface ExternalSettingItem extends BaseConfigItem {
  source: "external";
}

export type SettingsConfigItem = EditorOptionItem | ExternalSettingItem;

export interface ThemeConfigItem {
  label: string;
  key: string;
  type: "select" | "boolean";
  options?: string[];
  defaultValue: string | boolean;
}

export interface CustomThemeConfigItem {
  label: string;
  key: string;
  type: "color";
  defaultValue: string;
}
