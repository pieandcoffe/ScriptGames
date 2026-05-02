import { Entity } from './Entity';

export class Enemy extends Entity {

    /**
     * Creates a new enemy instance.
     * @param {Phaser.Scene} scene - The scene to which the enemy belongs.
     * @param {number} x - The x-coordinate of the enemy's position.
     * @param {number} y - The y-coordinate of the enemy's position.
     * @param {string} spriteKey - The key for the enemy's sprite.
     */
    constructor(scene, x, y, spriteKey) {
        super(scene, x, y, spriteKey);
        this.direction = -1;
    }

    /**
     * Registers collisions for the enemy.
     */
    _registerCollisions() {
        const { player } = this.scene;
        this.scene.physics.add.overlap(this, player, () => {
            if (!this.dead && this.state !== 'hit') player.hit(this);
        });
    }

    /**
     * Called when the enemy is hit.
     */
    _onHitRecover() {
        this._setState('hit');
        this._onAnimComplete('hit', 'idle');
    }

    /**
     * Updates the enemy's state and position.
     * @param {number} time - The current time.
     * @param {number} delta - The time elapsed since the last update.
     */
    update(time, delta) {
        if (this.dead) return;
        super.update(time, delta);
    }
}