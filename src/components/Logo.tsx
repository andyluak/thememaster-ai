import Link from "next/link";
import React from "react";

import LogoIcon from "public/logo.svg";

function Logo() {
  return (
    <div className="h-20 w-20">
      <Link href="/">
        <LogoIcon className="h-20 w-20" />
      </Link>
    </div>
  );
}

export default Logo;
