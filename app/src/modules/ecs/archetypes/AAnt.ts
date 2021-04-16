import { IComponentConfig, World } from 'ape-ecs';
// import { Component } from '../interfaces';
import { VAnt } from '@render/mesh/meshes';
import { IPosition, IMesh, IMovement } from '../interfaces/components';

let antId = 0;

function createAntComponents(): IComponentConfig[] {
  const position: Component<IPosition> = {
    type: 'CPosition',
    x: Math.random() * 200,
    y: Math.random() * 200,
    angle: Math.random() * Math.PI,
  };

  const mesh: Component<IMesh> = {
    type: 'CMesh',
    vertices: VAnt,
    identifier: 'VAnt',
    generated: false,
  };

  const movement: Component<IMovement> = {
    type: 'CMovement',
    angularAcceleration: Math.random(),
    angularMaxSpeed: 0,
    angularSpeed: 0,
    linearAcceleration: Math.random() / 10,
    linearMaxSpeed: 10,
    linearSpeed: 0,
  };

  return [position, mesh, movement];
}

export function spawnAnt(world: World): void {
  const antComponents = createAntComponents();

  const e = world.createEntity({
    id: `ant-${++antId}`,
    tags: ['Agent', 'Ant'],
    components: antComponents,
  });
  console.log(e);
}
