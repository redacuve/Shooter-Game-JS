import Phaser from "phaser";
import SceneMainMenu from "./scenes/sceneMainMenu";
import SceneMain from "./scenes/sceneMain";
import SceneGameOver from "./scenes/sceneGameOver";

const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  backgroundColor: 'e5b374',
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [SceneMainMenu, SceneMain, SceneGameOver],
  pixelArt: true,
  roundPixels: true,
};

new Phaser.Game(config);
