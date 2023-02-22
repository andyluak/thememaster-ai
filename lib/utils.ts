/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/unbound-method */

/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import * as R from "ramda";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const blobify = (data: unknown) => {
  return R.pipe(
    JSON.stringify,
    (str: BlobPart) => new Blob([str], { type: "application/json" })
  )(data);
};

export const saveAsJson = (data: unknown) => {
  const blob = blobify(data);

  const element = document.createElement("a");
  element.href = URL.createObjectURL(blob);
  element.download = "myFile.json";
  document.body.appendChild(element);
  element.click();
};
