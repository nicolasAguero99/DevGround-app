import { createContext, useContext, useState, useRef } from "react";
import { ConsoleOutput } from "../types/types";
import { useConfigEditors, useDebounceDelay, useEditorTechnologiesValues, useOnlyJSEditorValue } from "../store/editors.store";
import { useCustomThemeValues } from "../store/themes.store";
import { useChosenMode, useIsFirstTime, useLayoutMainScreen } from "../store/layout.store";
import { INSTANCE_ID } from "../constants/constants";
import type * as Monaco from "monaco-editor";
import { useMonaco } from "@monaco-editor/react";
import { useBufferedOutput } from "../hooks/useBufferedOutput";
import { useLoadPersistedState } from "../hooks/useLoadPersistedState";
import { useSyncDocumentFromEditors } from "../hooks/useSyncDocumentFromEditors";
import { useOutputResetOnLayoutChange } from "../hooks/useOutputResetOnLayoutChange";
import { useOutputResetOnChosenModeChange } from "../hooks/useOutputResetOnChosenModeChange";
import { useCleanupOnUnmount } from "../hooks/useCleanupOnUnmount";
import { useHandlerMessages } from "../hooks/useHandlerMessages";

type MainScreenContextType = {
  document: string;
  documentConsole: string;
  output: Record<string, ConsoleOutput[]>;
  setDocument: React.Dispatch<React.SetStateAction<string>>;
  setDocumentConsole: React.Dispatch<React.SetStateAction<string>>;
  setOutput: (instanceId: string, updater: React.SetStateAction<ConsoleOutput[]>, forceClear?: boolean) => void;
  splitEditorsValues: Record<string, number[]>;
  setSplitEditorsValues: React.Dispatch<React.SetStateAction<Record<string, number[]>>>;
  editorRefs: React.MutableRefObject<Record<string, Monaco.editor.IStandaloneCodeEditor | null>>;
  isFirstTimeShowEntrySwitchButtonRef: React.MutableRefObject<boolean>;
  currentFocusedEditor: string;
  setCurrentFocusedEditor: React.Dispatch<React.SetStateAction<string>>;
  isMainConfigModalOpen: boolean;
  setIsMainConfigModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MainScreenContext = createContext<MainScreenContextType | null>(null);

export function MainScreenProvider({ children }: { children: React.ReactNode }) {
  const monaco = useMonaco();
  const { configEditors, setConfigEditors } = useConfigEditors();
  const { editorTechnologiesValues, setEditorTechnologiesValues } = useEditorTechnologiesValues();
  const { setOnlyJSEditorValue } = useOnlyJSEditorValue();
  const { setCustomThemeValues } = useCustomThemeValues();
  const { layoutMainScreen, setLayoutMainScreen } = useLayoutMainScreen();
  const { setDebounceDelay } = useDebounceDelay();
  const { chosenMode, setChosenMode } = useChosenMode();
  const { setIsFirstTime } = useIsFirstTime();

  const [splitEditorsValues, setSplitEditorsValues] = useState<Record<string, number[]>>({});
  const [document, setDocument] = useState("");
  const [documentConsole, setDocumentConsole] = useState("");
  const isFirstTimeShowEntrySwitchButtonRef = useRef(true);
  const editorRefs = useRef<Record<string, Monaco.editor.IStandaloneCodeEditor | null>>({});
  const [currentFocusedEditor, setCurrentFocusedEditor] = useState<string>("");
  const [isMainConfigModalOpen, setIsMainConfigModalOpen] = useState(false);

  const { output, setOutput, clearAllTimeouts } = useBufferedOutput(
    {
      [INSTANCE_ID.FULL]: [],
      [INSTANCE_ID.JS_ONLY]: [],
    },
    400
  );

  useLoadPersistedState({
    monaco,
    configEditors,
    setIsFirstTime,
    setChosenMode,
    setConfigEditors,
    setEditorTechnologiesValues,
    setOnlyJSEditorValue,
    setSplitEditorsValues,
    setLayoutMainScreen,
    setDebounceDelay,
    setCustomThemeValues,
    setDocument,
  });

  useSyncDocumentFromEditors(editorTechnologiesValues, setOutput, setDocument);
  useOutputResetOnLayoutChange(layoutMainScreen, setOutput);
  useOutputResetOnChosenModeChange(chosenMode, setOutput);
  useCleanupOnUnmount(clearAllTimeouts);
  useHandlerMessages(setOutput);

  return (
    <MainScreenContext.Provider
      value={{
        document,
        documentConsole,
        output,
        setDocument,
        setDocumentConsole,
        setOutput,
        splitEditorsValues,
        setSplitEditorsValues,
        editorRefs,
        isFirstTimeShowEntrySwitchButtonRef,
        currentFocusedEditor,
        setCurrentFocusedEditor,
        isMainConfigModalOpen,
        setIsMainConfigModalOpen,
      }}
    >
      {children}
    </MainScreenContext.Provider>
  );
}

export const useMainScreen = () => {
  const context = useContext(MainScreenContext);
  if (!context) throw new Error("useMainScreen must be used within a MainScreenProvider");
  return context;
};