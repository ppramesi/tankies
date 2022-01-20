import * as PIXI from "pixi.js";

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

const onDragMove = function () {
  if (this.dragging) {
    const newPosition = this.data.getLocalPosition(this.parent);
    this.x = Math.floor(newPosition.x / 38) * 38;
    this.y = Math.floor(newPosition.y / 38) * 38;
  }
};

function drawGrid(canvas) {
  canvas.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
    transparent: true,
    view: canvas,
  });

  let graphics = new PIXI.Graphics();
  graphics.beginFill("0xffd9b3");
  for (let x = 0; x < window.innerWidth; x += 38) {
    // const base = Math.floor(Math.random()*16777215)
    // graphics.beginFill('0x' + base.toString(16))
    for (let y = 0; y < window.innerHeight; y += 38) {
      // graphics.beginFill('0x' + (base + y).toString(16))
      graphics.drawRect(x, y, 30, 30);
    }
  }

  app.stage.addChild(graphics);

  let texture = PIXI.Texture.from(require("../assets/tank.svg"));
  let sprite = new PIXI.Sprite(texture);

  graphics.interactive = true;
  graphics.on("pointerdown", function (event) {
    console.log(event);
    console.log(this);
  });

  sprite.interactive = true;
  sprite.buttonMode = true;
  sprite
    .on("pointerdown", onDragStart)
    .on("pointerup", onDragEnd)
    .on("pointerupoutside", onDragEnd)
    .on("pointermove", onDragMove);
  // sprite.on('rightdown', function(event){
  //     event.stopPropagation()
  //     event.data.originalEvent.preventDefault()
  //     console.log('sprite rightdown')

  //     return false
  // })

  sprite.x = 38;
  sprite.y = 38;
  sprite.width = 30;
  sprite.height = 30;

  app.stage.addChild(sprite);
}

export default drawGrid;
