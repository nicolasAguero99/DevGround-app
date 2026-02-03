import { CHOSEN_MODE, LAYOUT_OPTIONS, TABS_CONFIG, TECHNOLOGIES_EDITOR } from "../constants/constants";

export interface ConsoleOutput {
  type: string;
  msg: any;
}

export interface htmlStateProps {
  value: string;
  setValue: (value: string) => void;
}

export interface cssStateProps {
  value: string;
  setValue: (value: string) => void;
}

export interface jsStateProps {
  value: string;
  setValue: (value: string) => void;
}

export type TechnologyType = typeof TECHNOLOGIES_EDITOR[keyof typeof TECHNOLOGIES_EDITOR]

export type EditorTechnologiesValues = Record<TechnologyType, string>;
export interface EditorTechnologiesValuesState {
  value: string;
  setValue: (value: string) => void;
}

export type EditorTechnologiesValuesSaved = Record<typeof TECHNOLOGIES_EDITOR[keyof typeof TECHNOLOGIES_EDITOR], string>;

export type LayoutOption = typeof LAYOUT_OPTIONS[number] | '';

export type ActiveTab = typeof TABS_CONFIG[number]['value'];

export type ChosenMode = typeof CHOSEN_MODE[keyof typeof CHOSEN_MODE];