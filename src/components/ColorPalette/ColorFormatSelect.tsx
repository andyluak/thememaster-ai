import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Select";

// declare the keys of the colorFormat object
type ColorFormatKey = "primary" | "secondary" | "accent" | "foreground";

type Props = {
  colorName: ColorFormatKey;
  colorFormat: {
    primary: string;
    secondary: string;
    accent: string;
    foreground: string;
  };
  setColorFormat: React.Dispatch<
    React.SetStateAction<{
      primary: string;
      secondary: string;
      accent: string;
      foreground: string;
    }>
  >;
};

const ColorFormatSelect = ({
  colorName,
  colorFormat,
  setColorFormat,
}: Props) => {
  const handleChange = (value: string) => {
    setColorFormat((prev) => ({ ...prev, [colorName]: value }));
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
