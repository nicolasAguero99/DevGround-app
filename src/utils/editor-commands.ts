import type * as Monaco from "monaco-editor";
import { INITIAL_EDITOR_CONFIG, InitialEditorConfig } from "../constants/initial-config-editor";
import { TECHNOLOGIES_EDITOR } from "../constants/constants";

interface EditorCommandsProps {
  editor: Monaco.editor.IStandaloneCodeEditor;
  monaco: typeof import("monaco-editor");
  setConfigEditors: (value: InitialEditorConfig | ((prev: InitialEditorConfig) => InitialEditorConfig)) => void;
  editorRefs: React.MutableRefObject<Record<string, Monaco.editor.IStandaloneCodeEditor | null>>;
  configEditors: typeof INITIAL_EDITOR_CONFIG;
  technology: typeof TECHNOLOGIES_EDITOR[keyof typeof TECHNOLOGIES_EDITOR];
}

export function handleEditorCommands({ editor, monaco, setConfigEditors, editorRefs, configEditors }: EditorCommandsProps) {
  const isMac = navigator.platform.toUpperCase().includes("MAC");

  // Alternate word wrap
  editor.addCommand(
    monaco.KeyMod.Alt | monaco.KeyCode.KeyZ,
    () => {
      const current = editor.getOptions().get((monaco as unknown as any).editor.EditorOption.wordWrap);

      const next = current === 'on' ? 'off' : 'on';
      setConfigEditors((prev) => ({ ...prev, options: { ...prev.options, wordWrap: next } }));
    }
  );
  // Focus next editor
  editor.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyM,
    () => {
      focusNextEditor(editorRefs);
    }
  );
  // Increase font size
  editor.addCommand(
    monaco.KeyMod.CtrlCmd | (isMac ? monaco.KeyCode.Equal : monaco.KeyCode.NumpadAdd),
    () => {
      console.log('increase font size', configEditors.options.fontSize);
      const currentFontSize = editor.getOptions().get((monaco as any).editor.EditorOption.fontSize);

      setConfigEditors((prev) => {
        return {
          ...prev,
          options: { ...prev.options, fontSize: currentFontSize + 1 }
        }
      });
    }
  );
  // Decrease font size
  editor.addCommand(
    monaco.KeyMod.CtrlCmd | (isMac ? monaco.KeyCode.Minus : monaco.KeyCode.NumpadSubtract),
    () => {
      const currentFontSize = editor.getOptions().get((monaco as unknown as any).editor.EditorOption.fontSize);
      setConfigEditors((prev) => ({ ...prev, options: { ...prev.options, fontSize: currentFontSize - 1 } }));
    }
  );
}


const focusNextEditor = (editorRefs: React.MutableRefObject<Record<string, Monaco.editor.IStandaloneCodeEditor | null>>) => {
  const editors = editorRefs.current;
  const keys = Object.keys(editors).filter(key => editors[key] !== null);

  if (keys.length === 0) return;

  let currentIndex = -1;
  for (let i = 0; i < keys.length; i++) {
    const editor = editors[keys[i]];
    if (editor && editor.hasTextFocus()) {
      currentIndex = i;
      break;
    }
  }

  if (currentIndex === -1) currentIndex = 0;

  const nextIndex = (currentIndex + 1) % keys.length;
  const nextKey = keys[nextIndex];

  editors[nextKey]?.focus();
}