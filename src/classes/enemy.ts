import Phaser from 'phaser'

export default class Enemy extends Phaser.GameObjects.Sprite
{
	private target?: Phaser.GameObjects.Components.Transform

	constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
	{
		super(scene, x, y, texture)
        this.setScale(0.1);
	}

	setTarget(target: Phaser.GameObjects.Components.Transform)
	{
		this.target = target
	}

	update(t: number, dt: number)
	{
		if (!this.target)
		{
			return
		}

		const tx = this.target.x
		const ty = this.target.y

		const x = this.x
		const y = this.y

		const rotation = Phaser.Math.Angle.Between(x, y, tx, ty)
		this.setRotation(rotation)
	}
}