import type { Color } from "@prisma/client";
import React from "react";
import { HexColorPicker } from "react-colorful";
import {
  ColorFormatKeys,
  usePaletteColorFormatValue,
} from "store/useColorFormat";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { TypographyP } from "@/components/Typography";

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
      <TypographyP className="text-xs">{code}</TypographyP>
    </div>
  );
};

export default SmartShade;
