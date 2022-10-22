import Phaser from 'phaser';

export class BulletGroup extends Phaser.Physics.Arcade.Group
{
	constructor(scene: Phaser.Scene) {
		super(scene.physics.world, scene);
 
		this.createMultiple({
			classType: Bullet, // This is the class we create just below
			frameQuantity: 30, // Create 30 instances in the pool
			active: false,
			visible: false,
			key: 'bullet',
            setScale: {x: 0.1, y: 0.1}
		})
	}

    fireBullet(shooter: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, target: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
        const bullet = this.getFirstDead(false);
		if (bullet) {
            this.scene.sound.get('gunshot').play();
			bullet.fire(shooter, target);
		} else {
            this.scene.sound.get('emptyGunshot').play();
        }
        return bullet;
	}
 
}
 
export class Bullet extends Phaser.Physics.Arcade.Sprite {
    private xSpeed: number = 0;
    private ySpeed: number = 0;
    private speed: number = 1000;
    private direction: number = 0;

	constructor(scene:Phaser.Scene, x: number, y: number) {
		super(scene, x, y, 'bullet');
    }
    fire(shooter: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, target: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
		this.setPosition(shooter.x, shooter.y);
        this.direction = Math.atan( (target.x-this.x) / (target.y-this.y));
        if (target.y >= this.y)
        {
            this.xSpeed = this.speed* Math.sin(this.direction);
            this.ySpeed = this.speed*Math.cos(this.direction);
        }
        else
        {
            this.xSpeed = -this.speed*Math.sin(this.direction);
            this.ySpeed = -this.speed*Math.cos(this.direction);
        }

        this.rotation = shooter.rotation;
        this.setVelocity(this.xSpeed, this.ySpeed);
		this.setActive(true);
		this.setVisible(true);
 
	}
}