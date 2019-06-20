import { Engine } from "excalibur";
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
			canvasElementId: elemId,
			width: B,
			height: h
		});

		const board= new Board(engine);

		engine.start(loader).then(()=> {
			board.render();
		});
	}

}
