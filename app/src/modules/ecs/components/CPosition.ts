import APE from 'ape-ecs';

import { IPosition } from '@ecs/interfaces/components';

export default class CPosition extends APE.Component implements IPosition {
  static type: ComponentType = 'CPosition';
  x: number;
  y: number;
  angle: number;
  static properties = {
    x: 0.0,
    y: 0.0,
    angle: 0.0,
  };
}
