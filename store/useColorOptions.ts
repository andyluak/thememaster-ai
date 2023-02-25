//@ts-nocheck
import { create } from "zustand";

export type ColorFormatKeys = "primary" | "secondary" | "accent" | "foreground";
export type ColorFormatValues = "rgb" | "hex" | "hsl";

interface ColorState {
  palettes: {
    id: string;
    colorFormat: {
      primary: {
        format: ColorFormatValues;
        autogenerateShades: boolean;
      };
      secondary: {
        format: ColorFormatValues;
        autogenerateShades: boolean;
      };
      accent: {
        format: ColorFormatValues;
        autogenerateShades: boolean;
      };
      foreground: {
        format: ColorFormatValues;
        autogenerateShades: boolean;
      };
    };
  }[];
  setColorFormat: (
    id: string,
    key: ColorFormatKeys,
    value: ColorFormatValues
  ) => void;

  getPaletteColorFormatValue: (
    id: string,
    key: ColorFormatKeys
  ) => ColorFormatValues;
}

const useColorOptions = create<ColorState>((set, get) => ({
  palettes: [
    {
      id: "0",
      colorFormat: {
        primary: {
          format: "hex",
          autogenerateShades: false,
        },
        secondary: {
          format: "hex",
          autogenerateShades: false,
        },
        accent: {
          format: "hex",
          autogenerateShades: false,
        },
        foreground: {
          format: "hex",
          autogenerateShades: false,
        },
      },
    },
  ],
  setColorFormat: (id, key, value) => {
    console.log("setColorFormat", id, key, value);
    set((state) => ({
      palettes: state.palettes.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            colorFormat: {
              ...p.colorFormat,
              [key]: {
                ...p.colorFormat[key],
                format: value,
              },
            },
          };
        }
        console.log(state.palettes);
        return {
          id,
          colorFormat: {
            primary: {
              format: 'hex',
              autogenerateShades: false,
            },
            secondary: {
              format: 'hex',
              autogenerateShades: false,
            },
            accent: {
              format: 'hex',
              autogenerateShades: false,
            },
            foreground: {
              format: 'hex',
              autogenerateShades: false,
            },
            [key]: {
              format: value,
              autogenerateShades: false,
            },
          },
        };
      }),
    }));
  },
  getPaletteColorFormatValue: (id: string, key: ColorFormatKeys) => {
    const state = get();
    const palette = state.palettes.find((p) => p.id === id);
    if (palette) {
      return palette.colorFormat[key]["format"];
    }
    return "hex";
  },
}));

export const usePaletteColorFormatValue = (
  id: string,
  key: ColorFormatKeys
) => {
  const { getPaletteColorFormatValue } = useColorOptions();
  return getPaletteColorFormatValue(id, key);
};

export default useColorOptions;
