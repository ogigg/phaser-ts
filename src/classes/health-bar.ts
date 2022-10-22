export class HealthBar {
  private bar: Phaser.GameObjects.Graphics;
  private x: number = 0;
  private y: number = 0;
  private health: number = 100;
  private p = 76 / 100;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.bar = new Phaser.GameObjects.Graphics(scene);

    this.x = x;
    this.y = y;
    this.health = 100;

    this.draw();

    scene.add.existing(this.bar);
  }

  decrease(amount: number) {
    this.health -= amount;

    if (this.health < 0) {
      this.health = 0;
    }

    this.draw();

    return this.health === 0;
  }

  draw() {
    this.bar.clear();

    //  BG
    this.bar.fillStyle(0x000000);
    this.bar.fillRect(this.x, this.y, 80, 16);

    //  Health

    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(this.x + 2, this.y + 2, 76, 12);

    if (this.health < 30) {
      this.bar.fillStyle(0xff0000);
    } else {
      this.bar.fillStyle(0x00ff00);
    }

    var d = Math.floor(this.p * this.health);

    this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
  }

  destroy() {
    this.bar.destroy();
  }
}
