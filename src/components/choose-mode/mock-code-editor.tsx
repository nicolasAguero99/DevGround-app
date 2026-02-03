import { TechnologyType } from "../../types/types";
import SectionBlock from "../section-block";

export default function MockCodeEditor({ technology }: { technology: TechnologyType }) {
  return (
    <SectionBlock title={technology} color="var(--color-primary)">
      <div className="w-full h-full overflow-hidden rounded-b-2xl">
      </div>
    </SectionBlock>
  );
}