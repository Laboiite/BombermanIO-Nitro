import { Actor, Engine, CollisionType, Input, Vector, PostCollisionEvent, SpriteSheet } from "excalibur";
import { Config } from "../config.dict";
import { Resources } from "../resources/resources";
import { Subject } from "rxjs";

export interface IPlayerMove {
	id: number;
	pos: Vector;
}

export class Player extends Actor {
	private _id: number;
	// private _lastPos: Vector= new Vector(0, 0);
	public pos$: Subject<IPlayerMove>= new Subject<IPlayerMove>();

	constructor(x, y, playerRezID: number) {
		super(x, y, Config.playerWidth, Config.playerHeight);
		this._id= playerRezID;
	}

	public onInitialize(engine: Engine) {
		this._setupDrawing(engine);
		this._setupCollision();
	}

	public onPostDraw(_ctx: CanvasRenderingContext2D, _delta: number): void {
		if(!this.pos.equals(this.oldPos)) {
			// this._lastPos.setTo(this.pos.x, this.pos.y);
			this.pos$.next({id: this.id, pos: this.pos});
			// console.log("onPostUpdate", {id: this.id, pos: this.pos});
		}
	}

	// public onPostUpdate(engine: Engine, delta: number) {
	// 	if(!this.pos.equals(this.oldPos)) {
	// 		// this._lastPos.setTo(this.pos.x, this.pos.y);
	// 		this.pos$.next({id: this.id, pos: this.pos});
	// 		console.log("onPostUpdate", {id: this.id, pos: this.pos});
	// 	}
	// }

	public setAsMainPlayer(engine: Engine) {
		this._setupInputs(engine);
	}

	private _setupCollision( ) {
		this.body.collider.type= CollisionType.Active;

		this.on("postcollision", (evt: PostCollisionEvent) => {
			this.vel = Vector.Zero.clone();
		});
	}

	private _setupInputs(engine: Engine) {
		const kbd= engine.input.keyboard;

		kbd.on("hold", (keyUp?: Input.KeyEvent) => {
			switch(keyUp.key) {
				case Input.Keys.Up :
				case Input.Keys.W :
					this.vel.setTo(this.vel.x, -Config.playerVel);
					this.setDrawing("walkUp");
					break;
				case Input.Keys.Down :
				case Input.Keys.S :
					this.vel.setTo(this.vel.x, Config.playerVel);
					this.setDrawing("walkDown");
					break;
				case Input.Keys.Left :
				case Input.Keys.A :
					this.vel.setTo(-Config.playerVel, this.vel.y);
					this.setDrawing("walkLeft");
					break;
				case Input.Keys.Right :
				case Input.Keys.D :
					this.vel.setTo(Config.playerVel, this.vel.y);
					this.setDrawing("walkRight");
					break;
			}

		});
		kbd.on("up", (keyUp?: ex.Input.KeyEvent) => {
			switch(keyUp.key) {
				case Input.Keys.Up :
				case Input.Keys.W :
					this.setDrawing("up");
				break;
				case Input.Keys.Down :
				case Input.Keys.S :
					// this.vel.setTo(this.vel.x, Config.playerVel);
					this.setDrawing("down");
				break;
				case Input.Keys.Left :
				case Input.Keys.A :
					this.setDrawing("left");
				break;
				case Input.Keys.Right :
				case Input.Keys.D :
					this.setDrawing("right");
				break;
			}
		});
		kbd.on("release", (evt: ex.Input.KeyEvent) => {
			this.vel = Vector.Zero.clone();
		});
	}

	private _setupDrawing(engine: Engine) {
		const playerSheet= new SpriteSheet(Resources.tiles["playerSheet"+this._id] as any, 20, 1, 34, 52);
		const downSprite= playerSheet.getSprite(1);
		const upSprite= playerSheet.getSprite(10);
		const leftSprite= playerSheet.getSprite(4);
		const righSprite= playerSheet.getSprite(7);

		this.addDrawing("up", upSprite);
		this.addDrawing("down", downSprite);
		this.addDrawing("left", leftSprite);
		this.addDrawing("right", righSprite);

		this.addDrawing("walkUp", playerSheet.getAnimationByIndices(engine, [9, 11], 90));
		this.addDrawing("walkDown", playerSheet.getAnimationByIndices(engine, [0, 2], 90));
		this.addDrawing("walkLeft", playerSheet.getAnimationByIndices(engine, [3, 13, 4], 90));
		this.addDrawing("walkRight", playerSheet.getAnimationByIndices(engine, [6, 14, 7], 90));

		this.setDrawing("down");

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
