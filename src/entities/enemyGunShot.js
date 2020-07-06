import Phaser from "phaser";
import Entity from "./entity";

class EnemyGunShot extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y + 17, "sprGunShotEnemy");
    this.body.velocity.y = 200;
  }
}

export default EnemyGunShot;