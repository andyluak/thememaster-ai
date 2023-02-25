import React from "react";
import type { ColorFormatKeys, ColorFormatValues } from "store/useColorOptions";
import useColorOptions from "store/useColorOptions";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Select";

type Props = {
  colorName: ColorFormatKeys;
  paletteId: string;
};

const ColorFormatSelect = ({ colorName, paletteId }: Props) => {
  const { colorFormat } = useColorOptions((state) => {
    return (
      state.palettes.find((palette) => palette.id === paletteId) || {
        colorFormat: {
          primary: "hex",
          secondary: "hex",
          accent: "hex",
          foreground: "hex",
        },
      }
    );
  });
  const setColorFormat = useColorOptions((state) => state.setColorFormat);
  return (
    <Select
      value={colorFormat[colorName]}
      onValueChange={(value: ColorFormatValues) =>
        setColorFormat(paletteId, colorName, value)
      }
    >
      <SelectTrigger className="w-[60px] md:w-[80px]">
        <SelectValue placeholder="HEX" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="hex">HEX</SelectItem>
        <SelectItem value="rgb">RGB</SelectItem>
        <SelectItem value="hsl">HSL</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ColorFormatSelect;
