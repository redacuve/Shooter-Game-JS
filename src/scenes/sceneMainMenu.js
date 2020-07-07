import Phaser from "phaser";
import Player from "../entities/player";

class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMainMenu" });
  }

  preload() {
    this.load.image("dunes", "assets/dunes.png");

    this.load.image("sprBtnPlay", "assets/sprBtnPlay.png");
    this.load.image("sprBtnPlayHover", "assets/sprBtnPlayHover.png");
    this.load.image("sprBtnPlayDown", "assets/sprBtnPlayDown.png");
    this.load.image("sprBtnRestart", "assets/sprBtnRestart.png");
    this.load.image("sprBtnRestartHover", "assets/sprBtnRestartHover.png");
    this.load.image("sprBtnRestartDown", "assets/sprBtnRestartDown.png");

    this.load.image("sprBtnP51D", "assets/sprBtnP51D.png");
    this.load.image("sprBtnP51DSelected", "assets/sprBtnP51DSelected.png");
    this.load.image("sprBtnP47", "assets/sprBtnP47.png");
    this.load.image("sprBtnP47Selected", "assets/sprBtnP47Selected.png");
    this.load.image("sprBtnP39", "assets/sprBtnP39.png");
    this.load.image("sprBtnP39Selected", "assets/sprBtnP39Selected.png");

    this.load.audio("sndBtnOver", "assets/sndBtnOver.wav");
    this.load.audio("sndBtnDown", "assets/sndBtnDown.wav");
  }

  create() {
    this.charSelected = "sprPlayerP51D";

    this.dunes = this.add.tileSprite(
      0,
      0,
      this.game.config.width,
      this.game.config.height,
      "dunes"
    );
    this.dunes.setOrigin(0, 0);

    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown"),
    };

    this.btnP51D = this.add.sprite(
      this.game.config.width * 0.4,
      this.game.config.height * 0.5,
      "sprBtnP51DSelected"
    );

    this.btnP47 = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprBtnP47"
    );

    this.btnP39 = this.add.sprite(
      this.game.config.width * 0.6,
      this.game.config.height * 0.5,
      "sprBtnP39"
    );

    this.btnP51D.setInteractive();
    this.btnP47.setInteractive();
    this.btnP39.setInteractive();

    this.btnP51D.on(
      "pointerover",
      () => {
        this.btnP51D.setScale(15 * 0.1);
      },
      this
    );

    this.btnP51D.on("pointerout", () => {
      this.btnP51D.setScale(1);
    });

    this.btnP51D.on(
      "pointerdown",
      () => {
        this.btnP51D.setTexture("sprBtnP51DSelected");
        this.btnP47.setTexture("sprBtnP47");
        this.btnP39.setTexture("sprBtnP39");
        this.sfx.btnDown.play();
      },
      this
    );

    this.btnP51D.on(
      "pointerup",
      () => {
        this.charSelected = "sprPlayerP51D";
      },
      this
    );

    this.btnP47.on(
      "pointerover",
      () => {
        this.btnP47.setScale(15 * 0.1);
      },
      this
    );

    this.btnP47.on("pointerout", () => {
      this.btnP47.setScale(1);
    });

    this.btnP47.on(
      "pointerdown",
      () => {
        this.btnP51D.setTexture("sprBtnP51D");
        this.btnP47.setTexture("sprBtnP47Selected");
        this.btnP39.setTexture("sprBtnP39");
        this.sfx.btnDown.play();
      },
      this
    );

    this.btnP47.on(
      "pointerup",
      () => {
        this.charSelected = "sprPlayerP47";
      },
      this
    );

    this.btnP39.on(
      "pointerover",
      () => {
        this.btnP39.setScale(15 * 0.1);
      },
      this
    );

    this.btnP39.on("pointerout", () => {
      this.btnP39.setScale(1);
    });

    this.btnP39.on(
      "pointerdown",
      () => {
        this.btnP51D.setTexture("sprBtnP51D");
        this.btnP47.setTexture("sprBtnP47");
        this.btnP39.setTexture("sprBtnP39Selected");
        this.sfx.btnDown.play();
      },
      this
    );

    this.btnP39.on(
      "pointerup",
      () => {
        this.charSelected = "sprPlayerP39";
      },
      this
    );

    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.7,
      "sprBtnPlay"
    );
    this.btnPlay.setInteractive();
    this.btnPlay.on(
      "pointerover",
      () => {
        this.btnPlay.setTexture("sprBtnPlayHover");
        this.sfx.btnOver.play();
      },
      this
    );
    this.btnPlay.on("pointerout", () => {
      this.btnPlay.setTexture("sprBtnPlay");
    });
    this.btnPlay.on(
      "pointerdown",
      () => {
        this.btnPlay.setTexture("sprBtnPlayDown");
        this.sfx.btnDown.play();
      },
      this
    );
    this.btnPlay.on(
      "pointerup",
      () => {
        this.btnPlay.setTexture("sprBtnPlay");
        this.scene.start("SceneMain", { playerSelection: this.charSelected });
      },
      this
    );

    this.title = this.add.text(
      this.game.config.width * 0.5,
      128,
      "WAR DESERT SHOOTER",
      {
        fontFamily: "monospace",
        fontSize: 48,
        fontStyle: "bold",
        color: "#ffbb00",
        align: "center",
      }
    );

    this.title.setOrigin(0.5);

    this.subtitle = this.add.text(
      this.game.config.width * 0.5,
      200,
      "Select Your Plane",
      {
        fontFamily: "monospace",
        fontSize: 30,
        color: "#faf20f",
        align: "center",
      }
    );

    this.subtitle.setOrigin(0.5);
  }
}

export default SceneMainMenu;
