import * as PIXI from 'pixi.js';
import PixiFps from 'pixi-fps';
import { install } from '@pixi/unsafe-eval';

// Apply the patch to PIXI
install(PIXI);

const app = new PIXI.Application({ backgroundColor: 0xf0f0f0 });

document.body.appendChild(app.view);

const fpsCounter = new PixiFps();

app.stage.addChild(fpsCounter);

// app.ticker.add((delta: number) => {

// });

export default app;
