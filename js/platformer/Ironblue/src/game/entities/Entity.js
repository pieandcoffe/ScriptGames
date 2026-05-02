import { GameObjects } from 'phaser';

export class Entity extends GameObjects.Sprite {

    /**
     * Creates a new entity instance.
     * @param {Phaser.Scene} scene - The scene to which the entity belongs.
     * @param {number} x - The x-coordinate of the entity's position.
     * @param {number} y - The y-coordinate of the entity's position.
     * @param {string} spriteKey - The key for the entity's sprite.
     */
    constructor(scene, x, y, spriteKey) {
        super(scene, x, y, spriteKey);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);

        this.state     = 'idle';
        this.direction = 1;
        this.dead      = false;

        this.combat = {
            hp:                    1,
            maxHp:                 1,
            invincible:            false,
            invincibilityDuration: 300,
            invincibilityTimer:    0,
        };
    }

    /**
     * Gets the entity's current health points.
     * @returns {number} The entity's current health points.
     */
    get hp()    { return this.combat.hp; }

    /**
     * Gets the entity's maximum health points.
     * @returns {number} The entity's maximum health points.
     */
    get maxHp() { return this.combat.maxHp; }

    /**
     * Hits the entity with optional knockback from a source position.
     * @param {Phaser.Math.Vector2 | Phaser.GameObjects.Sprite} [source] - What caused the hit
     */
    hit(source) {
        if (this.dead)              return;
        if (this.combat.invincible) return;

        this.combat.invincible = true;
        this.combat.invincibilityTimer = this.combat.invincibilityDuration;
        this.combat.hp--;

        if (source && this.body) {
            this._applyKnockback(source);
        }

        this.emit('hit');

        if (this.combat.hp <= 0) {
            this.die(source);
        } else {
            this._onHitRecover();
        }
    }

    /**
     * Kills the entity.
     */
    die(source) {
        if (this.dead) return;
        this.dead = true;

        if (source && this.body) {
            this._applyKnockback(source);
        }

        this._setState('death');
        this._onDeath();
    }

    /**
     * Applies a velocity-based knockback away from the source.
     * @param {Phaser.Math.Vector2 | Phaser.GameObjects.Sprite} source
     */
    _applyKnockback(source) {
        const KNOCKBACK_FORCE    = 200; 
        const KNOCKBACK_DURATION = 100;

        const dx = this.x - source.x;
        const dy = this.y - source.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;

        const nx = dx / len;
        const ny = dy / len;

        this.body.setVelocity(nx * KNOCKBACK_FORCE, ny * KNOCKBACK_FORCE);

        this.scene.time.delayedCall(KNOCKBACK_DURATION, () => {
            if (this.body) {
                this.body.setVelocity(0, 0);
            }
        });
    }

    /**
     * Called when the entity is hit and recovers.
     */
    _onHitRecover() {
        this._setState('hit');
        this._onAnimComplete('hit', 'idle');
    }

    /**
     * Called when the entity dies.
     */
    _onDeath() {
        this.once('animationcomplete', () => { 
            this.destroy(); 
        });
    }

    /**
     * Sets the entity's state.
     * @param {string} state - The new state.
     */
    _setState(state) {
        if (this.state === state) return;
        this.state = state;
        this._playAnim(state);
    }

    /**
     * Plays the entity's animation for the given state.
     * @param {string} state - The state for which to play the animation.
     */
    _playAnim(state) {
        const prefix = this.texture.key.split('_')[0];
        this.play(`${prefix}_${state}`);
    }

    /**
     * Called when the entity's animation completes.
     * @param {string} fromState - The state from which the animation completed.
     * @param {string|function} toStateOrCallback - The state to which the entity should transition or a callback function.
     */
    _onAnimComplete(fromState, toStateOrCallback) {
        this.once('animationcomplete', () => {
            if (this.state !== fromState) return;
            if (typeof toStateOrCallback === 'function') {
                toStateOrCallback();
            } else {
                this._setState(toStateOrCallback);
            }
        });
    }

    /**
     * Updates the entity's state and position.
     * @param {number} time - The current time.
     * @param {number} delta - The time elapsed since the last update.
     */
    update(time, delta) {
        if (this.dead) return;
        this._updateInvincibility(delta);
    }

    /**
     * Updates the entity's invincibility state.
     * @param {number} delta - The time elapsed since the last update.
     */
    _updateInvincibility(delta) {
        const { combat } = this;
        if (!combat.invincible) return;

        combat.invincibilityTimer = Math.max(0, combat.invincibilityTimer - delta);

        if (combat.invincibilityTimer === 0) {
            combat.invincible = false;
            this.setAlpha(1);
            return;
        }

        this.setAlpha(Math.sin(Date.now() * 0.05) > 0 ? 1 : 0.3);
    }
}