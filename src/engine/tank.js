import * as PIXI from "pixi.js";
import { uuidv4 } from "../utils/utils.js";

const onDragStart = function (event) {
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;
};

const onDragEnd = function () {
  this.alpha = 1;
  this.dragging = false;
  // set the interaction data to null
  this.data = null;
};

const onDragMove = function (dragOnTheseNuts) {
  const self = this;
  return function () {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent);
      this.x = Math.floor(newPosition.x / dragOnTheseNuts) * dragOnTheseNuts;
      this.y = Math.floor(newPosition.y / dragOnTheseNuts) * dragOnTheseNuts;
    }
  }.bind(self);
};

class TankSprite extends PIXI.Sprite {
  constructor(texture, id) {
    super(texture);
    this.id = id;
  }
}

class Tank {
  constructor(engine, id, x, y) {
    this.engine = engine;
    this.id = id || uuidv4();
    this.texture = PIXI.Texture.from(require("../../assets/tank.svg"));
    this.sprite = new TankSprite(this.texture, this.id);

    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.sprite
      .on("pointerdown", onDragStart)
      .on("pointerup", onDragEnd)
      .on("pointerupoutside", onDragEnd)
      .on("pointermove", onDragMove(this.engine.totalGridSize));

    this.sprite.x =
      Math.floor(x / this.engine.totalGridSize) * this.engine.totalGridSize;
    this.sprite.y =
      Math.floor(y / this.engine.totalGridSize) * this.engine.totalGridSize;
    this.sprite.width = this.engine.gridSize;
    this.sprite.height = this.engine.gridSize;
    // this.engine.app.stage.addChild(this.sprite);
    this.engine.tanksContainer.addChild(this.sprite)
  }
}

export default Tank;
