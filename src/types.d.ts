import type { Color, Palette } from "@prisma/client";

export type ISimpleAiResponse = {
  primary: string[];
  secondary: string[];
  accent: string[];
  foreground: string[];
  title?: string;
};

export type IAiResponse = {
  primary: {
    code: string;
    name: string;
  }[];
  secondary: {
    code: string;
    name: string;
  }[];
  accent: {
    code: string;
    name: string;
  }[];
  foreground: {
    code: string;
    name: string;
  }[];
};

export type IAiResponseKey = keyof IAiResponse;

export type PaletteWithColors = Palette & {
  colors: IAiResponse;
};

export type PaletteWithExtendedColors = Palette & {
  colors: {
    primary: Color[];
    secondary: Color[];
    accent: Color[];
    foreground: Color[];
  };
};

export type PaletteWithExtendedColorsKey = keyof PaletteWithExtendedColors["colors"];