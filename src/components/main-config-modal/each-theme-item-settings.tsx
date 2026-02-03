import type { ThemeConfigItem } from "../../constants/config-types";
import SelectOption from "./select-option";
import reloadIcon from "../../assets/icons/reload-icon.svg";

interface EachThemeItemSettingsProps {
  item: ThemeConfigItem;
  currentValue: string | boolean;
  onValueChange: (value: string | boolean) => void;
  onReset: () => void;
}

export default function EachThemeItemSettings({
  item,
  currentValue,
  onValueChange,
  onReset,
}: EachThemeItemSettingsProps) {
  return (
    <div className="flex flex-col gap-2 w-full py-2 px-4 rounded-lg">
      <div className="flex items-center justify-between">
        <label className="text-sm">{item.label}</label>
        <button
          className="relative text-sm text-secondary/50 cursor-pointer hover:bg-secondary/10 transition-all duration-300 ease-out rounded-full p-1 right-1"
          onClick={onReset}
          title="Reset"
        >
          <img src={reloadIcon} alt="reset" className="size-4.5" />
        </button>
      </div>
      <div className="flex items-center gap-4">
        {item.type === "select" && (
          <SelectOption
            item={{
              key: item.key,
              options: item.options ?? [],
              type: "select",
            }}
            currentValue={currentValue as string}
            handleChange={(_key, value) => onValueChange(value as string)}
          />
        )}
        {item.type === "boolean" && (
          <input
            className="w-full bg-transparent border border-secondary/10 rounded-md p-2 cursor-pointer"
            type="checkbox"
            checked={currentValue as boolean}
            onChange={(e) => onValueChange(e.target.checked)}
          />
        )}
      </div>
    </div>
  );
}
