const colorConverter = require('rgba-convert');

export const rgbaToHex = (number: number): string => {
  const hex = colorConverter.hex(number);

  return hex === '#0000' ? 'transparent' : hex;
};
