import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChooseModeScreen from "./choose-mode-screen";
import { chosenModeStore, isFirstTimeStore } from "../../store/layout.store";
import { CHOSEN_MODE } from "../../constants/constants";

describe("ChooseModeScreen", () => {
  beforeEach(() => {
    chosenModeStore.setState({ chosenMode: CHOSEN_MODE.PLAYGROUND });
  });

  it("renders both Playground and Sandbox options", () => {
    render(<ChooseModeScreen />);

    expect(screen.getByText("Playground")).toBeInTheDocument();
    expect(screen.getByText("Sandbox")).toBeInTheDocument();
  });

  it("clicking Playground updates chosenMode and isFirstTime", async () => {
    const user = userEvent.setup();
    render(<ChooseModeScreen />);

    const playgroundArea = screen.getByText("Playground").closest("div");
    expect(playgroundArea).toBeInTheDocument();

    await user.click(playgroundArea!);

    expect(chosenModeStore.getState().chosenMode).toBe(CHOSEN_MODE.PLAYGROUND);
    expect(isFirstTimeStore.getState().isFirstTime).toBe(false);
  });

  it("clicking Sandbox updates chosenMode to sandbox", async () => {
    const user = userEvent.setup();
    render(<ChooseModeScreen />);

    const sandboxArea = screen.getByText("Sandbox").closest("div");
    expect(sandboxArea).toBeInTheDocument();

    await user.click(sandboxArea!);

    expect(chosenModeStore.getState().chosenMode).toBe(CHOSEN_MODE.SANDBOX);
  });
});
