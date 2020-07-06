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
  }

  create() {
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

  update() {
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
  }
}

export default SceneMain;
