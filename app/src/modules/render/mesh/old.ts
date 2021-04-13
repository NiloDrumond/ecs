// import * as PIXI from 'pixi.js';

// import app from '@render/app';

// import { hexToRGB } from '@utils/parsers';
// import { RenderMeshDTO } from '../interfaces';

// const positionSize = 3;
// const centerSize = 2;
// const colorSize = 4;

// export function renderMeshes(meshes: RenderMeshDTO): void {
//   const keys = Object.keys(meshes);
//   for (let i = 0; i < keys.length; i++) {
//     const { positions, vertices } = meshes[keys[i]];

//     const geometry = new PIXI.Geometry().addAttribute('aVPos', vertices);
//     geometry.instanced = true;

//     geometry.instanceCount = positions.length;

//     const buffer = new PIXI.Buffer(
//       new Float32Array(
//         geometry.instanceCount * (positionSize + colorSize + centerSize),
//       ),
//     );

//     geometry.addAttribute(
//       'aIPos',
//       buffer,
//       positionSize,
//       false,
//       PIXI.TYPES.FLOAT,
//       4 * (positionSize + colorSize + centerSize),
//       0,
//       true,
//     );

//     geometry.addAttribute(
//       'aCPos',
//       buffer,
//       centerSize,
//       false,
//       PIXI.TYPES.FLOAT,
//       4 * (positionSize + colorSize + centerSize),
//       4 * positionSize,
//       true,
//     );

//     geometry.addAttribute(
//       'aICol',
//       buffer,
//       colorSize,
//       false,
//       PIXI.TYPES.FLOAT,
//       4 * (positionSize + colorSize + centerSize),
//       4 * (positionSize + centerSize),
//       true,
//     );

//     const antColor = hexToRGB('#364f6b', 1);

//     const massCenter = getMassCenter(vertices);

//     for (let i = 0; i < geometry.instanceCount; i++) {
//       const instanceOffset = i * (positionSize + colorSize + centerSize);

//       buffer.data[instanceOffset + 0] = positions[i].x;
//       buffer.data[instanceOffset + 1] = positions[i].y;
//       buffer.data[instanceOffset + 2] = positions[i].angle;
//       buffer.data[instanceOffset + 3] = massCenter[0];
//       buffer.data[instanceOffset + 4] = massCenter[1];
//       buffer.data[instanceOffset + 5] = antColor.r;
//       buffer.data[instanceOffset + 6] = antColor.g;
//       buffer.data[instanceOffset + 7] = antColor.b;
//       buffer.data[instanceOffset + 8] = antColor.a;
//     }

//     const triangles = new PIXI.Mesh(geometry, shader);

//     triangles.position.set(400, 300);

//     app.stage.addChild(triangles);
//   }
// }
