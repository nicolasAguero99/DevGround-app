import { create, useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { PERSIST_CUSTOM_THEME_VALUES_TAURI_KEY } from "../constants/persist-keys";
import { tauriStore } from "../utils/utils";

interface CustomThemeValuesStore {
  customThemeValues: Record<string, string>
  setCustomThemeValues: (customThemeValues: Record<string, string>) => void
}

const customThemeValuesStore = create<CustomThemeValuesStore>((set) => ({
  customThemeValues: {},
  setCustomThemeValues: (customThemeValues) => {
    set({ customThemeValues })
    tauriStore.set(PERSIST_CUSTOM_THEME_VALUES_TAURI_KEY, { ...customThemeValues })
    tauriStore.save()
  }
}))

export const useCustomThemeValues = () => {
  return useStore(
    customThemeValuesStore,
    useShallow((state) => ({
      customThemeValues: state.customThemeValues,
      setCustomThemeValues: state.setCustomThemeValues,
    }))
  );
}