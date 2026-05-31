/**
 * Common UI constants and layout dimensions
 */
export const UI_LAYOUT = {
  // Screen dimensions (240x160 native)
  screenWidth: 240,
  screenHeight: 160,

  // Button dimensions
  buttonWidth: 80,
  buttonHeight: 14,
  buttonSpacing: 22,

  // HUD layout
  hudHeartX: 8,
  hudHeartY: 4,
  hudHeartSpacing: 16,

  hudCoinX: 4,
  hudCoinY: 20,
  hudScoreOffsetX: 3,
  hudScoreOffsetY: 1,

  // Text layout
  titleOffsetX: 0.5,
  titleOffsetY: 0.5,

  // Padding and margins
  padding: 4,
  margin: 2,
};

/**
 * Animation durations
 */
export const ANIMATION_TIMINGS = {
  buttonScalePress: 60,
  buttonHoverScale: 500,
  textFlicker: 40,
  textFlickerDelay: {
    min: 800,
    max: 3000,
  },
  textFlickerRepeat: {
    min: 1,
    max: 3,
  },
};
