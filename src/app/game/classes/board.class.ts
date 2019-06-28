import { Engine, Vector, Scene } from "excalibur";
import { Level } from "./level.scene";
import { Player } from "./player.actor";
import { Config } from "../config.dict";

export class Board  {

	private currentLevel: Scene;
	private currentLevelIdx: number;
	private currentLevelName: string;
	private mainPlayerID: number;
	private engine: Engine;
	private players: Player[]= [];

	constructor(engine: Engine, playerRezID: number, level: number= 0) {
		this.currentLevelIdx= level;
		this.currentLevelName= `level${this.currentLevelIdx}`;

		this.engine= engine;

		const newPlayer= this.addPlayer(playerRezID);

		newPlayer.setAsMainPlayer(engine);
		this.mainPlayerID= newPlayer.id;
	}

	public render() {

		this.currentLevel= this.engine.scenes[this.currentLevelName];
		if(!this.currentLevel) {
			this.currentLevel= new Level(this.engine, 32, 32, this.currentLevelIdx);
			this.engine.add(this.currentLevelName, this.currentLevel);
			this.players.forEach(player => this.currentLevel.add(player));
		}

		this.engine.goToScene(this.currentLevelName);
	}

	public addPlayer(playerRezID: number): Player {
		const newPlayer= new Player(Config.playerStart.x, Config.playerStart.y, playerRezID);
		this.players.push(newPlayer);
		if(this.currentLevel) {
			this.currentLevel.add(newPlayer);
		}
		return newPlayer;
	}

	public getPlayer(id: number): Player {
		return this.players.find(player => player.id=== id);
	}

	public movePlayer(id: number, pos: Vector): void {
		this.getPlayer(id).pos= pos;
	}

}
