import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class PuzzlePiece {
  constructor(id, field) {
    this.field = field;
    this.sprite = new PIXI.Sprite(Globals.resources[`puzzle${id}`].texture);
    this.sprite.x = field.x;
    this.sprite.y = field.y;
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(0.5);

    this.setInteractive();
  }

  setInteractive() {
    this.sprite.interactive = true;
    this.sprite.on("pointerdown", this.onTouchStart, this);
    this.sprite.on("pointermove", this.onTouchMove, this);
    this.sprite.on("pointerup", this.onTouchEnd, this);
  }

  onTouchStart(e) {
    console.log(e);
    // 1. Remember the posisiton of the cursor
    this.touchPosition = { x: e.data.global.x, y: e.data.global.y };

    // 2. Set the dragging state for this sprite
    this.dragging = true;
  }

  onTouchEnd(e) {
    console.log(e);
    this.dragging = false;
  }

  onTouchMove(e) {
    if (!this.dragging) {
      return;
    }

    // 1. get the coordinates of cursor
    const currentPosition = { x: e.data.global.x, y: e.data.global.y };

    // 2. calcuate the offset (subtract touch from current)
    const offsetX = currentPosition.x - this.touchPosition.x;
    const offsetY = currentPosition.y - this.touchPosition.y;

    // 3. apply the resulting offset
    this.sprite.x = this.field.x + offsetX;
    this.sprite.y = this.field.y + offsetY;
  }
}
