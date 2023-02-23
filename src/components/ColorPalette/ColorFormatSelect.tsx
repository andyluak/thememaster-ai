import React from "react";
import { ColorFormatKeys, ColorFormatValues } from "store/useColorFormat";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Select";

// declare the keys of the colorFormat object

type Props = {
  colorName: ColorFormatKeys;
  colorFormat: Record<ColorFormatKeys, ColorFormatValues>;
  setColorFormat: (key: ColorFormatKeys, value: ColorFormatValues) => void;
};

const ColorFormatSelect = ({
  colorName,
  colorFormat,
  setColorFormat,
}: Props) => {
  const handleChange = (value: ColorFormatValues) => {
    setColorFormat(colorName, value);
  };

  return (
    <Select value={colorFormat[colorName]} onValueChange={handleChange}>
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
