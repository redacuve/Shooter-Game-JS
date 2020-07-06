import Phaser from "phaser";
import Player from "../entities/player";
import EnemyHeavy from "../entities/enemyBom";
import EnemySm from "../entities/enemySm";
import EnemyMedium from "../entities/enemyMid";

class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }

  preload() {
    this.load.image("sprBg0", "assets/sprBg0.png");
    this.load.image("sprGunShotEnemy", "assets/sprGunShotEnemy.png");
    this.load.image("sprGunShotPlayer", "assets/sprGunShotPlayer.png");

    this.load.spritesheet("sprExplosion", "assets/sprExplosion.png", {
      frameWidth: 65,
      frameHeight: 65,
    });

    this.load.spritesheet("sprPlayerP50D", "assets/sprPlayerP50D.png", {
      frameWidth: 59,
      frameHeight: 53,
    });
    this.load.spritesheet("sprPlayerP47D", "assets/sprPlayerP47D.png", {
      frameWidth: 57,
      frameHeight: 51,
    });
    this.load.spritesheet("sprPlayerP39", "assets/sprPlayerP39.png", {
      frameWidth: 58,
      frameHeight: 50,
    });

    this.load.spritesheet("sprEneBom", "assets/sprEneBom.png", {
      frameWidth: 143,
      frameHeight: 99,
    });
    this.load.spritesheet("sprEneMid", "assets/sprEneMid.png", {
      frameWidth: 79,
      frameHeight: 55,
    });
    this.load.spritesheet("sprEneSm", "assets/sprEneSm.png", {
      frameWidth: 61,
      frameHeight: 51,
    });

    this.load.audio("sndExpLong", "assets/sndExpLong.ogg");
    this.load.audio("sndExpMid", "assets/sndExpMid.ogg");
    this.load.audio("sndExpShort", "assets/sndExpShort.ogg");

    this.load.audio("sndP50DEng", "assets/sndP50DEng.wav");

    this.load.audio("sndPlayerGunShot", "assets/sndPlayerGunShot.wav");
  }

  create() {
    this.anims.create({
      key: "sprExplosion",
      frames: this.anims.generateFrameNames("sprExplosion"),
      frameRate: 30,
      repeat: 0,
    });

    this.anims.create({
      key: "sprPlayerP50D",
      frames: this.anims.generateFrameNumbers("sprPlayerP50D"),
      frameRate: 30,
      repeat: -1,
    });
    this.anims.create({
      key: "sprPlayerP47D",
      frames: this.anims.generateFrameNumbers("sprPlayerP47D"),
      frameRate: 30,
      repeat: -1,
    });
    this.anims.create({
      key: "sprPlayerP39",
      frames: this.anims.generateFrameNumbers("sprPlayerP39"),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: "sprEneBom",
      frames: this.anims.generateFrameNumbers("sprEneBom"),
      frameRate: 30,
      repeat: -1,
    });
    this.anims.create({
      key: "sprEneMid",
      frames: this.anims.generateFrameNumbers("sprEneMid"),
      frameRate: 30,
      repeat: -1,
    });
    this.anims.create({
      key: "sprEneSm",
      frames: this.anims.generateFrameNumbers("sprEneSm"),
      frameRate: 30,
      repeat: -1,
    });

    this.sfx = {
      explosions: [
        this.sound.add("sndExpLong"),
        this.sound.add("sndExpMid"),
        this.sound.add("sndExpShort"),
      ],
      engines: [this.sound.add("sndP50DEng")],
      playerGunShot: this.sound.add("sndPlayerGunShot"),
    };

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprPlayerP50D",
      "sprPlayerP50D"
    );

    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );
    this.keyLeft = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    this.keyRight = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.sfx.engines[0].play({ loop: true });

    this.enemies = this.add.group();
    this.enemyGunShots = this.add.group();
    this.playerGunShots = this.add.group();

    this.physics.add.collider(
      this.playerGunShots,
      this.enemies,
      (playerGunShot, enemy) => {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }

          enemy.explode(true);
          playerGunShot.destroy();
        }
      }
    );

    this.physics.add.collider(this.player, this.enemies, (player, enemy) => {
      if (!player.getData("isDead") && !enemy.getData("isDead")) {
        player.explode(false);
        enemy.explode(true);
      }
    });

    this.physics.add.collider(
      this.player,
      this.enemyGunShots,
      (player, gunShot) => {
        if (!player.getData("isDead") && !gunShot.getData("isDead")) {
          player.explode(false);
          gunShot.destroy();
          player.onDestroy();
        }
      }
    );

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        let enemy = null;
        if (Phaser.Math.Between(0, 10) >= 4) {
          enemy = new EnemySm(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          enemy = new EnemyMedium(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        } else {
          enemy = new EnemyHeavy(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        }
        this.enemies.add(enemy);
      },
      callbackScope: this,
      loop: true,
    });
  }

  checkFrustumCulling() {
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      if (
        enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displatHeight * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight
      ) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }

    for (let i = 0; i < this.enemyGunShots.getChildren().length; i += 1) {
      const gunShot = this.enemyGunShots.getChildren()[i];
      if (
        gunShot.x < -gunShot.displayWidth ||
        gunShot.x > this.game.config.width + gunShot.displayWidth ||
        gunShot.y < -gunShot.displayHeight * 4 ||
        gunShot.y > this.game.config.height + gunShot.displayHeight
      ) {
        if (gunShot) {
          gunShot.destroy();
        }
      }
    }

    for (let i = 0; i < this.playerGunShots.getChildren().length; i += 1) {
      const gunShot = this.playerGunShots.getChildren()[i];
      if (
        gunShot.x < -gunShot.displayWidth ||
        gunShot.x > this.game.config.width + gunShot.displayWidth ||
        gunShot.y < -gunShot.displayHeight * 4 ||
        gunShot.y > this.game.config.height + gunShot.displayHeight
      ) {
        if (gunShot) {
          gunShot.destroy();
        }
      }
    }
  }

  update() {
    if (!this.player.getData("isDead")) {
      this.player.update();
      if (this.keyUp.isDown) {
        this.player.moveUp();
      } else if (this.keyDown.isDown) {
        this.player.moveDown();
      }

      if (this.keyLeft.isDown) {
        this.player.moveLeft();
      } else if (this.keyRight.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData("isShooting", true);
      } else {
        this.player.setData(
          "timerShootTick",
          this.player.getData("timerShootDelay") - 1
        );
        this.player.setData("isShooting", false);
      }
    }

    this.checkFrustumCulling();
  }
}

export default SceneMain;
