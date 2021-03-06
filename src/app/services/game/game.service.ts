import { Injectable } from "@angular/core";
import { WebsocketService } from "../websocket/websocket.service";
import { MESSAGE } from "src/app/shared/message.enum";
import { BombermanGame } from "src/app/game/classes/bomberman-game.class";
import { WSMessage } from "src/app/shared/wsmessage.intf";
import { BROADCAST } from "src/app/shared/broadcast.enum";
import { IPlayerMove } from "src/app/game/classes/player.actor";

const HANDLE_EVENTS= [BROADCAST.MESSAGE, BROADCAST.NEWPLAYER, BROADCAST.MOVEPLAYER];

@Injectable({
	providedIn: "root"
})
export class GameService {

	public currentGame: BombermanGame;
	public currentPlayerName: string;
	public currentGameName: string;
	public mysocket: any;
	constructor(private websocketService: WebsocketService) { }

	/**
	 * createGame()
	 * Create a game
	 */
	public createGame(nickName: string, gameName: string) {
		this.currentPlayerName= nickName;
		this.currentGameName= gameName;
		// this.initSocket(nickName);
		this.currentGame = new BombermanGame();
		this.websocketService.send(MESSAGE.CREATE_GAME, {name: gameName});
	}

	/**
	 * joinGame()
	 * Join a game
	 */
	public joinGame(nickName: string, gameName: string) {
		this.currentPlayerName= nickName;
		this.currentGameName= gameName;
		this.currentGame = new BombermanGame(2);
		// this.initSocket(nickName);
		this.websocketService.send(MESSAGE.JOIN_GAME, {name: gameName});
	}

	/**
	 * getGames()
	 * Returns the list of games
	 */
	public getGames() {
		this.websocketService.send(MESSAGE.GET_GAMES);
	}

	/**
	 * addPlayer()
	 * Add a player in our game
	 */
	public addPlayer(gameName: string) {
		if (this.currentGame) {
			this.websocketService.send(MESSAGE.NEW_PLAYER, {name: gameName});
		}
	}

	public endGame() {
		this.websocketService.closeSocket();
	}

	public getStatus() {
	}

	private dispatchEvent(message: WSMessage) {
		switch (message.event) {
			case BROADCAST.MESSAGE:
				console.log("------- ", message.data.content);
				break;

			case BROADCAST.MOVEPLAYER:
				const pp: IPlayerMove= message.data.content;
				this.currentGame.movePlayer(pp.id, pp.pos);
				console.log("someone moved: ", message.data);
				break;

			case BROADCAST.NEWPLAYER:
				console.log("------ ", BROADCAST.NEWPLAYER, message);
				const newPlayer= this.currentGame.addPlayer(2);
				newPlayer.pos$.subscribe(playerPos => {
					this.websocketService.send(MESSAGE.MOVE_PLAYER, playerPos);
				});
				break;

			default:
				console.log("unsupported topic");
				break;
		}
	}

	public initSocket(nickName: string) {
		this.mysocket= this.websocketService.initSocket(nickName, HANDLE_EVENTS);
		this.mysocket.subscribe(msg => this.dispatchEvent(msg));
	}
}
