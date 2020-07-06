import Phaser from "phaser";
import Entity from "./entity";

class PlayerGunShot extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y + 5, "sprGunShotPlayer");
    this.body.velocity.y = -200;
  }
}

export default PlayerGunShot;
