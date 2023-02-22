import React from "react";

type Props = {
  code: string;
};

const Shade = ({ code }: Props) => {
  return (
    <div
      className="h-8 w-8 md:h-10 md:w-10 rounded-full border border-gray-600"
      style={{ backgroundColor: code }}
    />
  );
};

export default Shade;
