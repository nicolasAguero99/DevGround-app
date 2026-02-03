import { describe, it, expect, beforeEach } from "vitest";
import { layoutMainScreenStore, chosenModeStore } from "./layout.store";
import { LAYOUT_OPTIONS, CHOSEN_MODE } from "../constants/constants";

describe("layout store", () => {
  beforeEach(() => {
    document.documentElement.style.setProperty("--overflow-x-by-layout", "");
    document.documentElement.style.setProperty("--overflow-y-by-layout", "");
  });

  it("setLayoutMainScreen updates state and CSS vars according to layout", () => {
    const horizontal = LAYOUT_OPTIONS.find((l) => l.slug === "layout-horizontal")!;
    layoutMainScreenStore.getState().setLayoutMainScreen(horizontal);

    expect(layoutMainScreenStore.getState().layoutMainScreen).toEqual(horizontal);
    expect(document.documentElement.style.getPropertyValue("--overflow-x-by-layout")).toBe("auto");
    expect(document.documentElement.style.getPropertyValue("--overflow-y-by-layout")).toBe("hidden");
  });

  it("setLayoutMainScreen with vertical layout sets overflow-y auto", () => {
    const vertical = LAYOUT_OPTIONS.find((l) => l.slug === "layout-vertical")!;
    layoutMainScreenStore.getState().setLayoutMainScreen(vertical);

    expect(document.documentElement.style.getPropertyValue("--overflow-x-by-layout")).toBe("hidden");
    expect(document.documentElement.style.getPropertyValue("--overflow-y-by-layout")).toBe("auto");
  });

  it("setChosenMode updates chosenMode in the store", () => {
    chosenModeStore.getState().setChosenMode(CHOSEN_MODE.SANDBOX);
    expect(chosenModeStore.getState().chosenMode).toBe(CHOSEN_MODE.SANDBOX);

    chosenModeStore.getState().setChosenMode(CHOSEN_MODE.PLAYGROUND);
    expect(chosenModeStore.getState().chosenMode).toBe(CHOSEN_MODE.PLAYGROUND);
  });
});
