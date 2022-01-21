import * as PIXI from "pixi.js";
import Tank from "./tank.js";

class TankContainer extends PIXI.Container {
  constructor() {
    super();
  }

  findById(id) {
    for (var i = 0, j = this.children.length; i < j; i++) {
      if (this.children[i].id === id) {
        return this.children[i];
      }
    }
  }
}

class Engine {
  constructor(canvas, width, height) {
    this.app = new PIXI.Application({
      width: width,
      height: height,
      antialias: true,
      transparent: true,
      view: canvas,
    });
    this.texture = PIXI.Texture.from(require("../assets/tank.svg"));
    this.totalGridSize = 0;
    this.gridSize = 0;
    this.tanksContainer = new TankContainer();
    this.tanks = [];
    this.tiles = [];
  }

  drawGrids(rectDim, rectDist) {
    this.totalGridSize = rectDim + rectDist;
    this.gridSize = rectDim;
    for (let x = 0; x < this.app.width; x += this.totalGridSize) {
      const myTile = [];
      for (let y = 0; y < this.app.height; y += this.totalGridSize) {
        const tile = new PIXI.Sprite(PIXI.Texture.WHITE);
        tile.x = x;
        tile.y = y;
        tile.tint = 0xffd9b3;
        tile.width = this.gridSize;
        tile.height = this.gridSize;
        this.app.stage.addChild(tile);
        myTile.push(tile);
      }
      this.tiles.push(myTile);
    }
    this.app.stage.addChild(this.tanksContainer);
  }

  moveTank(id, x, y) {
    const tankSprite = this.tanksContainer.findById(id).sprite;
    tankSprite.x = x;
    tankSprite.y = y;
  }

  insertTank(id, x, y) {
    const newTank = new Tank(this, id, x, y);
    this.tanks.push(newTank);
    // id = id || uuidv4();
    // let sprite = new PIXI.Sprite(this.texture);

    // // sprite.interactive = true;
    // // sprite.buttonMode = true;
    // // sprite
    // //   .on("pointerdown", onDragStart)
    // //   .on("pointerup", onDragEnd)
    // //   .on("pointerupoutside", onDragEnd)
    // //   .on("pointermove", onDragMove);

    // sprite.x = Math.floor(x / this.totalGridSize) * this.totalGridSize;
    // sprite.y = Math.floor(y / this.totalGridSize) * this.totalGridSize;
    // sprite.width = this.gridSize;
    // sprite.height = this.gridSize;

    // this.tanks.push({
    //   sprite,
    //   id,
    //   //add player data etc here later
    // });

    // this.app.stage.addChild(sprite);
  }
}

export default Engine;
