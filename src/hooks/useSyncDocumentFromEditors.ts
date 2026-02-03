import { useEffect } from "react";
import { generateDocument } from "../utils/utils";
import { INSTANCE_ID, TECHNOLOGIES_EDITOR } from "../constants/constants";
import type { EditorTechnologiesValuesSaved } from "../types/types";
import type { ConsoleOutput } from "../types/types";

type SetOutputFn = (
  instanceId: string,
  updater: React.SetStateAction<ConsoleOutput[]>,
  forceClear?: boolean
) => void;

export function useSyncDocumentFromEditors(
  editorTechnologiesValues: EditorTechnologiesValuesSaved,
  setOutput: SetOutputFn,
  setDocument: React.Dispatch<React.SetStateAction<string>>
) {
  useEffect(() => {
    const jsCode = editorTechnologiesValues[TECHNOLOGIES_EDITOR.JS] || "";
    const isJsEmpty = jsCode.trim().length === 0;

    setOutput(INSTANCE_ID.FULL, [], isJsEmpty);
    generateDocument(editorTechnologiesValues, setDocument);
  }, [editorTechnologiesValues, setOutput, setDocument]);
}
