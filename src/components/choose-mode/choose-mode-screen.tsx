import { useChosenMode, useIsFirstTime } from "../../store/layout.store";
import { ChosenMode } from "../../types/types";
import PlaygroundOptionPreview from "./playground-option-preview";
import SandboxOptionPreview from "./sandbox-option-preview";

export default function ChooseModeScreen() {
  const { setChosenMode } = useChosenMode()
  const { setIsFirstTime } = useIsFirstTime()

  const handleChooseOptionMode = (mode: ChosenMode) => {
    setChosenMode(mode)
    setIsFirstTime(false)
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 custom-hover-choose-option divide-x divide-secondary">
      <PlaygroundOptionPreview handleChooseOptionMode={handleChooseOptionMode} />
      <SandboxOptionPreview handleChooseOptionMode={handleChooseOptionMode} />
    </div>
  );
}