import React from "react";

import { TypographyP } from "@/components/Typography";
import { Label } from "@/components/Label";
import { Switch } from "@/components/Switch";

type Props = {
  colorName: string;
};

const SmartShadeHeader = ({ colorName }: Props) => {
  return (
    <div className="flex flex-row justify-between items-center w-full md:w-2/3">
    <TypographyP className="min-w-[6rem] font-semibold capitalize md:min-w-[8rem] md:text-xl">
      {colorName}
    </TypographyP>
    <div className="flex flex-row items-center gap-2">
      <Switch id={`autogenerate-shades-${colorName}`} />
      <Label className="md:text-md" htmlFor={`autogenerate-shades-${colorName}`}>Autogenerate Shades</Label>
    </div>
    </div>
  );
};

export default SmartShadeHeader;
