import { Actor, Engine, CollisionType } from "excalibur";
import { Config } from "../config.dict";
import { Resources } from "../resources/resources";


export class Walls extends Actor {

	constructor(x, y) {
		super(x, y, Config.playerWidth, Config.playerHeight);
		this.anchor.setTo(0, 0);
	}

	public onInitialize(engine: Engine) {

		this._setupDrawing();
		this._setupCollision();

	}

	private _setupCollision( ) {
		this.body.collider.type= CollisionType.Fixed;
		this.on("Walls precollision", evt => console.log("PreCollisionEvent", evt));
		this.on("Walls collision", evt => console.log("CollisionEvent", evt));
	}

	private _setupDrawing() {

		this.addDrawing("block", Resources.sprites.block as any);

	}

}
