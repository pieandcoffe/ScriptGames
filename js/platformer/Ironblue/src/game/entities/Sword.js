import { GameObjects } from 'phaser';

export class Sword extends GameObjects.Sprite {

    /**
     * Creates a new sword instance attached to the player.
     * @param {Phaser.Scene} scene
     * @param {Player} player
     */
    constructor(scene, player) {
        super(scene, player.x, player.y, 'player_sword_attack');
        this.player     = player;
        this.hitTargets = new Set();

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(16, 16);
        this.body.allowGravity = false;

        this.body.enable = false;
        this.setVisible(false);
        this.setDepth(player.depth + 1);
    }

    /**
     * Activates the sword, enabling its hitbox and playing the attack animation.
     * The sword will automatically deactivate after the animation completes.
     */
    activate() {
        if (this.player.dead)            return;
        if (this.player.state === 'hit') return;

        this.setFlipX(this.player.direction < 0);
        this.body.enable = true;
        this.setVisible(true);
        this.play('player_sword_attack');
        this.once('animationcomplete', () => this.deactivate());
    }

    /**
     * Deactivates the sword, disabling its hitbox and hiding it until the next attack.
     */
    deactivate() {
        this.body.enable = false;
        this.setVisible(false);
        this.hitTargets.clear();
    }

    /**
     * Updates the sword's position to match the player's position and facing direction.
     * @returns 
     */
    update() {
        if (this.player.dead) return;

        const { direction: dir } = this.player;
        const pb = this.player.body;

        const offsetX = (pb.width  / 2 + 8) * dir;
        const offsetY = 0;

        this.setPosition(
            this.player.x + offsetX,
            this.player.y + offsetY,
        );

        this.body.reset(this.x, this.y);
    }
}