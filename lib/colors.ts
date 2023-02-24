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

export const rgbToHsl = (
  r: number,
  g: number,
  b: number
): [number, number, number] => {
  // Convert to 0 to 1 range
  (r /= 255), (g /= 255), (b /= 255);

  // Get the max and min of the RGB values
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);

  // Initialize the hue and saturation
  let h = 0,
    s;

  // Calculate the hue
  if (max === min) h = 0;
  else if (r === max) h = (g - b) / (max - min);
  else if (g === max) h = 2 + (b - r) / (max - min);
  else if (b === max) h = 4 + (r - g) / (max - min);

  // Convert to degrees
  h = Math.min(h * 60, 360);

  // Convert negative hues to positive equivalent
  if (h < 0) h += 360;

  // Calculate the lightness
  const l = (min + max) / 2;

  // Calculate the saturation
  if (max === min) s = 0;
  else s = (max - min) / (1 - Math.abs(2 * l - 1));

  // Format and return the result
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
};
