import { Inter } from "@next/font/google";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

import Logo from "./Logo";

const inter = Inter({ subsets: ["latin"] });

function Navbar() {
  const { data: session } = useSession();
  return (
    <header
      className={clsx(
        "p-full flex flex-row items-center justify-between",
        inter.className
      )}
    >
      <Logo />
      <nav className="flex flex-row items-center gap-6  md:gap-10 md:text-lg">
        <Link href="/">Home</Link>
        <Link href="/help/faq">FAQ</Link>
        {session ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link
              className="rounded-md bg-accent px-8 py-2"
              href="/api/auth/signout"
            >
              Sign Out
            </Link>
          </>
        ) : (
          <>
            <Link
              className="rounded-md bg-accent px-8 py-2"
              href="/api/auth/signin"
            >
              Sign In
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
