import { Scene, Math as PMath } from 'phaser';
import { Button } from './Button.js';
import { UI_LAYOUT, ANIMATION_TIMINGS } from './UIConstants.js';

/**
 * Base scene for menu-style scenes with button navigation
 */
export class ButtonMenuScene extends Scene {
  constructor(config = {}) {
    super(config);

    this._buttons = [];
    this._selectedIndex = 0;
    this._theme = config.theme || {};
    this._setupBindings();
  }

  _setupBindings() {
    // Bind keyboard handlers so they can be unbound in shutdown
    this._onKeyUp = () => this._navigateUp();
    this._onKeyDown = () => this._navigateDown();
    this._onKeyEnter = () => this._selectButton();
    this._onKeySpace = () => this._selectButton();
    this._onButtonHovered = (index) => {
      this._selectedIndex = index;
      this._highlightSelected();
    };
  }

  createButtonMenu(items = [], startY = 82, buttonSpacing = UI_LAYOUT.buttonSpacing) {
    const centerX = UI_LAYOUT.screenWidth / 2;

    this._buttons = [];
    items.forEach((item, i) => {
      const button = new Button(this, centerX, startY + i * buttonSpacing, item.label, item.callback, this._theme, i);
      this._buttons.push(button);
    });

    this._highlightSelected();
    this._setupNavigation();
  }

  _setupNavigation() {
    this.input.keyboard.on('keydown-UP', this._onKeyUp);
    this.input.keyboard.on('keydown-DOWN', this._onKeyDown);
    this.input.keyboard.on('keydown-ENTER', this._onKeyEnter);
    this.input.keyboard.on('keydown-SPACE', this._onKeySpace);
    this.events.on('button:hovered', this._onButtonHovered, this);
  }

  _navigateUp() {
    this._selectedIndex = (this._selectedIndex - 1 + this._buttons.length) % this._buttons.length;
    this._highlightSelected();
  }

  _navigateDown() {
    this._selectedIndex = (this._selectedIndex + 1) % this._buttons.length;
    this._highlightSelected();
  }

  _selectButton() {
    this._buttons[this._selectedIndex]._animatePress();
  }

  _highlightSelected() {
    this._buttons.forEach((button, i) => {
      button.setSelected(i === this._selectedIndex);
    });
  }

  shutdown() {
    this.input.keyboard.off('keydown-UP', this._onKeyUp);
    this.input.keyboard.off('keydown-DOWN', this._onKeyDown);
    this.input.keyboard.off('keydown-ENTER', this._onKeyEnter);
    this.input.keyboard.off('keydown-SPACE', this._onKeySpace);
    this.events.off('button:hovered', this._onButtonHovered);
  }
}
