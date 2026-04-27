/**
 * SPRITESHEET CONFIGURATION
 * Asset inventory for Platformer Game
 * Generated from assets/ folder structure
 */

export const SPRITESHEETS = {
  // Player animations
  player: {
    idle: {
      path: 'assets/herochar_sprites(new)/herochar_idle_anim_strip_4.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 4
    },
    run: {
      path: 'assets/herochar_sprites(new)/herochar_run_anim_strip_6.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 6
    },
    jump_up: {
      path: 'assets/herochar_sprites(new)/herochar_jump_up_anim_strip_3.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 3
    },
    jump_down: {
      path: 'assets/herochar_sprites(new)/herochar_jump_down_anim_strip_3.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 3
    },
    double_jump: {
      path: 'assets/herochar_sprites(new)/herochar_jump_double_anim_strip_3.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 3
    },
    attack: {
      path: 'assets/herochar_sprites(new)/herochar_attack_anim_strip_4(new).png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 4
    },
    sword_attack: {
      path: 'assets/herochar_sprites(new)/herochar_sword_attack_anim_strip_4.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 4
    },
    hit: {
      path: 'assets/herochar_sprites(new)/herochar_hit_anim_strip_3.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 3
    },
    death: {
      path: 'assets/herochar_sprites(new)/herochar_death_anim_strip_8.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 8
    },
    before_jump_dust: {
      path: 'assets/herochar_sprites(new)/herochar_before_jump_dust_anim_strip_4.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 4
    },
    after_jump_dust: {
      path: 'assets/herochar_sprites(new)/herochar_after_jump_dust_anim_strip_4.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 4
    },
    push_forward: {
      path: 'assets/herochar_sprites(new)/herochar_pushing_foward_anim_strip_6.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 6
    }
  },

  // Enemies animations
  goblin: {
    idle: {
      path: 'assets/enemies_sprites/goblin/goblin_idle_anim_strip_4.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 4
    },
    run: {
      path: 'assets/enemies_sprites/goblin/goblin_run_anim_strip_6.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 6
    },
    attack: {
      path: 'assets/enemies_sprites/goblin/goblin_attack_anim_strip_4.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 4
    },
    hit: {
      path: 'assets/enemies_sprites/goblin/goblin_hit_anim_strip_3.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 3
    },
    death: {
      path: 'assets/enemies_sprites/goblin/goblin_death_anim_strip_6.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 6
    }
  },

  bomber_goblin: {
    idle: {
      path: 'assets/enemies_sprites/bomber_goblin/bomber_goblin_idle_anim_strip_4.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 4
    },
    attack: {
      path: 'assets/enemies_sprites/bomber_goblin/bomber_goblin_attack_anim_strip_6.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 6
    },
    hit: {
      path: 'assets/enemies_sprites/bomber_goblin/bomber_goblin_hit_anim_strip_3.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 3
    },
    death: {
      path: 'assets/enemies_sprites/bomber_goblin/bomber_goblin_death_anim_strip_6.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 6
    }
  },

  fly_blue: {
    idle_flying: {
      path: 'assets/enemies_sprites/fly/blue_fly_idle_or_flying_anim_strip_3.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 3
    },
    attack: {
      path: 'assets/enemies_sprites/fly/blue_fly_attack_anim_srip_3.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 3
    },
    hit: {
      path: 'assets/enemies_sprites/fly/blue_fly_hit_anim_strip_3.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 3
    },
    death: {
      path: 'assets/enemies_sprites/fly/blue_fly_death_anim_strip_5.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 5
    }
  },

  fly_orange: {
    idle_flying: {
      path: 'assets/enemies_sprites/fly/orange_fly_idle_or_flying_anim_strip_3.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 3
    },
    attack: {
      path: 'assets/enemies_sprites/fly/orange_fly_atack_anim_srip_3.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 3
    },
    hit: {
      path: 'assets/enemies_sprites/fly/orange_fly_hit_anim_strip_3.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 3
    },
    death: {
      path: 'assets/enemies_sprites/fly/orange_fly_death_anim_strip_5.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 5
    }
  },

  slime: {
    idle: {
      path: 'assets/enemies_sprites/slime/slime_idle_anim_strip_5.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 5
    },
    walk: {
      path: 'assets/enemies_sprites/slime/slime_walk_anim_strip_15.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 15
    },
    hit: {
      path: 'assets/enemies_sprites/slime/slime_hit_anim_strip_3.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 3
    },
    death: {
      path: 'assets/enemies_sprites/slime/slime_death_anim_strip_6.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 6
    }
  },

  worm: {
    walk: {
      path: 'assets/enemies_sprites/worm/worm_walk_anim_strip_6.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 6
    },
    hit: {
      path: 'assets/enemies_sprites/worm/worm_hit_anim_strip_3.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 3
    },
    death: {
      path: 'assets/enemies_sprites/worm/worm_death_anim_strip_6.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 6
    }
  },

  mushroom: {
    walk: {
      path: 'assets/enemies_sprites/mushroom/mushroom_walk_anim_strip_8.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 8
    },
    hit: {
      path: 'assets/enemies_sprites/mushroom/mushroom_hit_anim_strip_3.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 3
    },
    death: {
      path: 'assets/enemies_sprites/mushroom/mushroom_death_anim_strip_6.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 6
    },
    crushed: {
      path: 'assets/enemies_sprites/mushroom/mushroom_crushed_anim_strip_6.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 6
    }
  },

  // Fauna animations
  bird: {
    idle: {
      path: 'assets/fauna_sprites/bird_idle_anim_strip_8.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 8
    },
    flying: {
      path: 'assets/fauna_sprites/bird_flying_anim_strip_3.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 3
    },
    walk: {
      path: 'assets/fauna_sprites/bird_walk_anim_strip_3.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 3
    }
  },

  rabbit: {
    idle: {
      path: 'assets/fauna_sprites/rabit_idle_anim_strip_4.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 4
    },
    walk: {
      path: 'assets/fauna_sprites/rabit_walk_anim_strip_6.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 6
    }
  },

  // Interactive objects animations
  coin: {
    spin: {
      path: 'assets/miscellaneous_sprites/coin_anim_strip_6.png',
      frameWidth: 32,
      frameHeight: 32,
      frameCount: 6
    },
    pickup: {
      path: 'assets/miscellaneous_sprites/coin_pickup_anim_strip_6.png',
      frameWidth: 32,
      frameHeight: 32,
      frameCount: 6
    }
  },

  orb: {
    spin: {
      path: 'assets/miscellaneous_sprites/orb_anim_strip_6.png',
      frameWidth: 32,
      frameHeight: 32,
      frameCount: 6
    },
    collected: {
      path: 'assets/miscellaneous_sprites/orb_collected_anim_strip_5.png',
      frameWidth: 32,
      frameHeight: 32,
      frameCount: 5
    }
  },

  loot_box: {
    idle: {
      path: 'assets/miscellaneous_sprites/loot_box_anim_strip_12.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 12
    },
    opening: {
      path: 'assets/miscellaneous_sprites/loot_box_anim_opening_strip_6.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 6
    }
  },

  bomb_ground: {
    idle: {
      path: 'assets/miscellaneous_sprites/bomb_on_ground_anim_strip_8.png',
      frameWidth: 32,
      frameHeight: 32,
      frameCount: 8
    }
  },

  bomb_thrown: {
    flying: {
      path: 'assets/miscellaneous_sprites/bomb_thrown_anim_strip_3.png',
      frameWidth: 32,
      frameHeight: 32,
      frameCount: 3
    }
  },

  explosion: {
    burst: {
      path: 'assets/miscellaneous_sprites/explosion_anim_strip_10.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 10
    }
  },

  trap_spikes: {
    active: {
      path: 'assets/miscellaneous_sprites/trap_spikes_anim_strip_7.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 7
    }
  },

  trap_suspended: {
    swing: {
      path: 'assets/miscellaneous_sprites/trap_suspended_anim_strip_18.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 18
    }
  },

  save_point: {
    idle: {
      path: 'assets/miscellaneous_sprites/save_point_anim_strip_9.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 9
    },
    saving: {
      path: 'assets/miscellaneous_sprites/save_point_saving_anim_strip_3.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 3
    }
  },

  vase: {
    breaking: {
      path: 'assets/miscellaneous_sprites/vase_breaking_anim_strip_5.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 5
    }
  },

  strange_door_closed: {
    opening: {
      path: 'assets/miscellaneous_sprites/strange_door_opening_anim_strip_14.png',
      frameWidth: 64,
      frameHeight: 128,
      frameCount: 14
    }
  },

  strange_door_full: {
    closed_idle: {
      path: 'assets/miscellaneous_sprites/strange_door_closed_anim_strip_10.png',
      frameWidth: 64,
      frameHeight: 128,
      frameCount: 10
    }
  },

  tiki_torch: {
    burning: {
      path: 'assets/miscellaneous_sprites/tiki_torch_props_strip_12.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 12
    }
  },

  dust_effect: {
    hit_wall: {
      path: 'assets/miscellaneous_sprites/spikes_trap_hit_wall_dust_effect_strip_3.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 3
    }
  },

  waterfall: {
    top: {
      path: 'assets/tiles_and_background_foreground_(new)/waterfall_anim_strip_4.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 4
    },
    bottom: {
      path: 'assets/tiles_and_background_foreground_(new)/waterfall_bottom_anim_strip_4.png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 4
    }
  },

  hit_sparkle: {
    effect: {
      path: 'assets/herochar_sprites(new)/hit_sparkle_anim_strip_4.png',
      frameWidth: 32,
      frameHeight: 32,
      frameCount: 4
    }
  },

  sword_effect: {
    slash: {
      path: 'assets/herochar_sprites(new)/sword_effect_strip_4(new).png',
      frameWidth: 64,
      frameHeight: 64,
      frameCount: 4
    }
  },

  // HUD animations
  lost_hearts: {
    effect: {
      path: 'assets/hud_elements/lost_hearts_anim_strip_5.png',
      frameWidth: 32,
      frameHeight: 32,
      frameCount: 5
    }
  },

  select_icon: {
    bounce: {
      path: 'assets/hud_elements/select_icon_anim_strip_5.png',
      frameWidth: 32,
      frameHeight: 32,
      frameCount: 5
    }
  }
};

