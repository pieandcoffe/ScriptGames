export const SPRITESHEETS = {
  player: {
    idle:             { path: 'assets/art/herochar_sprites_new/herochar_idle_anim_strip_4.png', normal_map: 'assets/art/herochar_sprites_new/herochar_idle_anim_strip_4_n.png', frameWidth: 16, frameHeight: 16, frameCount: 4 },
    run:              { path: 'assets/art/herochar_sprites_new/herochar_run_anim_strip_6.png', normal_map: 'assets/art/herochar_sprites_new/herochar_run_anim_strip_6_n.png', frameWidth: 16, frameHeight: 16, frameCount: 6 },
    jump_up:          { path: 'assets/art/herochar_sprites_new/herochar_jump_up_anim_strip_3.png', normal_map: 'assets/art/herochar_sprites_new/herochar_jump_up_anim_strip_3_n.png', frameWidth: 16, frameHeight: 16, frameCount: 3 },
    jump_down:        { path: 'assets/art/herochar_sprites_new/herochar_jump_down_anim_strip_3.png', normal_map: 'assets/art/herochar_sprites_new/herochar_jump_down_anim_strip_3_n.png', frameWidth: 16, frameHeight: 16, frameCount: 3 },
    double_jump:      { path: 'assets/art/herochar_sprites_new/herochar_jump_double_anim_strip_3.png', normal_map: 'assets/art/herochar_sprites_new/herochar_jump_double_anim_strip_3_n.png', frameWidth: 16, frameHeight: 16, frameCount: 3 },
    attack:           { path: 'assets/art/herochar_sprites_new/herochar_attack_anim_strip_4_new.png', normal_map: 'assets/art/herochar_sprites_new/herochar_attack_anim_strip_4_new_n.png', frameWidth: 16, frameHeight: 16, frameCount: 4 },
    sword_attack:     { path: 'assets/art/herochar_sprites_new/herochar_sword_attack_anim_strip_4.png', normal_map: 'assets/art/herochar_sprites_new/herochar_sword_attack_anim_strip_4_n.png', frameWidth: 16, frameHeight: 16, frameCount: 4 },
    hit:              { path: 'assets/art/herochar_sprites_new/herochar_hit_anim_strip_3.png', normal_map: 'assets/art/herochar_sprites_new/herochar_hit_anim_strip_3_n.png', frameWidth: 16, frameHeight: 16, frameCount: 3 },
    death:            { path: 'assets/art/herochar_sprites_new/herochar_death_anim_strip_8.png', normal_map: 'assets/art/herochar_sprites_new/herochar_death_anim_strip_8_n.png', frameWidth: 16, frameHeight: 16, frameCount: 8 },
    before_jump_dust: { path: 'assets/art/herochar_sprites_new/herochar_before_jump_dust_anim_strip_4.png', normal_map: 'assets/art/herochar_sprites_new/herochar_before_jump_dust_anim_strip_4_n.png', frameWidth: 16, frameHeight: 16, frameCount: 4 },
    after_jump_dust:  { path: 'assets/art/herochar_sprites_new/herochar_after_jump_dust_anim_strip_4.png', normal_map: 'assets/art/herochar_sprites_new/herochar_after_jump_dust_anim_strip_4_n.png', frameWidth: 16, frameHeight: 16, frameCount: 4 },
    push_forward:     { path: 'assets/art/herochar_sprites_new/herochar_pushing_foward_anim_strip_6.png', normal_map: 'assets/art/herochar_sprites_new/herochar_pushing_foward_anim_strip_6_n.png', frameWidth: 16, frameHeight: 16, frameCount: 6 },
  },

  goblin: {
    idle:   { path: 'assets/art/enemies_sprites/goblin/goblin_idle_anim_strip_4.png', normal_map: 'assets/art/enemies_sprites/goblin/goblin_idle_anim_strip_4_n.png', frameWidth: 16, frameHeight: 16, frameCount: 4 },
    run:    { path: 'assets/art/enemies_sprites/goblin/goblin_run_anim_strip_6.png', normal_map: 'assets/art/enemies_sprites/goblin/goblin_run_anim_strip_6_n.png', frameWidth: 16, frameHeight: 16, frameCount: 6 },
    attack: { path: 'assets/art/enemies_sprites/goblin/goblin_attack_anim_strip_4.png', normal_map: 'assets/art/enemies_sprites/goblin/goblin_attack_anim_strip_4_n.png', frameWidth: 24, frameHeight: 16, frameCount: 4 },
    hit:    { path: 'assets/art/enemies_sprites/goblin/goblin_hit_anim_strip_3.png', normal_map: 'assets/art/enemies_sprites/goblin/goblin_hit_anim_strip_3_n.png', frameWidth: 16, frameHeight: 16, frameCount: 3 },
    death:  { path: 'assets/art/enemies_sprites/goblin/goblin_death_anim_strip_6.png', normal_map: 'assets/art/enemies_sprites/goblin/goblin_death_anim_strip_6_n.png', frameWidth: 16, frameHeight: 16, frameCount: 6 },
  },

  bomber_goblin: {
    idle:   { path: 'assets/art/enemies_sprites/bomber_goblin/bomber_goblin_idle_anim_strip_4.png',   normal_map: 'assets/art/enemies_sprites/bomber_goblin/bomber_goblin_idle_anim_strip_4_n.png', frameWidth: 16, frameHeight: 16, frameCount: 4 },
    attack: { path: 'assets/art/enemies_sprites/bomber_goblin/bomber_goblin_attack_anim_strip_6.png', normal_map: 'assets/art/enemies_sprites/bomber_goblin/bomber_goblin_attack_anim_strip_6_n.png', frameWidth: 16, frameHeight: 16, frameCount: 6 },
    hit:    { path: 'assets/art/enemies_sprites/bomber_goblin/bomber_goblin_hit_anim_strip_3.png',    normal_map: 'assets/art/enemies_sprites/bomber_goblin/bomber_goblin_hit_anim_strip_3_n.png', frameWidth: 16, frameHeight: 16, frameCount: 3 },
    death:  { path: 'assets/art/enemies_sprites/bomber_goblin/bomber_goblin_death_anim_strip_6.png',  normal_map: 'assets/art/enemies_sprites/bomber_goblin/bomber_goblin_death_anim_strip_6_n.png', frameWidth: 16, frameHeight: 16, frameCount: 6 },
  },

  fly_blue: {
    idle_flying: { path: 'assets/art/enemies_sprites/fly/blue_fly_idle_or_flying_anim_strip_3.png', normal_map: 'assets/art/enemies_sprites/fly/blue_fly_idle_or_flying_anim_strip_3_n.png', frameWidth: 8, frameHeight: 8, frameCount: 3 },
    attack:      { path: 'assets/art/enemies_sprites/fly/blue_fly_attack_anim_srip_3.png',          normal_map: 'assets/art/enemies_sprites/fly/blue_fly_attack_anim_strip_3_n.png',          frameWidth: 8, frameHeight: 8, frameCount: 3 },
    hit:         { path: 'assets/art/enemies_sprites/fly/blue_fly_hit_anim_strip_3.png',            normal_map: 'assets/art/enemies_sprites/fly/blue_fly_hit_anim_strip_3_n.png',            frameWidth: 8, frameHeight: 8, frameCount: 3 },
    death:       { path: 'assets/art/enemies_sprites/fly/blue_fly_death_anim_strip_5.png',          normal_map: 'assets/art/enemies_sprites/fly/blue_fly_death_anim_strip_5_n.png',          frameWidth: 8, frameHeight: 8, frameCount: 5 },
  },

  fly_orange: {
    idle_flying: { path: 'assets/art/enemies_sprites/fly/orange_fly_idle_or_flying_anim_strip_3.png', normal_map: 'assets/art/enemies_sprites/fly/orange_fly_idle_or_flying_anim_strip_3_n.png', frameWidth: 8, frameHeight: 8, frameCount: 3 },
    attack:      { path: 'assets/art/enemies_sprites/fly/orange_fly_atack_anim_srip_3.png',           normal_map: 'assets/art/enemies_sprites/fly/orange_fly_attack_anim_strip_3_n.png',           frameWidth: 8, frameHeight: 8, frameCount: 3 },
    hit:         { path: 'assets/art/enemies_sprites/fly/orange_fly_hit_anim_strip_3.png',            normal_map: 'assets/art/enemies_sprites/fly/orange_fly_hit_anim_strip_3_n.png',            frameWidth: 8, frameHeight: 8, frameCount: 3 },
    death:       { path: 'assets/art/enemies_sprites/fly/orange_fly_death_anim_strip_5.png',          normal_map: 'assets/art/enemies_sprites/fly/orange_fly_death_anim_strip_5_n.png',          frameWidth: 8, frameHeight: 8, frameCount: 5 },
  },

  slime: {
    idle:  { path: 'assets/art/enemies_sprites/slime/slime_idle_anim_strip_5.png', normal_map: 'assets/art/enemies_sprites/slime/slime_idle_anim_strip_5_n.png', frameWidth: 16, frameHeight: 16, frameCount: 5 },
    walk:  { path: 'assets/art/enemies_sprites/slime/slime_walk_anim_strip_15.png', normal_map: 'assets/art/enemies_sprites/slime/slime_walk_anim_strip_15_n.png', frameWidth: 16, frameHeight: 24, frameCount: 15 },
    hit:   { path: 'assets/art/enemies_sprites/slime/slime_hit_anim_strip_3.png',   normal_map: 'assets/art/enemies_sprites/slime/slime_hit_anim_strip_3_n.png',   frameWidth: 16, frameHeight: 16, frameCount: 3 },
    death: { path: 'assets/art/enemies_sprites/slime/slime_death_anim_strip_6.png', normal_map: 'assets/art/enemies_sprites/slime/slime_death_anim_strip_6_n.png', frameWidth: 16, frameHeight: 16, frameCount: 6 },
  },

  worm: {
    walk:  { path: 'assets/art/enemies_sprites/worm/worm_walk_anim_strip_6.png',  normal_map: 'assets/art/enemies_sprites/worm/worm_walk_anim_strip_6_n.png',  frameWidth: 16, frameHeight: 8, frameCount: 6 },
    hit:   { path: 'assets/art/enemies_sprites/worm/worm_hit_anim_strip_3.png',   normal_map: 'assets/art/enemies_sprites/worm/worm_hit_anim_strip_3_n.png',   frameWidth: 16, frameHeight: 8, frameCount: 3 },
    death: { path: 'assets/art/enemies_sprites/worm/worm_death_anim_strip_6.png', normal_map: 'assets/art/enemies_sprites/worm/worm_death_anim_strip_6_n.png', frameWidth: 16, frameHeight: 8, frameCount: 6 },
  },

  mushroom: {
    walk:    { path: 'assets/art/enemies_sprites/mushroom/mushroom_walk_anim_strip_8.png',    normal_map: 'assets/art/enemies_sprites/mushroom/mushroom_walk_anim_strip_8_n.png',    frameWidth: 16, frameHeight: 16, frameCount: 8 },
    hit:     { path: 'assets/art/enemies_sprites/mushroom/mushroom_hit_anim_strip_3.png',     normal_map: 'assets/art/enemies_sprites/mushroom/mushroom_hit_anim_strip_3_n.png',     frameWidth: 16, frameHeight: 16, frameCount: 3 },
    death:   { path: 'assets/art/enemies_sprites/mushroom/mushroom_death_anim_strip_6.png',   normal_map: 'assets/art/enemies_sprites/mushroom/mushroom_death_anim_strip_6_n.png',   frameWidth: 16, frameHeight: 16, frameCount: 6 },
    crushed: { path: 'assets/art/enemies_sprites/mushroom/mushroom_crushed_anim_strip_6.png', normal_map: 'assets/art/enemies_sprites/mushroom/mushroom_crushed_anim_strip_6_n.png', frameWidth: 16, frameHeight: 16, frameCount: 6 },
  },

  bird: {
    idle:   { path: 'assets/art/fauna_sprites/bird_idle_anim_strip_8.png',   normal_map: 'assets/art/fauna_sprites/bird_idle_anim_strip_8_n.png',   frameWidth: 8, frameHeight: 8, frameCount: 8 },
    flying: { path: 'assets/art/fauna_sprites/bird_flying_anim_strip_3.png', normal_map: 'assets/art/fauna_sprites/bird_flying_anim_strip_3_n.png', frameWidth: 8, frameHeight: 8, frameCount: 3 },
    walk:   { path: 'assets/art/fauna_sprites/bird_walk_anim_strip_3.png',   normal_map: 'assets/art/fauna_sprites/bird_walk_anim_strip_3_n.png',   frameWidth: 8, frameHeight: 8, frameCount: 3 },
  },

  rabbit: {
    idle: { path: 'assets/art/fauna_sprites/rabit_idle_anim_strip_4.png', normal_map: 'assets/art/fauna_sprites/rabit_idle_anim_strip_4_n.png', frameWidth: 16, frameHeight: 8, frameCount: 4 },
    walk: { path: 'assets/art/fauna_sprites/rabit_walk_anim_strip_6.png', normal_map: 'assets/art/fauna_sprites/rabit_walk_anim_strip_6_n.png', frameWidth: 16, frameHeight: 8, frameCount: 6 },
  },

  coin: {
    spin:   { path: 'assets/art/miscellaneous_sprites/coin_anim_strip_6.png',        normal_map: 'assets/art/miscellaneous_sprites/coin_anim_strip_6_n.png',        frameWidth: 8, frameHeight: 8, frameCount: 6 },
    pickup: { path: 'assets/art/miscellaneous_sprites/coin_pickup_anim_strip_6.png', normal_map: 'assets/art/miscellaneous_sprites/coin_pickup_anim_strip_6_n.png', frameWidth: 8, frameHeight: 16, frameCount: 6 },
  },

  orb: {
    spin:      { path: 'assets/art/miscellaneous_sprites/orb_anim_strip_6.png',       normal_map: 'assets/art/miscellaneous_sprites/orb_anim_strip_6_n.png',       frameWidth: 8, frameHeight: 8, frameCount: 6 },
    collected: { path: 'assets/art/miscellaneous_sprites/orb_collected_anim_strip_5.png', normal_map: 'assets/art/miscellaneous_sprites/orb_collected_anim_strip_5_n.png', frameWidth: 8, frameHeight: 8, frameCount: 5 },
  },

  loot_box: {
    idle:    { path: 'assets/art/miscellaneous_sprites/loot_box_anim_strip_12.png',         normal_map: 'assets/art/miscellaneous_sprites/loot_box_anim_strip_12_n.png',         frameWidth: 16, frameHeight: 8,  frameCount: 12 },
    opening: { path: 'assets/art/miscellaneous_sprites/loot_box_anim_opening_strip_6.png',  normal_map: 'assets/art/miscellaneous_sprites/loot_box_anim_opening_strip_6_n.png',  frameWidth: 16, frameHeight: 10, frameCount: 6  },
  },

  bomb_ground: {
    idle: { path: 'assets/art/miscellaneous_sprites/bomb_on_ground_anim_strip_8.png', normal_map: 'assets/art/miscellaneous_sprites/bomb_on_ground_anim_strip_8_n.png', frameWidth: 8, frameHeight: 8, frameCount: 8 },
  },

  bomb_thrown: {
    flying: { path: 'assets/art/miscellaneous_sprites/bomb_thrown_anim_strip_3.png', normal_map: 'assets/art/miscellaneous_sprites/bomb_thrown_anim_strip_3_n.png', frameWidth: 8, frameHeight: 8, frameCount: 3 },
  },

  explosion: {
    burst: { path: 'assets/art/miscellaneous_sprites/explosion_anim_strip_10.png', normal_map: 'assets/art/miscellaneous_sprites/explosion_anim_strip_10_n.png', frameWidth: 32, frameHeight: 32, frameCount: 10 },
  },

  trap_spikes: {
    active: { path: 'assets/art/miscellaneous_sprites/trap_spikes_anim_strip_7.png', normal_map: 'assets/art/miscellaneous_sprites/trap_spikes_anim_strip_7_n.png', frameWidth: 16, frameHeight: 16, frameCount: 7 },
  },

  trap_suspended: {
    swing: { path: 'assets/art/miscellaneous_sprites/trap_suspended_anim_strip_18.png', normal_map: 'assets/art/miscellaneous_sprites/trap_suspended_anim_strip_18_n.png', frameWidth: 112, frameHeight: 64, frameCount: 18 },
  },

  save_point: {
    idle:   { path: 'assets/art/miscellaneous_sprites/save_point_anim_strip_9.png',        normal_map: 'assets/art/miscellaneous_sprites/save_point_anim_strip_9_n.png',        frameWidth: 12, frameHeight: 20, frameCount: 9 },
    saving: { path: 'assets/art/miscellaneous_sprites/save_point_saving_anim_strip_3.png', normal_map: 'assets/art/miscellaneous_sprites/save_point_saving_anim_strip_3_n.png', frameWidth: 12, frameHeight: 20, frameCount: 3 },
  },

  vase: {
    breaking: { path: 'assets/art/miscellaneous_sprites/vase_breaking_anim_strip_5.png', normal_map: 'assets/art/miscellaneous_sprites/vase_breaking_anim_strip_5_n.png', frameWidth: 16, frameHeight: 16, frameCount: 5 },
  },

  strange_door_closed: {
    opening: { path: 'assets/art/miscellaneous_sprites/strange_door_opening_anim_strip_14.png', normal_map: 'assets/art/miscellaneous_sprites/strange_door_opening_anim_strip_14_n.png', frameWidth: 16, frameHeight: 48, frameCount: 14 },
  },

  strange_door_full: {
    closed_idle: { path: 'assets/art/miscellaneous_sprites/strange_door_closed_anim_strip_10.png', normal_map: 'assets/art/miscellaneous_sprites/strange_door_closed_anim_strip_10_n.png', frameWidth: 16, frameHeight: 48, frameCount: 10 },
  },

  tiki_torch: {
    burning: { path: 'assets/art/miscellaneous_sprites/tiki_torch_props_strip_12.png', normal_map: 'assets/art/miscellaneous_sprites/tiki_torch_props_strip_12_n.png', frameWidth: 8, frameHeight: 24, frameCount: 12 },
  },

  dust_effect: {
    hit_wall: { path: 'assets/art/miscellaneous_sprites/spikes_trap_hit_wall_dust_effect_strip_3.png', normal_map: 'assets/art/miscellaneous_sprites/spikes_trap_hit_wall_dust_effect_anim_strip_3_n.png', frameWidth: 16, frameHeight: 4, frameCount: 3 },
  },

  waterfall: {
    top:    { path: 'assets/art/tiles_and_background_foreground__new/waterfall_anim_strip_4.png',        normal_map: 'assets/art/tiles_and_background_foreground__new/waterfall_anim_strip_4_n.png',        frameWidth: 16, frameHeight: 24, frameCount: 4 },
    bottom: { path: 'assets/art/tiles_and_background_foreground__new/waterfall_bottom_anim_strip_4.png', normal_map: 'assets/art/tiles_and_background_foreground__new/waterfall_bottom_anim_strip_4_n.png', frameWidth: 16, frameHeight: 8,  frameCount: 4 },
  },

  hit_sparkle: {
    effect: { path: 'assets/art/herochar_sprites_new/hit_sparkle_anim_strip_4.png', normal_map: 'assets/art/herochar_sprites_new/hit_sparkle_anim_strip_4_n.png', frameWidth: 16, frameHeight: 16, frameCount: 4 },
  },

  sword_effect: {
    slash: { path: 'assets/art/herochar_sprites_new/sword_effect_strip_4_new.png', normal_map: 'assets/art/herochar_sprites_new/sword_effect_anim_strip_4_n.png', frameWidth: 16, frameHeight: 16, frameCount: 4 },
  },

  lost_hearts: {
    effect: { path: 'assets/art/hud_elements/lost_hearts_anim_strip_5.png', normal_map: 'assets/art/hud_elements/lost_hearts_anim_strip_5_n.png', frameWidth: 16, frameHeight: 16, frameCount: 5 },
  },

  select_icon: {
    bounce: { path: 'assets/art/hud_elements/select_icon_anim_strip_5.png', normal_map: 'assets/art/hud_elements/select_icon_anim_strip_5_n.png', frameWidth: 12, frameHeight: 12, frameCount: 5 },
  },
};

