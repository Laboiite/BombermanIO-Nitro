import { Engine } from "excalibur";
import { Level } from "./level.class";
import { Resources } from "../resources/resources";

export class Board  {

	private currentLevel: number;

	constructor(level: number= 0) {
		this.currentLevel= level;
	}

	render(engine: Engine) {
		const levelName= `level${this.currentLevel}`;
		let level= engine.scenes[levelName];

		if(!level) {
			level= new Level(engine, 32, 32, Resources.levels[this.currentLevel]);
			engine.add(levelName, level);
		}

		engine.goToScene(levelName);
	}

}
