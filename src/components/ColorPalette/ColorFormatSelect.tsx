import React from "react";
import type {
  ColorFormatKeys,
  ColorFormatValues,
} from "store/useColorFormat";
import useColorFormat from "store/useColorFormat";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Select";

type Props = {
  colorName: ColorFormatKeys;
};

const ColorFormatSelect = ({ colorName }: Props) => {
  const { colorFormat, setColorFormat } = useColorFormat((state) => state);

  return (
    <Select
      value={colorFormat[colorName]}
      onValueChange={(value: ColorFormatValues) =>
        setColorFormat(colorName, value)
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
