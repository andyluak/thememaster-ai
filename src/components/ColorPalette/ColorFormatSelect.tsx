import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Select";

const ColorFormatSelect = () => {
  return (
    <Select value="hex">
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
