import { CornerDownLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const SinglePalette = () => {
  return (
    <main>
      <section className="p-full">
        <Link href={"/dashboard"} className="flex flex-row items-center gap-2">
          <CornerDownLeft />
          Back
        </Link>
      </section>
    </main>
  );
};

export default SinglePalette;
