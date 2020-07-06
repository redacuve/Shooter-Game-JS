import Phaser from "phaser";
import Player from "../entities/player";

class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }

  preload() {
    this.load.image("sprBg0", "assets/sprBg0.png");
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

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprPlayerP39",
      "sprPlayerP39"
    );

    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
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