// Static images
export const IMAGES = {
  tiles: {
    tileset_32x32: 'assets/tiles_and_background_foreground_(new)/tileset_32x32(new).png',
    tileset_64x64: 'assets/tiles_and_background_foreground_(new)/tileset_64x64(new).png',
    tileset: 'assets/tiles_and_background_foreground_(new)/tileset.png'
  },
  background: {
    background: 'assets/tiles_and_background_foreground_(new)/background.png',
    bg_0: 'assets/tiles_and_background_foreground_(new)/bg_0.png',
    bg_1: 'assets/tiles_and_background_foreground_(new)/bg_1.png',
    bg_2: 'assets/tiles_and_background_foreground_(new)/bg_2.png'
  },
  foreground: {
    fg_0: 'assets/tiles_and_background_foreground_(new)/fg_0.png',
    fg_1: 'assets/tiles_and_background_foreground_(new)/fg_1.png'
  },
  hud: {
    coins: 'assets/hud_elements/coins_hud.png',
    health_left: 'assets/hud_elements/health_hud_left.png',
    health_middle: 'assets/hud_elements/health_hud_middle.png',
    health_right: 'assets/hud_elements/health_hud_right.png',
    hearts: 'assets/hud_elements/hearts_hud.png',
    no_hearts: 'assets/hud_elements/no_hearts_hud.png',
    lifes_icon: 'assets/hud_elements/lifes_icon.png',
    orbs: 'assets/hud_elements/orbs_hud.png',
    fonts: 'assets/hud_elements/fonts.png'
  },
  objects: {
    spikes: 'assets/miscellaneous_sprites/spikes.png',
    door: 'assets/miscellaneous_sprites/door.png',
    stone: 'assets/miscellaneous_sprites/stone.png',
    loot_box_open: 'assets/miscellaneous_sprites/loot_box_open.png',
    apple_item: 'assets/miscellaneous_sprites/apple_item.png',
    meat_item: 'assets/miscellaneous_sprites/meat_item.png',
    health_potion: 'assets/miscellaneous_sprites/health_potion.png',
    antidote_potion: 'assets/miscellaneous_sprites/antidote_potion.png',
    orb: 'assets/miscellaneous_sprites/orb.png',
    vase: 'assets/miscellaneous_sprites/vase.png',
    button: 'assets/miscellaneous_sprites/buttom.png',
    button_pressed: 'assets/miscellaneous_sprites/buttom_pressed.png',
    lever_left: 'assets/miscellaneous_sprites/lever_turned_left.png',
    lever_right: 'assets/miscellaneous_sprites/lever_turned_right.png',
    arrow_left: 'assets/miscellaneous_sprites/arrow_plate_left.png',
    arrow_right: 'assets/miscellaneous_sprites/arrow_plate_right.png',
    wood_slab_left: 'assets/miscellaneous_sprites/wood_slab_left.png',
    wood_slab_middle: 'assets/miscellaneous_sprites/wood_slab_middle.png',
    wood_slab_right: 'assets/miscellaneous_sprites/wood_slab_right.png',
    wooden_plate: 'assets/miscellaneous_sprites/wooden_plate.png'
  },
  props: {
    grass: 'assets/miscellaneous_sprites/grass_props.png',
    flowers: 'assets/miscellaneous_sprites/flowers_props.png',
    bigflowers: 'assets/miscellaneous_sprites/bigflowers_props.png',
    root: 'assets/miscellaneous_sprites/root_props.png',
    drygrass: 'assets/miscellaneous_sprites/drygrass_props.png'
  }
};