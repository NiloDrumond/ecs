import APE from 'ape-ecs';

import { IMovement } from '../interfaces/components';

export default class CMovement extends APE.Component implements IMovement {
  static type: ComponentType = 'CMovement';
  linearAcceleration: number;
  linearSpeed: number;
  linearMaxSpeed: number;
  angularAcceleration: number;
  angularSpeed: number;
  angularMaxSpeed: number;

  static properties = {
    linearAcceleration: 0.0,
    linearSpeed: 0.0,
    linearMaxSpeed: 0.0,
    angularAcceleration: 0.0,
    angularSpeed: 0.0,
    angularMaxSpeed: 0.0,
  };
}
