import { GameObjects } from 'phaser';

export class Enemy extends GameObjects.Sprite
{
    constructor(scene, x, y, spriteKey)
    {
        super(scene, x, y, spriteKey);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true);

        this.state = 'idle';
        this.direction = -1;
        this.hp = 1;
    }

    _registerCollisions()
    {
        const player = this.scene.player;
        this.scene.physics.add.overlap(this, player, () => {
            player.hit();
        });
    }

    hit()
    {
        if (this.state === 'death') return;

        this.body.setVelocityX(0);
        this.hp--;

        if (this.hp <= 0) {
            this.die();
        } else {
            this._setState('hit');
            this._onAnimComplete('hit', 'idle');
        }
    }

    die()
    {
        if (this.state === 'death') return;

        this.body.setVelocityX(0);
        this._setState('death');
        this.once('animationcomplete', () => this.destroy());
    }

    _setState(state)
    {
        if (this.state === state) return;

        this.state = state;
        this.play(`${this.texture.key.split('_')[0]}_${state}`);
    }

    _onAnimComplete(fromState, toState)
    {
        this.once('animationcomplete', () => {
            if (this.state === fromState) this._setState(toState);
        });
    }

    update(time, delta) {}
}