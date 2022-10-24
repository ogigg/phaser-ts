import Phaser from 'phaser';
import { BulletGroup } from './bullet';
import { HealthBar } from './health-bar';

export default class Enemy {
  private target!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private x: number = 0;
  private y: number = 0;
  private health: number = 100;
  private enemy!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private healthBar!: HealthBar;
  private enemyBullets!: BulletGroup;
  private shootCounter = Math.floor(Math.random() * (30 - 1) + 0);

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    this.x = x;
    this.y = y;
    this.enemy = scene.physics.add.sprite(x, y, texture);
    this.enemy.setScale(0.1);
    this.healthBar = new HealthBar(scene, x - 40, y - 40);
    this.enemyBullets = new BulletGroup(scene);
  }

  setTarget(target: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
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
    if (this.shootCounter === 60 && this.health > 0) {
      this.onShoot();
      this.shootCounter = 0;
    }
    this.shootCounter++;
  }

  getSprite(): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
    return this.enemy;
  }

  removeHealth(hpDelta: number): void {
    this.health -= hpDelta;
    this.healthBar.decrease(hpDelta);
    if (this.health <= 0) {
      this.enemy.setActive(false).setVisible(false);
      this.enemy.destroy();
      this.healthBar.destroy();
    }
  }

  getHealth(): number {
    return this.health;
  }

  onShoot() {
    this.enemyBullets.fireBullet(this.enemy, this.target);
  }
}
