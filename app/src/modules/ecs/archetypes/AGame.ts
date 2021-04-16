import { IComponentConfigValObject, World } from 'ape-ecs';
import { GlobalEntity } from '../interfaces';
import ISimulation from '../interfaces/components/ISimulation';

let simulationId = 0;

function createGameComponents(): IComponentConfigValObject {
  const simulation: Component<ISimulation> = {
    type: 'CSimulation',
    id: simulationId.toString(),
    name: 'Simulation',
  };
  simulationId++;

  return {
    simulation,
  };
}

export function generateGame(world: World): void {
  const gameComponents = createGameComponents();

  const e = world.createEntity({
    id: GlobalEntity.Game,
    c: gameComponents,
  });
}
