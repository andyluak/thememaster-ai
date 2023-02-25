import { create } from "zustand";

export type ColorShadesKeys = "name" | "code";
export type Shade = {
  name: string;
  code: string;
}

interface ColorShadesState {
  temporaryShade: string;
  palettes: {
    id: string;
    shades: Shade[];
  }[];

  setTemporaryShade: (value: string) => void;
  setShade: (id: string, key: ColorShadesKeys, value: string) => void;
}

const useColorShades = create<ColorShadesState>((set, get) => ({
  temporaryShade: "#ffffff",
  palettes: [{ id: "0", shades: [{ name: "primary-100", code: "#ffffff" }] }],

  setTemporaryShade: (value) => {
    set({ temporaryShade: value });
  },
  setShade: (id, key, value) => {
    set((state) => ({
      palettes: state.palettes.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            shades: p.shades.map((s) => {
              if (s.name === key) {
                return {
                  ...s,
                  code: value,
                };
              } else {
                return { name: key, code: value };
              }
            }),
          };
        } else {
          return {
            id,
            shades: [{ name: key, code: value }],
          };
        }
      }),
    }));
  },
}));

export default useColorShades;
