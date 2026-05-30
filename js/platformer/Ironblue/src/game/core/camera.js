import { Math as PMath } from 'phaser';

/**
 * Camera system for tracking entities with smooth following and world bounds.
 */
export class Camera {
    /**
     * Creates a new camera system.
     * @param {Phaser.Scene} scene - The scene containing the camera.
     * @param {Phaser.Physics.Arcade.Sprite} target - The entity to track.
     * @param {object} config - Configuration options.
     * @param {number} config.worldWidth - Width of the world bounds.
     * @param {number} config.worldHeight - Height of the world bounds.
     * @param {number} config.smoothness - Camera smoothness factor (0-1, higher = smoother).
     * @param {number} config.offsetY - Vertical offset from target (negative = higher on screen).
     * @param {boolean} config.followY - Whether to follow Y axis.
     * @param {boolean} config.followX - Whether to follow X axis.
     */
    constructor(scene, target, config = {}) {
        this.scene = scene;
        this.target = target;
        this.camera = scene.cameras.main;

        this.config = {
            worldWidth: config.worldWidth || scene.scale.width,
            worldHeight: config.worldHeight || scene.scale.height,
            smoothness: config.smoothness ?? 0.1,
            offsetY: config.offsetY ?? -60,
            followY: config.followY ?? true,
            followX: config.followX ?? true,
        };

        // Set world bounds for the camera
        this.camera.setBounds(
            0, 0,
            this.config.worldWidth,
            this.config.worldHeight
        );

        this.camera.startFollow(target, false);

        this._lastScrollX = this.camera.scrollX;
    }

    /**
     * Updates the camera position to follow the target.
     */
    update() {
        if (!this.target) return;

        const targetX = this.target.x;
        const targetY = this.target.y + this.config.offsetY;

        const cameraWidth = this.camera.width;
        const cameraHeight = this.camera.height;
        const worldWidth = this.config.worldWidth;
        const worldHeight = this.config.worldHeight;

        let newX = this.camera.scrollX;
        let newY = this.camera.scrollY;

        // Smooth follow X
        if (this.config.followX) {
            const desiredX = targetX - cameraWidth / 2;
            newX = PMath.Linear(newX, desiredX, this.config.smoothness);
        }

        // Smooth follow Y
        if (this.config.followY) {
            const desiredY = targetY - cameraHeight / 2;
            newY = PMath.Linear(newY, desiredY, this.config.smoothness);
        }

        // Clamp to world bounds
        newX = PMath.Clamp(newX, 0, Math.max(0, worldWidth - cameraWidth));
        newY = PMath.Clamp(newY, 0, Math.max(0, worldHeight - cameraHeight));

        this.camera.setScroll(newX, newY);
    }

    /**
     * Returns horizontal scroll delta since the last frame.
     * @returns {number}
     */
    getScrollDeltaX() {
        const deltaX = this.camera.scrollX - this._lastScrollX;
        this._lastScrollX = this.camera.scrollX;
        return deltaX;
    }

    /**
     * Sets the target entity to follow.
     * @param {Phaser.Physics.Arcade.Sprite} target - The new target.
     */
    setTarget(target) {
        this.target = target;
    }

    /**
     * Configures the camera smoothness.
     * @param {number} smoothness - Smoothness factor (0-1).
     */
    setSmoothness(smoothness) {
        this.config.smoothness = PMath.Clamp(smoothness, 0, 1);
    }

    /**
     * Configures the vertical offset.
     * @param {number} offsetY - Vertical offset in pixels.
     */
    setOffsetY(offsetY) {
        this.config.offsetY = offsetY;
    }

    /**
     * Configures follow behavior.
     * @param {boolean} followX - Follow horizontal axis.
     * @param {boolean} followY - Follow vertical axis.
     */
    setFollowAxes(followX, followY) {
        this.config.followX = followX;
        this.config.followY = followY;
    }

    /**
     * Gets the current world bounds.
     * @returns {object} Object with worldWidth and worldHeight.
     */
    getWorldBounds() {
        return {
            worldWidth: this.config.worldWidth,
            worldHeight: this.config.worldHeight,
        };
    }

    /**
     * Gets the current viewport size.
     * @returns {object} Object with width and height of the viewport.
     */
    getViewPortSize() {
        return {
            width: this.viewPortWidth,
            height: this.viewPortHeight,
        };
    }
}
