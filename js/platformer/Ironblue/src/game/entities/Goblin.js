import { SPRITESHEETS } from '../assets';
import { Enemy } from './Enemy';

export class Goblin extends Enemy {
    constructor(scene, x, y, patrolDistance = 120) {
        super(scene, x, y, 'goblin_idle');

        this.direction = Math.random() < 0.5 ? -1 : 1;

        this.combat.hp = 2;
        this.combat.maxHp = 2;

        this.patrol = {
            distance: patrolDistance,
            startX: x,
            isChasing: false,
            isStopped: false,
            stopTimer: null,
        };

        this._registerAnimations();
        this._registerSounds();
        this._registerCollisions();
        this._setState('run');
    }

    _registerAnimations() {
        const { anims } = this.scene;
        const animsCfg = SPRITESHEETS.goblin;

        const configs = {
            idle:  { frameRate: 8,  repeat: -1 },
            run:   { frameRate: 10, repeat: -1 },
            attack:{ frameRate: 12, repeat: 0  },
            hit:   { frameRate: 10, repeat: 0  },
            death: { frameRate: 8,  repeat: 0  },
        };

        for (const [key, cfg] of Object.entries(configs)) {
            const animKey = `goblin_${key}`;
            if (anims.exists(animKey)) continue;

            anims.create({
                key: animKey,
                frames: anims.generateFrameNumbers(animKey, { start: 0, end: animsCfg[key].frameCount - 1 }),
                frameRate: cfg.frameRate,
                repeat: cfg.repeat,
            });
        }
    }

    _registerSounds() {
        this._addSound('attack', 'goblin');
        this._addSound('hit', 'goblin');
        this._addSound('death', 'goblin');
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

            this._setState('attack');
            this._onAnimComplete('attack', () => {
                if (!this.dead) this._setState('run');
            });
            player.hit(this);
        });
    }

    _tryDetectPlayer(player) {
        const dx = player.x - this.x;
        if (Math.abs(dx) > 200) return;

        this.patrol.isChasing = true;
        this.patrol.isStopped = true;
        this.body.setVelocityX(0);
        this._setState('idle');

        if (this.patrol.stopTimer) this.patrol.stopTimer.remove();

        this.patrol.stopTimer = this.scene.time.delayedCall(800, () => {
            if (!this.dead) {
                this.patrol.isStopped = false;
                this.patrol.stopTimer = null;
            }
        });
    }

    _updateChase(player) {
        if (this.patrol.isStopped) {
            this.body.setVelocityX(0);
            return;
        }

        const dx = player.x - this.x;
        if (Math.abs(dx) < 10) {
            this.patrol.isChasing = false;
            return;
        }

        this.direction = dx > 0 ? 1 : -1;
        this.setFlipX(this.direction < 0);
        this.body.setVelocityX(this.direction * 45);
        this._setState('run');
    }

    _updatePatrol() {
        if (this.patrol.isStopped) {
            this.body.setVelocityX(0);
            return;
        }

        this.body.setVelocityX(this.direction * 45);
        this._setState('run');

        const distanceFromStart = Math.abs(this.x - this.patrol.startX);
        if (distanceFromStart > this.patrol.distance) {
            this.direction *= -1;
            this.setFlipX(this.direction < 0);
        }

        if (this.body.blocked.left || this.body.blocked.right) {
            this.direction *= -1;
            this.setFlipX(this.direction < 0);
        }
    }

    update(time, delta) {
        super.update(time, delta);
        if (this.dead) return;
        if (this._knockbackTimer > 0) return;
        if (this.state === 'attack') return;

        const player = this.scene.player;

        if (player && !this.patrol.isChasing) {
            this._tryDetectPlayer(player);
        }

        if (this.patrol.isChasing && player) {
            this._updateChase(player);
        } else {
            this._updatePatrol();
        }
    }
}