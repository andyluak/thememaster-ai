import type { IAiResponseKey, PaletteWithColors } from "@/types";
import React from "react";

import { TypographyH3, TypographyP } from "@/components/Typography";
import PaletteTitle from "@/components/ColorPalette/PaletteTitle";
import Shade from "@/components/ColorPalette/Shade";
import { Button } from "@/components/Button";
import { saveAsJson } from "lib/utils";

type Props = {
  palette: PaletteWithColors;
};

const ColorPalette = ({ palette }: Props) => {
  const { colors } = palette;
  const colorKeys = Object.keys(colors) as IAiResponseKey[];
  if (!palette) return null;

  return (
    <div className="flex flex-col gap-4">
      <PaletteTitle name={palette.name} />
      <div className="flex flex-col flex-wrap gap-3">
        {colorKeys.map((colorKey) => {
          const colorArray = colors[colorKey];
          return (
            <div className="flex flex-row items-center gap-4" key={colorKey}>
              <TypographyP className="min-w-[150px] font-semibold capitalize">
                {colorKey}
              </TypographyP>
              {colorArray
                .sort((a, b) => {
                  const aNumber = Number(a.name.split("-")[1]);
                  const bNumber = Number(b.name.split("-")[1]);
                  return aNumber - bNumber;
                })
                .map((color) => {
                  return (
                    <Shade code={color.code} key={color.code} />
                  );
                })}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row gap-2">

      <Button onClick={()=> saveAsJson(colors)} className="bg-accent text-xs">Save as JSON</Button>
      <Button className="bg-accent text-xs">Tailwind Config</Button>
      <Button className="bg-accent text-xs">CSS Config</Button>
      <Button className="bg-accent text-xs">Duplicate</Button>
      </div>
    </div>
  );
};

export default ColorPalette;
