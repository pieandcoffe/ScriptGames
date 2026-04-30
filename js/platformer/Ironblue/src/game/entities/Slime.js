import { Enemy } from './Enemy';
import { SPRITESHEETS } from '../assets';

export class Slime extends Enemy
{
    constructor(scene, x, y, patrolDistance = 40)
    {
        super(scene, x, y, 'slime_idle');

        this.patrolDistance = patrolDistance;
        this.startX = x;
        this.wasBlocked = false;

        this._registerAnimations();
        this._registerCollisions();
        this._setState('walk');
    }

    _registerAnimations()
    {
        const anims = this.scene.anims;
        const slimeAnims = SPRITESHEETS.slime;

        const configs =
        {
            idle:  { frameRate: 8,  repeat: -1 },
            walk:  { frameRate: 12, repeat: -1 },
            hit:   { frameRate: 10, repeat: 0  },
            death: { frameRate: 8,  repeat: 0  },
        };

        for (const [key, cfg] of Object.entries(configs)) {
            const animKey = `slime_${key}`;
            if (anims.exists(animKey)) continue;

            anims.create({
                key: animKey,
                frames: anims.generateFrameNumbers(animKey, {
                    start: 0,
                    end: slimeAnims[key].frameCount - 1,
                }),
                frameRate: cfg.frameRate,
                repeat: cfg.repeat,
            });
        }
    }

    _setState(state)
    {
        super._setState(state);

        if (state === 'walk') {
            this.body.setOffset(0, 8);
        } else {
            this.body.setOffset(0, 0);
        }
    }

    update(time, delta)
    {
        if (this.state === 'death') return;
        if (this.state === 'hit')   return;

        this._updatePatrol();
    }

    _updatePatrol()
    {
        const blocked = this.body.blocked.left || this.body.blocked.right;
        let flipped = false;

        if (blocked && !this.wasBlocked) {
            this.direction *= -1;
            this.startX = this.x;
            flipped = true;
        }

        if (!flipped) {
            const distanceFromStart = Math.abs(this.x - this.startX);
            if (distanceFromStart >= this.patrolDistance) {
                this.direction *= -1;
                this.startX = this.x;
                flipped = true;
            }
        }

        this.wasBlocked = blocked;

        this.setFlipX(this.direction > 0);
        this.body.setVelocityX(20 * this.direction);
        if (this.state !== 'walk') this._setState('walk');
    }
}