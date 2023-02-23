import { prisma } from "@/server/db";

export const getPalette = async (id: string[]) => {
  const palette = await prisma.palette.findUniqueOrThrow({
    where: { id: id[0] },
  });

  const paletteColor = await prisma.paletteColor.findMany({
    where: { paletteId: palette.id },
  });

  const colors = await Promise.all(
    paletteColor.map(async (color) => {
      const colorData = await prisma.color.findUnique({
        where: { id: color.colorId },
        select: {
          code: true,
          name: true,
          id: true,
        },
      });
      return colorData;
    })
  );

  const mergedPalette = {
    ...palette,
    colors: {
      primary: colors.filter((color) => {
        return color?.name.startsWith("primary");
      }),
      secondary: colors.filter((color) => {
        return color?.name.startsWith("secondary");
      }),
      accent: colors.filter((color) => {
        return color?.name.startsWith("accent");
      }),
      foreground: colors.filter((color) => {
        return color?.name.startsWith("foreground");
      }),
    },
  };

  return mergedPalette;
};

export const getPalettes = async (userId: string) => {
  const palettes = await prisma.palette.findMany({
    where: { userId },
  });

  const paletteColors = await Promise.all(
    palettes.map(async (palette) => {
      const colors = await prisma.paletteColor.findMany({
        where: { paletteId: palette.id },
        include: {
          color: {
            select: {
              code: true,
              name: true,
            },
          },
        },
      });

      return colors.map((color) => color.color);
    })
  );

  const mergedPalette = palettes.map((palette, index) => {
    return {
      ...palette,
      colors: {
        primary: paletteColors[index]?.filter((color) => {
          return color.name.startsWith("primary");
        }),
        secondary: paletteColors[index]?.filter((color) => {
          return color.name.startsWith("secondary");
        }),
        accent: paletteColors[index]?.filter((color) => {
          return color.name.startsWith("accent");
        }),
        foreground: paletteColors[index]?.filter((color) => {
          return color.name.startsWith("foreground");
        }),
      },
    };
  });

  return mergedPalette;
};
