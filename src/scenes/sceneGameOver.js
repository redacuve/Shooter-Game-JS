import Phaser from "phaser";

class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: "SceneGameOver" });
  }
  init(data) {
    this.score = data.score;
  }

  preload() {
    this.load.image("sprBtnRestart", "content/sprBtnRestart.png");
    this.load.image("sprBtnRestartHover", "content/sprBtnRestartHover.png");
    this.load.image("sprBtnRestartDown", "content/sprBtnRestartDown.png");

    this.load.audio("sndBtnOver", "content/sndBtnOver.wav");
    this.load.audio("sndBtnDown", "content/sndBtnDown.wav");
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown"),
    };

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprBtnRestart"
    );
    this.btnRestart.setInteractive();
    this.btnRestart.on(
      "pointerover",
      () => {
        this.btnRestart.setTexture("sprBtnRestartHover");
        this.sfx.btnOver.play();
      },
      this
    );
    this.btnRestart.on("pointerout", () => {
      this.btnRestart.setTexture("sprBtnRestart");
    });
    this.btnRestart.on(
      "pointerdown",
      () => {
        this.btnRestart.setTexture("sprBtnRestartDown");
        this.sfx.btnDown.play();
      },
      this
    );
    this.btnRestart.on(
      "pointerup",
      () => {
        this.btnRestart.setTexture("sprBtnRestart");
        this.scene.start("SceneMain");
      },
      this
    );

    this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
      fontFamily: "Player2",
      fontSize: "48px",
      fontStyle: "normal",
      color: "#ffffffff",
      align: "center",
    });
    this.subtitle = this.add.text(
      this.game.config.width * 0.5,
      195,
      "Your Score: " + this.score,
      {
        fontFamily: "Player2",
        fontSize: "18px",
        fontStyle: "normal",
        color: "#fff",
        align: "center",
      }
    );

    this.title.setOrigin(0.5);
    this.subtitle.setOrigin(0.5);
  }
}

export default SceneGameOver;
