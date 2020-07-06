import Phaser from "phaser";

class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }

  preload(){
    this.load.image("sprBg0", "assets/sprBg0.png");
    this.load.spritesheet('sprPlayerP50D', 'assets/sprPlayerP50D.png', {
      frameWidth: 59,
      frameHeight: 53,
    });
  }

  create() {
    this.anims.create({
      key: 'sprPlayerP50D',
      frames: this.anims.generateFrameNumbers('sprPlayerP50D'),
      frameRate: 30,
      repeat: -1,
    });
  }
}

export default SceneMain;
