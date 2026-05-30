export class LevelLoader {
    constructor(scene) {
        this.scene = scene;
    }

    load(levelData) {
        const scene = this.scene;
        const width = scene.scale.width  * levelData.width;
        const height = scene.scale.height * levelData.height;
        const groundY = height - 16;

        this._buildGround(levelData.groundSegments, groundY);
        this._buildPlatforms(levelData.platforms);
        this._buildCoins(levelData.coins);

        this.enemyDefs = levelData.enemies ?? [];
        this.killY     = groundY + 40;

        return { width: width, height: height, playerStart: levelData.playerStart };
    }

    _buildGround(segments = [], groundY) {
        this.groundSegments = this.scene.physics.add.staticGroup();
        for (const seg of segments) {
            const obj = this.scene.add.rectangle(seg.x, groundY, seg.width, 16)
                .setOrigin(0, 0)
                .setVisible(true);
            this.scene.physics.add.existing(obj, true); // true = static
            this.groundSegments.add(obj);
        }
    }

    _buildPlatforms(platforms = []) {
        this.platforms = this.scene.physics.add.staticGroup();
        for (const p of platforms) {
            const obj = this.scene.add.rectangle(p.x, p.y, p.width, p.height)
                .setOrigin(0, 0)
                .setVisible(true);
            this.scene.physics.add.existing(obj, true);
            this.platforms.add(obj);
        }
    }

    _buildCoins(coins = []) {
        this.coins = this.scene.physics.add.staticGroup();
        for (const c of coins) {
            const coin = this.scene.physics.add.staticSprite(c.x, c.y, 'coin');
            this.coins.add(coin);
        }
    }
}