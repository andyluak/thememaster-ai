import React from "react";

import { Label } from "@/components/Label";
import { Switch } from "@/components/Switch";
import { TypographyP } from "@/components/Typography";

type Props = {
  colorName: string;
};

const SmartShadeHeader = ({ colorName }: Props) => {
  return (
    <div className="flex w-full flex-row items-center justify-between md:w-1/2">
      <TypographyP className="min-w-[6rem] font-semibold capitalize md:min-w-[8rem] md:text-xl">
        {colorName}
      </TypographyP>
      <div className="flex flex-row items-center gap-2">
        <Switch id={`autogenerate-shades-${colorName}`} />
        <Label
          className="md:text-md cursor-pointer"
          htmlFor={`autogenerate-shades-${colorName}`}
        >
          Autogenerate Shades
        </Label>
      </div>
    </div>
  );
};

export default SmartShadeHeader;
