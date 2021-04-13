import APE from 'ape-ecs';

import app from '@render/app';
import { spawnAnt } from './archetypes/AAnt';
import { CPosition, CMesh } from './components';
import { SRenderMesh } from './systems';

import IPosition from './interfaces/components/IPosition';
import { SystemGroup } from './interfaces';

const world = new APE.World({
  trackChanges: true,
  entityPool: 100,
  cleanupPools: true,
  // useApeDestroy: true
});

world.registerTags('Agent', 'Ant');

world.registerComponent(CPosition, 100);
world.registerComponent(CMesh, 100);

world.registerSystem(SystemGroup.Render, SRenderMesh);

for (let i = 0; i < 50; i++) {
  spawnAnt(world);
}

app.ticker.add(() => {
  world.runSystems(SystemGroup.Render);
});

export default world;

export function runMainSystems(): void {
  world.runSystems(SystemGroup.Main);
  world.tick();
}
