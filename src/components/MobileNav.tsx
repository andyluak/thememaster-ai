import { Menu, X } from "lucide-react";
import type { Session } from "next-auth";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  session: Session | null;
};

const MobileNav = ({ session }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModalOnClick = () => setIsOpen(false);

  return (
    <div className="z-50 md:hidden">
      <button onClick={() => setIsOpen(true)}>
        <Menu />
        <p className="sr-only">Open menu</p>
      </button>
      {isOpen && (
        <div className="p-full absolute top-5 left-0 flex h-screen w-full flex-col items-end space-y-6 bg-white">
          <button onClick={() => setIsOpen(false)}>
            <p className="sr-only">Close menu</p>
            <X />
          </button>
          <Link href="/" className="text-xl" onClick={closeModalOnClick}>
            Home
          </Link>
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="text-xl"
                onClick={closeModalOnClick}
              >
                Dashboard
              </Link>
              <Link
                className="rounded-md bg-accent px-8 py-2 text-xl"
                href="/api/auth/signout"
                onClick={closeModalOnClick}
              >
                Sign Out
              </Link>
            </>
          ) : (
            <>
              <Link
                className="rounded-md bg-accent px-8 py-2"
                href="/api/auth/signin"
                onClick={closeModalOnClick}
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileNav;
