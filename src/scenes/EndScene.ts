import Phaser from 'phaser';
import { Bullet, BulletGroup } from '../classes/bullet';
import Enemy from '../classes/enemy';

export default class EndScene extends Phaser.Scene {
  private crosshair!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private music!: Phaser.Sound.BaseSound;
  private text: string = '';

  constructor(d: any) {
    super('EndScene');
    console.log(d);
    // this.text = text;
  }

  init(data: { text: string }) {
    this.text = data.text;
  }
  preload() {
    this.load.baseURL = 'assets/';
    this.load.image('crosshair', 'crosshair.png');
    this.load.audio('bgmusic', 'sound/bgSound.mp3');
  }

  create() {
    this.crosshair = this.physics.add.sprite(100, 100, 'crosshair');
    this.crosshair.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true);
    this.music = this.sound.add('bgmusic', { volume: 0.1, loop: true });
    this.music.play();
    this.add.text(40, 50, this.text, {
      fontSize: '36px',
      color: 'red'
    });

    const menuButton = this.add
      .text(40, 200, '< MAIN MENU >', {
        fontSize: '36px',
        color: 'red'
      })
      .setInteractive();

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this.crosshair.x = pointer.x;
      this.crosshair.y = pointer.y;
    });

    menuButton.on('pointerover', () => {
      menuButton.setColor('black');
    });

    menuButton.on('pointerout', () => {
      menuButton.setColor('red');
    });

    menuButton.on('pointerup', () => {
      this.music.stop();
      this.scene.stop();
      this.scene.start('Menu');
    });
  }

  update(t: number, dt: number) {}
}
