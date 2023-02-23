import type { Color } from "@prisma/client";
import React from "react";

import { TypographyP } from "@/components/Typography";

type Props = {
  color: Color;
};

const SmartShade = ({ color }: Props) => {
  const { code } = color;
  return (
    <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:items-center">
      <button
        className="h-8 w-8 rounded-full border border-gray-600 md:h-10 md:w-10"
        style={{ backgroundColor: code }}
      />
      <TypographyP className="text-xs">{code}</TypographyP>
    </div>
  );
};

export default SmartShade;
