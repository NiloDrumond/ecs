import APE from 'ape-ecs';

export default class Game extends APE.Component {
  static properties = {
    deltaTime: 0,
    deltaFrame: 0,
    width: 0,
    height: 0,
    layers: null,
  };
}
