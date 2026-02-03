import type * as Monaco from "monaco-editor";
import { emmetHTML } from "emmet-monaco-es";
import { TECHNOLOGIES_EDITOR } from "../constants/constants";
import { INITIAL_EDITOR_CONFIG, InitialEditorConfig } from "../constants/initial-config-editor";
import React from "react";
import { handleEditorCommands } from "./editor-commands";
import { setupEditorThemes } from "./editor-themes";

// Set para rastrear qué tecnologías ya tienen el provider registrado
const registeredProviders = new Set<string>();

export const handleBeforeMount = (monaco: typeof Monaco, technology: typeof TECHNOLOGIES_EDITOR[keyof typeof TECHNOLOGIES_EDITOR]) => {
  if (technology === TECHNOLOGIES_EDITOR.HTML) emmetHTML(monaco);
  setupEditorThemes(monaco);
};

export const handleOnMount = (
  editor: Monaco.editor.IStandaloneCodeEditor,
  monaco: typeof Monaco,
  containerRef: HTMLDivElement | null,
  windowResizeHandlerRef: React.MutableRefObject<(() => void) | null>,
  resizeObserverRef: React.MutableRefObject<ResizeObserver | null>,
  configEditors: typeof INITIAL_EDITOR_CONFIG,
  setConfigEditors: (value: InitialEditorConfig | ((prev: InitialEditorConfig) => InitialEditorConfig)) => void,
  editorRefs: React.MutableRefObject<Record<string, Monaco.editor.IStandaloneCodeEditor | null>>,
  technology: typeof TECHNOLOGIES_EDITOR[keyof typeof TECHNOLOGIES_EDITOR],
  setCurrentFocusedEditor: React.Dispatch<React.SetStateAction<string>>
) => {
  editorRefs.current[technology] = editor;
  
  if (technology === TECHNOLOGIES_EDITOR.JS && !registeredProviders.has(TECHNOLOGIES_EDITOR.HTML)) {
    const model = editor.getModel();
    if (model) {
      const lineCount = model.getLineCount();
      const lineValue = model.getLineContent(lineCount);
      const columnCount = lineValue.length + 1;
      editor.setPosition({ lineNumber: lineCount, column: columnCount });
      editor.focus();
    }
  } else if (technology === TECHNOLOGIES_EDITOR.HTML) {
    const model = editor.getModel();
    if (model) {
      const lineCount = model.getLineCount();
      const lineValue = model.getLineContent(lineCount);
      const columnCount = lineValue.length + 1;
      editor.setPosition({ lineNumber: lineCount, column: columnCount });
      editor.focus();
    }
  }

  editor.onDidFocusEditorText(() => {
    setCurrentFocusedEditor(technology);
  });

  handleEditorCommands({ editor, monaco, setConfigEditors, editorRefs, configEditors, technology });

  if (containerRef) {
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        editor.layout();
      });
    });

    resizeObserver.observe(containerRef);
    resizeObserverRef.current = resizeObserver;
  }

  const handleResize = () => {
    requestAnimationFrame(() => {
      editor.layout();
    });
  };

  windowResizeHandlerRef.current = handleResize;
  window.addEventListener("resize", handleResize);
};

export const handleSetup = (resizeObserverRef: React.MutableRefObject<ResizeObserver | null>, windowResizeHandlerRef: React.MutableRefObject<(() => void) | null>) => {
  if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
  if (windowResizeHandlerRef.current) window.removeEventListener("resize", windowResizeHandlerRef.current);
};
