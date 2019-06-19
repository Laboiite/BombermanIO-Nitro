import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { webSocket } from "rxjs/webSocket";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class WebsocketService {

	public socket;
	constructor() { }

	public initSocket(): void {
		this.socket = webSocket(environment.serverWs);
		this.socket.subscribe();
		console.log("--------- Socket initialized !");
	}

	public closeSocket(): void {
		this.socket.complete();
		console.log("--------- Socket closed !");
	}

	public send(message: string, gateway? :string): void {
		this.socket.next({
            event: gateway,
            data: message,
          });
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
