interface TextResultProps {
  value?: string;
  children?: React.ReactNode;
  colorClass: string;
  className?: string;
}

export default function TextResult({ value, children, colorClass, className = '' }: TextResultProps) {
  return (
    <span style={{ wordBreak: 'break-all' }} className={`w-full ${className} ${colorClass}`}>{value || children}</span>
  );
}