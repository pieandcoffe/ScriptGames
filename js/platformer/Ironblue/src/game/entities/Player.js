import { GameObjects, Input } from 'phaser';
import { SPRITESHEETS } from '../assets';

export class Player extends GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player_idle');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true);

        this.state = 'idle';

        this.move = {
            jump: {
                count: 0,
                maxCount: 2,
                velocity: 200,
                doubleVelocity: 180,
                cutMultiplier: 0.35,
                cutApplied: false,
                wasOnGround: false,
                coyoteTime: 100,
                coyoteTimer: 0,
                bufferTime: 100,
                bufferTimer: 0,
            },
            gravity: {
                up: 280,
                down: 800,
                apex: 120,
                apexThreshold: 25,
            },
            run: { speed: 100 }
        };

        this._registerAnimations();
        this._registerInput();
    }

    _registerAnimations() {
        const anims = this.scene.anims;
        const playerAnims = SPRITESHEETS.player;

        const configs =
        {
            idle:         { frameRate: 8,  repeat: -1 },
            run:          { frameRate: 12, repeat: -1 },
            jump_up:      { frameRate: 10, repeat: 0  },
            jump_down:    { frameRate: 10, repeat: 0  },
            double_jump:  { frameRate: 10, repeat: 0  },
            attack:       { frameRate: 12, repeat: 0  },
            sword_attack: { frameRate: 12, repeat: 0  },
            hit:          { frameRate: 10, repeat: 0  },
            death:        { frameRate: 8,  repeat: 0  },
        };

        for (const [key, cfg] of Object.entries(configs)) {
            const animKey = `player_${key}`;
            if (anims.exists(animKey)) continue;

            anims.create(
                {
                    key: animKey,
                    frames: anims.generateFrameNumbers(`player_${key}`,
                        {
                            start: 0,
                            end: playerAnims[key].frameCount - 1
                        }),
                    frameRate: cfg.frameRate,
                    repeat: cfg.repeat
                });
        }
    }

    onHit() {
        if (this.state === 'death') return;
        if (this.state === 'hit') return;

        this._setState('hit');
        this._onAnimComplete('hit', 'idle');
    }

    onDie() {
        if (this.state === 'death') return;

        this._setState('death');
    }

    _registerInput() {
        const kb = this.scene.input.keyboard;

        this.keyboard = kb.addKeys({
            left: Input.Keyboard.KeyCodes.A,
            right: Input.Keyboard.KeyCodes.D,
            jump: Input.Keyboard.KeyCodes.SPACE,
            attack: Input.Keyboard.KeyCodes.ENTER,
        });
    }

    _onJump() {
        if (this.state === 'death') return;

        const jump = this.move.jump;

        if (jump.count === 0 && (this.body.blocked.down || jump.coyoteTimer > 0)) {
            this.body.setVelocityY(-jump.velocity);
            jump.count = 1;
            jump.cutApplied = false;
            jump.coyoteTimer = 0;
            jump.bufferTimer = 0;
            this._setState('jump_up');
        } else if (jump.count === 1 && !this.body.blocked.down) {
            this.body.setVelocityY(-jump.doubleVelocity);
            jump.count = 2;
            jump.cutApplied = false;
            jump.bufferTimer = 0;
            this._setState('double_jump');
            this._onAnimComplete('double_jump', 'jump_up');
        } else {
            jump.bufferTimer = jump.bufferTime;
        }
    }

    _onAttack() {
        if (this.state === 'death') return;

        this._setState('attack');
        this._onAnimComplete('attack', 'idle');
    }

    _onAnimComplete(fromState, toState) {
        this.once('animationcomplete', () => {
            if (this.state === fromState) this._setState(toState);
        });
    }

    _setState(state) {
        if (this.state === state) return;

        this.state = state;
        this.anims.play(`player_${state}`, true);
    }

    update(delta) {
        if (this.state === 'death') return;

        const { jump: jumpKey, attack } = this.keyboard;
        const jumpData = this.move.jump;

        jumpData.coyoteTimer = Math.max(0, jumpData.coyoteTimer - delta);
        jumpData.bufferTimer = Math.max(0, jumpData.bufferTimer - delta);

        if (Input.Keyboard.JustDown(jumpKey)) this._onJump();
        if (Input.Keyboard.JustDown(attack)) this._onAttack();

        if (jumpKey.isUp && this.body.velocity.y < 0 && jumpData.count > 0 && !jumpData.cutApplied) {
            this.body.setVelocityY(this.body.velocity.y * jumpData.cutMultiplier);
            jumpData.cutApplied = true;
        }

        this._updateGravity();
        this._updateMovement();
        this._updateAerial(delta);
    }

    _updateGravity() {
        const { gravity } = this.move;
        const vy = this.body.velocity.y;
        const atApex = Math.abs(vy) < gravity.apexThreshold;

        let g;
        if (atApex) g = gravity.apex;
        else if (vy < 0) g = gravity.up;
        else g = gravity.down;

        this.body.setGravityY(g);
    }

    _updateAerial(delta) {
        if (this.state === 'attack') return;
        if (this.state === 'hit') return;
        if (this.state === 'double_jump') return;

        const onGround = this.body.blocked.down;
        const jump = this.move.jump;

        if (!onGround && jump.wasOnGround) {
            if (jump.count === 0) jump.coyoteTimer = jump.coyoteTime;
        }

        if (onGround && !jump.wasOnGround) {
            jump.count = 0;

            if (jump.bufferTimer > 0) {
                jump.bufferTimer = 0;
                this._onJump();
                jump.wasOnGround = onGround;
                return;
            }
        }

        jump.wasOnGround = onGround;
        if (onGround) return;

        if (this.body.velocity.y < 0) this._setState('jump_up');
        else if (this.body.velocity.y > 0) this._setState('jump_down');
    }

    _updateMovement() {
        if (this.state === 'attack') return;
        if (this.state === 'hit') return;

        const { left, right } = this.keyboard;
        const onGround = this.body.blocked.down;

        if (left.isDown) {
            this.body.setVelocityX(-this.move.run.speed);
            this.setFlipX(true);
            if (onGround && this.state !== 'run') this._setState('run');
        } else if (right.isDown) {
            this.body.setVelocityX(this.move.run.speed);
            this.setFlipX(false);
            if (onGround && this.state !== 'run') this._setState('run');
        } else {
            if (onGround) this.body.setVelocityX(0);
            if (onGround && this.state !== 'idle') this._setState('idle');
        }
    }

}