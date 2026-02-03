import { CUSTOM_THEME, DEFAULT_THEME } from "./constants";
import type {
  EditorOptionItem,
  ExternalSettingItem,
  ThemeConfigItem,
  CustomThemeConfigItem,
} from "./config-types";

export const EDITOR_OPTIONS_CONFIG: EditorOptionItem[] = [
  {
    source: "editor",
    key: "fontSize",
    label: "Font Size",
    type: "number",
    min: 10,
    max: 40,
    typeValue: "px",
  },
  {
    source: "editor",
    key: "fontFamily",
    label: "Font Family",
    type: "text",
  },
  {
    source: "editor",
    key: "wordWrap",
    label: "Word Wrap",
    type: "select",
    options: ["off", "on", "wordWrapColumn", "bounded"],
  },
  {
    source: "editor",
    key: "lineNumbers",
    label: "Line Numbers",
    type: "toggle",
    options: ["on", "off"],
  },
  {
    source: "editor",
    key: "tabSize",
    label: "Tab Size",
    type: "number",
    min: 1,
    max: 8,
    step: 2,
  },
  {
    source: "editor",
    key: "cursorBlinking",
    label: "Cursor Blinking",
    type: "select",
    options: ["blink", "smooth", "phase", "expand", "solid"],
  },
];

export const EXTERNAL_SETTINGS_CONFIG: ExternalSettingItem[] = [
  {
    source: "external",
    key: "debounceDelay",
    label: "Debounce Delay (ms)",
    type: "number",
    min: 100,
    max: 1000,
    step: 100,
  },
];

export const SETTINGS_CONFIG = [
  ...EDITOR_OPTIONS_CONFIG,
  ...EXTERNAL_SETTINGS_CONFIG,
] as const;

export const ITEMS_MAIN_CONFIG = SETTINGS_CONFIG;

export const THEMES_MAIN_CONFIG = [
  DEFAULT_THEME,
  "vs-dark",
  "vs-light",
  "hc-black",
  "hc-light",
  CUSTOM_THEME,
];

export const ITEMS_THEME_CONFIG: { section: string; items: ThemeConfigItem[] }[] = [
  {
    section: "General",
    items: [
      {
        label: "Theme",
        key: "base",
        type: "select",
        options: THEMES_MAIN_CONFIG,
        defaultValue: DEFAULT_THEME,
      },
    ],
  },
];

export const ITEMS_CUSTOM_THEMES_CONFIG: {
  section: string;
  items: CustomThemeConfigItem[];
}[] = [
  {
    section: "Syntax Highlighting",
    items: [
      { label: "Comments", key: "rules.comment", type: "color", defaultValue: "#5c6370" },
      { label: "Keywords", key: "rules.keyword", type: "color", defaultValue: "#c678dd" },
      { label: "Strings", key: "rules.string", type: "color", defaultValue: "#98c379" },
      { label: "Numbers", key: "rules.number", type: "color", defaultValue: "#d19a66" },
      { label: "Variables", key: "rules.variable", type: "color", defaultValue: "#e06c75" },
      { label: "Functions", key: "rules.function", type: "color", defaultValue: "#61afef" },
    ],
  },
  {
    section: "Editor Colors",
    items: [
      { label: "Editor Background", key: "colors.editor.background", type: "color", defaultValue: "#1e1e1e" },
      { label: "Foreground Text", key: "colors.editor.foreground", type: "color", defaultValue: "#d4d4d4" },
      { label: "Cursor Color", key: "colors.editorCursor.foreground", type: "color", defaultValue: "#c9d1d9" },
      { label: "Selection Background", key: "colors.editor.selectionBackground", type: "color", defaultValue: "#264f78" },
      { label: "Inactive Selection Background", key: "colors.editor.inactiveSelectionBackground", type: "color", defaultValue: "#3a3f4b" },
      { label: "Line Highlight", key: "colors.editorLineHighlightBackground", type: "color", defaultValue: "#2a2d2e55" },
    ],
  },
  {
    section: "Line Numbers & Gutter",
    items: [
      { label: "Line Numbers", key: "colors.editorLineNumber.foreground", type: "color", defaultValue: "#8b949e" },
      { label: "Active Line Number", key: "colors.editorLineNumber.activeForeground", type: "color", defaultValue: "#ffffff" },
      { label: "Gutter Background", key: "colors.editorGutter.background", type: "color", defaultValue: "#1e1e1e" },
    ],
  },
  {
    section: "Indent Guides & Whitespace",
    items: [
      { label: "Indent Guide", key: "colors.editorIndentGuide.background", type: "color", defaultValue: "#404040" },
      { label: "Active Indent Guide", key: "colors.editorIndentGuide.activeBackground", type: "color", defaultValue: "#707070" },
      { label: "Whitespace", key: "colors.editorWhitespace.foreground", type: "color", defaultValue: "#404040" },
    ],
  },
];
