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

        this.setLighting(true);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);

        this.state              = 'idle';
        this.direction          = 1;
        this.dead               = false;
        this._knockbackTimer    = 0;

        this.combat = {
            hp:                    1,
            maxHp:                 1,
            invincible:            false,
            invincibilityDuration: 300,
            invincibilityTimer:    0,
        };

        this._sounds = {};
    }

    /**
     * Override in subclasses to register animations.
     * Call _addAnim(key, config) for each animation.
     */
    // _registerAnimations() {} // TODO

    /**
     * Override in subclasses to register sounds.
     * Call _addSound(action, entityKey) for each sound.
     */
    _registerSounds() {}

    /**
     * Registers all variants of a sound action.
     * @param {string} action    - e.g. 'hit', 'death', 'jump'
     * @param {string} entityKey - key in SOUNDS, e.g. 'player', 'slime'
     */
    _addSound(action, entityKey) {
        const keys = [];
        let i = 0;
        while (this.scene.cache.audio.exists(`${entityKey}_${action}_${i}`)) {
            keys.push(`${entityKey}_${action}_${i}`);
            i++;
        }
        if (keys.length > 0) {
            this._sounds[action] = keys;
        }
    }

    /**
     * Returns a volume scalar based on distance to the player.
     * @param {number} maxDist - Distance at which volume reaches 0.
     * @param {number} maxVol  - Volume at distance 0.
     */
    _spatialVolume(maxDist = 240, maxVol = 1.0) {
        const player = this.scene.player;
        if (!player) return maxVol;

        const dx   = this.x - player.x;
        const dy   = this.y - player.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // linear falloff — 0 at maxDist, maxVol at distance 0
        return maxVol * Math.max(0, 1 - dist / maxDist);
    }

    /**
     * Plays a random variant of a registered sound.
     * @param {string} action   - e.g. 'hit'
     * @param {object} config   - optional Phaser sound config
     * @param {boolean} spatial - whether to apply distance-based volume
     */
    _playSound(action, config = {}, spatial = false) {
        const variants = this._sounds[action];
        if (!variants?.length) return;

        const key    = variants[Math.floor(Math.random() * variants.length)];
        const volume = spatial
            ? this._spatialVolume()
            : (config.volume ?? 0.5);

        this.scene.sound.play(key, { volume, ...config });
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

        this._playSound('hit');
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

        this._playSound('death');

        this._setState('hit');
        this._onAnimComplete('hit', () => {
            this.body.setVelocity(0, 0);
            this._setState('death');
            this._onDeath();
        });
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

        this.body.setVelocity(
            (dx / len) * KNOCKBACK_FORCE, 
            (dy / len) * KNOCKBACK_FORCE
        );

        this._knockbackTimer = KNOCKBACK_DURATION;
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
        if(!this.dead) {
            this._updateInvincibility(delta);
        }

        if (this._knockbackTimer > 0) {
            this._knockbackTimer -= delta;
            const drag = Math.pow(0.001, delta / 1000);

            this.body.setVelocity(
                this.body.velocity.x * drag, 
                this.body.velocity.y * drag
            );
            return;
        }

        if (this.dead) return;
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

        this.setAlpha(Math.sin(Date.now() * 0.05) > 0 ? 1 : 0.1);
    }
}