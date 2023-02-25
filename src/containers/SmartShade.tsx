/* eslint-disable @typescript-eslint/no-misused-promises */
import type { Color } from "@prisma/client";
import { rgbToHsl } from "lib/colors";
import React from "react";
import { HexColorPicker } from "react-colorful";
import type { ColorFormatKeys } from "store/useColorOptions";
import { usePaletteColorFormatValue } from "store/useColorOptions";

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

  const formattedColor = newColorFormat(code);

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
      <Dialog>
        <DialogTrigger>
          <div
            className="h-8 w-8 rounded-full border border-gray-600 md:h-10 md:w-10"
            style={{ backgroundColor: code }}
            onClick={() => setIsOpen(!isOpen)}
          />
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Select a new shade</DialogTitle>
          <HexColorPicker
            color={code}
            onChange={(color) => console.log(color)}
          />
          <DialogDescription>{code}</DialogDescription>
        </DialogContent>
      </Dialog>
      <button onClick={copyToClipboard}>
        <TypographyP className="text-xs">{formattedColor}</TypographyP>
      </button>
    </div>
  );
};

export default SmartShade;
