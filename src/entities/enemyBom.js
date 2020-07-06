import Phaser from "phaser";
import Entity from "./entity";

class EnemyHeavy extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprEneBom", "EnemyHeavy");
    this.play("sprEneBom");
    this.body.velocity.y = Phaser.Math.Between(50, 65);
  }
}

export default EnemyHeavy;
