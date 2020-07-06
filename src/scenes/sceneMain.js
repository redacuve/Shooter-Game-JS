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
  }

  create() {
    this.anims.create({
      key: "sprPlayerP50D",
      frames: this.anims.generateFrameNumbers("sprPlayerP50D"),
      frameRate: 30,
      repeat: -1,
    });

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprPlayerP50D',
      'sprPlayerP50D'
    );
  }
}

export default SceneMain;
