import { Scene } from 'phaser';
import { Player } from '../entities/Player';
import { Slime } from '../entities/Slime';

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
        
        this.ground = this.physics.add.staticImage(width / 2, height - 8, null)
            .setDisplaySize(width, 16)
            .refreshBody()
            .setVisible(false);

        this.scene.launch('Hud');
        this.hud = this.scene.get('Hud');

        this.player = new Player(this, width / 2, height - 32);
        this.hud.setup(this.player);
        this.player.on('hit', () => {
            this.hud.setHealth(this.player.hp);
        });

        this.slimes = this.add.group();

        const slime = new Slime(this, width / 4, height - 32, 200);
        this.slimes.add(slime);

        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.slimes, this.ground);

        this.physics.world.setBounds(0, 0, width, height);
        this.player.body.setCollideWorldBounds(true);
    }

    update(time, delta) 
    {
        const dt = delta / 16.667;

        this.bg0.tilePositionX += 0.25 * dt;
        this.bg1.tilePositionX += 0.4 * dt;

        if (this.bg0.x >= 240) this.bg0.x = 0;
        if (this.bg1.x >= 240) this.bg1.x = 0;
        
        this.player.update(delta);
        this.slimes.getChildren().forEach(slime => slime.update(delta));
    }
}
