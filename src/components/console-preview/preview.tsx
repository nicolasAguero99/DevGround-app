import { useMainScreen } from "../../context/main-screen.context";
import SectionBlock from "../section-block";
import previewIcon from '../../assets/icons/code-icon.svg';

export default function Preview() {
  const { document } = useMainScreen();

  return (
    <SectionBlock title="Preview" icon={previewIcon}>
      <div className="w-full h-full overflow-hidden">
        <iframe
          srcDoc={document}
          title="preview"
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </SectionBlock>
  );
}