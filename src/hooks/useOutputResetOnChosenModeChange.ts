import { useEffect, useRef } from "react";
import { CHOSEN_MODE, INSTANCE_ID } from "../constants/constants";
import type { ChosenMode } from "../types/types";
import type { ConsoleOutput } from "../types/types";

type SetOutputFn = (
  instanceId: string,
  updater: React.SetStateAction<ConsoleOutput[]>,
  forceClear?: boolean
) => void;

export function useOutputResetOnChosenModeChange(
  chosenMode: ChosenMode | undefined,
  setOutput: SetOutputFn
) {
  const previousChosenModeRef = useRef<ChosenMode | undefined>(undefined);

  useEffect(() => {
    if (
      previousChosenModeRef.current !== chosenMode &&
      previousChosenModeRef.current !== undefined
    ) {
      if (previousChosenModeRef.current === CHOSEN_MODE.PLAYGROUND) {
        setOutput(INSTANCE_ID.FULL, [], true);
      } else {
        setOutput(INSTANCE_ID.JS_ONLY, [], true);
      }
      previousChosenModeRef.current = chosenMode;
    } else if (previousChosenModeRef.current === undefined) {
      previousChosenModeRef.current = chosenMode;
    }
  }, [chosenMode, setOutput]);
}
