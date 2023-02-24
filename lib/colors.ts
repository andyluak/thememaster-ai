import R from "ramda";

export const colors = {};

const getHalfHexValue = (hex: string, start: number, finish: number) =>
  R.pipe(
    (str: string, start: number, finish: number) => str.slice(start, finish),
    (sliced: string) => parseInt(sliced + sliced, 16)
  )(hex, start, finish);

const getHexValue = (hex: string, start: number, finish: number) =>
  R.pipe(
    (str: string, start: number, finish: number) => str.slice(start, finish),
    (sliced: string) => parseInt(sliced, 16)
  )(hex, start, finish);

const fullHex = (hex: string) => {
  const r = getHalfHexValue(hex, 1, 2);
  const g = getHalfHexValue(hex, 2, 3);
  const b = getHalfHexValue(hex, 3, 4);
  return { r, g, b, css: `rgb(${r}, ${g}, ${b})` };
};

export const hex2rgb = (cssHex: string) => {
  const hex = cssHex.replace("#", "");
  if (hex.length === 4) {
    return fullHex(hex);
  }

  const r = getHexValue(hex, 1, 3);
  const g = getHexValue(hex, 3, 5);
  const b = getHexValue(hex, 5, 7);

  return { r, g, b, css: `rgb(${r}, ${g}, ${b})` };
};

export const rgb2hex = (rgb: { r: number; g: number; b: number }) => {
  const { r, g, b } = rgb;
  const hex =
    "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return hex;
};
