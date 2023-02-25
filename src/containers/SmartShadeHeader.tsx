import React from "react";
import type { ColorFormatKeys } from "store/useColorOptions";

import AutogenerateShadesInput from "@/components/ColorPalette/AutogenerateShadesInput";
import ColorFormatSelect from "@/components/ColorPalette/ColorFormatSelect";
import { TypographyP } from "@/components/Typography";

type Props = {
  colorName: ColorFormatKeys;
  paletteId: string;
};

const SmartShadeHeader = ({ colorName, paletteId }: Props) => {
  return (
    <div className="flex w-[95%] flex-col md:flex-row md:items-center gap-2 md:gap-0 justify-between md:w-full lg:w-2/3 xl:w-3/4">
      <TypographyP className="min-w-[6rem] font-semibold capitalize md:min-w-[8rem] md:text-xl">
        {colorName}
      </TypographyP>
      <div className="flex flex-row justify-between items-center gap-6">
        <AutogenerateShadesInput id={`autogenerate-shades-${colorName}`} />
        <ColorFormatSelect colorName={colorName} paletteId={paletteId} />
      </div>
    </div>
  );
};

export default SmartShadeHeader;
