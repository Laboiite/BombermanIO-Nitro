import { Injectable } from "@angular/core";
import { WebsocketService } from "../websocket/websocket.service";

@Injectable({
	providedIn: "root"
})
export class GameService {

	constructor(private websocketService: WebsocketService) { }

	public enterGame() {
		this.websocketService.initSocket();
		this.websocketService.socket.subscribe(
			msg => console.log("message received: " + msg), // Called whenever there is a message from the server.
			err => console.log("error in our websocket :", err), // Called if at any point WebSocket API signals some kind of error.
			() => console.log("complete") // Called when connection is closed (for whatever reason).
		);
		console.log("Connected");
	}

	public endGame() {
		this.websocketService.closeSocket();
	}

	public sendTest(message: string, gateway?: string) {
		this.websocketService.send(message, gateway);
	}
}
