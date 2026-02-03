import { describe, it, expect } from "vitest";
import {
  configEditorsStore,
  editorTechnologiesValuesStore,
} from "./editors.store";
import { TECHNOLOGIES_EDITOR } from "../constants/constants";

describe("editors store", () => {
  it("setEditorTechnologiesValues updates html, css and javascript in the store", () => {
    const values = {
      [TECHNOLOGIES_EDITOR.HTML]: "<div>Hi</div>",
      [TECHNOLOGIES_EDITOR.CSS]: "div { color: red; }",
      [TECHNOLOGIES_EDITOR.JS]: "console.log(1);",
    };

    editorTechnologiesValuesStore.getState().setEditorTechnologiesValues(values);

    expect(editorTechnologiesValuesStore.getState().editorTechnologiesValues).toEqual(values);
  });

  it("setConfigEditors accepts updater function", () => {
    configEditorsStore.getState().setConfigEditors((prev) => ({
      ...prev,
      theme: "hc-black",
    }));

    expect(configEditorsStore.getState().configEditors.theme).toBe("hc-black");
  });
});
