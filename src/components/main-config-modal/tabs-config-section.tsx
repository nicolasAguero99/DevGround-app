import { TABS_CONFIG } from "../../constants/constants";
import { ActiveTab } from "../../types/types";

interface TabsConfigSectionProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function TabsConfigSection({ activeTab, setActiveTab }: TabsConfigSectionProps) {
  return (
    <div className="w-full h-fit flex items-center justify-center mt-2 p-4">
      <div className="flex items-center bg-border-section-block rounded-full">
        {TABS_CONFIG.map((tab) => (
          <button key={tab.value} className={`text-sm px-4 py-1 rounded-full cursor-pointer ${activeTab === tab.value ? 'bg-secondary text-black' : ''}`} onClick={() => setActiveTab(tab.value)}>{tab.label}</button>
        ))}
      </div>
    </div>
  );
}