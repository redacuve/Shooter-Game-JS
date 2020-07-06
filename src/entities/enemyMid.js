import Phaser from "phaser";
import Entity from "./entity";
import EnemyGunShot from "./enemyGunShot";

class EnemyMedium extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprEneMid", "EnemyMedium");
    this.play("sprEneMid");
    this.body.velocity.y = Phaser.Math.Between(65, 85);
    this.shootTimer = this.scene.time.addEvent({
      delay: 1500,
      callback: () => {
        const gunShot = new EnemyGunShot(this.scene, this.x, this.y);
        this.scene.enemyGunShots.add(gunShot);
      },
      callbackScope: this,
      loop: true,
    });
  }
  
  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}

export default EnemyMedium;
