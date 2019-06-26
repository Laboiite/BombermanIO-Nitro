import { Injectable } from "@angular/core";
import { WebsocketService } from "../websocket/websocket.service";
import { MESSAGE } from "src/app/shared/message.enum";

@Injectable({
	providedIn: "root"
})
export class GameService {

	constructor(private websocketService: WebsocketService) { }

	/**
	 * createGame()
	 * Create a game
	 */
	public createGame(gameName: string) {
		this.websocketService.send(MESSAGE.CREATE_GAME, gameName);
	}

	/**
	 * joinGame()
	 * Join a game
	 */
	public joinGame(gameName: string) {
		this.websocketService.send(MESSAGE.JOIN_GAME, gameName);
	}

	public endGame() {
		this.websocketService.closeSocket();
	}

	// public sendTest(message: string, client: string, gateway?: string) {
	// 	this.websocketService.send(message, client, gateway);
	// }

	public getStatus() {
	}
}
