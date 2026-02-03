
import { CHOSEN_MODE, LAYOUT_OPTIONS } from '../../constants/constants';
import { Tooltip } from 'react-tooltip';
import { useChosenMode, useLayoutMainScreen } from '../../store/layout.store';
import { LayoutOption } from '../../types/types';
import consoleIcon from '../../assets/icons/output-icon.svg';
import previewIcon from '../../assets/icons/code-icon.svg';
import { motion, AnimatePresence } from 'motion/react';

export default function ButtonsLayout() {
  const { layoutMainScreen, setLayoutMainScreen } = useLayoutMainScreen();
  const { chosenMode, setChosenMode } = useChosenMode();
  const handleChangeLayout = (layout: LayoutOption) => {
    setLayoutMainScreen(layout);
  }
  if (layoutMainScreen === '') return null;

  return (
    <motion.div layout className="flex flex-col items-center gap-3">
      <AnimatePresence>
        {chosenMode === CHOSEN_MODE.PLAYGROUND && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, height: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, height: 'auto', filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, height: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.2, ease: 'easeIn' }}
            className="flex flex-col items-center gap-1 p-0.5 bg-secondary/10 rounded-xl border border-border-section-block/50"
          >
            {
              LAYOUT_OPTIONS.map((option) => (
                <div key={option.slug}>
                  <button
                    id={`id-${option.slug}`}
                    data-tooltip-id={`tooltip-${option.slug}`}
                    onClick={() => handleChangeLayout(option)}
                    className={`size-8 cursor-pointer p-1.5 m-0 rounded-lg flex items-center justify-center select-none transition-all duration-200
                      ${option.slug === layoutMainScreen.slug
                        ? 'bg-tertiary shadow-sm'
                        : 'hover:bg-secondary/20'
                      }`}
                  >
                    <img src={option.icon} alt={option.label} className="w-5 h-5" />
                  </button>
                  <Tooltip
                    id={`tooltip-${option.slug}`}
                    content={option.label}
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
              ))
            }
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div layout className={`${chosenMode === CHOSEN_MODE.PLAYGROUND ? 'w-6 h-px bg-border-section-block' : 'h-0 absolute'} transition-all duration-300 ease-in-out`}></motion.div>

      <motion.div
        layout
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-1 p-0.5 bg-secondary/10 rounded-xl border border-border-section-block/50"
      >
        <button
          data-tooltip-id="tooltip-go-to-playground"
          onClick={() => setChosenMode(CHOSEN_MODE.PLAYGROUND)}
          className={`size-8 cursor-pointer p-1.5 m-0 rounded-lg flex items-center justify-center select-none transition-all duration-200
            ${chosenMode === CHOSEN_MODE.PLAYGROUND
              ? 'bg-tertiary shadow-sm'
              : 'hover:bg-secondary/20'
            }`}
        >
          <img src={previewIcon} alt="go to playground" className="w-5 h-5" />
        </button>
        <Tooltip
          id="tooltip-go-to-playground"
          content="Playground"
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
        <button
          data-tooltip-id="tooltip-go-to-sandbox"
          onClick={() => setChosenMode(CHOSEN_MODE.SANDBOX)}
          className={`size-8 cursor-pointer p-1.5 m-0 rounded-lg flex items-center justify-center select-none transition-all duration-200
            ${chosenMode === CHOSEN_MODE.SANDBOX
              ? 'bg-tertiary shadow-sm'
              : 'hover:bg-secondary/20'
            }`}
        >
          <img src={consoleIcon} alt="go to sandbox" className="w-5 h-5" />
        </button>
        <Tooltip
          id="tooltip-go-to-sandbox"
          content="Sandbox"
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
      </motion.div>
    </motion.div>
  );
}