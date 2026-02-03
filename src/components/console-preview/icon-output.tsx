import logIcon from '../../assets/icons/log-icon.svg';
import infoIcon from '../../assets/icons/info-icon.svg';
import errorIcon from '../../assets/icons/error-icon.svg';
import warnIcon from '../../assets/icons/warn-icon.svg';
import timeIcon from '../../assets/icons/time-icon.svg';

export default function IconOutput({ type }: { type: string }) {
  const icon = {
    log: logIcon,
    error: errorIcon,
    warn: warnIcon,
    info: infoIcon,
    time: timeIcon,
  }[type];

  return <img src={icon} alt="icon" className="size-4 mt-1" />;
}