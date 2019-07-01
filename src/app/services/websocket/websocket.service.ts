import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { filter } from "rxjs/operators";
import * as uuid from "uuid";
import { WSMessage } from "src/app/shared/wsmessage.intf";


@Injectable({
	providedIn: "root"
})
export class WebsocketService {

	public socket: WebSocketSubject<WSMessage>;
	public sender;
	constructor() { }

	public initSocket(nickName: string, handleEvents: string[]) {
		this.socket = webSocket<WSMessage>(environment.serverWs);
		this.sender = { id: uuid.v4(), nickName: nickName };
		console.log("--------- Socket initialized !");
		return this.socket.pipe(filter(msg => handleEvents.includes(msg.event))
		);
	}

	public closeSocket(): void {
		this.socket.complete();
		console.log("--------- Socket closed !");
	}

	public send(message: string, content: any= null): void {
		this.socket.next({
			event: message,
			data: { sender: this.sender, content: content },
		});
	}
}
