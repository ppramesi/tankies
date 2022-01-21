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
    this.texture = PIXI.Texture.from(require("../../assets/tank.svg"));
    this.totalGridSize = 0
    this.gridSize = 0
    this.tanks = []
    this.tiles = []
  }

  drawGrids(rectDim, rectDist) {
    this.totalGridSize = rectDim + rectDist
    this.gridSize = rectDim
    for (let x = 0; x < window.innerWidth; x += this.totalGridSize) {
      const myTile = []
      for (let y = 0; y < window.innerHeight; y += this.totalGridSize) {
        const tile = new PIXI.Sprite(PIXI.Texture.WHITE);
        tile.x = x
        tile.y = y
        tile.tint = 0xffd9b3
        tile.width = this.gridSize;
        tile.height = this.gridSize;
        this.app.stage.addChild(tile);
        myTile.push(tile)
      }
      this.tiles.push(myTile)
    }
  }

  insertTank(x, y){
    let sprite = new PIXI.Sprite(this.texture);

    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite
      .on("pointerdown", onDragStart)
      .on("pointerup", onDragEnd)
      .on("pointerupoutside", onDragEnd)
      .on("pointermove", onDragMove);

    sprite.x = Math.floor(x / this.totalGridSize) * this.totalGridSize;
    sprite.y = Math.floor(y / this.totalGridSize) * this.totalGridSize;
    sprite.width = this.gridSize;
    sprite.height = this.gridSize;

    this.tanks.push(sprite)

    this.app.stage.addChild(sprite);
  }
}

export default Engine;
