import { useMainScreen } from "../../context/main-screen.context";
import SectionBlock from "../section-block";
import ConsoleResults from "./console-results";
import outputIcon from '../../assets/icons/output-icon.svg';
import IconOutput from "./icon-output";
import { INSTANCE_ID } from "../../constants/constants";

interface ConsoleProps {
  instanceId?: typeof INSTANCE_ID[keyof typeof INSTANCE_ID];
}

export default function Console({ instanceId = INSTANCE_ID.FULL }: ConsoleProps) {
  const { output } = useMainScreen();
  const instanceOutput = output[instanceId] || [];

  return (
    <SectionBlock title="Console" icon={outputIcon}>
      <div className="w-full h-full overflow-x-hidden bg-[#101013] p-2">
        {instanceOutput.length === 0 ? (
          <div className="flex flex-col gap-2 items-center justify-center h-full opacity-40">
            <img src={outputIcon} alt="output" className="size-8" />
            <div className="flex flex-col gap-1 text-center">
              <span className="text-sm">Console is empty</span>
              <span className="text-xs">Logs will appear here</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {instanceOutput.map((entry, i) => {
              const type = entry.type
              const isError = type === 'error';
              const textColor = isError ? 'text-red-400' : 'text-green-400';
              return (
                <div key={i} className={`bg-border-section-block/20 flex gap-2 items-start ${textColor} px-2 py-4 rounded-md shadow shadow-border-section-block/70`} style={{ borderLeft: `4px solid var(--${type})`}}>
                  <small className="text-gray-500 text-xs w-4 mt-0.5 text-end">{i}</small>
                  <div className="flex gap-2 w-full">
                    <IconOutput type={type} />
                    {entry.msg.map((item: any, idx: number) => (
                      <ConsoleResults key={idx} item={item} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </SectionBlock>
  );
}