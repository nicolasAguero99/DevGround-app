import { CHOSEN_MODE, TECHNOLOGIES_EDITOR } from "../../constants/constants";
import SectionBlock from "../section-block";
import MockCodeEditor from "./mock-code-editor";
import previewIcon from '../../assets/icons/code-icon.svg';
import consoleIcon from '../../assets/icons/output-icon.svg';
import { ChosenMode } from "../../types/types";

export default function PlaygroundOptionPreview( { handleChooseOptionMode }: { handleChooseOptionMode: (mode: ChosenMode) => void } ) {
  return (
    <div onClick={() => handleChooseOptionMode(CHOSEN_MODE.PLAYGROUND)} className="relative min-w-[300px] flex w-full h-full overflow-hidden cursor-pointer bg-background-screen custom-shadow-choose-option">
      <div className="absolute w-full h-full text-center flex flex-col justify-center items-center gap-2 p-4 z-10 bg-black/70 hover:bg-black/30 transition-all duration-500 ease-out group">
        <h1 className="font-bold text-4xl text-white group-hover:scale-120 group-hover:translate-y-5 transition-all duration-1000 ease-out">Playground</h1>
        <p className="text-white/50 mb-8 group-hover:opacity-0 transition-all duration-1000 ease-out">Html, css & javascript</p>
      </div>
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className={`min-w-[1000px] h-full layout-two-two gap-4 p-4 overflow-hidden`}>
          {
            Object.values(TECHNOLOGIES_EDITOR).map((technology) => {
              switch (technology) {
                case TECHNOLOGIES_EDITOR.HTML:
                  return <MockCodeEditor key={technology} technology={technology} />
                case TECHNOLOGIES_EDITOR.CSS:
                  return <MockCodeEditor key={technology} technology={technology} />
                case TECHNOLOGIES_EDITOR.JS:
                  return <MockCodeEditor key={technology} technology={technology} />
              }
            })
          }
          <SectionBlock title="Preview" icon={previewIcon}>
            <div className="w-full h-full overflow-hidden"></div>
          </SectionBlock>
          <SectionBlock title="Console" icon={consoleIcon}>
            <div className="w-full h-full overflow-hidden"></div>
          </SectionBlock>
        </div>
      </div>
    </div>
  );
}