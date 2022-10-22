import Phaser from 'phaser';

export default class Enemy {
  private target?: Phaser.GameObjects.Components.Transform;
  private x: number = 0;
  private y: number = 0;
  private health: number = 100;
  private enemy!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    this.x = x;
    this.y = y;
    this.enemy = scene.physics.add.sprite(x, y, texture);
    this.enemy.setScale(0.1);
  }

  setTarget(target: Phaser.GameObjects.Components.Transform) {
    this.target = target;
  }

  update(t: number, dt: number) {
    if (!this.target) {
      return;
    }

    const tx = this.target.x;
    const ty = this.target.y;

    const x = this.x;
    const y = this.y;

    const rotation = Phaser.Math.Angle.Between(x, y, tx, ty);
    this.enemy.setRotation(rotation);
  }

  getSprite(): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
    return this.enemy;
  }

  removeHealth(hpDelta: number): void {
    this.health -= hpDelta;
    if (this.health <= 0) {
      this.enemy.setActive(false).setVisible(false);
      this.enemy.destroy();
    }
  }
}
