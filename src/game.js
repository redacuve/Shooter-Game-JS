import './style.css';

import Phaser from 'phaser';
import SceneMainMenu from './scenes/sceneMainMenu';
import SceneMain from './scenes/sceneMain';
import SceneGameOver from './scenes/sceneGameOver';

const config = {
  type: Phaser.AUTO,
  width: 900,
  height: 650,
  backgroundColor: 'e5b374',
  parent: 'divId',
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [SceneMainMenu, SceneMain, SceneGameOver],
  pixelArt: true,
  roundPixels: true,
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
