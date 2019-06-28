import { Engine, Color, Vector } from "excalibur";
import { Board } from "./board.class";
import { ResourcesLoader } from "./resources-loader.loader";
import { Resources } from "../resources/resources";
import { Player } from "./player.actor";

export class BombermanGame  {

	private _board: Board;
	private _playerRezID: number;

	constructor(playerRezID: number= 1) {
		this._playerRezID= playerRezID;
	}

	public run(elemId: string, W: number, H: number) {
		const loader= new ResourcesLoader(Resources);

		const engine= new Engine({
			backgroundColor: Color.White,
			canvasElementId: elemId,
			width: W,
			height: H
		});
		engine.setAntialiasing(false);

		this._board= new Board(engine, this._playerRezID);

		engine.on("hidden", () => {
			engine.stop();
		});
		engine.on("visible", () => {
			engine.start();
		});

		engine.start(loader).then(()=> {
			this._board.render();
		});
	}

	public addPlayer(playerRezID: number): Player {
		return this._board.addPlayer(playerRezID);
	}

	public getPlayer(id: number): Player {
		return this._board.getPlayer(id);
	}

	public movePlayer(id: number, pos: Vector): void {
		this._board.movePlayer(id, pos);
	}
}
