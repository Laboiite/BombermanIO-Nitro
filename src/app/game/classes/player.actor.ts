import { Actor, Engine, CollisionType, Sprite, Input, PostUpdateEvent, Events, Vector } from "excalibur";
import { Config } from "../config.dict";
import { Resources } from "../resources/resources";


export class Player extends Actor {

	constructor(x, y) {
		super(x, y, Config.playerWidth, Config.playerHeight);
	}

	public onInitialize(engine: Engine) {

		this._setupDrawing();
		this._setupInputs(engine);
		this._setupCollision();

	}

	private _setupCollision( ) {
		this.body.collider.type= CollisionType.Passive;
		this.on("precollision", evt => console.log("PreCollisionEvent", evt));
		this.on("collision", evt => console.log("CollisionEvent", evt));
	}

	private _setupInputs(engine: Engine) {
		const kbd= engine.input.keyboard;

		kbd.on("hold", (keyUp?: Input.KeyEvent) => {
			switch(keyUp.key) {
				case Input.Keys.Up :
				case Input.Keys.W :
					this.vel.setTo(this.vel.x, -Config.playerVel);
					this.setDrawing("up");
					break;
				case Input.Keys.Down :
				case Input.Keys.S :
					this.vel.setTo(this.vel.x, Config.playerVel);
					this.setDrawing("down");
					break;
				case Input.Keys.Left :
				case Input.Keys.A :
					this.vel.setTo(-Config.playerVel, this.vel.y);
					this.setDrawing("left");
					break;
				case Input.Keys.Right :
				case Input.Keys.D :
					this.vel.setTo(Config.playerVel, this.vel.y);
					this.setDrawing("right");
					break;
			}
		});

		kbd.on("release", (evt: ex.Input.KeyEvent) => {
			this.vel = Vector.Zero.clone();
		});
	}

	private _setupDrawing() {

		this.addDrawing("up", Resources.sprites.player1 as any);
		this.addDrawing("down", Resources.sprites.player1 as any);
		this.addDrawing("left", Resources.sprites.player1 as any);
		this.addDrawing("right", Resources.sprites.player1 as any);

/*
		const playerSheet = new SpriteSheet(director.getCharSprite(), 10, 1, 45, 45);
		const downSprite = playerSheet.getSprite(0);
		const upSprite = playerSheet.getSprite(3);
		const leftSprite = playerSheet.getSprite(7);
		const righSprite = playerSheet.getSprite(9);

		downSprite.anchor.setTo(0, 0.2);
		upSprite.anchor.setTo(0, 0.2);
		leftSprite.anchor.setTo(0, 0.2);
		righSprite.anchor.setTo(0, 0.2);

		this.addDrawing("down", downSprite);
		this.addDrawing("up", upSprite);
		this.addDrawing("left", leftSprite);
		this.addDrawing("right", righSprite);

		this._leftDrawing = playerSheet.getSprite(9); //for game over screen

		// var walkDownAnim = playerSheet.getAnimationBetween(game, 0, 4, 180);
		const walkDownAnim = playerSheet.getAnimationByIndices(game, [0, 1, 0, 2], 180)
		walkDownAnim.loop = true;
		walkDownAnim.anchor.setTo(0, 0.2);
		this.addDrawing("walkDown", walkDownAnim);

		// var walkUpAnim = playerSheet.getAnimationBetween(game, 4,8, 180);
		const walkUpAnim = playerSheet.getAnimationByIndices(game, [3, 4, 3, 5], 180);
		walkUpAnim.loop = true;
		walkUpAnim.anchor.setTo(0, 0.2);
		this.addDrawing("walkUp", walkUpAnim);

		const walkLeftAnim = playerSheet.getAnimationByIndices(game, [7,6], 200);
		walkLeftAnim.loop = true;
		walkLeftAnim.anchor.setTo(0, 0.2);
		this.addDrawing("walkLeft", walkLeftAnim);

		const walkRightAnim = playerSheet.getAnimationByIndices(game, [9,8], 200);
		walkRightAnim.loop = true;
		walkRightAnim.anchor.setTo(0, 0.2);
		this.addDrawing("walkRight", walkRightAnim);

		this.setDrawing("down");
*/
	}

}
