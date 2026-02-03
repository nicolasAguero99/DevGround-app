import { AnimatePresence, motion, Variants } from "motion/react";
import { TECHNOLOGIES_EDITOR } from "../../constants/constants";
import CodeEditor from "../code-editor";
import Preview from "../console-preview/preview";
import Console from "../console-preview/console";
import { cssStateProps, htmlStateProps, jsStateProps } from "../../types/types";
import { useEditorTechnologiesValues } from "../../store/editors.store";
import { useLayoutMainScreen } from "../../store/layout.store";
import LoaderScreen from "./loader-screen";

export default function PlaygroundScreen() {
  const { editorTechnologiesValues, setEditorTechnologiesValues } = useEditorTechnologiesValues();
  const { layoutMainScreen } = useLayoutMainScreen();

  const htmlState: htmlStateProps = { value: editorTechnologiesValues.html, setValue: (value: string) => setEditorTechnologiesValues({ ...editorTechnologiesValues, [TECHNOLOGIES_EDITOR.HTML]: value }) };

  const cssState: cssStateProps = { value: editorTechnologiesValues.css, setValue: (value: string) => setEditorTechnologiesValues({ ...editorTechnologiesValues, [TECHNOLOGIES_EDITOR.CSS]: value }) };

  const jsState: jsStateProps = { value: editorTechnologiesValues.javascript, setValue: (value: string) => setEditorTechnologiesValues({ ...editorTechnologiesValues, [TECHNOLOGIES_EDITOR.JS]: value }) };

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

  if (!layoutMainScreen) return <div className="w-full gap-4 p-4 flex items-center justify-center">
    <LoaderScreen />
  </div>

  return (
    <AnimatePresence mode="wait">
      <motion.div variants={variants} initial="initial" animate="animate" exit="exit" key={layoutMainScreen?.slug} className={`ml-[60px] flex-1 h-full ${layoutMainScreen?.slug} ${layoutMainScreen?.slug === 'layout-horizontal' ? 'min-w-fit overflow-x-auto' : 'w-full overflow-hidden'} expanded gap-4 p-4`}>
        {
          Object.values(TECHNOLOGIES_EDITOR).map((technology) => {
            switch (technology) {
              case TECHNOLOGIES_EDITOR.HTML:
                return <CodeEditor key={technology} technology={technology} valueState={htmlState} />
              case TECHNOLOGIES_EDITOR.CSS:
                return <CodeEditor key={technology} technology={technology} valueState={cssState} />
              case TECHNOLOGIES_EDITOR.JS:
                return <CodeEditor key={technology} technology={technology} valueState={jsState} />
            }
          })
        }
        <Preview />
        <Console instanceId="full" />
      </motion.div>
    </AnimatePresence>
  );
}