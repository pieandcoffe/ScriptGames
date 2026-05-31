import { ButtonMenuScene } from '../ui/ButtonMenuScene.js';
import { MENU_THEMES, TEXT_STYLES } from '../ui/TextStyles.js';
import { UI_LAYOUT } from '../ui/UIConstants.js';

export class MainMenu extends ButtonMenuScene {
    constructor ()
    {
        super({
            key: 'MainMenu',
            theme: MENU_THEMES.main,
        });
    }

    create ()
    {
        const W = UI_LAYOUT.screenWidth;
        const H = UI_LAYOUT.screenHeight;
        const cx = W / 2;

        // Background
        this.add.image(cx, H / 2, 'background_background').setDisplaySize(W, H);
        this.add.rectangle(cx, H / 2, W, H, 0x000000, 0.5);

        // Logo with animation
        this._createAnimatedLogo(cx, 28);

        // Menu buttons
        const items = [
            { label: 'START', callback: () => this.scene.start('Game') },
            { label: 'OPTIONS', callback: () => this.scene.start('Options') },
            { label: 'CREDITS', callback: () => this.scene.start('Credits') },
        ];

        this.createButtonMenu(items, 82);

        // Version text
        this.add.text(2, H - 2, 'v0.1', TEXT_STYLES.version).setOrigin(0, 1);
    }

    _createAnimatedLogo(centerX, baseY) 
    {
        const word = 'IRONBLUE';
        const fontSize = 9;
        const letterSpacing = 8;
        const totalWidth = (word.length - 1) * letterSpacing;
        const startX = centerX - totalWidth / 2;

        word.split('').forEach((char, i) => {
            const letter = this.add
                .text(startX + i * letterSpacing, baseY, char, {
                    fontFamily: 'monospace',
                    fontSize: fontSize,
                    color: '#c6cfeb',
                    stroke: '#0a1a2e',
                    strokeThickness: 1,
                })
                .setOrigin(0.5);

            this.tweens.add({
                targets: letter,
                y: baseY + Math.sin(i * 1.1) * 3,
                duration: 1400 + i * 80,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut',
                delay: i * 120,
            });
        });
    }
}