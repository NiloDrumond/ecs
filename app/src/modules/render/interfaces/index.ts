import { IPosition } from '@/modules/ecs/interfaces/components';
import * as PIXI from 'pixi.js';

export interface RenderMeshData {
  vertices: number[];
  positions: IPosition[];
}

export interface RenderMeshDTO {
  [meshId: string]: RenderMeshData;
}

export interface UpdateMeshData {
  positions: IPosition[];
}

export interface UpdateMeshDTO {
  [meshId: string]: UpdateMeshData;
}

export interface MeshData {
  buffer: PIXI.Buffer;
  geometry: PIXI.Geometry;
}

export interface MeshesData {
  [meshId: string]: MeshData;
}
