import Phaser from "phaser";
import Entity from "./entity";

class EnemyMedium extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprEneMid", "EnemyMedium");
    this.play("sprEneMid");
    this.body.velocity.y = Phaser.Math.Between(65, 85);
  }
}

export default EnemyMedium;
