import { Actor, Engine, Sprite, CollisionType } from "excalibur";
// import { Resources } from "../resources/resources";

const TileSprites = {
	// "W": Resources.wall.asSprite(),
	// "G": Resources.grass.asSprite(),
	// "B": Resources.block.asSprite()
};

export class TileActor extends Actor {

	private type: string;
	private sprite: Sprite;

	constructor(type: string, x: number, y: number) {
		super(x, y);
		this.type= type;
		this.sprite= TileSprites[type];
		this.body.collider.type= CollisionType.Fixed;

	}

	public onInitialize(engine: Engine) {
		this.addDrawing(this.sprite);
	}

	// public update(engine: ex.Engine, delta: number) {
	// 	super.update(engine, delta); // call base update logic

	// 	// check if player died
	// 	if (this.health <= 0) {
	// 		this.emit('death');
	// 		this.onDeath();
	// 		return;
	// 	}
	// }
}
