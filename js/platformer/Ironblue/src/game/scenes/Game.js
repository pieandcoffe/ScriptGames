import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        const { width, height } = this.scale;

        this.bg0 = this.add.tileSprite(0, 0, width, height, 'background_bg_0').setOrigin(0, 0);
        this.bg1 = this.add.tileSprite(0, 0, width, height, 'background_bg_1').setOrigin(0, 0);
        // this.bg2 = this.add.tileSprite(0, 0, width, height, 'background_bg_2').setOrigin(0, 0);

        // this.fg0 = this.add.tileSprite(0, 0, width, height, 'foreground_fg_0').setOrigin(0, 0);
        // this.fg1 = this.add.tileSprite(0, 0, width, height, 'foreground_fg_1').setOrigin(0, 0);
    }

    update(time, delta) 
    {
        const dt = delta / 16.667;

        this.bg0.tilePositionX += 0.25 * dt;
        this.bg1.tilePositionX += 0.4 * dt;

        if (this.bg0.x >= 240) this.bg0.x = 0;
        if (this.bg1.x >= 240) this.bg1.x = 0;
        // this.bg2.tilePositionX += 0.4 * dt;

        // this.fg0.tilePositionX += 1.2 * dt;
        // this.fg1.tilePositionX += 1.8 * dt;
    }
}
