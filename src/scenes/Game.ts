import Phaser from 'phaser';

export default class Demo extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private keyboard!: {
    a: Phaser.Input.Keyboard.Key;
    w: Phaser.Input.Keyboard.Key;
    s: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
  };

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.baseURL = 'assets/';
    this.load.image('logo', 'phaser3-logo.png');
    this.load.image('player', 'player.png');

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
  }
}
