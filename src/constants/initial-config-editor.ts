import type * as Monaco from "monaco-editor";
import { DEFAULT_THEME } from "./constants";

export type InitialEditorConfig = {
  height: string;
  width: string;
  theme: string;
  options: Monaco.editor.IStandaloneEditorConstructionOptions;
  // themeConfig?: {
  //   base?: string;
  //   inherit?: boolean;
  //   rules?: {
  //     comment?: string;
  //     keyword?: string;
  //     string?: string;
  //     number?: string;
  //     variable?: string;
  //     function?: string;
  //   };
  //   colors?: {
  //     [key: string]: string;
  //   };
  // };
}

export const INITIAL_EDITOR_CONFIG: InitialEditorConfig = {
  height: '100%',
  width: '100%',
  theme: DEFAULT_THEME,
  options: {
    fontFamily: "JetBrains Mono",
    fontSize: 12,
    fontLigatures: true,
    wordWrap: "on",
    autoIndent: "advanced",
    minimap: { enabled: false, scale: 30, showMarkSectionHeaders: false },
    tabSize: 2,
    formatOnType: true,
    formatOnPaste: true,
    cursorBlinking: "smooth",
    smoothScrolling: true,
    renderWhitespace: "selection",
    bracketPairColorization: { enabled: true },
    lineNumbersMinChars: 0,
    lineNumbers: "on",
    glyphMargin: true,
    automaticLayout: true,
    lineDecorationsWidth: 2,
    fixedOverflowWidgets: true,
    padding: { top: 15 },
    suggest: {
      showWords: true,
      showSnippets: true,
    },
    inlineSuggest: {
      enabled: true,
    },
  }
}