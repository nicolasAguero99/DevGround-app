import logo from '../../assets/devground-logo.svg';
import logoText from '../../assets/devground-logo-text.svg';

export default function LoaderScreen() {
  return (
    <div className="flex items-center justify-center gap-2 animate-pulse [animation-duration:1.5s]">
      <img src={logo} alt="devground logo icon" className="w-2/22" />
      <img src={logoText} alt="devground logo" className="w-1/4" />
    </div>
  )
}