import { Input, Math as PMath } from 'phaser';
import { SPRITESHEETS } from '../assets';
import { Entity } from './Entity';
import { Sword } from './Sword';

export class Player extends Entity {

    /**
     * Creates a new player instance.
     * @param {Phaser.Scene} scene - The scene to which the player belongs.
     * @param {number} x - The x-coordinate of the player's position.
     * @param {number} y - The y-coordinate of the player's position.
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'player_idle');

        this.combat.hp                    = 3;
        this.combat.maxHp                 = 3;
        this.combat.invincibilityDuration = 1000;

        this.move = {
            jump: {
                count:          0,
                maxCount:       2,
                velocity:       250,
                doubleVelocity: 180,
                cutMultiplier:  0.35,
                cutApplied:     false,
                wasOnGround:    false,
                coyoteTime:     100,
                coyoteTimer:    0,
                bufferTime:     100,
                bufferTimer:    0,
            },
            dash: {
                speed:          300,
                duration:       150,
                cooldown:       600,  
                timer:          0, 
                cooldownTimer:  0,   
                active:         false,
                invincible:     true,
            },
            gravity: {
                up:             280,
                down:           800,
                apex:           120,
                apexThreshold:  25,
            },
            run: { speed: 100 },
        };

        this._stepTimer = 0;
        this._stepInterval = 300;

        this._dashBlinkTimer = 0;
        this._dashBlinkInterval = 5;

        this.sword = new Sword(scene, this);

        this._registerAnimations();
        this._registerSounds();
        this._registerInput();
    }

    /**
     * Registers the player's animations.
     */
    _registerAnimations() {
        const { anims } = this.scene;
        const playerAnims = SPRITESHEETS.player;

        const configs = {
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
                key:       animKey,
                frames:    anims.generateFrameNumbers(`player_${key}`, {
                    start: 0,
                    end:   playerAnims[key].frameCount - 1,
                }),
                frameRate: cfg.frameRate,
                repeat:    cfg.repeat,
            });
        }
    }

    /**
     * Registers the player's sounds based on the sound manifest.
     */
    _registerSounds() {
        this._addSound('walk',        'player');
        this._addSound('jump',        'player');
        this._addSound('double_jump', 'player');
        this._addSound('attack',      'player');
        this._addSound('sword_attack','player');
        this._addSound('hit',         'player');
        this._addSound('dash',        'player');
        this._addSound('death',       'player');
    }

    /**
     * Registers the player's input keys.
     */
    _registerInput() {
        this.keyboard = this.scene.input.keyboard.addKeys({
            left:   Input.Keyboard.KeyCodes.A,
            right:  Input.Keyboard.KeyCodes.D,
            up:     Input.Keyboard.KeyCodes.W, 
            jump:   Input.Keyboard.KeyCodes.SPACE,
            dash:   Input.Keyboard.KeyCodes.SHIFT,
            attack: Input.Keyboard.KeyCodes.ENTER,
        });
    }

    /**
     * Plays the player's animation for the given state.
     * @param {string} state - The state for which to play the animation.
     */
    _playAnim(state) {
        this.anims.play(`player_${state}`, true);
    }

    /**
     * Called when the player is hit and recovers.
     */
    _onHitRecover() {
        this._setState('hit');
        this.once('animationcomplete', () => {
            this.combat.invincibilityTimer = this.combat.invincibilityDuration;
            this._setState('idle');
        });
    }

    /**
     * Called when the player dies.
     */
    _onDeath() {
        console.log('Player died');
        this._onAnimComplete('death', () => {
            this.setActive(false);
            this.setVisible(false);
            this.scene.time.delayedCall(1500, () => this.emit('dead'));
        });
    }

    /**
     * Called when the player jumps.
     */
    _onJump() {
        if (this.dead) return;

        const { jump } = this.move;

        if (jump.count === 0 && (this.body.blocked.down || jump.coyoteTimer > 0)) {
            this._playSound('jump'); 
            this.body.setVelocityY(-jump.velocity);
            jump.count      = 1;
            jump.cutApplied = false;
            jump.coyoteTimer = 0;
            jump.bufferTimer = 0;
            this._setState('jump_up');
        } else if (jump.count < jump.maxCount && !this.body.blocked.down) {
            this._playSound('double_jump'); 
            this.body.setVelocityY(-jump.doubleVelocity);
            jump.count++;
            jump.cutApplied = false;
            jump.bufferTimer = 0;
            this._setState('double_jump');
            this._onAnimComplete('double_jump', 'jump_up');
        } else {
            jump.bufferTimer = jump.bufferTime;
        }
    }

    /**
     * Called when the player dashes.
     */
    _onDash() {
        if (this.dead)                        return;
        if (this.state === 'hit')             return;
        if (this.move.dash.cooldownTimer > 0) return;
        if (this.move.dash.active)            return;

        const { dash } = this.move;
        const { up }   = this.keyboard;

        dash.active        = true;
        dash.timer         = dash.duration;
        dash.cooldownTimer = dash.cooldown;

        if (dash.invincible) {
            this.combat.invincible      = true;
            this.combat.invincibilityTimer = dash.duration;
        }

        const diagY = up.isDown ? -1 : 0;
        const diagX = this.direction;

        const len = diagY !== 0 ? Math.SQRT2 : 1;

        this.body.setVelocityX((diagX / len) * dash.speed);
        this.body.setVelocityY((diagY / len) * dash.speed);
        this.body.setGravityY(0);

        this._playSound('dash');
        this._setState('run'); 
    }

    /**
     * Called when the player attacks.
     */
    _onAttack() {
        if (this.dead)              return;
        if (this.state === 'hit')   return;

        this.body.setVelocityX(0);
        this.sword.activate();
        this._playSound('attack');
        this._setState('attack');
        this._onAnimComplete('attack', 'idle');
    }

    /**
     * Updates the player's timers for jump coyote time and input buffering.
     * @param {number} delta - The time elapsed since the last update.
     */
    _tickTimers(delta) {
        const { jump } = this.move;
        jump.coyoteTimer = Math.max(0, jump.coyoteTimer - delta);
        jump.bufferTimer = Math.max(0, jump.bufferTimer - delta);
    }

    /**
     * Handles the player's input for movement and actions.
     */        
    _handleInput() {
        const { jump: jumpKey, attack, dash: dashKey } = this.keyboard;
        const { jump } = this.move;

        if (Input.Keyboard.JustDown(jumpKey)) this._onJump();
        if (Input.Keyboard.JustDown(attack))  this._onAttack();
        if (Input.Keyboard.JustDown(dashKey)) this._onDash();

        if (jumpKey.isUp && this.body.velocity.y < 0 && jump.count > 0 && !jump.cutApplied) {
            this.body.setVelocityY(this.body.velocity.y * jump.cutMultiplier);
            jump.cutApplied = true;
        }
    }

    /**
     * Updates the player's gravity based on their vertical velocity to create a more responsive jump feel.
     */
    _updateGravity() {
        if (this.move.dash.active) return; 

        const { gravity } = this.move;
        const vy      = this.body.velocity.y;
        const atApex  = Math.abs(vy) < gravity.apexThreshold;

        this.body.setGravityY(
            atApex   ? gravity.apex  :
            vy < 0   ? gravity.up    :
                       gravity.down
        );
    }

    /**
     * Updates the player's horizontal movement based on input and state.
     */
    _updateMovement() {
        if (this.state === 'attack') return;
        if (this.state === 'hit')    return;
        if (this.move.dash.active)   return;

        const { left, right } = this.keyboard;
        const onGround = this.body.blocked.down;

        if (left.isDown) {
            this.body.setVelocityX(-this.move.run.speed);
            this.setFlipX(true);
            this.direction = -1;
            if (onGround && this.state !== 'run') this._setState('run');
        } else if (right.isDown) {
            this.body.setVelocityX(this.move.run.speed);
            this.setFlipX(false);
            this.direction = 1;
            if (onGround && this.state !== 'run') this._setState('run');
        } else {
            if (onGround) this.body.setVelocityX(0);
            if (onGround && this.state !== 'idle') this._setState('idle');
        }
    }

    /**
     * Updates the player's aerial state based on their vertical velocity and whether they are on the ground.
     * @param {number} delta - The time elapsed since the last update.
     */
    _updateAerial(delta) {
        if (this.state === 'attack')      return;
        if (this.state === 'hit')         return;
        if (this.state === 'double_jump') return;

        const onGround = this.body.blocked.down;
        const { jump } = this.move;

        if (!onGround && jump.wasOnGround && jump.count === 0) {
            jump.coyoteTimer = jump.coyoteTime;
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

        if      (this.body.velocity.y < 0) this._setState('jump_up');
        else if (this.body.velocity.y > 0) this._setState('jump_down');
    }

    _updateDash(delta) {
        const { dash } = this.move;

        if (dash.cooldownTimer > 0) {
            dash.cooldownTimer = Math.max(0, dash.cooldownTimer - delta);
        }

        if (!dash.active) return;

        dash.timer -= delta;

        if (dash.timer <= 0) {
            dash.active = false;
            this.setAlpha(1);
            this.body.setGravityY(this.move.gravity.down);
            this.body.setVelocityX(0);
        }
    }

    /**
     * Updates the player's state and position.
     * @param {number} delta - The time elapsed since the last update.
     */
    update(time, delta) {
        super.update(time, delta);

        if (this.dead) return;
        if (this._knockbackTimer > 0) return;

        this._tickTimers(delta);
        this._updateDash(delta); 
        this._handleInput();
        this._updateGravity();
        this._updateMovement();
        this._updateAerial(delta);
        this.sword.update();

        if (this.state === 'run' && this.body.blocked.down) {
        this._stepTimer -= delta;
        if (this._stepTimer <= 0) {
            this._playSound('walk');
            this._stepTimer = this._stepInterval;
        }
        } else {
            this._stepTimer = 0; // reset so next step plays immediately
        }
    }
}