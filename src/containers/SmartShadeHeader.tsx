// @ts-nocheck
import { HelpCircle } from "lucide-react";
import React from "react";
import type { ColorFormatKeys } from "store/useColorOptions";
import useColorOptions from "store/useColorOptions";

import AutogenerateShadesInput from "@/components/ColorPalette/AutogenerateShadesInput";
import ColorFormatSelect from "@/components/ColorPalette/ColorFormatSelect";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/Tooltip";
import { TypographyP } from "@/components/Typography";

type Props = {
  colorName: ColorFormatKeys;
  paletteId: string;
};

const SmartShadeHeader = ({ colorName, paletteId }: Props) => {
  const { colorFormat } = useColorOptions((state) => {
    return (
      state.palettes.find((palette) => palette.id === paletteId) || {
        colorFormat: {
          primary: {
            format: "hex",
            autogenerateShades: false,
          },
          secondary: {
            format: "hex",
            autogenerateShades: false,
          },
          accent: {
            format: "hex",
            autogenerateShades: false,
          },
          foreground: {
            format: "hex",
            autogenerateShades: false,
          },
        },
      }
    );
  });
  const setColorFormat = useColorOptions((state) => state.setColorFormat);
  const setColorAutogenerateShades = useColorOptions(
    (state) => state.setColorAutogenerateShades
  );
  return (
    <div className="flex w-[95%] flex-col justify-between gap-2 md:w-full md:flex-row md:items-center md:gap-0 lg:w-2/3 xl:w-3/4">
      <TypographyP className="min-w-[6rem] font-semibold capitalize md:min-w-[8rem] md:text-xl">
        {colorName}
      </TypographyP>
      <div className="flex flex-row items-center justify-between gap-6">
        <div className="flex flex-row gap-1">
          <TooltipProvider delayDuration={500}>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 md:w-6" />
              </TooltipTrigger>
              <TooltipContent>
                <TypographyP className="text-sm">
                  When changing the first color, the rest of the shades will be
                  automatically generated.
                </TypographyP>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <AutogenerateShadesInput
            colorName={colorName}
            paletteId={paletteId}
            id={`autogenerate-shades-${colorName}`}
            colorFormat={colorFormat}
            setColorAutogenerateShades={setColorAutogenerateShades}
          />
        </div>
        <ColorFormatSelect
          colorName={colorName}
          paletteId={paletteId}
          colorFormat={colorFormat}
          setColorFormat={setColorFormat}
        />
      </div>
    </div>
  );
};

export default SmartShadeHeader;
