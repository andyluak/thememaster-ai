import { ISimpleAiResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateAiPalette = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ prompt }: { prompt: string }) => {
      const magic = await fetch("/api/magic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const magicColors = (await magic.json()) as ISimpleAiResponse;
      const title = magicColors.title;
      delete magicColors["title"];
      const res = await fetch("/api/palette", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          colors: {
            primary: magicColors.primary,
            secondary: magicColors.secondary,
            accent: magicColors.accent,
            foreground: magicColors.foreground,
          },
          title,
        }),
      });
      if (!res.ok) {
        const { errors } = (await res.json()) as { errors: string[] };
        throw new Error(errors[0]);
      }
      return res.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["palettes"]);
    },
  });
};

export default useCreateAiPalette;
