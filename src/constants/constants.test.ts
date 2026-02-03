import { describe, it, expect } from "vitest";
import {
  CHOSEN_MODE,
  LAYOUT_OPTIONS,
  TECHNOLOGIES_EDITOR,
  DEBOUNCE_DELAY,
  DEFAULT_THEME,
} from "./constants";

describe("constants", () => {
  it("CHOSEN_MODE defines playground and sandbox", () => {
    expect(CHOSEN_MODE.PLAYGROUND).toBe("playground");
    expect(CHOSEN_MODE.SANDBOX).toBe("sandbox");
  });

  it("LAYOUT_OPTIONS has at least 3 options with slug and icon", () => {
    expect(LAYOUT_OPTIONS.length).toBeGreaterThanOrEqual(3);
    expect(LAYOUT_OPTIONS.some((l) => l.slug === "layout-two-two")).toBe(true);
    expect(LAYOUT_OPTIONS.some((l) => l.slug === "layout-horizontal")).toBe(true);
    expect(LAYOUT_OPTIONS.some((l) => l.slug === "layout-vertical")).toBe(true);
    LAYOUT_OPTIONS.forEach((opt) => {
      expect(opt).toHaveProperty("slug");
      expect(opt).toHaveProperty("label");
      expect(opt).toHaveProperty("icon");
    });
  });

  it("TECHNOLOGIES_EDITOR defines html, css and javascript", () => {
    expect(TECHNOLOGIES_EDITOR.HTML).toBe("html");
    expect(TECHNOLOGIES_EDITOR.CSS).toBe("css");
    expect(TECHNOLOGIES_EDITOR.JS).toBe("javascript");
  });

  it("DEBOUNCE_DELAY is a positive number", () => {
    expect(typeof DEBOUNCE_DELAY).toBe("number");
    expect(DEBOUNCE_DELAY).toBeGreaterThan(0);
  });

  it("DEFAULT_THEME is defined", () => {
    expect(DEFAULT_THEME).toBeDefined();
    expect(typeof DEFAULT_THEME).toBe("string");
  });
});
