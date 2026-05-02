import { SPRITESHEETS } from '../assets';
import { Enemy } from './Enemy';

export class Slime extends Enemy {

    /**
     * Creates a new slime instance.
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {number} patrolDistance
     */
    constructor(scene, x, y, patrolDistance = 40) {
        super(scene, x, y, 'slime_idle');

        this.direction = Math.random() < 0.5 ? -1 : 1;

        this.combat.hp    = 2;
        this.combat.maxHp = 2;

        this.patrol = {
            distance:   patrolDistance,
            startX:     x,
            wasBlocked: false,
            isStopped: false,
        };

        this._registerAnimations();
        this._registerCollisions();
        this._setState('walk');
    }

    /**
     * Registers the slime's animations.
     */
    _registerAnimations() {
        const { anims } = this.scene;
        const slimeAnims = SPRITESHEETS.slime;

        const configs = {
            idle:  { frameRate: 8,  repeat: -1 },
            walk:  { frameRate: 12, repeat: -1 },
            hit:   { frameRate: 10, repeat: 0  },
            death: { frameRate: 8,  repeat: 0  },
        };

        for (const [key, cfg] of Object.entries(configs)) {
            const animKey = `slime_${key}`;
            if (anims.exists(animKey)) continue;

            anims.create({
                key:       animKey,
                frames:    anims.generateFrameNumbers(animKey, {
                    start: 0,
                    end:   slimeAnims[key].frameCount - 1,
                }),
                frameRate: cfg.frameRate,
                repeat:    cfg.repeat,
            });
        }
    }

    /**
     * Overrides the default state setting to update the slime's body offset.
     * @param {string} state
     */
    _setState(state) {
        super._setState(state);
        this.body.setOffset(0, state === 'walk' ? 8 : 0);
    }

    /**
     * Updates the slime's patrol behavior.
     */
    _updatePatrol() {
        const { patrol } = this;

        if (patrol.isStopped) return;

        const blocked = this.body.blocked.left || this.body.blocked.right;

        if (blocked && !patrol.wasBlocked) {
            this.direction *= -1;
        } else if (Math.abs(this.x - patrol.startX) >= patrol.distance) {
            this._stopAndChooseDirection();
        } else {
            this.setFlipX(this.direction > 0);
            this.body.setVelocityX(20 * this.direction);
            if (this.state !== 'walk') this._setState('walk');
        }

        patrol.wasBlocked = blocked;
        this.setFlipX(this.direction > 0);
        this.body.setVelocityX(20 * this.direction);
        if (this.state !== 'walk') this._setState('walk');
    }

    /**
     * Triggers the slime to stop, play idle, wait 1s, pick new dir, then walk.
     */
    _stopAndChooseDirection() {
        const { patrol } = this;
        if (patrol.isStopped) return;

        patrol.isStopped = true;
        this.body.setVelocityX(0);
        
        if (patrol.stopTimer) patrol.stopTimer.remove();

        patrol.stopTimer = this.scene.time.delayedCall(1000, () => {
            this.direction   = Math.random() < 0.5 ? -1 : 1;
            patrol.startX    = this.x;
            patrol.isStopped = false;
            patrol.stopTimer = null;
            this._setState('walk');
        });
    }

    /**
     * Updates the slime's position and state.
     * @param {number} time
     * @param {number} delta
     */
    update(time, delta) {
        if (this.dead)            return;
        if (this.state === 'hit') return;

        super.update(time, delta);
        this._updatePatrol();
    }
}