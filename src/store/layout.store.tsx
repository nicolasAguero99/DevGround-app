import { create, useStore } from "zustand"
import { tauriStore } from "../utils/utils"
import { useShallow } from "zustand/react/shallow"
import { CHOSEN_MODE, LAYOUT_OPTIONS } from "../constants/constants"
import { PERSIST_CHOSEN_MODE_TAURI_KEY, PERSIST_IS_FIRST_TIME_TAURI_KEY, PERSIST_LAYOUT_MAIN_SCREEN_TAURI_KEY } from "../constants/persist-keys"
import { ChosenMode, LayoutOption } from "../types/types"

interface LayoutMainScreen {
  layoutMainScreen: LayoutOption
  setLayoutMainScreen: (layoutMainScreen: LayoutOption) => void
}

export const layoutMainScreenStore = create<LayoutMainScreen>((set) => ({
  layoutMainScreen: LAYOUT_OPTIONS[0],
  setLayoutMainScreen: (layoutMainScreen) => {
    if (layoutMainScreen === '') return;
    if (layoutMainScreen.slug === 'layout-horizontal') {
      document.documentElement.style.setProperty('--overflow-x-by-layout', 'auto');
      document.documentElement.style.setProperty('--overflow-y-by-layout', 'hidden');
    } else if (layoutMainScreen.slug === 'layout-vertical') {
      document.documentElement.style.setProperty('--overflow-x-by-layout', 'hidden');
      document.documentElement.style.setProperty('--overflow-y-by-layout', 'auto');
    } else {
      document.documentElement.style.setProperty('--overflow-x-by-layout', 'hidden');
      document.documentElement.style.setProperty('--overflow-y-by-layout', 'hidden');
    }
    set({ layoutMainScreen })
    tauriStore.set(PERSIST_LAYOUT_MAIN_SCREEN_TAURI_KEY, layoutMainScreen)
    tauriStore.save()
  }
}))

export const useLayoutMainScreen = () => {
  return useStore(
    layoutMainScreenStore,
    useShallow((state) => ({
      layoutMainScreen: state.layoutMainScreen,
      setLayoutMainScreen: state.setLayoutMainScreen,
    }))
  );
}

interface ChosenModeStore {
  chosenMode: ChosenMode
  setChosenMode: (chosenMode: ChosenMode) => void
}

export const chosenModeStore = create<ChosenModeStore>((set) => ({
  chosenMode: CHOSEN_MODE.PLAYGROUND,
  setChosenMode: (chosenMode) => {
    set({ chosenMode })
    tauriStore.set(PERSIST_CHOSEN_MODE_TAURI_KEY, chosenMode)
    tauriStore.save()
  }
}))

export const useChosenMode = () => {
  return useStore(
    chosenModeStore,
    useShallow((state) => ({
      chosenMode: state.chosenMode,
      setChosenMode: state.setChosenMode,
    }))
  );
}

interface isFirstTime {
  isFirstTime: boolean
  setIsFirstTime: (isFirstTime: boolean) => void
}

export const isFirstTimeStore = create<isFirstTime>((set) => ({
  isFirstTime: false,
  setIsFirstTime: (isFirstTime) => {
    set({ isFirstTime })
    tauriStore.set(PERSIST_IS_FIRST_TIME_TAURI_KEY, isFirstTime)
    tauriStore.save()
  }
}))

export const useIsFirstTime = () => {
  return useStore(
    isFirstTimeStore,
    useShallow((state) => ({
      isFirstTime: state.isFirstTime,
      setIsFirstTime: state.setIsFirstTime,
    }))
  );
}