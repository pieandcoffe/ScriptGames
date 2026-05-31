/**
 * Encapsulates a menu button with styling and interactivity
 */
export class Button {
  constructor(scene, x, y, label, callback, theme, index) {
    this.scene = scene;
    this.callback = callback;
    this.index = index;
    this.theme = theme;

    const BW = 80;
    const BH = 14;

    // Background rectangle
    this.bg = scene.add
      .rectangle(x, y, BW, BH, theme.bgDefault)
      .setStrokeStyle(1, theme.borderDefault)
      .setInteractive({ useHandCursor: true });

    // Label text
    this.text = scene.add
      .text(x, y, label, {
        fontFamily: 'monospace',
        fontSize: 7,
        color: theme.buttonText,
      })
      .setOrigin(0.5);

    // Cursor indicator
    this.cursor = scene.add
      .text(x - BW / 2 + 4, y, '>', {
        fontFamily: 'monospace',
        fontSize: 7,
        color: theme.cursorColor,
      })
      .setOrigin(0, 0.5)
      .setVisible(false);

    this._setupInteraction();
  }

  _setupInteraction() {
    this.bg.on('pointerover', () => {
      this.scene.events.emit('button:hovered', this.index);
    });

    this.bg.on('pointerdown', () => {
      this._animatePress();
    });
  }

  _animatePress() {
    this.scene.tweens.add({
      targets: [this.bg, this.text],
      scaleX: 0.95,
      scaleY: 0.95,
      duration: 60,
      yoyo: true,
      ease: 'Power2',
      onComplete: () => this.callback(),
    });
  }

  setSelected(selected) {
    this.scene.tweens.killTweensOf(this.bg);

    if (selected) {
      this.bg.setFillStyle(this.theme.bgHovered).setStrokeStyle(1, this.theme.borderHovered);
      this.text.setStyle({ color: this.theme.buttonTextHovered });
      this.cursor.setVisible(true);

      this.scene.tweens.add({
        targets: this.bg,
        scaleX: 1.03,
        scaleY: 1.03,
        duration: 500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    } else {
      this.bg.setScale(1).setFillStyle(this.theme.bgDefault).setStrokeStyle(1, this.theme.borderDefault);
      this.text.setStyle({ color: this.theme.buttonText });
      this.cursor.setVisible(false);
    }
  }

  destroy() {
    this.bg?.destroy();
    this.text?.destroy();
    this.cursor?.destroy();
  }
}
