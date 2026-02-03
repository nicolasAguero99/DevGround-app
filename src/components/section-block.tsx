import { useState } from "react";
import { save } from '@tauri-apps/plugin-dialog';
import { writeTextFile } from '@tauri-apps/plugin-fs';
import { getCurrentWindow } from '@tauri-apps/api/window';
import copyIcon from '../assets/icons/copy-icon.svg';
import checkIcon from '../assets/icons/check-icon.svg';
import downloadIcon from '../assets/icons/download-icon.svg';
import { Tooltip } from "react-tooltip";

interface SectionBlockProps {
  title: string;
  value?: string | null;
  color?: string;
  icon?: string;
  children: React.ReactNode;
  ref?: React.RefObject<HTMLDivElement | null>;
}

export default function SectionBlock({ title, color, children, ref, icon, value = null }: SectionBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value || '');
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  }

  const handleDownloadFile = async () => {
    const fileExtension = title.toLowerCase();
    const defaultFileName = `${fileExtension}-file.${fileExtension}`;

    try {
      await getCurrentWindow().setFocus();
      const filePath = await save({
        defaultPath: defaultFileName,
        filters: [{ name: title, extensions: [fileExtension] }],
      });

      if (filePath) await writeTextFile(filePath, value || '');

    } catch (err) {
      console.error('Error al guardar archivo:', err);
      const blob = new Blob([value || ''], { type: `text/${fileExtension}` });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = defaultFileName;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <section ref={ref} id={`section-${title}`} className="bg-header-section-block w-full h-full min-h-0 flex flex-col relative overflow-hidden before:absolute border border-border-section-block rounded-2xl group">
      <div className="w-full h-fit shrink-0 flex justify-between items-center py-3 px-4 overflow-hidden rounded-t-2xl border-b border-border-section-block">
        <div className="flex items-center w-fit">
          {
            color
              ? <div className='size-1.5 rounded-full mr-2' style={{ backgroundColor: `var(${color})` }} />
              : <img src={icon} alt={title} className="size-4.5 mr-1" />
          }
          <span className="text-gray-400 text-sm select-none">{title}</span>
        </div>
        {
          value != null && (
            <div className="flex items-center gap-2 group-hover:opacity-100 opacity-0 -translate-y-10 group-hover:translate-y-0 transition-all duration-300 ease-out">
              <button className="cursor-pointer hover:scale-90 transition-all duration-300 ease-out disabled:opacity-30 disabled:cursor-not-allowed" data-tooltip-id={`tooltip-copy-${title}`} onClick={handleCopy} disabled={isCopied || value.trim() === ''}>
                {isCopied ? <img src={checkIcon} alt="Copied" className="size-5" /> : <img src={copyIcon} alt="Copy" className="size-5" />}
              </button>
              <button className="cursor-pointer hover:scale-90 transition-all duration-300 ease-out disabled:opacity-30 disabled:cursor-not-allowed" data-tooltip-id={`tooltip-export-as-file-${title}`} onClick={handleDownloadFile} disabled={value.trim() === ''}>
                <img src={downloadIcon} alt="Export as file" className="size-5" />
              </button>
              <Tooltip id={`tooltip-copy-${title}`} content={isCopied ? 'Copied' : 'Copy'} place="right" style={{
                backgroundColor: 'var(--color-secondary)',
                color: 'var(--color-primary)',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
              }} className="text-primary" delayShow={300} />
              <Tooltip id={`tooltip-export-as-file-${title}`} content="Export as file" place="right" style={{
                backgroundColor: 'var(--color-secondary)',
                color: 'var(--color-primary)',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
              }} className="text-primary" delayShow={300} />
            </div>
          )}
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        {children}
      </div>
    </section>
  );
}