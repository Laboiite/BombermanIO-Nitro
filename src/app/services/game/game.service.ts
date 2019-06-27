import { Injectable } from "@angular/core";
import { WebsocketService } from "../websocket/websocket.service";
import { MESSAGE } from "src/app/shared/message.enum";
import { Subject } from "rxjs";
import { BombermanGame } from "src/app/game/classes/bomberman-game.class";
import { WSMessage } from "src/app/shared/wsmessage.intf";
import { BROADCAST } from "src/app/shared/broadcast.enum";

const HANDLE_EVENTS= [BROADCAST.MESSAGE, BROADCAST.NEWPLAYER];

@Injectable({
	providedIn: "root"
})
export class GameService {

	public currentGame: BombermanGame;
	public mysocket: any;
	constructor(private websocketService: WebsocketService) { }

	/**
	 * createGame()
	 * Create a game
	 */
	public createGame(nickName: string, gameName: string) {
		this.initSocket(nickName);
		this.currentGame = new BombermanGame();
		this.websocketService.send(MESSAGE.CREATE_GAME, gameName);
	}

	/**
	 * joinGame()
	 * Join a game
	 */
	public joinGame(nickName: string, gameName: string) {
		this.initSocket(nickName);
		this.currentGame = new BombermanGame();
		this.websocketService.send(MESSAGE.JOIN_GAME, gameName);
	}

	/**
	 * addPlayer()
	 * Add a player in our game
	 */
	public addPlayer(gameName: string) {
		if (this.currentGame) {
			this.websocketService.send(MESSAGE.NEW_PLAYER, gameName);
		}
	}

	public endGame() {
		this.websocketService.closeSocket();
	}

	public getStatus() {
	}

	private dispathEvent(message: WSMessage) {
		switch (message.event) {
			case BROADCAST.MESSAGE:
				console.log("------- ", message.data.content);
				break;
			case BROADCAST.MOVEPLAYER:
				console.log("someone moved: ", message.data);
				break;
			case BROADCAST.NEWPLAYER:
				console.log("------ New player entered the game");
				console.log("------ Updated player list :", message.data);
				this.currentGame.addPlayer();
				break;

			default:
				console.log("unsupported topic");
				break;
		}
	}

	private initSocket(nickName: string) {
		this.mysocket= this.websocketService.initSocket(nickName, HANDLE_EVENTS);
		this.mysocket.subscribe(msg => this.dispathEvent(msg));
	}
}
