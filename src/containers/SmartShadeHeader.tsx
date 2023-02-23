import React from "react";

import { Label } from "@/components/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import { Switch } from "@/components/Switch";
import { TypographyP } from "@/components/Typography";

type Props = {
  colorName: string;
};

const SmartShadeHeader = ({ colorName }: Props) => {
  return (
    <div className="flex w-[95%] flex-row items-center justify-between md:w-[55%]">
      <TypographyP className="min-w-[6rem] font-semibold capitalize md:min-w-[8rem] md:text-xl">
        {colorName}
      </TypographyP>
      <div className="flex flex-row items-center gap-6">
        <div className="flex items-center space-x-2">
          <Switch id={`autogenerate-shades-${colorName}`} />
          <Label
            className="cursor-pointer text-xs md:text-base"
            htmlFor={`autogenerate-shades-${colorName}`}
          >
            Autogenerate Shades
          </Label>
        </div>
        <Select>
          <SelectTrigger className="w-[60px] md:w-[80px]">
            <SelectValue placeholder="HEX" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hex">HEX</SelectItem>
            <SelectItem value="rgb">RGB</SelectItem>
            <SelectItem value="hsl">HSL</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SmartShadeHeader;
