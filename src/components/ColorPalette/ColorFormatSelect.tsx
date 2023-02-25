import React from "react";
import type {
  ColorFormatKeys,
  ColorFormatType,
  ColorFormatValues,
} from "store/useColorOptions";

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
  colorFormat: ColorFormatType;
  setColorFormat: (
    paletteId: string,
    colorName: ColorFormatKeys,
    value: ColorFormatValues
  ) => void;
};

const ColorFormatSelect = ({
  colorName,
  paletteId,
  colorFormat,
  setColorFormat,
}: Props) => {
  return (
    <Select
      value={colorFormat[colorName]["format"]}
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