export const IMAGES = {
  tilemaps: {
    ground_grass:    'assets/art/tilemaps/ground_grass.png',
    ground_dirt:     'assets/art/tilemaps/ground_dirt.png',
    platform_grass:  'assets/art/tilemaps/platform_grass.png',
    platform_dirt:   'assets/art/tilemaps/platform_dirt.png',
    background_rock: 'assets/art/tilemaps/background_rock.png',
  },
  background: {
    background: 'assets/art/tiles_and_background_foreground__new/background.png',
    bg_0:       'assets/art/tiles_and_background_foreground__new/bg_0.png',
    bg_1:       'assets/art/tiles_and_background_foreground__new/bg_1.png',
    bg_2:       'assets/art/tiles_and_background_foreground__new/bg_2.png',
  },
  foreground: {
    fg_0: 'assets/art/tiles_and_background_foreground__new/fg_0.png',
    fg_1: 'assets/art/tiles_and_background_foreground__new/fg_1.png',
  },
  hud: {
    coins:         'assets/art/hud_elements/coins_hud.png',
    health_left:   'assets/art/hud_elements/health_hud_left.png',
    health_middle: 'assets/art/hud_elements/health_hud_middle.png',
    health_right:  'assets/art/hud_elements/health_hud_right.png',
    hearts:        'assets/art/hud_elements/hearts_hud.png',
    no_hearts:     'assets/art/hud_elements/no_hearts_hud.png',
    lifes_icon:    'assets/art/hud_elements/lifes_icon.png',
    orbs:          'assets/art/hud_elements/orbs_hud.png',
    fonts:         'assets/art/hud_elements/fonts.png',
  },
  objects: {
    spikes:           'assets/art/miscellaneous_sprites/spikes.png',
    door:             'assets/art/miscellaneous_sprites/door.png',
    stone:            'assets/art/miscellaneous_sprites/stone.png',
    loot_box_open:    'assets/art/miscellaneous_sprites/loot_box_open.png',
    apple_item:       'assets/art/miscellaneous_sprites/apple_item.png',
    meat_item:        'assets/art/miscellaneous_sprites/meat_item.png',
    health_potion:    'assets/art/miscellaneous_sprites/health_potion.png',
    antidote_potion:  'assets/art/miscellaneous_sprites/antidote_potion.png',
    orb:              'assets/art/miscellaneous_sprites/orb.png',
    vase:             'assets/art/miscellaneous_sprites/vase.png',
    button:           'assets/art/miscellaneous_sprites/buttom.png',
    button_pressed:   'assets/art/miscellaneous_sprites/buttom_pressed.png',
    lever_left:       'assets/art/miscellaneous_sprites/lever_turned_left.png',
    lever_right:      'assets/art/miscellaneous_sprites/lever_turned_right.png',
    arrow_left:       'assets/art/miscellaneous_sprites/arrow_plate_left.png',
    arrow_right:      'assets/art/miscellaneous_sprites/arrow_plate_right.png',
    wood_slab_left:   'assets/art/miscellaneous_sprites/wood_slab_left.png',
    wood_slab_middle: 'assets/art/miscellaneous_sprites/wood_slab_middle.png',
    wood_slab_right:  'assets/art/miscellaneous_sprites/wood_slab_right.png',
    wooden_plate:     'assets/art/miscellaneous_sprites/wooden_plate.png',
  },
  props: {
    grass:      'assets/art/miscellaneous_sprites/grass_props.png',
    flowers:    'assets/art/miscellaneous_sprites/flowers_props.png',
    bigflowers: 'assets/art/miscellaneous_sprites/bigflowers_props.png',
    root:       'assets/art/miscellaneous_sprites/root_props.png',
    drygrass:   'assets/art/miscellaneous_sprites/drygrass_props.png',
  },
};

