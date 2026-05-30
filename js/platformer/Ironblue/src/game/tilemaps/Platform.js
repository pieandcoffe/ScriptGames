import { Tileset } from './Tileset.js';

/**
 * Abstract platform tileset — strip of 3 tiles (48x16):
 *  [L][C][R]
 */
export class Platform extends Tileset {
    constructor(key) {
        if (new.target === Platform) throw new Error('Platform is abstract.');
        super(key);
    }

    // Frame indices for a 3x1 spritesheet (48x16 → 3 frames)
    get frameLeft()   { return 0; }
    get frameCenter() { return 1; }
    get frameRight()  { return 2; }
}

export class PlatformGrass extends Platform {
    constructor() { super('tilemaps_platform_grass'); }
}

export class PlatformDirt extends Platform {
    constructor() { super('tilemaps_platform_dirt'); }
}