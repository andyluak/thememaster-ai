import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import type { NextApiRequest, NextApiResponse } from "next/types";

export async function palette(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  const { id } = req.query as { id: string[] };
  switch (req.method) {
    case "GET":
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

      res.status(200).json(mergedPalette);
      break;
  }
}

export default palette;
