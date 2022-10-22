import Phaser from 'phaser';
import { Bullet, BulletGroup } from '../classes/bullet';
import Enemy from '../classes/enemy';

export default class Demo extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private enemies: Enemy[] = [];
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
    this.load.image('map', 'map.jpeg');
    this.load.audio('gunshot', 'sound/gun-shot.mp3');
    this.load.audio('emptyGunshot', 'sound/empty-gun-shot.mp3');
  }

  create() {
    this.sound.add('gunshot');
    this.sound.add('emptyGunshot');
    this.add.image(400, 300, 'map');
    this.player = this.physics.add.sprite(100, 100, 'player');
    this.player.setScale(0.1);
    this.keyboard = {
      a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    };

    this.playerBullets = new BulletGroup(this);

    this.crosshair = this.physics.add.sprite(100, 100, 'crosshair');
    this.crosshair.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true);

    this.enemies.push(new Enemy(this.scene.scene, 200, 150, 'player'));
    this.enemies.push(new Enemy(this.scene.scene, 600, 450, 'player'));
    this.enemies.push(new Enemy(this.scene.scene, 200, 450, 'player'));
    this.enemies.push(new Enemy(this.scene.scene, 600, 150, 'player'));

    this.enemies.forEach(enemy => {
      enemy.setTarget(this.player);
    });

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this.crosshair.x = pointer.x;
      this.crosshair.y = pointer.y;
    });
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const bullet = this.playerBullets.fireBullet(this.player, this.crosshair);
      this.enemies.forEach(enemy =>
        this.physics.add.overlap(enemy.getSprite(), bullet, (e, b) =>
          this.enemyHitCallback(e, b, enemy)
        )
      );
    });

    this.cameras.main.startFollow(this.player);
  }

  update(t: number, dt: number) {
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

    this.player.rotation = Phaser.Math.Angle.Between(
      this.player.x,
      this.player.y,
      this.crosshair.x,
      this.crosshair.y
    );
    this.enemies.forEach(enemy => enemy.update(t, dt));
  }

  enemyHitCallback(
    enemyHit: Phaser.GameObjects.GameObject,
    bulletHit: Phaser.GameObjects.GameObject,
    enemy: Enemy
  ) {
    console.log('trafionee');
    enemy.removeHealth(34);
    bulletHit.destroy();

    // // Reduce health of enemy
    // if (bulletHit.active === true && enemyHit.active === true)
    // {
    //     enemyHit.health = enemyHit.health - 1;
    //     console.log("Enemy hp: ", enemyHit.health);

    //     // Kill enemy if health <= 0
    //     if (enemyHit.health <= 0)
    //     {
    //        enemyHit.setActive(false).setVisible(false);
    //     }

    //     // Destroy bullet
    //     bulletHit.setActive(false).setVisible(false);
    // }
  }
}
