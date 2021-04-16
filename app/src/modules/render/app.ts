import * as PIXI from 'pixi.js';
import PixiFps from 'pixi-fps';
import { install } from '@pixi/unsafe-eval';

// Apply the patch to PIXI
install(PIXI);

const app = new PIXI.Application({
  backgroundColor: 0x0e153a,
  resizeTo: window,
});

document.body.appendChild(app.view);

const fpsCounter = new PixiFps();

app.stage.addChild(fpsCounter);

// app.ticker.add((delta: number) => {

// });

// app.renderer.resize(window.innerWidth, window.innerHeight);
// window.onresize = () => {
//   app.renderer.resize(window.innerWidth, window.innerHeight);
// };

export default app;
