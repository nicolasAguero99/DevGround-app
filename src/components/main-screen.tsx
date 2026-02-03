import { CHOSEN_MODE } from "../constants/constants";
import { useChosenMode, useIsFirstTime } from "../store/layout.store";
import ChooseModeScreen from "./choose-mode/choose-mode-screen";
import PlaygroundScreen from "./main-screen/playground-screen";
import SandboxScreen from "./main-screen/sandbox-screen";

export default function MainScreen() {
  const { isFirstTime } = useIsFirstTime();
  const { chosenMode } = useChosenMode();
  if (isFirstTime) return <ChooseModeScreen />
  if (chosenMode === CHOSEN_MODE.SANDBOX) return <SandboxScreen />
  else return <PlaygroundScreen />
}