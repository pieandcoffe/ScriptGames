/**
 * Common text styling presets used across UI scenes
 */
export const TEXT_STYLES = {
  title: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#d4a830',
    stroke: '#1a0d0a',
    strokeThickness: 3,
  },

  button: {
    fontFamily: 'monospace',
    fontSize: 7,
    color: '#b8d4c0',
  },

  buttonHovered: {
    fontFamily: 'monospace',
    fontSize: 7,
    color: '#ffffff',
  },

  cursor: {
    fontFamily: 'monospace',
    fontSize: 7,
    color: '#4aaa8a',
  },

  subtitle: {
    fontFamily: 'monospace',
    fontSize: 6,
    color: '#8a6050',
  },

  version: {
    fontFamily: 'monospace',
    fontSize: 5,
    color: '#5a3a2a',
  },
  
  score: {
    fontFamily: 'monospace',
    fontSize: '10px',
    color: '#f0e0a0',
    stroke: '#1a0d0a',
    strokeThickness: 2,
  },
};

/**
 * Color themes for different menu types
 */
export const MENU_THEMES = {
  main: {
    bgDefault:        0x1f0e0a,
    bgHovered:        0x3d2010,
    borderDefault:    0x4a7c3f,
    borderHovered:    0x7abf5a,
    cursorColor:      '#4aaa8a',
    buttonText:       '#b8d4c0',
    buttonTextHovered:'#ffffff',
  },
  gameOver: {
    bgDefault:        0x200808,
    bgHovered:        0x4a1010,
    borderDefault:    0x8a2020,
    borderHovered:    0xcc4444,
    cursorColor:      '#cc4444',
    buttonText:       '#d4907a',
    buttonTextHovered:'#ffffff',
  },
};