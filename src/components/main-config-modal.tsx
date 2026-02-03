import { AnimatePresence, motion } from "motion/react"
import { useMainScreen } from "../context/main-screen.context";
import ItemsListConfig from "./main-config-modal/items-list-config";
import EditorPreviewConfig from "./main-config-modal/editor-preview-config";
import TabsConfigSection from "./main-config-modal/tabs-config-section";
import { useState } from "react";
import { ActiveTab } from "../types/types";

export default function MainConfigModal() {
  const { isMainConfigModalOpen, setIsMainConfigModalOpen } = useMainScreen();
  const [activeTab, setActiveTab] = useState<ActiveTab>('settings');

  const handleCloseMainConfigModal = () => {
    setIsMainConfigModalOpen(false);
  }

  // if (!isMainConfigModalOpen) return null;

  return (
    <>
      <AnimatePresence>
        {isMainConfigModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 z-40 bg-black/60 cursor-pointer" onClick={handleCloseMainConfigModal}
            />
            <motion.section
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-x-0 bottom-0 z-50 bg-header-section-block border border-secondary/10 size-[80%] h-[90%] m-auto rounded-t-lg"
            >
              <div className="flex flex-col items-end w-full h-full">
                <div className="flex items-center justify-between w-full h-fit border-b border-border-section-block p-4">
                  <h2>Editor Settings</h2>
                  <button className="text-sm cursor-pointer bg-secondary text-primary border border-transparent hover:border-secondary hover:text-secondary hover:bg-transparent transition-all duration-300 ease-out rounded-md py-1 px-3" onClick={handleCloseMainConfigModal}>
                    Save
                  </button>
                </div>
                <TabsConfigSection activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="flex max-[750px]:flex-col justify-between gap-16 w-full overflow-y-auto p-4">
                  <ItemsListConfig activeTab={activeTab} />
                  <EditorPreviewConfig />
                </div>
              </div>
            </motion.section>
          </>
        )}
      </AnimatePresence>
    </>
  );
}