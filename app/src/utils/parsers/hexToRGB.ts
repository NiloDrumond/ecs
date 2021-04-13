import { RGBA } from '@shared/interfaces';

export default function hexToRGB(hex: string, a: number): RGBA {
  return {
    r: parseInt(hex.slice(1, 3), 16) / 256,
    g: parseInt(hex.slice(3, 5), 16) / 256,
    b: parseInt(hex.slice(5, 7), 16) / 256,
    a,
  };
}
