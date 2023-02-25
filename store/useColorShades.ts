import { create } from "zustand";

export type Shade = {
  name: string;
  code: string;
};

interface ColorShadesState {
  temporaryShade: string;
  palettes: {
    id: string;
    shades: Shade[];
  }[];

  setTemporaryShade: (value: string) => void;
  setShade: (id: string, key: string, value: string) => void;
}

const useColorShades = create<ColorShadesState>((set, get) => ({
  temporaryShade: "#ffffff",
  palettes: [{ id: "0", shades: [{ name: "primary-100", code: "#ffffff" }] }],

  setTemporaryShade: (value) => {
    set({ temporaryShade: value });
  },
  setShade: (id, key, value) => {
    set((state) => {
      return {
        palettes: state.palettes.map((p) => {
          if (p.id === id) {
            return {
              ...p,
              shades: [...p.shades, { name: key, code: value }],
            };
          }
          return {
            id,
            shades: [{ name: key, code: value }],
          };
        }),
      };
    });
  },
}));

export const useNewColorShades = (id: string) => {
  const shades = useColorShades((state ) => state.palettes.find((p) => p.id === id)?.shades);
  return shades;
}
export default useColorShades;
