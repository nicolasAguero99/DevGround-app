import { useEffect } from "react";
import { tauriStore } from "../utils/utils";
import {
  DISABLE_PERSIST,
  PERSIST_CHOSEN_MODE_TAURI_KEY,
  PERSIST_CUSTOM_THEME_VALUES_TAURI_KEY,
  PERSIST_DEBOUNCE_DELAY_TAURI_KEY,
  PERSIST_EDITORS_CONFIG_TAURI_KEY,
  PERSIST_EDITORS_VALUE_TAURI_KEY,
  PERSIST_IS_FIRST_TIME_TAURI_KEY,
  PERSIST_LAYOUT_MAIN_SCREEN_TAURI_KEY,
  PERSIST_ONLY_JS_EDITOR_VALUE_TAURI_KEY,
  PERSIST_SPLIT_EDITORS_VALUE_TAURI_KEY,
} from "../constants/persist-keys";
import { InitialEditorConfig } from "../constants/initial-config-editor";
import { generateDocument, handleUpdateCustomTheme, handleUpdateCustomThemeValues } from "../utils/utils";
import type * as Monaco from "monaco-editor";
import { ChosenMode, EditorTechnologiesValuesSaved } from "../types/types";
import { CHOSEN_MODE, DEBOUNCE_DELAY, LAYOUT_OPTIONS } from "../constants/constants";

type Params = {
  monaco: typeof Monaco | null;
  configEditors: InitialEditorConfig;
  setIsFirstTime: (v: boolean) => void;
  setChosenMode: (v: any) => void;
  setConfigEditors: (v: any) => void;
  setEditorTechnologiesValues: (v: any) => void;
  setOnlyJSEditorValue: (v: string) => void;
  setSplitEditorsValues: (v: any) => void;
  setLayoutMainScreen: (v: any) => void;
  setDebounceDelay: (v: number) => void;
  setCustomThemeValues: (v: any) => void;
  setDocument: (v: string) => void;
};

export function useLoadPersistedState(params: Params) {
  const {
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
  } = params;

  useEffect(() => {
    (async () => {
      if (DISABLE_PERSIST) {
        setIsFirstTime(true);
        setChosenMode(CHOSEN_MODE.PLAYGROUND);
        setLayoutMainScreen(LAYOUT_OPTIONS[0]);
        setDebounceDelay(DEBOUNCE_DELAY);
        return;
      }

      const isFirstTimeRaw = await tauriStore.get(PERSIST_IS_FIRST_TIME_TAURI_KEY);
      const isFirstTime = isFirstTimeRaw !== false;
      setIsFirstTime(isFirstTime);

      const chosenModeRaw = await tauriStore.get(PERSIST_CHOSEN_MODE_TAURI_KEY);
      const chosenMode: ChosenMode =
        chosenModeRaw === CHOSEN_MODE.PLAYGROUND || chosenModeRaw === CHOSEN_MODE.SANDBOX
          ? chosenModeRaw
          : CHOSEN_MODE.PLAYGROUND;
      setChosenMode(chosenMode);

      const editorConfig = await tauriStore.get(PERSIST_EDITORS_CONFIG_TAURI_KEY);
      if (editorConfig) setConfigEditors(editorConfig as InitialEditorConfig);

      const editorValuesRaw = await tauriStore.get(PERSIST_EDITORS_VALUE_TAURI_KEY);
      const editorValues: EditorTechnologiesValuesSaved | null =
        editorValuesRaw != null && typeof editorValuesRaw === "object" && "html" in editorValuesRaw && "css" in editorValuesRaw && "javascript" in editorValuesRaw
          ? (editorValuesRaw as EditorTechnologiesValuesSaved)
          : null;
      if (editorValues) {
        setEditorTechnologiesValues(editorValues);
        generateDocument(editorValues, setDocument);
      }

      const onlyJSRaw = await tauriStore.get(PERSIST_ONLY_JS_EDITOR_VALUE_TAURI_KEY);
      const onlyJS: string = typeof onlyJSRaw === "string" ? onlyJSRaw : "";
      if (onlyJS) setOnlyJSEditorValue(onlyJS);

      const splitValues = await tauriStore.get(PERSIST_SPLIT_EDITORS_VALUE_TAURI_KEY);
      if (splitValues) setSplitEditorsValues(splitValues);

      const layout = await tauriStore.get(PERSIST_LAYOUT_MAIN_SCREEN_TAURI_KEY);
      if (layout) {
        setLayoutMainScreen(layout);
      } else {
        setLayoutMainScreen(LAYOUT_OPTIONS[0]);
      }

      const debounceRaw = await tauriStore.get(PERSIST_DEBOUNCE_DELAY_TAURI_KEY);
      const debounce: number =
        typeof debounceRaw === "number" && Number.isFinite(debounceRaw) && debounceRaw > 0 ? debounceRaw : DEBOUNCE_DELAY;
      setDebounceDelay(debounce);
    })();
  }, []);

  useEffect(() => {
    if (!monaco || DISABLE_PERSIST) return;

    (async () => {
      const themeValuesRaw = await tauriStore.get(PERSIST_CUSTOM_THEME_VALUES_TAURI_KEY);
      const themeValues: Record<string, string> | null =
        themeValuesRaw != null && typeof themeValuesRaw === "object" && !Array.isArray(themeValuesRaw)
          ? (themeValuesRaw as Record<string, string>)
          : null;
      if (!themeValues) return;

      handleUpdateCustomThemeValues(themeValues, setCustomThemeValues);
      handleUpdateCustomTheme({ monaco, customThemeValues: themeValues, configEditors });
    })();
  }, [monaco]);
}