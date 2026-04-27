import * as Phaser from 'phaser';
import { SPRITESHEETS, IMAGES } from './assets.js';

class PlatformerScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Ironblue' });
    }

    preload() {
        // Load all spritesheets
        Object.entries(SPRITESHEETS).forEach(([category, animations]) => {
            Object.entries(animations).forEach(([animName, config]) => {
                const spriteKey = `${category}_${animName}`;
                this.load.spritesheet(spriteKey, config.path, {
                    frameWidth: config.frameWidth,
                    frameHeight: config.frameHeight
                });
            });
        });

        // Load all static images
        Object.entries(IMAGES).forEach(([category, images]) => {
            Object.entries(images).forEach(([imageName, path]) => {
                const imageKey = `${category}_${imageName}`;
                this.load.image(imageKey, path);
            });
        });

        // Progress bar
        this.load.on('progress', (value) => {
            console.log(`Loading... ${Math.round(value * 100)}%`);
        });
    }

    create() {
        // All assets loaded! Use them with keys: `${category}_${name}`
        // Examples:
        // - player_idle: this.add.sprite(x, y, 'player_idle')
        // - goblin_run: this.add.sprite(x, y, 'goblin_run')
        // - tiles_tileset_32x32: this.add.image(x, y, 'tiles_tileset_32x32')
        // - background_bg_0: this.add.image(x, y, 'background_bg_0')

        this.add.text(512, 64, 'Ironblue by Kyrylo Pylinskyi', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(512, 150, 'All assets loaded. Ready for development!', { fontSize: '16px', fill: '#aaa' }).setOrigin(0.5);
    }

    update() {
        // Update game logic here
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: PlatformerScene
};

const game = new Phaser.Game(config);
