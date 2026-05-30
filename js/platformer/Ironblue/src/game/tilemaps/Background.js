import { Tileset } from './Tileset.js';

/** Abstract background tileset (3x3 grid).
 * 
 *  A 48x48 tileset PNG contains a 3x3 grid of 16x16 tiles:
 *
 *  [TL][T ][TR]
 *  [L ][C ][R ]
 *  [BL][B ][BR]
 */

export class Background extends Tileset {
    constructor(key) {
        if (new.target === Background) throw new Error('Background is abstract.');
        super(key);
    }
}

export class RockBackground extends Background {
    constructor() { super('tilemaps_background_rock'); }
}