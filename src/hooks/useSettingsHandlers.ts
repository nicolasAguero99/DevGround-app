import { useConfigEditors } from "../store/editors.store";
import { useDebounceDelay } from "../store/editors.store";
import { INITIAL_EDITOR_CONFIG } from "../constants/initial-config-editor";
import {
  EXTERNAL_SETTINGS_HANDLERS,
  type ExternalSettingsStores,
} from "../constants/external-settings-handlers";
import type { SettingsConfigItem } from "../constants/config-types";
import type * as Monaco from "monaco-editor";

export function useSettingsHandlers() {
  const { configEditors, setConfigEditors } = useConfigEditors();
  const { debounceDelay, setDebounceDelay } = useDebounceDelay();

  const externalStores: ExternalSettingsStores = {
    debounceDelay,
    setDebounceDelay,
  };

  function getValue(item: SettingsConfigItem): string | number | boolean {
    if (item.source === "editor") {
      const value = configEditors.options[item.key as keyof Monaco.editor.IStandaloneEditorConstructionOptions];
      return value as string | number | boolean;
    }
    const handler = EXTERNAL_SETTINGS_HANDLERS[item.key]!;
    return handler.getValue(externalStores);
  }

  function setValue(
    item: SettingsConfigItem,
    value: string | number | boolean
  ): void {
    if (item.source === "editor") {
      setConfigEditors((prev) => ({
        ...prev,
        options: { ...prev.options, [item.key]: value },
      }));
      return;
    }
    const handler = EXTERNAL_SETTINGS_HANDLERS[item.key];
    if (handler) handler.setValue(externalStores, value);
  }

  function resetValue(item: SettingsConfigItem): void {
    if (item.source === "editor") {
      const initial = INITIAL_EDITOR_CONFIG.options[
        item.key as keyof Monaco.editor.IStandaloneEditorConstructionOptions
      ];
      setConfigEditors((prev) => ({
        ...prev,
        options: { ...prev.options, [item.key]: initial },
      }));
      return;
    }
    const handler = EXTERNAL_SETTINGS_HANDLERS[item.key];
    if (handler) {
      handler.setValue(externalStores, handler.getInitialValue());
    }
  }

  return { getValue, setValue, resetValue };
}
