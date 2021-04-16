import * as PIXI from 'pixi.js';

import {
  RenderMeshDTO,
  MeshesData,
  RenderMeshData,
  UpdateMeshData,
  UpdateMeshDTO,
} from '@render/interfaces';
import { getMassCenter } from '@utils/math';
import app from '@render/app';
import { hexToRGB } from '@utils/parsers';
import getRandomColor from '@/utils/render/getRandomColor';
import { basicShader } from './shaders';

const positionSize = 3;
const colorSize = 4;

class MeshManager {
  private data: MeshesData = {};

  private generateMesh(meshId: string, meshData: RenderMeshData) {
    const { positions, vertices } = meshData;

    const geometry = new PIXI.Geometry().addAttribute('aVPos', vertices);
    geometry.instanced = true;

    geometry.instanceCount = positions.length;

    const buffer = new PIXI.Buffer(
      new Float32Array(geometry.instanceCount * (positionSize + colorSize)),
    );

    geometry.addAttribute(
      'aIPos',
      buffer,
      positionSize,
      false,
      PIXI.TYPES.FLOAT,
      4 * (positionSize + colorSize),
      0,
      true,
    );

    geometry.addAttribute(
      'aICol',
      buffer,
      colorSize,
      false,
      PIXI.TYPES.FLOAT,
      4 * (positionSize + colorSize),
      4 * positionSize,
      true,
    );

    // const antColor = hexToRGB('#364f6b', 1);

    for (let i = 0; i < geometry.instanceCount; i++) {
      const antColor = getRandomColor();
      const instanceOffset = i * (positionSize + colorSize);

      buffer.data[instanceOffset + 0] = positions[i].x;
      buffer.data[instanceOffset + 1] = positions[i].y;
      buffer.data[instanceOffset + 2] = positions[i].angle;
      buffer.data[instanceOffset + positionSize] = antColor.r;
      buffer.data[instanceOffset + positionSize + 1] = antColor.g;
      buffer.data[instanceOffset + positionSize + 2] = antColor.b;
      buffer.data[instanceOffset + positionSize + 3] = antColor.a;
    }

    const pixiMesh = new PIXI.Mesh(geometry, basicShader);

    pixiMesh.position.set(0, 0);
    app.stage.addChild(pixiMesh);

    this.data[meshId] = { buffer, geometry };
  }

  public generateMeshes(meshes: RenderMeshDTO): void {
    const keys = Object.keys(meshes);
    for (let i = 0; i < keys.length; i++) {
      this.generateMesh(keys[i], meshes[keys[i]]);
    }
  }

  private updateMesh(meshId: string, update: UpdateMeshData) {
    const { positions } = update;

    if (!this.data[meshId]) {
      throw new Error("trying to update mesh that hasn't been generated yet");
    }
    const { buffer } = this.data[meshId];
    for (let i = 0; i < positions.length; i++) {
      const instanceOffset = i * (positionSize + colorSize);

      buffer.data[instanceOffset + 0] = positions[i].x;
      buffer.data[instanceOffset + 1] = positions[i].y;
      buffer.data[instanceOffset + 2] = positions[i].angle;
    }
    buffer.update();
  }

  public updateMeshes(updates: UpdateMeshDTO): void {
    const keys = Object.keys(updates);
    for (let i = 0; i < keys.length; i++) {
      this.updateMesh(keys[i], updates[keys[i]]);
    }
  }
}

export default MeshManager;
