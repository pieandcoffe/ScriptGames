import { Entity } from './Entity';

export class Enemy extends Entity {
    constructor(scene, x, y, spriteKey) {
        super(scene, x, y, spriteKey);
        this.direction = -1;
    }

    _registerCollisions() {
        const { player } = this.scene;

        this.scene.physics.add.collider(player, this, () => {
            if (this.dead || this.state === 'hit') return;

            const playerBottom = player.body.bottom;
            const enemyTop     = this.body.top;
            const onHead       = playerBottom <= enemyTop + 10 && player.body.velocity.y >= 0;

            if (onHead) {
                this.hit(player);
                player.body.setVelocityY(-player.move.jump.velocity * 0.8);
                return;
            }

            player.hit(this);
        });
    }

    _playSound(action, config = {}) {
        super._playSound(action, config, true);
    }

    _onHitRecover() {
        this._setState('hit');
        this._onAnimComplete('hit', 'idle');
    }

    update(time, delta) {
        super.update(time, delta);
        if (this.dead) return;
    }
}