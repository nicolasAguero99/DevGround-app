import { create, useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { INITIAL_EDITOR_CONFIG, InitialEditorConfig } from "../constants/initial-config-editor";
import { DEBOUNCE_DELAY, TECHNOLOGIES_EDITOR } from "../constants/constants";
import { tauriStore } from "../utils/utils";
import { EditorTechnologiesValuesSaved } from "../types/types";
import { PERSIST_DEBOUNCE_DELAY_TAURI_KEY, PERSIST_EDITORS_CONFIG_TAURI_KEY, PERSIST_EDITORS_VALUE_TAURI_KEY, PERSIST_ONLY_JS_EDITOR_VALUE_TAURI_KEY } from "../constants/persist-keys";

// Editor Config
interface ConfigEditorsStore {
  configEditors: typeof INITIAL_EDITOR_CONFIG;
  setConfigEditors: (value: InitialEditorConfig | ((prev: InitialEditorConfig) => InitialEditorConfig)) => void;
}

export const configEditorsStore = create<ConfigEditorsStore>((set, get) => ({
  configEditors: INITIAL_EDITOR_CONFIG,

  setConfigEditors: (value: InitialEditorConfig | ((prev: InitialEditorConfig) => InitialEditorConfig)) => {
    const newValue = typeof value === "function"
      ? value(get().configEditors)
      : value;

    set({ configEditors: newValue });

    tauriStore.set(PERSIST_EDITORS_CONFIG_TAURI_KEY, { ...newValue });
    tauriStore.save();
  }
}));


export const useConfigEditors = () => {
  return useStore(
    configEditorsStore,
    useShallow((state) => ({
      configEditors: state.configEditors,
      setConfigEditors: state.setConfigEditors,
    }))
  );
};

// Editor Technologies Values
interface EditorTechnologiesValuesStore {
  editorTechnologiesValues: EditorTechnologiesValuesSaved
  setEditorTechnologiesValues: (editorTechnologiesValues: EditorTechnologiesValuesSaved) => void;
}

export const editorTechnologiesValuesStore = create<EditorTechnologiesValuesStore>((set) => ({
  editorTechnologiesValues: {
    [TECHNOLOGIES_EDITOR.HTML]: '',
    [TECHNOLOGIES_EDITOR.CSS]: '',
    [TECHNOLOGIES_EDITOR.JS]: '',
  },
  setEditorTechnologiesValues: (editorTechnologiesValues) => {
    set({ editorTechnologiesValues })
    tauriStore.set(PERSIST_EDITORS_VALUE_TAURI_KEY, { ...editorTechnologiesValues })
    tauriStore.save()
  }
}));

export const useEditorTechnologiesValues = () => {
  return useStore(
    editorTechnologiesValuesStore,
    useShallow((state) => ({
      editorTechnologiesValues: state.editorTechnologiesValues,
      setEditorTechnologiesValues: state.setEditorTechnologiesValues,
    }))
  );
}

// Debounce Delay
interface DebounceDelayStore {
  debounceDelay: number;
  setDebounceDelay: (debounceDelay: number) => void;
}

const debounceDelayStore = create<DebounceDelayStore>((set) => ({
  debounceDelay: DEBOUNCE_DELAY,
  setDebounceDelay: (debounceDelay) => {
    set({ debounceDelay })
    tauriStore.set(PERSIST_DEBOUNCE_DELAY_TAURI_KEY, debounceDelay)
    tauriStore.save();
  }
}));

export const useDebounceDelay = () => {
  return useStore(
    debounceDelayStore,
    useShallow((state) => ({
      debounceDelay: state.debounceDelay,
      setDebounceDelay: state.setDebounceDelay,
    }))
  );
}

// Only JS

interface OnlyJSEditorValueStore {
  onlyJSEditorValue: string;
  setOnlyJSEditorValue: (onlyJSEditorValue: string) => void;
}

const onlyJSEditorValueStore = create<OnlyJSEditorValueStore>((set) => ({
  onlyJSEditorValue: '',
  setOnlyJSEditorValue: (onlyJSEditorValue) => {
    set({ onlyJSEditorValue })
    tauriStore.set(PERSIST_ONLY_JS_EDITOR_VALUE_TAURI_KEY, onlyJSEditorValue)
    tauriStore.save()
  }
}));

export const useOnlyJSEditorValue = () => {
  return useStore(
    onlyJSEditorValueStore,
    useShallow((state) => ({
      onlyJSEditorValue: state.onlyJSEditorValue,
      setOnlyJSEditorValue: state.setOnlyJSEditorValue,
    }))
  );
}

// Editor Suggest AI Config
// interface EditorSuggestAIConfigStore {
//   suggestAI: {
//     enabled: boolean;
//     model: string;
//     apiKey: string;
//   };
//   setSuggestAI: (suggestAI: { enabled: boolean; model: string; apiKey: string }) => void;
// }

// const editorSuggestAIConfigStore = create<EditorSuggestAIConfigStore>((set) => ({
//   suggestAI: {
//     enabled: false,
//     model: '',
//     apiKey: '',
//   },
//   setSuggestAI: (suggestAI) => {
//     set({ suggestAI })
//     tauriStore.set(PERSIST_SG_TAURI_KEY, { ...suggestAI })
//     tauriStore.save()
//   }
// }));

// export const useEditorSuggestAIConfig = () => {
//   return useStore(
//     editorSuggestAIConfigStore,
//     useShallow((state) => ({
//       suggestAI: state.suggestAI,
//       setSuggestAI: state.setSuggestAI,
//     }))
//   );
// }

// export const getSuggestAIConfig = () => {
//   return editorSuggestAIConfigStore.getState().suggestAI;
// }