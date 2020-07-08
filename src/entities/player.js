import Phaser from 'phaser';
import Entity from './entity';
import PlayerGunShot from './playerGunShot';

class Player extends Entity {
  constructor(scene, x, y, key, selected) {
    super(scene, x, y, key, 'Player');
    this.setData('speed', 200);
    this.play(selected);
    this.setData('isShooting', false);
    this.setData('timerShootDelay', 10);
    this.setData('timerShootTick', this.getData('timerShootDelay') - 1);
  }

  moveUp() {
    this.body.velocity.y = -this.getData('speed');
  }

  moveDown() {
    this.body.velocity.y = this.getData('speed');
  }

  moveLeft() {
    this.body.velocity.x = -this.getData('speed');
  }

  moveRight() {
    this.body.velocity.x = this.getData('speed');
  }

  update() {
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData('isShooting')) {
      if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
        this.setData('timerShootTick', this.getData('timerShootTick') + 1);
      } else {
        const gunShot = new PlayerGunShot(this.scene, this.x, this.y);
        this.scene.playerGunShots.add(gunShot);

        this.scene.sfx.playerGunShot.play();
        this.setData('timerShootTick', 0);
      }
    }
  }

  onDestroy() {
    this.scene.time.addEvent({
      delay: 5000,
      callback: () => {
        this.scene.scene.start('SceneGameOver', { score: this.scene.score });
      },
      callbackScope: this,
      loop: false,
    });
  }
}

export default Player;
