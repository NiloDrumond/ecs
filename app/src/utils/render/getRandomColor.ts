import { RGBA } from '@/modules/shared/interfaces';

export default function getRandomColor(): RGBA {
  return {
    r: Math.random(),
    g: Math.random(),
    b: Math.random(),
    a: 1,
  };
}
