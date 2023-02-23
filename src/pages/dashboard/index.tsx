import { prisma } from "@/server/db";
import type { PaletteWithColors } from "@/types";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getPalettes } from "lib/db";
import type { GetServerSideProps } from "next";
import React from "react";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
} from "@/components/Typography";

import ColorPalette from "@/containers/ColorPalette";

import usePalettes from "@/queries/usePalettes";

import useCreateAiPalette from "@/mutations/useCreateAiPalette";

import useUser from "@/hooks/useUser";

const Palette = () => {
  const { palettes = [] } = usePalettes();
  const { user } = useUser();
  const createPalette = useCreateAiPalette();

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { prompt = "" } = Object.fromEntries(formData) as Record<
      string,
      string
    >;

    createPalette.mutate({ prompt });
  };

  return (
    <main>
      <section className="p-full flex flex-col gap-16">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <TypographyH1>Welcome to your dashboard!</TypographyH1>
            <TypographyP className="text-slate-600">
              You have {user?.tokensLeft} color pallete tokens left.
            </TypographyP>
          </div>
          {palettes?.length === 0 && (
            <TypographyP className="text-sm text-gray-700 md:text-lg">
              {
                "It looks like you haven't set up any color palettes yet. Don't worry, it's easy to get started. Simply click the 'Generate' button to create a new custom color palette based on your content and preferences. Once you've generated a palette, you can customize it to your liking and save it for future use."
              }
            </TypographyP>
          )}
        </div>
        <div className="space-y-2 md:space-y-4">
          {palettes?.length > 0 && (
            <TypographyH2 className="mb-0 text-left text-2xl">
              Generate More Palettes
            </TypographyH2>
          )}
          <form
            className="flex w-full max-w-full items-start space-x-2 md:max-w-2xl"
            onSubmit={onHandleSubmit}
          >
            <div className="space-y-2">
              <Input
                className="text-base border-gray-400 py-6"
                type="text"
                placeholder="Write your prompt"
                name="prompt"
              />
              <TypographyP className="text-sm text-gray-500 md:text-[1rem]">
                {
                  "Example prompt: Generate a color palette for a cloud computing platform that is dynamic, modern, and innovative in technology."
                }
              </TypographyP>
            </div>
            <Button
              variant={"subtle"}
              type="submit"
              className="bg-accent py-6"
              disabled={createPalette.isLoading}
            >
              {createPalette.isLoading ? "Generating..." : "Generate"}
            </Button>
          </form>
        </div>
      </section>
      <section title="Palettes" className="p-full">
        <TypographyH2 className="mb-0 text-left text-2xl">
          Color Palettes
        </TypographyH2>
        <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2">
          {palettes?.length > 0 &&
            palettes.map((palette) => (
              <ColorPalette palette={palette} key={palette.id} />
            ))}
        </div>
      </section>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.headers.cookie || "";

  if (!cookies) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const sessionToken = cookies
    ?.split("next-auth.session-token=")[1]
    ?.split(";")[0];

  // do a db query to get the user based on the session token
  const { userId } = (await prisma.session.findFirst({
    where: {
      sessionToken,
    },
    select: {
      userId: true,
    },
  })) as { userId: string };
  const queryClient = new QueryClient();
  await queryClient.fetchQuery(["palettes"], async () => {
    const palettes = await getPalettes(userId);
    return JSON.parse(JSON.stringify(palettes)) as PaletteWithColors[];
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Palette;
