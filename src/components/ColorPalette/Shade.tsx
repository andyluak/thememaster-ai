import React from "react";

type Props = {
  code: string;
};

const Shade = ({ code }: Props) => {
  return (
    <div
      className="h-10 w-10 rounded-full border border-gray-600"
      style={{ backgroundColor: code }}
    />
  );
};

export default Shade;
