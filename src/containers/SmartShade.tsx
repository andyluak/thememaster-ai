/* eslint-disable @typescript-eslint/no-misused-promises */
import type { Color } from "@prisma/client";
import { rgbToHsl } from "lib/colors";
import React from "react";
import { HexColorPicker } from "react-colorful";
import type { ColorFormatKeys } from "store/useColorOptions";
import { usePaletteColorFormatValue } from "store/useColorOptions";
import type { Shade } from "store/useColorShades";
import useColorShades from "store/useColorShades";

import { Button } from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { TypographyP } from "@/components/Typography";

import { useToast } from "@/hooks/useToast";

type Props = {
  color: Color;
  paletteId: string;
};

const SmartShade = ({ color, paletteId }: Props) => {
  const { code, name } = color;

  const [isOpen, setIsOpen] = React.useState(false);

  const colorFormatValue = usePaletteColorFormatValue(
    paletteId,
    name.split("-")[0] as ColorFormatKeys
  );

  const temporaryShade = useColorShades((state) => state.temporaryShade);
  const setTemporaryShade = useColorShades((state) => state.setTemporaryShade);
  const setShade = useColorShades((state) => state.setShade);
  const shade = useColorShades((state) => {
    const palette = state.palettes.find((palette) => palette.id === paletteId);
    const colorCode =
      palette?.shades.find((shade) => shade.name === name) || "";
    return colorCode;
  }) as Shade;

  const newColorFormat = (color: string) => {
    const newColor = color.replace("#", "");
    if (colorFormatValue === "hex") {
      return color;
    } else if (colorFormatValue === "rgb") {
      const r = parseInt(newColor.substring(0, 2), 16);
      const g = parseInt(newColor.substring(2, 4), 16);
      const b = parseInt(newColor.substring(4, 6), 16);
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      const r = parseInt(newColor.substring(0, 2), 16);
      const g = parseInt(newColor.substring(2, 4), 16);
      const b = parseInt(newColor.substring(4, 6), 16);
      const hsl = rgbToHsl(r, g, b);
      return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
    }
  };

  const formattedColor = newColorFormat(shade?.code ?? code);

  const handleShadeChange = () => {
    setIsOpen(false);
    setTemporaryShade("#000000");
    setShade(paletteId, name, temporaryShade);
  };

  const { toast } = useToast();
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(formattedColor);
    toast({
      title: "Copied to clipboard",
      description: "The color code has been copied to your clipboard",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:items-center">
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DialogTrigger>
          <div
            className="h-8 w-8 rounded-full border border-gray-600 md:h-10 md:w-10"
            style={{ backgroundColor: shade?.code ?? code }}
          />
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Select a new shade</DialogTitle>
          <div className="space-y-4">
            <HexColorPicker
              color={temporaryShade}
              onChange={(color) => setTemporaryShade(color)}
            />
            <Button
              variant={"subtle"}
              type="button"
              className="bg-accent py-3"
              onClick={handleShadeChange}
            >
              Save shade
            </Button>
          </div>

          <DialogDescription>{temporaryShade}</DialogDescription>
        </DialogContent>
      </Dialog>
      <button onClick={copyToClipboard}>
        <TypographyP className="text-xs">{formattedColor}</TypographyP>
      </button>
    </div>
  );
};

export default SmartShade;
