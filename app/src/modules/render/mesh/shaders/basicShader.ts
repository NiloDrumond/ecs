import * as PIXI from 'pixi.js';

const shader = PIXI.Shader.from(
  `
  precision mediump float;
  attribute vec2 aVPos;
  attribute vec3 aIPos;
  attribute vec2 aCPos;
  attribute vec4 aICol;

  uniform mat3 translationMatrix;
  uniform mat3 projectionMatrix;

  varying vec4 vCol;

  vec2 rotate(vec2 v, float a) {
    float s = sin(a);
    float c = cos(a);
    mat2 m = mat2(c, s, -s, c);
    return m * v;
  }

  void main() {
    vCol = aICol;
    vec3 position = vec3((projectionMatrix * translationMatrix *  vec3(rotate(aVPos, aIPos.z) + aIPos.xy, 1.0)).xy, 1.0);

    gl_Position = vec4(( position ).xy, 0.0, 1.0);
  }
`,
  `
  precision mediump float;

  varying vec4 vCol;

  void main() {
    gl_FragColor = vCol;
  }
`,
);

export default shader;
