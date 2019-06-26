import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { webSocket } from "rxjs/webSocket";
import { Observable } from "rxjs";
import * as uuid from "uuid";
import { BROADCAST } from 'src/app/shared/broadcast.enum';


@Injectable({
	providedIn: "root"
})
export class WebsocketService {

	public socket;
	public client;
	constructor() { }

	public initSocket(nickName: string): void {
		this.socket = webSocket(environment.serverWs);
		this.socket.subscribe(
			msg => {
				this.handleMsg(msg);
			}, // Called whenever there is a message from the server.
			err => console.log("error in our websocket :", err), // Called if at any point WebSocket API signals some kind of error.
			() => console.log("complete") // Called when connection is closed (for whatever reason).
		);
		// this.socket.subscribe();
		this.client = { id: uuid.v4(), nickName: nickName };
		// this.client= nickName;
		console.log("--------- Socket initialized !");
	}

	public closeSocket(): void {
		this.socket.complete();
		console.log("--------- Socket closed !");
	}

	public send(message: string, content: string ): void {
		this.socket.next({
			event: message,
			data: { client: this.client, content: content },
		});
	}

	public handleMsg(message: any) {
		console.log("message envoyé par le serveur :", message);
		if (message.topic === BROADCAST.TEST) {
			console.log("J'ai un message de type TEST, je vais appeler mon testService avec le contenu du message et gérer");
		}
	}

	// public onMessage(): Observable<string> {
	// 	return new Observable<string>(observer => {
	// 		this.socket.on("message", (data: string) => observer.next(data));
	// 	});
	// }

	// public onEvent(event: any): Observable<any> {
	// 	return new Observable<any>(observer => {
	// 		this.socket.on(event, () => observer.next());
	// 	});
	// }
}
