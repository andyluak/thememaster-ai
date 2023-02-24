import type {
  PaletteWithColors,
  PaletteWithExtendedColors,
  PaletteWithExtendedColorsKey,
} from "@/types";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getPalette } from "lib/db";
import { CornerDownLeft } from "lucide-react";
import type { GetServerSideProps } from "next";
import Link from "next/link";

import { TypographyH1 } from "@/components/Typography";

import SmartShade from "@/containers/SmartShade";
import SmartShadeHeader from "@/containers/SmartShadeHeader";

import usePalette from "@/queries/usePalette";

const SinglePalette = () => {
  const { palette } = usePalette();
  const { name, colors, id } = palette as PaletteWithExtendedColors;
  const colorKeys = Object.keys(colors) as PaletteWithExtendedColorsKey[];

  return (
    <main className="p-full">
      <Link href={"/dashboard"} className="flex flex-row items-center gap-2">
        <CornerDownLeft />
        Back
      </Link>
      <section className="mt-4 space-y-5 md:mt-8 md:space-y-8">
        <TypographyH1 className="text-2xl md:text-4xl">{name}</TypographyH1>
        <div className="flex flex-col flex-wrap gap-10">
          {colorKeys.map((colorKey) => {
            const colorArray = colors[colorKey];
            return (
              <div
                className="flex flex-col items-start gap-6 md:gap-8"
                key={colorKey}
              >
                <SmartShadeHeader colorName={colorKey} paletteId={id} />
                <div className="flex flex-row gap-6 md:gap-4">
                  {colorArray
                    .sort((a, b) => {
                      const aNumber = Number(a.name.split("-")[1]);
                      const bNumber = Number(b.name.split("-")[1]);
                      return aNumber - bNumber;
                    })
                    .map((color) => {
                      return <SmartShade color={color} key={color.code} />;
                    })}
                </div>
              </div>
            );
          })}
        </div>
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
