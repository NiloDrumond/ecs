import APE from 'ape-ecs';

import app from '@render/app';
import { spawnAnt } from './archetypes/AAnt';
import { generateGame } from './archetypes/AGame';
import { CPosition, CMesh, CSimulation, CMovement } from './components';
import { SRenderMesh, SMovement } from './systems';

import IPosition from './interfaces/components/IPosition';
import { GlobalEntity, SystemGroup } from './interfaces';

const world = new APE.World({
  trackChanges: true,
  entityPool: 100,
  cleanupPools: true,
  // useApeDestroy: true
});

world.registerTags('Agent', 'Ant');

world.registerComponent(CSimulation, 10);
world.registerComponent(CPosition, 100);
world.registerComponent(CMovement, 100);
world.registerComponent(CMesh, 100);

world.registerSystem(SystemGroup.Main, SMovement);
world.registerSystem(SystemGroup.Render, SRenderMesh);

generateGame(world);

for (let i = 0; i < 10; i++) {
  spawnAnt(world);
}

export function runMainSystems(): void {
  world.runSystems(SystemGroup.Main);
  world.tick();
}

let tick = 0;
app.ticker.add(() => {
  world.runSystems(SystemGroup.Render);
  if (tick % 20 === 0) {
    runMainSystems();
  }
  tick++;
});

// runMainSystems();

export default world;

const running = true;
let frameEnded = true;

let frameCounter = 0;

setInterval(() => {
  if (frameEnded) {
    frameEnded = false;
    runMainSystems();
    frameEnded = true;
    frameCounter++;
  }
}, 17);

setInterval(() => {
  // console.log(frameCounter);
  frameCounter = 0;
}, 1000);
