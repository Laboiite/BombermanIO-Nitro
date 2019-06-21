import { Engine, Color } from "excalibur";
import { Board } from "./board.class";
import { ResourcesLoader } from "./resources-loader.loader";
import { Resources } from "../resources/resources";

export class BombermanGame  {

	constructor(elemId: string, B: number, h: number) {

		const loader= new ResourcesLoader(Resources);
		loader.onprogress= e => { console.log("loader progress", e); };
		loader.oncomplete= () => { console.log("loader done"); };
		loader.onerror= () => { console.log("loader error"); };

		const engine= new Engine({
			backgroundColor: Color.White,
			canvasElementId: elemId,
			width: B,
			height: h
		});
		engine.setAntialiasing(false);

		const board= new Board(engine);

		// Game events to handle
		engine.on("hidden", () => {
			console.log("pause");
			engine.stop();
		});
		engine.on("visible", () => {
			console.log("start");
			engine.start();
		});

		engine.start(loader).then(()=> {
			board.render();
		});
	}

}
