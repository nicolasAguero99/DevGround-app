import { useEffect } from "react";
import { ITEMS_CUSTOM_THEMES_CONFIG } from "../../constants/items-main-config";
import { useMonaco } from "@monaco-editor/react";
import { useConfigEditors } from "../../store/editors.store";
import { useCustomThemeValues } from "../../store/themes.store";
import { handleUpdateCustomTheme } from "../../utils/utils";
import { Tooltip } from "react-tooltip";

export default function ItemsCustomThemeConfig() {
  const monaco = useMonaco();
  const { configEditors } = useConfigEditors();
  const { customThemeValues, setCustomThemeValues } = useCustomThemeValues();

  useEffect(() => {
    if (!monaco) return;
    handleUpdateCustomTheme({ monaco, customThemeValues, configEditors });
  }, [monaco, customThemeValues, configEditors.theme]);

  const handleChange = (key: string, value: string, isInputText: boolean = false) => {
    if (isInputText) {
      const noHash = value.replace(/#/g, "");
      const soloHex = noHash.replace(/[^0-9a-fA-F]/g, "").slice(0, 8);
      setCustomThemeValues({
        ...customThemeValues,
        [key]: soloHex ? "#" + soloHex : "#"
      });
      return;
    }

    setCustomThemeValues({
      ...customThemeValues,
      [key]: value
    });
  };

  const getDisplayValue = (key: string, defaultValue: string): string => {
    const v = customThemeValues[key] ?? defaultValue;
    return (v || "").replace(/^#/, "");
  };

  const getColorPickerValue = (key: string, defaultValue: string): string => {
    const v = customThemeValues[key] ?? defaultValue;
    const hex = (v || "").trim().replace(/^#/, "");
    if (/^[0-9a-fA-F]{6}$/.test(hex)) return v.startsWith("#") ? v : "#" + v;
    if (/^[0-9a-fA-F]{8}$/.test(hex)) return "#" + hex.slice(0, 6);
    if (/^[0-9a-fA-F]{3}$/.test(hex)) return "#" + hex.split("").map((c) => c + c).join("");
    return defaultValue;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
      {
        ITEMS_CUSTOM_THEMES_CONFIG.map((section) => (
          <div key={section.section} className="flex flex-col gap-4">
            <Tooltip id={section.section} content={section.section} place="top" className="text-primary" />
            <h4 className="text-lg truncate" data-tooltip-id={section.section}>{section.section}</h4>
            <div className="flex flex-col gap-2 mb-10">
              {section.items.map((item) => (
                <div key={item.key} className="flex flex-col gap-2 py-2 px-4 rounded-lg">
                  <label className="text-sm">{item.label}</label>
                  <div className="flex items-center gap-2 h-10">

                    <input
                      className="w-12 h-full border border-white/10 rounded-md cursor-pointer"
                      type="color"
                      value={getColorPickerValue(item.key, item.defaultValue)}
                      onChange={(e) => handleChange(item.key, e.target.value)}
                    />
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">#</span>
                      <input
                        className="w-full text-sm bg-transparent border border-white/10 rounded-full py-2 px-4 outline-0 shadow-none pl-7"
                        type="text"
                        maxLength={8}
                        placeholder="hex sin #"
                        value={getDisplayValue(item.key, item.defaultValue)}
                        onChange={(e) => handleChange(item.key, e.target.value, true)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      }
    </div>
  );
}