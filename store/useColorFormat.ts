import { create } from "zustand";

export type ColorFormatKeys = "primary" | "secondary" | "accent" | "foreground";
export type ColorFormatValues = "rgb" | "hex" | "hsl";

interface ColorState {
  colorFormat: {
    primary: ColorFormatValues;
    secondary: ColorFormatValues;
    accent: ColorFormatValues;
    foreground: ColorFormatValues;
  };
  setColorFormat: (key: ColorFormatKeys, value: ColorFormatValues) => void;
}

const useColorFormat = create<ColorState>((set) => ({
  colorFormat: {
    primary: "hex",
    secondary: "hex",
    accent: "hex",
    foreground: "hex",
  },
  setColorFormat: (key, value) => {
    set((state) => ({ colorFormat: { ...state.colorFormat, [key]: value } }));
  },
}));

export default useColorFormat;