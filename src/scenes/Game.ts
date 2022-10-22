import Phaser from 'phaser';
import { Bullet, BulletGroup } from '../classes/bullet';

export default class Demo extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private crosshair!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private keyboard!: {
    a: Phaser.Input.Keyboard.Key;
    w: Phaser.Input.Keyboard.Key;
    s: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
  };
  private playerBullets!: BulletGroup;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.baseURL = 'assets/';
    this.load.image('logo', 'phaser3-logo.png');
    this.load.image('player', 'player.png');
    this.load.image('bullet', 'bullet.png');
    this.load.image('crosshair', 'crosshair.png');

  }

  create() {
    this.player = this.physics.add.sprite(100, 100, 'player');
    this.player.setScale(0.1);
    this.keyboard = {
      a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    }

    this.playerBullets = new BulletGroup(this);

    this.crosshair = this.physics.add.sprite(100, 100, 'crosshair');
    this.crosshair.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true);

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this.crosshair.x = pointer.x;
      this.crosshair.y = pointer.y;
    });
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.playerBullets.fireBullet(this.player, this.crosshair);
    });

      this.cameras.main.startFollow(this.player);
    
  }

  update() {
    if (this.keyboard.d.isDown) {
      this.player.x += 3;
    } else if (this.keyboard.a.isDown) {
      this.player.x -= 3;
    } 

    if (this.keyboard.s.isDown) {
      this.player.y += 3;
    } else if (this.keyboard.w.isDown) {
      this.player.y -= 3;
    } 

    this.player.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.crosshair.x, this.crosshair.y);
  }
}
