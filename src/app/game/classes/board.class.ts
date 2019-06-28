import { Engine, Vector } from "excalibur";
import { Level } from "./level.scene";
import { Player } from "./player.actor";
import { Config } from "../config.dict";

export class Board  {

	private currentLevel: number;
	private currentLevelName: string;
	private mainPlayerID: number;
	private engine: Engine;
	private players: Player[]= [];

	constructor(engine: Engine, playerRezID: number, level: number= 0) {
		this.currentLevel= level;
		this.engine= engine;
		const newPlayer= new Player(Config.playerStart.x, Config.playerStart.y, playerRezID);
		this.players.push(newPlayer);
		newPlayer.setAsMainPlayer(engine);
		this.mainPlayerID= newPlayer.id;
	}

	render() {
		this.currentLevelName= `level${this.currentLevel}`;
		let level= this.engine.scenes[this.currentLevelName];

		if(!level) {
			level= new Level(this.engine, 32, 32, this.currentLevel);
			this.engine.add(this.currentLevelName, level);

			this.players.forEach(player => level.add(player));
		}

		this.engine.goToScene(this.currentLevelName);
	}

	addPlayer(playerRezID: number): Player {
		const newPlayer= new Player(Config.playerStart.x, Config.playerStart.y, playerRezID);
		const level= this.engine.scenes[this.currentLevelName];

		this.players.push(newPlayer);
		level.add(newPlayer);

		this.engine.goToScene(this.currentLevelName);

		return newPlayer;
	}

	public getPlayer(id: number): Player {
		return this.players.find(player => player.id=== id);
	}

	public movePlayer(id: number, pos: Vector): void {
		this.getPlayer(id).pos= pos;
	}

}
