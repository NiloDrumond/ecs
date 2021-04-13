import APE from 'ape-ecs';

import { IPosition } from '@ecs/interfaces/components';

export default class CPosition
  extends APE.Component
  implements Omit<IPosition, 'type'> {
  static type = 'CPosition';
  x: number;
  y: number;
  angle: number;
  static properties = {
    x: 0,
    y: 0,
    angle: 0,
  };
}
