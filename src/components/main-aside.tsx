import settingsIcon from '../assets/icons/setting-icon.svg'
import bugIcon from '../assets/icons/bug-icon.svg'
import { useMainScreen } from '../context/main-screen.context';
import ButtonsLayout from './main-aside/buttons-layout';
import { Tooltip } from 'react-tooltip';
import { REPORT_BUG_URL } from '../constants/constants';

export default function MainAside() {
  const { setIsMainConfigModalOpen } = useMainScreen();

  const handleOpenMainConfigModal = () => {
    setIsMainConfigModalOpen(true);
  }

  return (
    <aside className="fixed left-0 top-0 w-[60px] h-full flex flex-col items-center justify-between gap-2 py-4 bg-primary border-r border-border-section-block z-10">
      <div className="flex flex-col items-center justify-center gap-2">
        <ButtonsLayout />
      </div>
      <div className="flex flex-col gap-2 items-center justify-center">
        <a href={REPORT_BUG_URL} target="_blank" rel="noopener noreferrer" data-tooltip-id="tooltip-open-bug" className="size-8 cursor-pointer p-1 rounded-full flex items-center justify-center select-none  hover:bg-secondary/20 hover:rotate-360 transition-all duration-300 ease-out">
          <img src={bugIcon} alt="report a bug" />
        </a>
        <Tooltip
          id="tooltip-open-bug"
          content="Report a bug"
          place="right"
          style={{
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-primary)',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '600',
          }}
          className="text-primary"
          delayShow={300}
        />
        <button data-tooltip-id="tooltip-open-settings" className="size-8 cursor-pointer p-1 rounded-full flex items-center justify-center select-none  hover:bg-secondary/20 hover:rotate-360 transition-all duration-300 ease-out">
          <img src={settingsIcon} alt="open settings" onClick={handleOpenMainConfigModal} />
        </button>
        <Tooltip
          id="tooltip-open-settings"
          content="Settings"
          place="right"
          style={{
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-primary)',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '600',
          }}
          className="text-primary"
          delayShow={300}
        />
      </div>
    </aside>
  );
}