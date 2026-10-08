export const colorThemes = [
  'default',
  'theme-2',
  'theme-3',
  'theme-4',
  'theme-5',
  'theme-6',
] as const;

export type ColorThemeName = (typeof colorThemes)[number];

export const languages = {
  python: 'Python',
  rust: 'Rust',
  java: 'Java',
  web: 'Web',
} as const;

export type Language = keyof typeof languages;

export const statuses = {
  outline: 'Outline',
  draft: 'Draft',
  ready: 'Ready',
} as const;

export type Status = keyof typeof statuses;
