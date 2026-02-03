import { Editor } from "@monaco-editor/react";
import { useConfigEditors } from "../../store/editors.store";
import { TECHNOLOGIES_EDITOR } from "../../constants/constants";
import { INITIAL_CODE_CONFIG_EDITOR_PREVIEW } from "../../constants/initial-code";

export default function EditorPreviewConfig() {
  const { configEditors } = useConfigEditors();

  return (
    <div className="w-full flex gap-4 pb-6 sticky top-0" style={{ maxHeight: 'calc(90vh - 2rem)' }}>
      <div className="w-full h-full overflow-hidden border-2 border-border-section-block rounded-lg">
        <Editor
          language={TECHNOLOGIES_EDITOR.HTML}
          value={INITIAL_CODE_CONFIG_EDITOR_PREVIEW}
          // height="600px"
          width={configEditors.width}
          theme={configEditors.theme}
          options={configEditors.options}
          className="overflow-hidden h-full"
        />
      </div>
    </div>
  );
}