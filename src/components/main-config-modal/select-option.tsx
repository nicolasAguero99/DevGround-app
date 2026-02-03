import { useState } from "react";
import downArrowIcon from '../../assets/icons/down-arrow-icon.svg';

interface SelectOptionProps {
  item: {
    key: string;
    options: string[];
    type: "select";
  };
  currentValue: string;
  handleChange: (key: string, value: string | number | boolean) => void;
}

export default function SelectOption({ item, currentValue, handleChange }: SelectOptionProps) {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const formatedCurrentValue = (themeName: string) => {
    return themeName.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="w-full text-sm text-left bg-header-section-block border border-border-section-block rounded-md p-2 cursor-pointer flex justify-between items-center"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev: any) => ({ ...prev, [item.key]: !prev[item.key] }));
        }}
      >
        {currentValue as string}
        <span><img src={downArrowIcon} alt="down arrow" className="size-5" /></span>
      </button>
      <div
        className="fixed inset-0 z-40"
        style={{ display: (open && open[item.key]) ? "block" : "none" }}
        onClick={() => setOpen((prev: any) => ({ ...prev, [item.key]: false }))}
      />
      {(open && open[item.key]) && (
        <div className="absolute left-0 top-full mt-1 w-full bg-primary border border-secondary/10 rounded-md z-50 shadow-lg capitalize">
          {item.options?.map((op) => (
            <div
              key={op}
              onClick={() => {
                handleChange(item.key, op as string);
                setOpen((prev: any) => ({ ...prev, [item.key]: false }));
              }}
              className={`text-sm p-2 cursor-pointer hover:bg-secondary/10 ${op === currentValue ? "font-semibold bg-secondary/10" : ""}`}
            >
              {formatedCurrentValue(op)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}