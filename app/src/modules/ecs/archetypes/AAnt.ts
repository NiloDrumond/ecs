import { IComponentConfig, World } from 'ape-ecs';
// import { Component } from '../interfaces';
import { VAnt } from '@render/mesh/meshes';
import { srandom } from '@utils/math';
import { IPosition, IMesh } from '../interfaces/components';

let antId = 0;

function createAntComponents(): IComponentConfig[] {
  const position: Component<IPosition> = {
    type: 'CPosition',
    x: srandom() * 200,
    y: srandom() * 200,
    angle: srandom() * Math.PI,
  };

  const mesh: Component<IMesh> = {
    type: 'CMesh',
    vertices: VAnt,
    identifier: 'VAnt',
    generated: false,
  };

  return [position, mesh];
}

export function spawnAnt(world: World): void {
  const antComponents = createAntComponents();
  let a;
  const e = world.createEntity({
    id: `ant-${++antId}`,
    tags: ['Agent', 'Ant'],
    components: antComponents,
  });
}
