import { SPRITESHEETS } from '../assets';
import { Entity } from './Entity';

export class Torch extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, 'tiki_torch_burning');

        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.body.setCollideWorldBounds(false);
        this.body.enable = false; // no collisions needed

        this.light = scene.lights.addLight(x, y - 8, 120, 0xff8833, 2.0);
        this._flickerTime = Math.random() * Math.PI * 2;

        this._registerAnimations();
        this._setState('burning');
    }

    _registerAnimations() {
        const { anims } = this.scene;
        const animKey = 'tiki_torch_burning';
        if (anims.exists(animKey)) return;

        anims.create({
            key: animKey,
            frames: anims.generateFrameNumbers(animKey, {
                start: 0,
                end: SPRITESHEETS.tiki_torch.burning.frameCount - 1,
            }),
            frameRate: 12,
            repeat: -1,
        });
    }

    _playAnim(state) {
        this.play(`tiki_torch_${state}`);
    }

    update(_, delta) {
        this._flickerTime += delta * 0.004;
        const flicker = Math.sin(this._flickerTime) * 0.15 + Math.sin(this._flickerTime * 2.7) * 0.08;
        this.light.intensity = 2.0 + flicker;
        this.light.radius    = 120 + flicker * 20;
    }

    destroy() {
        this.scene?.lights?.removeLight(this.light);
        super.destroy();
    }
}