import { Math as PMath } from 'phaser';
import { ButtonMenuScene } from '../ui/ButtonMenuScene.js';
import { MENU_THEMES, TEXT_STYLES } from '../ui/TextStyles.js';
import { UI_LAYOUT, ANIMATION_TIMINGS } from '../ui/UIConstants.js';

export class GameOver extends ButtonMenuScene {
    constructor () 
    {
        super({
            key: 'GameOver',
            theme: MENU_THEMES.gameOver,
        });
    }

    create () 
    {
        const W = UI_LAYOUT.screenWidth;
        const H = UI_LAYOUT.screenHeight;
        const cx = W / 2;

        // Background
        this.add.image(cx, H / 2, 'background_background').setDisplaySize(W, H);
        this.add.rectangle(cx, H / 2, W, H, 0x000000, 0.8);

        // Title with flicker effect
        const title = this.add.text(cx, 48, 'GAME OVER', {
            ...TEXT_STYLES.title,
        }).setOrigin(0.5);
        this._flickerText(title);

        // Subtitle
        this.add.text(cx, 68, 'you died.', TEXT_STYLES.subtitle).setOrigin(0.5);

        // Menu buttons
        const items = [
            { label: 'TRY AGAIN', callback: () => this.scene.start('Game') },
            { label: 'MAIN MENU', callback: () => this.scene.start('MainMenu') },
        ];

        this.createButtonMenu(items, 100);

        // Scanline effect
        this._drawScanlines(W, H);
    }

    _flickerText (target) 
    {
        const flicker = () => {
            const delay = PMath.Between(ANIMATION_TIMINGS.textFlickerDelay.min, ANIMATION_TIMINGS.textFlickerDelay.max);
            this.time.delayedCall(delay, () => {
                this.tweens.add({
                    targets: target,
                    alpha: 0,
                    duration: ANIMATION_TIMINGS.textFlicker,
                    yoyo: true,
                    repeat: PMath.Between(ANIMATION_TIMINGS.textFlickerRepeat.min, ANIMATION_TIMINGS.textFlickerRepeat.max),
                    ease: 'Stepped',
                    onComplete: flicker,
                });
            });
        };
        flicker();
    }

    _drawScanlines (W, H) 
    {
        const g = this.add.graphics();
        g.lineStyle(1, 0x000000, 0.25);
        for (let y = 0; y < H; y += 2) {
            g.lineBetween(0, y, W, y);
        }
    }
}