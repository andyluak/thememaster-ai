import React from "react";

import { TypographyH3 } from "../Typography";

type Props = {
  name: string;
};

const PaletteTitle = ({ name }: Props) => {
  return (
    <TypographyH3 className="mt-4 text-lg md:text-xl">{name}</TypographyH3>
  );
};

export default PaletteTitle;
