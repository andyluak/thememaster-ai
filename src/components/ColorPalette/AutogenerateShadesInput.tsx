import React from "react";
import type { ColorFormatKeys, ColorFormatType } from "store/useColorOptions";

import { Label } from "../Label";
import { Switch } from "../Switch";

type Props = {
  id: string;
  colorName: ColorFormatKeys;
  paletteId: string;
  colorFormat: ColorFormatType;
  setColorAutogenerateShades: (
    paletteId: string,
    colorName: ColorFormatKeys,
    value: boolean
  ) => void;
};

const AutogenerateShadesInput = ({
  id,
  colorFormat,
  colorName,
  setColorAutogenerateShades,
  paletteId,
}: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={id}
        checked={colorFormat[colorName].autogenerateShades}
        onCheckedChange={(checked) => {
          setColorAutogenerateShades(paletteId, colorName, checked);
        }}
      />
      <Label className="cursor-pointer text-xs md:text-base" htmlFor={id}>
        Autogenerate Shades
      </Label>
    </div>
  );
};

export default AutogenerateShadesInput;
