import { CUSTOM_THEME } from "../../constants/constants";
import { ITEMS_THEME_CONFIG } from "../../constants/items-main-config";
import { useConfigEditors } from "../../store/editors.store";
import { getThemeHandler } from "../../constants/theme-settings-handlers";
import type { ThemeConfigItem } from "../../constants/config-types";
import EachThemeItemSettings from "./each-theme-item-settings";
import ItemsCustomThemeConfig from "./items-custom-theme-config";

export default function ItemsThemeConfig() {
  const { configEditors, setConfigEditors } = useConfigEditors();

  function getValue(item: ThemeConfigItem): string | boolean {
    const handler = getThemeHandler(item.key);
    if (handler) return handler.getValue(configEditors);
    return item.defaultValue;
  }

  function setValue(item: ThemeConfigItem, value: string | boolean): void {
    const handler = getThemeHandler(item.key);
    if (handler) handler.setValue(setConfigEditors, value);
  }

  function resetValue(item: ThemeConfigItem): void {
    setValue(item, item.defaultValue);
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {ITEMS_THEME_CONFIG.map((section) => (
        <div key={section.section} className="flex flex-col gap-4">
          <h4 className="text-xl font-semibold ps-2">{section.section}</h4>
          <div className="flex flex-col gap-6">
            {section.items.map((item) => (
              <EachThemeItemSettings
                key={item.key}
                item={item}
                currentValue={getValue(item)}
                onValueChange={(value: string | boolean) => setValue(item, value)}
                onReset={() => resetValue(item)}
              />
            ))}
          </div>
        </div>
      ))}
      {configEditors.theme === CUSTOM_THEME && (
        <>
          <h3 className="text-xl font-semibold border-y border-white/20 py-4 mt-1">
            Custom Theme
          </h3>
          <ItemsCustomThemeConfig />
        </>
      )}
    </div>
  );
}
