import APE from 'ape-ecs';

export default class CMovement extends APE.Component {
  static type = 'CMovement';
  linearAcceleration: number;
  linearSpeed: number;
  linearMaxSpeed: number;
  angularAccelarion: number;
  angularSpeed: number;
  angularMaxSpeed: number;

  static properties = {
    linearAcceleration: 0,
    linearSpeed: 0,
    linearMaxSpeed: 0,
    angularAccelarion: 0,
    angularSpeed: 0,
    angularMaxSpeed: 0,
  };
}
