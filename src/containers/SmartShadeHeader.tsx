import React from "react";

import AutogenerateShadesInput from "@/components/ColorPalette/AutogenerateShadesInput";
import ColorFormatSelect from "@/components/ColorPalette/ColorFormatSelect";
import { TypographyP } from "@/components/Typography";
import type { ColorFormatKeys } from "store/useColorFormat";
import useColorFormat from "store/useColorFormat";

type Props = {
  colorName: ColorFormatKeys;
};

const SmartShadeHeader = ({
  colorName,
}: Props) => {
  const {colorFormat, setColorFormat} = useColorFormat((state) => state);
  return (
    <div className="flex w-[95%] flex-row items-center justify-between md:w-1/2">
      <TypographyP className="min-w-[6rem] font-semibold capitalize md:min-w-[8rem] md:text-xl">
        {colorName}
      </TypographyP>
      <div className="flex flex-row items-center gap-6">
        <AutogenerateShadesInput id={`autogenerate-shades-${colorName}`} />
        <ColorFormatSelect colorName={colorName} colorFormat={colorFormat} setColorFormat={setColorFormat} />
      </div>
    </div>
  );
};

export default SmartShadeHeader;
