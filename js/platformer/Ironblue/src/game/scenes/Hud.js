import { Scene, Math as PMath } from 'phaser';
import { SPRITESHEETS } from '../assets';

export class Hud extends Scene
{
    constructor()
    {
        super('Hud');
    }

    create()
    {
        this.hearts      = [];
        this.heartsCount = 0;
        this.score       = 0;
        this._registerAnimations();
    }

    setup(player)
    {
        this.hearts.forEach(h => h.destroy());
        this.hearts      = [];
        this.heartsCount = player.hp;
        this.player      = player;
        this._createHearts();
        this._createScoreDisplay();
    }

    _registerAnimations()
    {
        if (this.anims.exists('lost_hearts')) return;
        this.anims.create({
            key: 'lost_hearts',
            frames: this.anims.generateFrameNumbers('lost_hearts_effect', {
                start: 0,
                end: SPRITESHEETS.lost_hearts.effect.frameCount - 1,
            }),
            frameRate: 10,
            repeat: 0,
        });
    }

    _createHearts()
    {
        // this.add.image(4, 4, 'hud_health_left').setOrigin(0, 0);
        // for (let i = 0; i < this.player.maxHp - 1; i++) {
        //     this.add.image(4 + 8 + i * 16, 4, 'hud_health_middle').setOrigin(0, 0);
        // }
        // this.add.image(4 + 8 + (this.player.maxHp - 1) * 16, 4, 'hud_health_right').setOrigin(0, 0);
        
        for (let i = 0; i < this.player.maxHp; i++) {
            const heart = this.add.sprite(8 + i * 16, 4, 'hud_hearts').setOrigin(0, 0);
            this.hearts.push(heart);
        }
    }

    _createScoreDisplay()
    {
        const x = 4;
        const y = 20;

        this._coinIcon  = this.add.image(x, y, 'hud_coins').setOrigin(0, 0);
        this._scoreText = this.add.text(x + this._coinIcon.width + 3, y + 1, '0', {
            fontFamily: 'monospace',
            fontSize:   '10px',
            color:      '#ffffff',
            stroke:     '#000000',
            strokeThickness: 2,
        }).setOrigin(0, 0);
    }

    addScore(amount)
    {
        this.score += amount;
        this._scoreText?.setText(String(this.score));
    }

    setHealth(hp)
    {
        const previous   = this.heartsCount;
        this.heartsCount = PMath.Clamp(hp, 0, this.player.maxHp);
        this.hearts.forEach((heart, i) => {
            if (i >= this.heartsCount && i < previous) {
                heart.play('lost_hearts');
                heart.once('animationcomplete', () => {
                    heart.setTexture('hud_no_hearts');
                });
            } else {
                heart.setTexture(i < this.heartsCount ? 'hud_hearts' : 'hud_no_hearts');
            }
        });
    }
}