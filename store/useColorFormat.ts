import { create } from "zustand";

export type ColorFormatKeys = "primary" | "secondary" | "accent" | "foreground";
export type ColorFormatValues = "rgb" | "hex" | "hsl";

interface ColorState {
  palettes: {
    id: string;
    colorFormat: {
      primary: ColorFormatValues;
      secondary: ColorFormatValues;
      accent: ColorFormatValues;
      foreground: ColorFormatValues;
    };
  }[];
  setColorFormat: (
    id: string,
    key: ColorFormatKeys,
    value: ColorFormatValues
  ) => void;
}

const useColorFormat = create<ColorState>((set, get) => ({
  palettes: [
    {
      id: "0",
      colorFormat: {
        primary: "hex",
        secondary: "hex",
        accent: "hex",
        foreground: "hex",
      },
    },
  ],
  setColorFormat: (id, key, value) => {
    set((state) => ({
      palettes: state.palettes.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            colorFormat: {
              ...p.colorFormat,
              [key]: value,
            },
          };
        }
        return {
          id,
          colorFormat: {
            primary: "hex",
            secondary: "hex",
            accent: "hex",
            foreground: "hex",
            [key]: value,
          },
        };
      }),
    }));
  },
  getPaletteColorFormat: (id: string) => {
    const state = get();
    const palette = state.palettes.find((p) => p.id === id);
    if (palette) {
      return palette.colorFormat;
    }
    return {
      primary: "hex",
      secondary: "hex",
      accent: "hex",
      foreground: "hex",
    };
  },
}));

export default useColorFormat;
