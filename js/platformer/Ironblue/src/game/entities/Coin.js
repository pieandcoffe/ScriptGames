import { SPRITESHEETS } from '../assets';
import { Entity } from './Entity';

export class Coin extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, 'coin_spin');

        this.setOrigin(0.5, 0.5);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.body.setSize(8, 8);
        this.body.setCollideWorldBounds(false);

        this.collected = false;

        this._registerAnimations();
        this._registerSounds();
        this._setState('spin');
    }

    _registerAnimations() {
        const { anims } = this.scene;
        const coinAnims = SPRITESHEETS.coin;

        const configs = {
            spin:   { frameRate: 10, repeat: -1 },
            pickup: { frameRate: 14, repeat: 0 },
        };

        for (const [key, cfg] of Object.entries(configs)) {
            const animKey = `coin_${key}`;
            if (anims.exists(animKey)) continue;

            anims.create({
                key:       animKey,
                frames:    anims.generateFrameNumbers(animKey, {
                    start: 0,
                    end:   coinAnims[key].frameCount - 1,
                }),
                frameRate: cfg.frameRate,
                repeat:    cfg.repeat,
            });
        }
    }

    _registerSounds() {
        this._addSound('pickup', 'coin');
    }

    collect() {
        if (this.collected || this.dead) return;

        this.collected = true;
        if (this.body) {
            this.body.enable = false;
            this.body.setVelocity(0, 0);
        }

        this._playSound('pickup', { volume: 0.75 });
        this._setState('pickup');

        this.once('animationcomplete', () => {
            this.emit('collected');
            this.destroy();
        });
    }
}
