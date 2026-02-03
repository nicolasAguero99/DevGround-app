import { AnimatePresence, motion, Variants } from "motion/react";
import { useEffect } from "react";
import { INSTANCE_ID, TECHNOLOGIES_EDITOR } from "../../constants/constants";
import CodeEditor from "../code-editor";
import Console from "../console-preview/console";
import { jsStateProps } from "../../types/types";
import { useOnlyJSEditorValue } from "../../store/editors.store";
import { useLayoutMainScreen } from "../../store/layout.store";
import { useMainScreen } from "../../context/main-screen.context";
import { generateSandboxDocument } from "../../utils/utils";
import LoaderScreen from "./loader-screen";

function SandboxPreview() {
  const { documentConsole } = useMainScreen();

  return (
    <iframe
      srcDoc={documentConsole}
      title="preview-js-only"
      className="hidden"
      sandbox="allow-scripts allow-same-origin"
      style={{ display: 'none' }}
    />
  );
}

export default function SandboxScreen() {
  const { onlyJSEditorValue, setOnlyJSEditorValue } = useOnlyJSEditorValue();
  const { layoutMainScreen } = useLayoutMainScreen();
  const { setDocumentConsole, setOutput } = useMainScreen();

  const jsState: jsStateProps = { value: onlyJSEditorValue, setValue: (value: string) => setOnlyJSEditorValue(value) };

  useEffect(() => {
    const isJsEmpty = onlyJSEditorValue.trim().length === 0;
    
    setOutput(INSTANCE_ID.JS_ONLY, [], isJsEmpty);
    generateSandboxDocument(onlyJSEditorValue, setDocumentConsole);
  }, [onlyJSEditorValue, setDocumentConsole, setOutput]);

  const variants = {
    initial: {
      x: 100,
      opacity: 0,
      filter: "blur(5px)"
    },
    animate: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: {
      x: -100,
      opacity: 0,
      filter: "blur(5px)",
      transition: { duration: 0.3, ease: "easeIn" }
    }
  } as Variants;

  if (!layoutMainScreen) return <div className="w-full gap-4 p-4 flex items-center justify-center text-red-500">
    <LoaderScreen />
  </div>

  return (
    <AnimatePresence mode="wait">
      <motion.div variants={variants} initial="initial" animate="animate" exit="exit" className='ml-[60px] flex-1 h-full layout-horizontal gap-4 p-4'>
        <CodeEditor technology={TECHNOLOGIES_EDITOR.JS} valueState={jsState} />
        <SandboxPreview />
        <Console instanceId={INSTANCE_ID.JS_ONLY} />
      </motion.div>
    </AnimatePresence>
  );
}