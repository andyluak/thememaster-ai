import type { PaletteWithColors } from "@/types";
import { useQuery } from "@tanstack/react-query";

function useResume(id: string) {
  const {
    isLoading,
    isError,
    data: palette,
  } = useQuery({
    queryKey: ["resume", id],
    queryFn: async () => {
      const res = await fetch(`/api/palette/${id}`);

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      return res.json() as Promise<PaletteWithColors>;
    },
  });

  return { isLoading, isError, palette };
}

export default useResume;