export const SOUNDS = {
  player: {
    walk:        'assets/sounds/player/walk/',
    jump:       'assets/sounds/player/jump/',
    double_jump: 'assets/sounds/player/double_jump/',
    attack:      'assets/sounds/player/attack/',
    sword_attack: 'assets/sounds/player/sword_attack/',
    hit:         'assets/sounds/player/hit/',
    dash:        'assets/sounds/player/dash/',
    death:       'assets/sounds/player/death/',
    push:        'assets/sounds/player/push/',
  },
  goblin: {
    attack: 'assets/sounds/enemies/goblin_attack/',
    hit:    'assets/sounds/enemies/goblin_hit/',
    death:  'assets/sounds/enemies/goblin_death/',
  },
  bomber_goblin: {
    attack: 'assets/sounds/enemies/bomber_goblin_attack/',
    hit:    'assets/sounds/enemies/bomber_goblin_hit/',
    death:  'assets/sounds/enemies/bomber_goblin_death/',
  },
  fly: {
    attack: 'assets/sounds/enemies/fly_attack/',
    hit:    'assets/sounds/enemies/fly_hit/',
    death:  'assets/sounds/enemies/fly_death/',
  },
  slime: {
    walk: 'assets/sounds/enemies/slime_walk/',
    hit:   'assets/sounds/enemies/slime_hit/',
    death: 'assets/sounds/enemies/slime_death/',
  },
  mushroom: {
    hit:   'assets/sounds/enemies/mushroom_hit/',
    death: 'assets/sounds/enemies/mushroom_death/',
  },
  coin: {
    pickup: 'assets/sounds/coin_pickup/',
  },
  orb: {
    pickup: 'assets/sounds/orb_pickup/',
  },
  loot_box: {
    opening: 'assets/sounds/loot_box_opening/',
  },
  bomb: {
    throw: 'assets/sounds/bomb_throw/',
    burst: 'assets/sounds/bomb_burst/',
  },
  trap: {
    spikes:    'assets/sounds/traps/spikes_trap/',
    suspended: 'assets/sounds/traps/suspended_trap/',
  },
  save_point: {
    saving: 'assets/sounds/save_point_saving/',
  },
  vase: {
    breaking: 'assets/sounds/vase_breaking/',
  },
  strange_door: {
    opening: 'assets/sounds/strange_door_opening/',
  },
};

export const LEVELS = [
    { key: 'level-01', path: 'assets/levels/level-01.json' },
    { key: 'level-02', path: 'assets/levels/level-02.json' },
];