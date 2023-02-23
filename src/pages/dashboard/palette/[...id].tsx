import type { PaletteWithColors } from "@/types";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getPalette } from "lib/db";
import { CornerDownLeft } from "lucide-react";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";

import { TypographyH1 } from "@/components/Typography";

import usePalette from "@/queries/usePalette";

const SinglePalette = () => {
  const { palette } = usePalette();
  const { name } = palette || {};

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query as { id: string[] };
  const queryClient = new QueryClient();
  await queryClient.fetchQuery(["palette", id[0]], async () => {
    const palette = await getPalette(id);
    return JSON.parse(JSON.stringify(palette)) as PaletteWithColors;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default SinglePalette;
