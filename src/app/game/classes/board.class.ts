import { Engine } from "excalibur";
import { Level } from "./level.scene";
import { Player } from "./player.actor";
import { Config } from "../config.dict";

export class Board  {

	private currentLevel: number;
	private engine: Engine;
	private players: Player[]= [];

	constructor(engine: Engine, level: number= 0) {
		this.currentLevel= level;
		this.engine= engine;

		this.players.push(
			new Player(Config.playerStart.x, Config.playerStart.y, this.players.length+1)
		);
		this.players.push(
			new Player(Config.playerStart.x, Config.playerStart.y, this.players.length+1)
		);
	}

	render() {
		const levelName= `level${this.currentLevel}`;
		let level= this.engine.scenes[levelName];

		if(!level) {
			level= new Level(this.engine, 32, 32, this.currentLevel);
			this.engine.add(levelName, level);

			this.players.forEach(player => level.add(player));
		}


		this.engine.goToScene(levelName);
	}

}
