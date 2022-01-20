import * as PIXI from "pixi.js";

class Engine {
  constructor(canvas, width, height) {
    this.app = new PIXI.Application({
      width: width,
      height: height,
      antialias: true,
      transparent: true,
      view: canvas,
    });
  }

  drawGrid(rectDim, rectDist) {
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill("0xffd9b3");
    for (let x = 0; x < window.innerWidth; x += rectDim + rectDist) {
      for (let y = 0; y < window.innerHeight; y += rectDim + rectDist) {
        this.graphics.drawRect(x, y, rectDim, rectDim);
      }
    }
    this.app.stage.addChild(this.graphics);
  }
}

export default Engine;
