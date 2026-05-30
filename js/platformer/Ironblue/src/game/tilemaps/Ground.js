import { Tileset } from './Tileset.js';

/** Abstract ground tileset (3x3 grid).
 * 
 *  A 48x48 tileset PNG contains a 3x3 grid of 16x16 tiles:
 *
 *  [TL][T ][TR]
 *  [L ][C ][R ]
 *  [BL][B ][BR]
 */
export class Ground extends Tileset {
    constructor(key) {
        if (new.target === Ground) throw new Error('Ground is abstract.');
        super(key);
    }
}

export class GroundGrass extends Ground {
    constructor() { super('tilemaps_ground_grass'); }
}

export class GroundDirt extends Ground {
    constructor() { super('tilemaps_ground_dirt'); }
}