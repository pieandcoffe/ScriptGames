import { Scene } from 'phaser';
import { Player } from '../entities/Player';
import { Slime } from '../entities/Slime';
import { Camera } from '../core/Camera';
import { LevelLoader, TILE_SIZE } from '../core/Level';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {
        const levelKey  = this.registry.get('currentLevel') ?? 'level-01';
        const levelData = this.cache.json.get(levelKey);

        this.loader = new LevelLoader(this);
        const { width, height, playerStart } = this.loader.load(levelData);

        // Lights
        this.lights.enable().setAmbientColor(0x333333);
        this.playerLight = this.lights.addLight(0, 0, 250, 0x333333, 2.0);
        this.torchLight = this.lights.addLight(width / 3, height / 1.5, 180, 0x333333, 2.5);
        this.torchLight = this.lights.addLight(width / 3, height / 1.5, 180, 0x333333, 2.5);

        // Player
        this.player = new Player(this, playerStart.x * TILE_SIZE, playerStart.y * TILE_SIZE);

        this.physics.add.collider(this.player, this.loader.groundSegments);
        this.physics.add.collider(this.player, this.loader.platforms);

        // Coins
        this.physics.add.overlap(this.player, this.loader.coins, (_, coin) => {
            coin.destroy();
            this.hud?.addScore?.(10);
        });

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

        // Enemies
        this.slimes = this.add.group();
        for (const def of this.loader.enemyDefs) {
            this._spawnSlime(def.x * TILE_SIZE, def.y * TILE_SIZE, def.patrol);
        }

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
        this.physics.world.setBounds(0, 0, width, height + 500);

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
        this.physics.add.collider(slime, this.loader.groundSegments);
        this.physics.add.collider(slime, this.loader.platforms);
    }

    _checkFallDeath() {
        if (this.player.y > this.loader.killY && !this.player.dead) {
            this.player.die(null);
        }
    }

    _checkLevelEnd(levelData) {
        if (!levelData.nextLevel) return;
        if (this.player.x >= this.physics.world.bounds.width - 20) {
            this.registry.set('currentLevel', levelData.nextLevel.replace('.json', ''));
            this.scene.stop('Hud');
            this.scene.restart();
        }
    }

    update(time, delta) {
        this.camera.update();

        const deltaCamX = this.camera.getScrollDeltaX();
        this.loader.updateBackgroundParallax(deltaCamX);

        this.player.update(time, delta);
        this.playerLight.setPosition(this.player.x, this.player.y);
        this.slimes.getChildren().forEach(slime => slime.update(time, delta));

        this._checkFallDeath();

        const levelData = this.cache.json.get(this.registry.get('currentLevel') ?? 'level-01');
        this._checkLevelEnd(levelData);
    }
}