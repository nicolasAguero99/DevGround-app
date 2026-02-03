import type * as Monaco from "monaco-editor";
import { CUSTOM_THEME, DEFAULT_THEME } from "../constants/constants";

export const isValidHexColor = (value: string): boolean => {
  const v = (value || "").trim().replace(/^#/, "");
  return /^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$|^[0-9a-fA-F]{8}$/.test(v);
};

function toMonacoHex(value: string): string {
  const hex = (value || "").trim().replace(/^#/, "");
  if (hex.length === 3) {
    const six = hex.split("").map((c) => c + c).join("");
    return "#" + six;
  }
  if (hex.length >= 6) return "#" + hex.slice(0, 6);
  return "#000000";
}

export const setupEditorThemes = (monaco: typeof Monaco): void => {
  monaco.editor.defineTheme(DEFAULT_THEME, {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "#5c6370" },
      { token: "keyword", foreground: "#c678dd" },
      { token: "string", foreground: "#98c379" },
      { token: "number", foreground: "#d19a66" },
      { token: "delimiter", foreground: "#56b6c2" }
    ],
    colors: {
      "editor.background": "#18181b",
      "editorLineNumber.foreground": "#52525d",
      "editorLineNumber.activeForeground": "#ffffff",
      "editorGutter.background": "#101013",
      "editorCursor.foreground": "#c9d1d9",
      "editor.selectionBackground": "#264f78",
      "editor.inactiveSelectionBackground": "#3a3f4b",
    }
  });

  monaco.editor.setTheme(DEFAULT_THEME);
}

export const updateCustomTheme = (monaco: typeof Monaco, newUpdatedItems: { key: string, value: string, type?: string }[]): void => {
  const rules: Array<{ token: string; foreground: string }> = [];
  const colors: Record<string, string> = {};
  
  newUpdatedItems.forEach((item) => {
    if (!isValidHexColor(item.value)) return;
    const keys = item.key.split('.');

    if (keys[0] === 'rules' && keys.length === 2) {
      const token = keys[1];
      const foreground = toMonacoHex(item.value);
      rules.push({ token, foreground });
    }
    else if (keys[0] === 'colors') {
      const colorKey = keys.slice(1).join('.');
      colors[colorKey] = item.value;
    }
  });
  
  monaco.editor.defineTheme(CUSTOM_THEME, {
    base: "vs-dark",
    inherit: true,
    rules: rules.length > 0 ? rules : [],
    colors: Object.keys(colors).length > 0 ? colors : {}
  });
  
  monaco.editor.setTheme(CUSTOM_THEME);
}