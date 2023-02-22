import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import type { IAiResponse, ISimpleAiResponse } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next/types";

export async function palette(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  const { id } = session.user;
  switch (req.method) {
    case "GET":
      const palettes = await prisma.palette.findMany({
        where: { userId: id },
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

      res.status(200).json(mergedPalette);
      break;

    case "POST":
      const { colors, title } = req.body as {
        colors: ISimpleAiResponse;
        title: ISimpleAiResponse["title"];
      };

      try {
        const newPalette = await prisma.palette.create({
          data: {
            userId: id,
            name: title,
          },
        });

        const colorNames = Object.keys(colors) as Array<keyof IAiResponse>;

        // now I want to save each color as : primary-100, primary-200, etc.
        // and then save the color hex value to the db

        const newColors = Promise.all(
          colorNames.map(async (colorNames) => {
            const colorValues = colors[colorNames];
            const colorValuesWithNames = colorValues.map(
              async (code, index) => {
                const colorName = `${colorNames}-${index * 100 + 100}`;
                return await prisma.color.create({
                  data: {
                    name: colorName,
                    code,
                    userId: id,
                  },
                });
              }
            );

            return await Promise.all(colorValuesWithNames);
          })
        );

        // add the newly create colors to trhe PaletteColor table
        const newPaletteColors = await Promise.all(
          (
            await newColors
          ).map(async (colors) => {
            return await Promise.all(
              colors.map(async (color) => {
                return await prisma.paletteColor.create({
                  data: {
                    paletteId: newPalette.id,
                    colorId: color.id,
                  },
                });
              })
            );
          })
        );

        await prisma.user.update({
          where: { id },
          data: {
            tokensLeft: {
              decrement: 1,
            },
          },
        });

        res.status(200).json(newPalette);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
      }
      break;
  }
}

export default palette;
