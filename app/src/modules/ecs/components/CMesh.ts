import APE from 'ape-ecs';

import { IMesh } from '@ecs/interfaces/components';

export default class CMesh extends APE.Component implements IMesh {
  static type = 'CMesh';
  vertices: number[];
  identifier: string;
  generated: boolean;
  static properties = {
    vertices: [],
    generated: false,
    identifier: '',
  };
}
