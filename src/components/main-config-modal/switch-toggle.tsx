interface SwitchToggleProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SwitchToggle({ checked, onChange }: SwitchToggleProps) {
  const handleChange = (value: boolean) => {
    onChange({ target: { checked: value } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleChange(!checked);
  };

  return (
    <div 
      onClick={handleClick} 
      className={`relative flex items-center rounded-full cursor-pointer w-10 h-5 ${checked ? 'bg-white/10' : 'bg-header-section-block'}`}
    >
      <div 
        className="absolute top-0 w-1/2 h-full bg-secondary rounded-full transition-all duration-200" 
        style={{ left: checked ? '50%' : '0%' }}
      ></div>
    </div>
  );
}