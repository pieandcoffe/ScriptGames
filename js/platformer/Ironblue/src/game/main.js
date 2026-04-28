import { Game as PhaserGame, Scale } from 'phaser';
import { Boot } from './scenes/Boot';
import { Preloader } from './scenes/Preloader';
import { MainMenu } from './scenes/MainMenu';
import { Game as MainGame } from './scenes/Game';
import { GameOver } from './scenes/GameOver';

const config = {
    type: 2, // WEBGL
    width: 240,
    height: 160,
    zoom: 4,
    pixelArt: true,
    roundPixels: true,
    backgroundColor: '#000000',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false,
        },
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver,
    ],
};

const StartGame = (parent) => {
    return new PhaserGame({ ...config, parent });
};

export default StartGame;