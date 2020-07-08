import Phaser from "phaser";

class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: "SceneGameOver" });
  }
  init(data) {
    this.score = data.score;
  }

  preload() {
    this.load.image("sprBtnRestart", "assets/sprBtnRestart.png");
    this.load.image("sprBtnRestartHover", "assets/sprBtnRestartHover.png");
    this.load.image("sprBtnRestartDown", "assets/sprBtnRestartDown.png");

    this.load.audio("sndBtnOver", "assets/sndBtnOver.wav");
    this.load.audio("sndBtnDown", "assets/sndBtnDown.wav");

    this.load.html("nameform", "assets/text/nameform.html");
    this.load.html("leaderboard", "assets/text/leaderboard.html");
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown"),
    };

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.9,
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

    this.title = this.add.text(
      this.game.config.width * 0.5,
      this.game.config.height * 0.1,
      "GAME OVER",
      {
        fontFamily: "Player2",
        fontSize: "48px",
        fontStyle: "normal",
        color: "#ffffffff",
        align: "center",
      }
    );
    this.subtitle = this.add.text(
      this.game.config.width * 0.5,
      this.game.config.height * 0.18,
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

    const inputElements = this.add
      .dom(this.game.config.width * 0.5, this.game.config.height * 0.24)
      .createFromCache("nameform");

    const leaderboard = this.add
      .dom(this.game.config.width * 0.5, this.game.config.height * 0.55)
      .createFromCache("leaderboard");

    inputElements.addListener("click");

    inputElements.on("click", (event) => {
      if (event.target.name === "playButton") {
        let inputText = inputElements.getChildByName("nameField");
        if (inputText.value !== "") {
          inputElements.removeListener("click");
          inputElements.setVisible(false);
          console.log(inputText.value);
        } else {
          this.tweens.add({
            targets: inputElements,
            alpha: 0.2,
            duration: 250,
            ease: "Power3",
            yoyo: true,
          });
        }
      }
    });

    try {
      const userScores = [
        { score: 2130, user: "julian" },
        { score: 3360, user: "Julian" },
        { score: 1290, user: "Andrea" },
        { score: 2340, user: "andrea" },
        { score: 50, user: "rey" },
        { score: 3510, user: "Julian" },
        { score: 90, user: "Julian" },
        { user: "Marshall Chikari", score: 30 },
        { score: 15, user: "bbbb" },
        { score: 330, user: "FORTUNE FARAI MUSEKIWA" },
        { score: 600, user: "Julian" },
        { score: 560, user: "FORTUNE FARAI MUSEKIWA" },
      ];
      const container = leaderboard.getChildByID("list-highscores");
      userScores.forEach((score, index) => {
        const parentNode = document.createElement("div");
        const positionNode = document.createElement("div");
        const scoreNode = document.createElement("div");
        const userNode = document.createElement("div");

        parentNode.classList.add("score-container");
        positionNode.classList.add("score-position");
        scoreNode.classList.add("score-score");
        userNode.classList.add("score-name");

        positionNode.textContent = index + 1;
        scoreNode.textContent = score.score;
        userNode.textContent = score.user;

        parentNode.appendChild(positionNode);
        parentNode.appendChild(scoreNode);
        parentNode.appendChild(userNode);
        container.appendChild(parentNode);
      });
    } catch (error) {
      const node = document.createElement("div");
      node.classList.add("lista", "Elemento");
      node.textContent = error.message;
      container.appendChild(node);
    }
  }
}

export default SceneGameOver;
