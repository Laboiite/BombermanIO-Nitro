import { Engine, Color } from "excalibur";
import { Board } from "./board.class";
import { ResourcesLoader } from "./resources-loader.loader";
import { Resources } from "../resources/resources";

export class BombermanGame  {

	private _board: Board;

	constructor() {

	}

	public run(elemId: string, W: number, H: number) {
		const loader= new ResourcesLoader(Resources);
		// loader.onprogress= e => { console.log("loader progress", e); };
		// loader.oncomplete= () => { console.log("loader done"); };
		// loader.onerror= () => { console.log("loader error"); };

		const engine= new Engine({
			backgroundColor: Color.White,
			canvasElementId: elemId,
			width: W,
			height: H
		});
		engine.setAntialiasing(false);

		this._board= new Board(engine);

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
	public addPlayer() {
		this._board.addPlayer();
	}
}
