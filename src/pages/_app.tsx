import type { DehydratedState } from "@tanstack/react-query";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { useState } from "react";
import "src/styles/globals.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/Toaster";

const MyApp: AppType<{
  session: Session | null;
  dehydratedState: DehydratedState;
}> = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
            refetchOnWindowFocus: false,
            cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={session}>
          <Navbar />
          <Component {...pageProps} />
          <Toaster />
          <Footer />
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
