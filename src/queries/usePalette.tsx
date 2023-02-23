import type { PaletteWithColors } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

function usePalette() {
  const router = useRouter();
  const { id = '' } = router.query;
  const {
    isLoading,
    isError,
    data: palette,
  } = useQuery({
    queryKey: ["palette", id],
    queryFn: async (context) => {
      const { queryKey } = context;
      const [, id] = queryKey;
      
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const res = await fetch(`/api/palette/${id}`);

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      return res.json() as Promise<PaletteWithColors>;
    },
  });

  return { isLoading, isError, palette };
}

export default usePalette;
