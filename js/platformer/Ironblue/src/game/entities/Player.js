import { GameObjects, Input } from 'phaser';
import { SPRITESHEETS } from '../assets';

export class Player extends GameObjects.Sprite 
{
    constructor(scene, x, y) {
        super(scene, x, y, 'player_idle');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true);

        this.state = 'idle';
        this.direction = 'right';
        this.wasOnGround = false;
        
        this.jumpCount = 0;
        this.maxJumps = 2;

        this._registerAnimations();
        this._registerInput();
    }

    _registerAnimations() 
    {
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

            anims.create({
                key: animKey,
                frames: anims.generateFrameNumbers(`player_${key}`, {
                    start: 0,
                    end: playerAnims[key].frameCount - 1
                }),
                frameRate: cfg.frameRate,
                repeat: cfg.repeat
            });
        }
    }

    _registerInput()
    {
        const kb = this.scene.input.keyboard;

        this.keyboard = kb.addKeys({
            left: Input.Keyboard.KeyCodes.A,
            right: Input.Keyboard.KeyCodes.D,
            jump: Input.Keyboard.KeyCodes.SPACE,
            attack: Input.Keyboard.KeyCodes.ENTER,
        });
    }

    _onJump()
    {
        if (this.state === 'death') return;

        console.log('_onJump called, jumpCount:', this.jumpCount, 'blocked.down:', this.body.blocked.down);

        if (this.jumpCount === 0 && this.body.blocked.down) {
            console.log('Jump!');
            this.body.setVelocityY(-150);
            this.jumpCount = 1;
            this._setState('jump_up');
        } else if (this.jumpCount === 1 && !this.body.blocked.down) {
            console.log('Double jump!');
            this.body.setVelocityY(-150);
            this.jumpCount = 2;
            this._setState('double_jump');
            this._onAnimComplete('double_jump', 'jump_up');
        }
    }

    _onAttack()
    {
        if (this.state === 'death') return;

        this._setState('attack');
        this._onAnimComplete('attack', 'idle');
    }

    _onAnimComplete(fromState, toState) {
        this.once('animationcomplete', () => {
            if (this.state === fromState) this._setState(toState);
        });
    }

    _setState(state)
    {
        if (this.state === state) return;

        this.state = state;
        this.anims.play(`player_${state}`, true);
    }

    update(delta)
    {
        if (this.state === 'death') return;

        const { jump, attack } = this.keyboard;

        if (Input.Keyboard.JustDown(jump))   this._onJump();
        if (Input.Keyboard.JustDown(attack))  this._onAttack();

        this._updateMovement();
        this._updateAerial();
    }

    _updateMovement()
    {
        if (this.state === 'attack') return;
        if (this.state === 'hit') return;

        const { left, right } = this.keyboard;
        const onGround = this.body.blocked.down;

        if (left.isDown) {
            this.body.setVelocityX(-100);
            this.setFlipX(true);
            this.direction = 'left';
            if (onGround && this.state !== 'run') this._setState('run');
        } else if (right.isDown) {
            this.body.setVelocityX(100);
            this.setFlipX(false);
            this.direction = 'right';
            if (onGround && this.state !== 'run') this._setState('run');
        } else {
            if (onGround) this.body.setVelocityX(0);
            if (onGround && this.state !== 'idle') this._setState('idle');
        }
    }

    _updateAerial()
    {
        if (this.state === 'attack') return;
        if (this.state === 'hit') return;
        if (this.state === 'double_jump') return;

        const onGround = this.body.blocked.down;

        if (onGround && !this.wasOnGround) {
            this.jumpCount = 0;
        }
        this.wasOnGround = onGround;

        if (onGround) return;

        if (this.body.velocity.y < 0) {
            this._setState('jump_up');
        } else if (this.body.velocity.y > 0) {
            this._setState('jump_down');
        }
    }

}