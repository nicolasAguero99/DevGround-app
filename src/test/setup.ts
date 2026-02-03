import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

const fakeStore = {
  get: vi.fn(async () => null),
  set: vi.fn(async () => {}),
  save: vi.fn(async () => {}),
  delete: vi.fn(async () => {}),
  clear: vi.fn(async () => {}),
  keys: vi.fn(async () => []),
  has: vi.fn(async () => false),
};

vi.mock("@tauri-apps/plugin-store", () => ({
  Store: {
    load: () => Promise.resolve(fakeStore),
  },
}));
