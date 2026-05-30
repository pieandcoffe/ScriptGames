
/**
 * Abstract base class for all tilesets.
 * A 48x48 tileset PNG contains a 3x3 grid of 16x16 tiles:
 *
 *  [TL][T ][TR]
 *  [L ][C ][R ]
 *  [BL][B ][BR]
 *
 * Platform tilesets are 48x16 (3x1):
 *  [L ][C ][R ]
 */
export class Tileset {
    constructor(key) {
        if (new.target === Tileset) {
            throw new Error('Tileset is abstract and cannot be instantiated directly.');
        }
        this.key = key;
    }

    // Frame indices for a 3x3 spritesheet 
    // 48x48 9 frames
    get frameTopLeft()     { return 0; }
    get frameTop()         { return 1; }
    get frameTopRight()    { return 2; }
    get frameLeft()        { return 3; }
    get frameCenter()      { return 4; }
    get frameRight()       { return 5; }
    get frameBottomLeft()  { return 6; }
    get frameBottom()      { return 7; }
    get frameBottomRight() { return 8; }
}