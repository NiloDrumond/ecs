import APE from 'ape-ecs';

import { meshManager } from '@render/mesh';
import { CMesh, CPosition } from '@ecs/components';
import { RenderMeshDTO, UpdateMeshDTO } from '@/modules/render/interfaces';

export default class RenderMeshSystem extends APE.System {
  private positionQuery: APE.Query;

  init(): void {
    this.positionQuery = this.createQuery().fromAll(CMesh, CPosition).persist();
  }

  update(): void {
    const entities = this.positionQuery.execute();
    const newMeshes: RenderMeshDTO = {};
    const updates: UpdateMeshDTO = {};
    for (const entity of entities) {
      const mesh = entity.getOne(CMesh);
      const pos = entity.getOne(CPosition);

      if (!mesh || !pos) return;

      if (mesh.generated) {
        if (updates[mesh.identifier]) {
          updates[mesh.identifier].positions.push(pos);
        } else {
          updates[mesh.identifier] = {
            positions: [pos],
          };
        }
      } else {
        if (newMeshes[mesh.identifier]) {
          newMeshes[mesh.identifier].positions.push(pos);
        } else {
          newMeshes[mesh.identifier] = {
            positions: [pos],
            vertices: mesh.vertices,
          };
        }
        mesh.generated = true;
        mesh.update();
      }
    }
    meshManager.generateMeshes(newMeshes);
    meshManager.updateMeshes(updates);
  }
}
