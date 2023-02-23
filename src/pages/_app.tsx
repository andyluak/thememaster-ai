import type { DehydratedState } from "@tanstack/react-query";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import "src/styles/globals.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const queryClient = new QueryClient();

const MyApp: AppType<{
  session: Session | null;
  dehydratedState: DehydratedState;
}> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={session}>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
