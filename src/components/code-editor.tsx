import { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { useConfigEditors, useDebounceDelay } from "../store/editors.store";
import { handleBeforeMount, handleOnMount } from "../utils/logic-editor";
import { EditorTechnologiesValuesState, TechnologyType } from "../types/types";
import { COLOR_TECHNOLOGIES, TECHNOLOGIES_EDITOR } from "../constants/constants";
import { useMainScreen } from "../context/main-screen.context";
import SectionBlock from "./section-block";
import { debounce } from "../utils/utils";

interface CodeEditorProps {
  technology: TechnologyType
  valueState: EditorTechnologiesValuesState
}

export default function CodeEditor({ technology, valueState }: CodeEditorProps) {
  const { editorRefs, setCurrentFocusedEditor } = useMainScreen();
  const { configEditors, setConfigEditors } = useConfigEditors();
  const { debounceDelay } = useDebounceDelay();
  const { value, setValue } = valueState
  const debouncedSetValueRef = useRef<((value: string) => void) | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const windowResizeHandlerRef = useRef<(() => void) | null>(null);
  const technologyNameShort = Object.entries(TECHNOLOGIES_EDITOR).find(([, value]) => value === technology)?.[0];
  const technologyColor = COLOR_TECHNOLOGIES[technologyNameShort as keyof typeof COLOR_TECHNOLOGIES];

  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    debouncedSetValueRef.current = debounce((v: string) => {
      setValue(v);
    }, debounceDelay);
  }, [debounceDelay, setValue]);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  return (
    <SectionBlock ref={containerRef} title={technologyNameShort || ''} color={technologyColor} value={displayValue}>
      <div className="w-full h-full overflow-hidden rounded-b-2xl">
        <Editor
          language={technology}
          value={displayValue}
          onChange={(newValue) => {
            setDisplayValue(newValue ?? "");
            debouncedSetValueRef.current?.(newValue ?? "");
          }}
          beforeMount={(monaco) => handleBeforeMount(monaco, technology)}
          onMount={(editor, monaco: any) => handleOnMount(editor, monaco, containerRef.current, windowResizeHandlerRef, resizeObserverRef, configEditors, setConfigEditors, editorRefs, technology, setCurrentFocusedEditor)}
          height={configEditors.height}
          width={configEditors.width}
          theme={configEditors.theme}
          options={configEditors.options}
          className="overflow-hidden"
        />
      </div>
    </SectionBlock>
  );
}