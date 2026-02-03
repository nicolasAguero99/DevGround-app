import type { SettingsConfigItem } from "../../constants/config-types";
import SelectOption from "./select-option";
import SwitchToggle from "./switch-toggle";
import reloadIcon from "../../assets/icons/reload-icon.svg";

interface EachItemSettingsProps {
  item: SettingsConfigItem;
  currentValue: string | number | boolean;
  onValueChange: (value: string | number | boolean) => void;
  onReset: () => void;
}

export default function EachItemSettings({
  item,
  currentValue,
  onValueChange,
  onReset,
}: EachItemSettingsProps) {
  return (
    <div className="flex flex-col gap-2 py-2 px-4 rounded-lg mb-4 pb-4">
      <div className="flex items-center justify-between">
        <label className="text-sm">{item.label}</label>
        <button
          className="relative text-sm text-secondary/50 cursor-pointer right-2"
          title="Reset"
          onClick={onReset}
        >
          <img src={reloadIcon} alt="reset" className="size-4.5" />
        </button>
      </div>
      <div className="flex items-center gap-4">
        {item.type === "number" && (
          <div className="relative w-full text-sm">
            <input
              className="w-full text-sm bg-header-section-block border border-border-section-block rounded-md p-2 custom-number-input"
              type="number"
              value={currentValue as number}
              min={item.min}
              max={item.max}
              step={item?.step || 1}
              onChange={(e) => onValueChange(Number(e.target.value))}
            />
            {item.typeValue && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-secondary/50">
                {item.typeValue}
              </span>
            )}
          </div>
        )}

        {item.type === "text" && (
          <input
            className="w-full text-sm bg-header-section-block border border-border-section-block rounded-md p-2"
            type="text"
            value={currentValue as string}
            onChange={(e) => onValueChange(e.target.value)}
          />
        )}

        {item.type === "select" && (
          <SelectOption
            item={{
              key: item.key,
              options: item.options ?? [],
              type: "select",
            }}
            currentValue={currentValue as string}
            handleChange={(_key, value) => onValueChange(value)}
          />
        )}
        {item.type === "toggle" && !item.options?.includes("on") && (
          <input
            className="w-full text-sm bg-header-section-block border border-border-section-block rounded-md p-2 cursor-pointer"
            type="checkbox"
            checked={currentValue as boolean}
            onChange={(e) => onValueChange(e.target.checked)}
          />
        )}
        {item.type === "toggle" && item.options?.includes('on') && (
          <SwitchToggle checked={currentValue === 'on' ? true : false} onChange={(e) => onValueChange(e.target.checked)} />
        )}
      </div>
      {item.min != null && item.max != null && (
        <small className="text-xs text-secondary/50 ms-1">{`Range: ${item.min} - ${item.max}${item.step ? ` (Step: ${item.step})` : ""}`}</small>
      )}
    </div>
  );
}
