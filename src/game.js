import Phaser from 'phaser';

const config = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    backgroundColor: e5b374,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0, y: 0},
        }
    },
    scene: [
        SceneMainMenu,
        SceneMain,
        SceneGameOver,
    ],
    pixelArt: true,
    roundPixels: true,
}

new Phaser.Game(config);