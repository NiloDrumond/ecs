import APE from 'ape-ecs';
import ISimulation from '../interfaces/components/ISimulation';

export default class CSimulation extends APE.Component implements ISimulation {
  static type: ComponentType = 'CSimulation';
  name: string;

  static properties = {
    simId: '',
    name: '',
  };
}
