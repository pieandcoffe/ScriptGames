import { Scene } from 'phaser';
import { Player } from '../entities/Player';
import { Slime } from '../entities/Slime';
import { Camera } from '../core/camera';

export class Game extends Scene {
    constructor() {
        super('Game');

        this.levelWidth  = 3;
        this.levelHeight = 1;
    }

    create() {
        const viewportWidth = this.scale.width;
        const viewportHeight = this.scale.height;

        const height = viewportHeight * this.levelHeight;
        const width = viewportWidth * this.levelWidth;


        // Backgrounds (repeat across the full world width)
        this.bg0 = this.add.tileSprite(0, 0, width, height, 'background_bg_0').setOrigin(0, 0);
        this.bg1 = this.add.tileSprite(0, 0, width, height, 'background_bg_1').setOrigin(0, 0);
        this.bg2 = this.add.tileSprite(0, 0, width, height, 'background_bg_2').setOrigin(0, 0);

        // Lights
        this.lights.enable().setAmbientColor(0x333333);
        this.playerLight = this.lights.addLight(0, 0, 250, 0x333333, 2.0);
        this.torchLight = this.lights.addLight(width / 3, height / 1.5, 180, 0x333333, 2.5);
        this.torchLight = this.lights.addLight(width / 3, height / 1.5, 180, 0x333333, 2.5);

        // Ground
        this.ground = this.physics.add.staticImage(0, height - 48, null)
            .setOrigin(0, 0)
            .setDisplaySize(width, 48)
            .refreshBody()
            .setVisible(false);

        // Player
        this.player = new Player(this, viewportWidth / 2, height - 64);
        this.physics.add.collider(this.player, this.ground);
        this.player.body.setCollideWorldBounds(true);

        // Camera
        this.camera = new Camera(this, this.player, { worldWidth: width, worldHeight: height });

        // HUD
        this.scene.stop('Hud');
        this.scene.launch('Hud');
        this.hud = this.scene.get('Hud');

        this.scene.get('Hud').events.once('create', () => {
            this.hud.setup(this.player);
            this.player.on('hit', () => this.hud.setHealth(this.player.hp));
        });

        // Slimes
        this.slimes = this.add.group();
        this._spawnSlime(width / 4, height - 64, 200);

        // Sword overlap
        this.physics.add.overlap(this.player.sword, this.slimes, (sword, enemy) => {
            if (sword.hitTargets.has(enemy)) return;
            sword.hitTargets.add(enemy);
            enemy.hit(sword);
        });

        // Click to spawn slimes
        this.input.on('pointerdown', (pointer) => {
            this._spawnSlime(pointer.worldX, pointer.worldY, 200);
        });

        // World bounds
        this.physics.world.setBounds(0, 0, width, height);

        // Game over
        this.player.on('dead', () => {
            this.scene.stop('Hud');
            this.scene.start('GameOver');
        });
    }

    /**
     * Spawns a slime and registers its colliders.
     */
    _spawnSlime(x, y, patrolDistance) {
        const slime = new Slime(this, x, y, patrolDistance);
        this.slimes.add(slime);
        this.physics.add.collider(slime, this.ground);
    }

    update(time, delta) {
        const dt = delta / 16.667;

        this.camera.update();

        // Parallax background scrolling based on camera movement
        const deltaCamX = this.camera.getScrollDeltaX();
        this.bg0.tilePositionX += deltaCamX * 0.6;
        this.bg1.tilePositionX += deltaCamX * 0.4;
        this.bg2.tilePositionX += deltaCamX * 0.2;
        //this.bg3.tilePositionX += deltaCamX * 0.1;

        this.player.update(time, delta);
        this.playerLight.setPosition(this.player.x, this.player.y);
        this.slimes.getChildren().forEach(slime => slime.update(time, delta));
    }
}