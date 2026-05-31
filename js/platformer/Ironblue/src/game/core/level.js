import { Math as PMath} from 'phaser';
import { GroundGrass, GroundDirt } from '../tilemaps/Ground.js';
import { PlatformGrass, PlatformDirt } from '../tilemaps/Platform.js';
import { Coin } from '../entities/Coin.js';
import { Torch } from '../entities/Torch.js';

export const TILE_SIZE = 16;
const DEFAULT_GROUND_TYPE = 'ground_grass';
const DEFAULT_PLATFORM_TYPE = 'platform_grass';
const MIN_GROUND_WIDTH = 4;
const MAX_GROUND_WIDTH = 10;
const MIN_GAP_WIDTH = 2;
const MAX_GAP_WIDTH = 5;

const TILESET_REGISTRY = {
    ground_grass: GroundGrass,
    ground_dirt: GroundDirt,
    platform_grass: PlatformGrass,
    platform_dirt: PlatformDirt,
};

export class LevelLoader {
    constructor(scene) {
        this.scene = scene;
    }

    load(levelData) {
        const scene = this.scene;
        const width = scene.scale.width * levelData.width;
        const height = scene.scale.height * levelData.height;
        const groundY = height - TILE_SIZE;
        const tilesWide = width / TILE_SIZE;

        const groundSegments = (levelData.groundSegments && levelData.groundSegments.length)
            ? levelData.groundSegments
            : this._generateRandomGroundSegments(tilesWide);

        this._buildBackgrounds(width, height);
        this._buildForegrounds(width, height);
        this._buildGround(groundSegments, groundY);
        this._buildPlatforms(levelData.platforms);
        this._buildCoins(levelData.coins);
        this._buildTorches(levelData.torches);

        this.enemyDefs = levelData.enemies ?? [];
        this.killY = groundY + 40;

        return { width, height, playerStart: levelData.playerStart };
    }

    _buildBackgrounds(width, height) {
        this.bg0 = this.scene.add.tileSprite(0, 0, width, height, 'background_bg_0').setOrigin(0, 0).setDepth(-10);
        this.bg1 = this.scene.add.tileSprite(0, 0, width, height, 'background_bg_1').setOrigin(0, 0).setDepth(-9);
        this.bg2 = this.scene.add.tileSprite(0, 0, width, height, 'background_bg_2').setOrigin(0, 0).setDepth(-8);
    }

    _buildForegrounds(width, height) {
        this.fg0 = this.scene.add.tileSprite(0, 0, width, height, 'foreground_fg_0').setOrigin(0, 0).setDepth(-7);
        // this.fg1 = this.scene.add.tileSprite(0, 0, width, height, 'foreground_fg_1').setOrigin(0, 0).setDepth(-6);
    }

    updateBackgroundParallax(deltaCamX) {
        if (this.bg0) this.bg0.tilePositionX += deltaCamX * 0.6;
        if (this.bg1) this.bg1.tilePositionX += deltaCamX * 0.4;
        if (this.bg2) this.bg2.tilePositionX += deltaCamX * 0.2;
    }

    _buildGround(segments = [], groundY) {
        this.groundSegments = this.scene.physics.add.staticGroup();

        for (const segment of segments) {
            const type = segment.type || DEFAULT_GROUND_TYPE;
            const tileset = this._createTileset(type, DEFAULT_GROUND_TYPE);

            this._createTileRegion(
                this.groundSegments,
                segment.x * TILE_SIZE,
                groundY,
                segment.width,
                segment.height ?? 1,
                tileset,
                this._groundFrame.bind(this)
            );
        }
    }

    _buildPlatforms(platforms = []) {
        this.platforms = this.scene.physics.add.staticGroup();

        for (const platform of platforms) {
            const type = platform.type || DEFAULT_PLATFORM_TYPE;
            const tileset = this._createTileset(type, DEFAULT_PLATFORM_TYPE);

            this._createTileRegion(
                this.platforms,
                platform.x * TILE_SIZE,
                platform.y * TILE_SIZE,
                platform.width,
                platform.height ?? 1,
                tileset,
                this._platformFrame.bind(this)
            );
        }
    }

    _buildCoins(coins = []) {
        this.coins = this.scene.add.group({ runChildUpdate: true });

        for (const coinData of coins) {
            const coin = new Coin(
                this.scene,
                coinData.x * TILE_SIZE + TILE_SIZE / 2,
                coinData.y * TILE_SIZE + TILE_SIZE / 2
            );

            this.coins.add(coin);
        }
    }

    _buildTorches(torches = []) {
        this.torches = this.scene.add.group({ runChildUpdate: true });

        for (const t of torches) {
            const torch = new Torch(
                this.scene,
                t.x * TILE_SIZE + TILE_SIZE / 2,
                t.y * TILE_SIZE + TILE_SIZE / 2 - 4,
            );
            this.torches.add(torch);
        }
    }

    _createTileRegion(group, startX, startY, width, height, tileset, frameSelector) {
        for (let row = 0; row < height; row += 1) {
            for (let col = 0; col < width; col += 1) {
                const frame = frameSelector(width, col, row, height, tileset);
                const tile = this.scene.physics.add.staticSprite(
                    startX + col * TILE_SIZE + TILE_SIZE / 2,
                    startY + row * TILE_SIZE + TILE_SIZE / 2,
                    tileset.key,
                    frame
                ).setOrigin(0.5, 0.5);

                group.add(tile);
            }
        }
    }

    _createTileset(type, fallbackType) {
        const TilesetClass = TILESET_REGISTRY[type] || TILESET_REGISTRY[fallbackType];
        return new TilesetClass();
    }

    _groundFrame(width, column, row, height, tileset) {
        const isSingleColumn = width === 1;
        const rowIndex = height === 1
            ? 0
            : row === 0
                ? 0
                : row === height - 1
                    ? 2
                    : 1;

        const leftFrame = [tileset.frameTopLeft, tileset.frameLeft, tileset.frameBottomLeft][rowIndex];
        const centerFrame = [tileset.frameTop, tileset.frameCenter, tileset.frameBottom][rowIndex];
        const rightFrame = [tileset.frameTopRight, tileset.frameRight, tileset.frameBottomRight][rowIndex];

        if (isSingleColumn) {
            return centerFrame;
        }

        if (column === 0) {
            return leftFrame;
        }

        if (column === width - 1) {
            return rightFrame;
        }

        return centerFrame;
    }

    _platformFrame(width, column, row, height, tileset) {
        if (width === 1) {
            return tileset.frameCenter;
        }

        if (column === 0) {
            return tileset.frameLeft;
        }

        if (column === width - 1) {
            return tileset.frameRight;
        }

        return tileset.frameCenter;
    }

    _generateRandomGroundSegments(totalTiles) {
        const segments = [];
        let x = 0;

        while (x < totalTiles - MIN_GROUND_WIDTH) {
            const segmentWidth = PMath.Between(MIN_GROUND_WIDTH, MAX_GROUND_WIDTH);
            const gap = PMath.Between(MIN_GAP_WIDTH, MAX_GAP_WIDTH);
            const width = Math.min(segmentWidth, totalTiles - x);

            segments.push({
                type: DEFAULT_GROUND_TYPE,
                x,
                width,
                height: 1,
            });

            x += width + gap;
        }

        return segments;
    }
}
