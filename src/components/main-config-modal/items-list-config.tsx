import { SETTINGS_CONFIG } from "../../constants/items-main-config";
import { ActiveTab } from "../../types/types";
import { useSettingsHandlers } from "../../hooks/useSettingsHandlers";
import EachItemSettings from "./each-item-settings";
import ItemsThemeConfig from "./items-theme-config";

export default function ItemsListConfig({ activeTab }: { activeTab: ActiveTab }) {
  const { getValue, setValue, resetValue } = useSettingsHandlers();

  return (
    <div className="flex flex-col w-full h-fit mb-4">
      {activeTab === "settings" &&
        SETTINGS_CONFIG.map((item) => (
          <EachItemSettings
            key={item.key}
            item={item}
            currentValue={getValue(item)}
            onValueChange={(value) => setValue(item, value)}
            onReset={() => resetValue(item)}
          />
        ))}
      {activeTab === "themes" && <ItemsThemeConfig />}
    </div>
  );
}
