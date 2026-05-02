import { Scene } from 'phaser';
import { Player } from '../entities/Player';
import { Slime } from '../entities/Slime';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {
        const { width, height } = this.scale;

        // Backgrounds
        this.bg0 = this.add.tileSprite(0, 0, width, height, 'background_bg_0').setOrigin(0, 0);
        this.bg1 = this.add.tileSprite(0, 0, width, height, 'background_bg_1').setOrigin(0, 0);

        // Ground
        this.ground = this.physics.add.staticImage(width / 2, height - 8, null)
            .setDisplaySize(width, 16)
            .refreshBody()
            .setVisible(false);

        // Player
        this.player = new Player(this, width / 2, height - 32);
        this.physics.add.collider(this.player, this.ground);
        this.player.body.setCollideWorldBounds(true);

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
        this._spawnSlime(width / 4, height - 32, 200);

        // Sword overlap
        this.physics.add.overlap(this.player.sword, this.slimes, (sword, enemy) => {
            if (sword.hitTargets.has(enemy)) return;
            sword.hitTargets.add(enemy);
            enemy.hit(sword);
        });

        // Click to spawn slimes
        this.input.on('pointerdown', (pointer) => {
            this._spawnSlime(pointer.x, pointer.y, 200);
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
        this.bg0.tilePositionX += 0.25 * dt;
        this.bg1.tilePositionX += 0.4  * dt;

        this.player.update(delta);
        this.slimes.getChildren().forEach(slime => slime.update(time, delta));
    }
}