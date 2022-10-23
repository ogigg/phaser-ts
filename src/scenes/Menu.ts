import Phaser from 'phaser';
import { Bullet, BulletGroup } from '../classes/bullet';
import Enemy from '../classes/enemy';

export default class Menu extends Phaser.Scene {
  private crosshair!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private music!: Phaser.Sound.BaseSound;
  constructor() {
    super('Menu');
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
    this.add.text(40, 50, 'What did I do last weekend?', {
      fontSize: '36px',
      color: 'red'
    });

    const playButton = this.add
      .text(40, 200, '< PLAY >', {
        fontSize: '36px',
        color: 'red'
      })
      .setInteractive();
    const optionsButton = this.add
      .text(40, 250, '< SETTINGS >', {
        fontSize: '36px',
        color: 'red'
      })
      .setInteractive();

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this.crosshair.x = pointer.x;
      this.crosshair.y = pointer.y;
    });

    [playButton, optionsButton].forEach(button => {
      button.on('pointerover', () => {
        button.setColor('black');
      });

      button.on('pointerout', () => {
        button.setColor('red');
      });

      button.on('pointerup', () => {
        if (button.text.toLowerCase().includes('play')) {
          this.music.stop();
          this.scene.start('GameScene');
        }
      });
    });
  }

  update(t: number, dt: number) {}
}
