import twoByTwoIcon from '../assets/icons/two-by-two-icon.svg';
import horizontalIcon from '../assets/icons/horizontal-icon.svg';
import verticalIcon from '../assets/icons/vertical-icon.svg';

export const TECHNOLOGIES_EDITOR = {
  HTML: 'html',
  CSS: 'css',
  JS: 'javascript',
} as const;

export const INSTANCE_ID = {
  FULL: 'full',
  JS_ONLY: 'js-only',
} as const;

export const COLOR_TECHNOLOGIES = {
  HTML: '--color-html',
  CSS: '--color-css',
  JS: '--color-js',
} as const;

// export const SYSTEM_PROMPT_IA = `
// ### Instructions:
// - You are a world class coding assistant.
// - Given the current text, context, and the last character of the user input, provide a suggestion for code completion.
// - The suggestion must be based on the current text, as well as the text before the cursor.
// - This is not a conversation, so please do not ask questions or prompt for additional information.

// ### Notes
// - NEVER INCLUDE ANY MARKDOWN IN THE RESPONSE - THIS MEANS CODEBLOCKS AS WELL.
// - Never include any annotations such as "# Suggestion:" or "# Suggestions:".
// - Newlines should be included after any of the following characters: "{", "[", "(", ")", "]", "}", and ",".
// - Never suggest a newline after a space or newline.
// - Ensure that newline suggestions follow the same indentation as the current line.
// - The suggestion must start with the last character of the current user input.
// - Only ever return the code snippet, do not return any markdown unless it is part of the code snippet.
// - Do not return any code that is already present in the current text.
// - Do not return anything that is not valid code.
// - If you do not have a suggestion, return an empty string.`;

export const LAYOUT_OPTIONS = [
  {
    icon: twoByTwoIcon,
    label: 'Two by two',
    slug: 'layout-two-two',
  },
  {
    icon: horizontalIcon,
    label: 'Horizontal',
    slug: 'layout-horizontal',
  },
  {
    icon: verticalIcon,
    label: 'Vertical',
    slug: 'layout-vertical',
  },
] as const;

export const DEFAULT_THEME = 'default-theme';
export const CUSTOM_THEME = 'custom-theme';

export const TABS_CONFIG = [
  {
    label: 'Settings',
    value: 'settings',
  },
  {
    label: 'Theme',
    value: 'themes',
  },
  // {
  //   label: 'AI',
  //   value: 'ai',
  // },
] as const;

export const DEBOUNCE_DELAY = 500;

export const CHOSEN_MODE = {
  PLAYGROUND: 'playground',
  SANDBOX: 'sandbox',
} as const;

export const REPORT_BUG_URL = 'https://github.com/nicolasAguero99/DevGround-app/issues';