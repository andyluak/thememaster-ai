import { CornerDownLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

import { TypographyH1 } from "@/components/Typography";

import usePalette from "@/queries/usePalette";

const SinglePalette = () => {
  const { palette, isLoading, isError } = usePalette();
  const { name } = palette || {};

  if (isLoading) {
    return <div className="p-full">Loading...</div>;
  }

  if (isError) {
    return <div className="p-full">Error</div>;
  }

  return (
    <main className="p-full">
      <Link href={"/dashboard"} className="flex flex-row items-center gap-2">
        <CornerDownLeft />
        Back
      </Link>
      <section className="mt-4 md:mt-8">
        <TypographyH1>{name}</TypographyH1>
      </section>
    </main>
  );
};

export default SinglePalette;
