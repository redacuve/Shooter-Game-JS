import Phaser from "phaser";
import Entity from "./entity";

class EnemySm extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprEneSm", "EnemySm");
    this.play("sprEneSm");
    this.body.velocity.y = Phaser.Math.Between(85, 110);
  }
}

export default EnemySm;
