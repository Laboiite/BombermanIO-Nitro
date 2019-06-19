import * as ex from "excalibur";
import { Resources } from "./resources/resources";
import { Board } from "./board.class";

const BOARD_TEST= `
	BBBBBBBBBBBBBBBBB
	BGGGGGGGGGGGGGGGB
	BGBGGBGGBGGBGGBGB
	BGGGGGGGGGGGGGGGB
	BGBGGBGGBGGBGGBGB
	BGGGGGWGGGGGGGGGB
	BGBGGBGGBGGBGGBGB
	BGGGGGGGWGGGGGGGB
	BGBGGBGGBGGBGGBGB
	BGGGGGGGGGGGGGGGB
	BGBGGBGGBGGBGGBGB
	BGGGGGGGGGGGGGGGB
	BBBBBBBBBBBBBBBBB
`;

export class BombermanGame  {

	constructor(elemId: string, B: number, h: number) {
		// create an asset loader
		const loader= new ex.Loader();

		const engine= new ex.Engine({
			canvasElementId: elemId,
			width: B,
			height: h
		});

		// console.log(BOARD_TEST.split(""));

		loader.onprogress= e => { console.log("loader progress", e); };
		loader.oncomplete= () => { console.log("loader done"); };
		loader.onerror= () => { console.log("loader error"); };

		this.loadResources(loader);

		const board= new Board(17, 13, BOARD_TEST);

		// const paddle= this.createPaddle(engine);
		// engine.add(paddle);

		// const bricks= this.addBricks(engine);

		// const ball= this.createBall(engine, bricks);

		// engine.add(ball);

		engine.start(loader).then(()=> {
			board.render(engine);
			engine.goToScene("map1");
			console.log( "currentScene", engine.currentScene );


		});
	}

	private loadResources(loader) {
		// tslint:disable-next-line: forin
		for(const r in Resources) {
			loader.addResource(Resources[r]);
		}
	}

}
