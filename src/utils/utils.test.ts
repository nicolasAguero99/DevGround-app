import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  generateDocumentCode,
  generateDocument,
  generateSandboxDocument,
  generateCustomThemeObject,
  handleUpdateCustomThemeValues,
  debounce,
} from "./utils";
import { INSTANCE_ID } from "../constants/constants";

describe("generateDocumentCode", () => {
  it("generates valid HTML with doctype, head, body and injects html, css and javascript", () => {
    const html = "<h1>Hi</h1>";
    const css = "body { margin: 0; }";
    const js = "console.log(1);";

    const result = generateDocumentCode({ html, css, javascript: js });

    expect(result).toContain("<!DOCTYPE html>");
    expect(result).toContain("<html>");
    expect(result).toContain("<head>");
    expect(result).toContain("<body>");
    expect(result).toContain(html);
    expect(result).toContain(css);
    expect(result).toContain(js);
  });

  it("includes postMessage script and instanceId in the document", () => {
    const result = generateDocumentCode(
      { html: "", css: "", javascript: "" },
      INSTANCE_ID.FULL
    );

    expect(result).toContain("window.parent.postMessage");
    expect(result).toContain("instanceId:");
    expect(result).toContain("'full'");
  });

  it("uses js-only instanceId when INSTANCE_ID.JS_ONLY is passed", () => {
    const result = generateDocumentCode(
      { html: "", css: "", javascript: "1+1" },
      INSTANCE_ID.JS_ONLY
    );

    expect(result).toContain("'js-only'");
  });
});

describe("generateDocument", () => {
  it("calls setDocument with HTML generated from editor values", () => {
    const setDocument = vi.fn();
    const values = {
      html: "<p>Test</p>",
      css: ".x {}",
      javascript: "void 0",
    };

    generateDocument(values, setDocument);

    expect(setDocument).toHaveBeenCalledTimes(1);
    const [doc] = setDocument.mock.calls[0];
    expect(doc).toContain("<p>Test</p>");
    expect(doc).toContain(".x {}");
    expect(doc).toContain("void 0");
  });
});

describe("generateSandboxDocument", () => {
  it("generates document with JavaScript only (sandbox) and calls setDocument", () => {
    const setDocument = vi.fn();
    const js = "console.log('sandbox');";

    generateSandboxDocument(js, setDocument);

    expect(setDocument).toHaveBeenCalledTimes(1);
    const [doc] = setDocument.mock.calls[0];
    expect(doc).toContain(js);
    expect(doc).toContain("'js-only'");
  });
});

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("runs the function only after the delay, not before", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced("a");
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(99);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("a");
  });

  it("resets the timer when called again before the delay", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced("a");
    vi.advanceTimersByTime(50);
    debounced("b");
    vi.advanceTimersByTime(50);
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("b");
  });
});

describe("generateCustomThemeObject", () => {
  it("maps savedCustomThemeValues to items with correct key, value and type", () => {
    const saved = {
      "rules.comment": "#ff0000",
      "colors.editor.background": "#1e1e1e",
    };

    const result = generateCustomThemeObject(saved);

    expect(result.length).toBeGreaterThanOrEqual(2);
    const comment = result.find((i) => i.key === "rules.comment");
    expect(comment).toEqual({ key: "rules.comment", value: "#ff0000", type: "color" });
  });
});

describe("handleUpdateCustomThemeValues", () => {
  it("merges default values with customThemeValues and updates the setter", () => {
    const setCustomThemeValues = vi.fn();
    const customThemeValues = { "rules.comment": "#00ff00" };

    handleUpdateCustomThemeValues(customThemeValues, setCustomThemeValues);

    expect(setCustomThemeValues).toHaveBeenCalledTimes(1);
    const [merged] = setCustomThemeValues.mock.calls[0];
    expect(merged["rules.comment"]).toBe("#00ff00");
    expect(Object.keys(merged).length).toBeGreaterThan(1);
  });
});
