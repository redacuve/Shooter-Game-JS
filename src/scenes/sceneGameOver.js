import Phaser from 'phaser';
import { getHighScores, saveScore } from '../api/apiHelper';
import { populateHighscores, setToNode } from './domHandler/gameOverDomHandler';

class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneGameOver' });
  }

  init(data) {
    this.score = data.score;
  }

  preload() {
    this.load.image('sprBtnRestart', 'assets/sprBtnRestart.png');
    this.load.image('sprBtnRestartHover', 'assets/sprBtnRestartHover.png');
    this.load.image('sprBtnRestartDown', 'assets/sprBtnRestartDown.png');

    this.load.audio('sndBtnOver', 'assets/sndBtnOver.wav');
    this.load.audio('sndBtnDown', 'assets/sndBtnDown.wav');

    this.load.html('nameform', 'assets/text/nameform.html');
    this.load.html('leaderboard', 'assets/text/leaderboard.html');
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.9,
      'sprBtnRestart',
    );
    this.btnRestart.setInteractive();
    this.btnRestart.on(
      'pointerover',
      () => {
        this.btnRestart.setTexture('sprBtnRestartHover');
        this.sfx.btnOver.play();
      },
      this,
    );
    this.btnRestart.on('pointerout', () => {
      this.btnRestart.setTexture('sprBtnRestart');
    });
    this.btnRestart.on(
      'pointerdown',
      () => {
        this.btnRestart.setTexture('sprBtnRestartDown');
        this.sfx.btnDown.play();
      },
      this,
    );
    this.btnRestart.on(
      'pointerup',
      () => {
        this.btnRestart.setTexture('sprBtnRestart');
        this.scene.start('SceneMain');
      },
      this,
    );

    this.title = this.add.text(
      this.game.config.width * 0.5,
      this.game.config.height * 0.1,
      'GAME OVER',
      {
        fontFamily: 'Player2',
        fontSize: '48px',
        fontStyle: 'normal',
        color: '#ffffffff',
        align: 'center',
      },
    );
    this.subtitle = this.add.text(
      this.game.config.width * 0.5,
      this.game.config.height * 0.18,
      `Your Score: ${this.score}`,
      {
        fontFamily: 'Player2',
        fontSize: '18px',
        fontStyle: 'normal',
        color: '#fff',
        align: 'center',
      },
    );

    this.title.setOrigin(0.5);
    this.subtitle.setOrigin(0.5);

    const leaderboard = this.add
      .dom(this.game.config.width * 0.5, this.game.config.height * 0.55)
      .createFromCache('leaderboard');

    const container = leaderboard.getChildByID('list-highscores');
    const userScores = getHighScores();
    userScores.then((result) => populateHighscores(container, result));

    if (this.score > 0) {
      const inputElements = this.add
        .dom(this.game.config.width * 0.5, this.game.config.height * 0.24)
        .createFromCache('nameform');
      inputElements.addListener('click');

      inputElements.on('click', (event) => {
        if (event.target.name === 'playButton') {
          const inputText = inputElements.getChildByName('nameField');
          if (inputText.value !== '') {
            inputElements.removeListener('click');
            inputElements.setVisible(false);
            setToNode(
              container,
              `<div class="spinner">
          <div class="cube1"></div>
          <div class="cube2"></div>`,
            );
            saveScore(inputText.value, this.score)
              .then(() => {
                getHighScores().then((result) => populateHighscores(container, result));
              })
              .catch((error) => {
                setToNode(
                  container,
                  `<div class="error-highscores">An Error has occurred. Error message: ${error}. Please try again later.</div>`,
                );
              });
          } else {
            this.tweens.add({
              targets: inputElements,
              alpha: 0.2,
              duration: 250,
              ease: 'Power3',
              yoyo: true,
            });
          }
        }
      });
    }
  }
}

export default SceneGameOver;
