import { useEffect, useRef } from "react";
import { INSTANCE_ID } from "../constants/constants";
import type { ConsoleOutput, LayoutOption } from "../types/types";

type SetOutputFn = (
  instanceId: string,
  updater: React.SetStateAction<ConsoleOutput[]>,
  forceClear?: boolean
) => void;

export function useOutputResetOnLayoutChange(
  layoutMainScreen: LayoutOption,
  setOutput: SetOutputFn
) {
  const previousLayoutRef = useRef<LayoutOption>(layoutMainScreen);

  useEffect(() => {
    const hasLayout = layoutMainScreen !== "";
    const layoutChanged = previousLayoutRef.current !== layoutMainScreen;
    if (hasLayout && layoutChanged) {
      setOutput(INSTANCE_ID.FULL, [], true);
      previousLayoutRef.current = layoutMainScreen;
    }
  }, [layoutMainScreen, setOutput]);
}
