import type { PaletteWithColors } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function usePalettes() {
  const {
    isLoading,
    isError,
    data: palettes,
  } = useQuery({
    queryKey: ["palettes"],
    queryFn: async () => {
      const res = await fetch(`/api/palette`);

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      return res.json() as Promise<PaletteWithColors[]>;
    },
  });

  return { isLoading, isError, palettes };
}

export default usePalettes;
