import { NgModule, ModuleWithProviders } from "@angular/core";
import { WebsocketService } from "../services/websocket/websocket.service";

const providers = [
	WebsocketService
];

@NgModule({})
export class ProviderModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ProviderModule,
			providers: [providers]
		};
	}
}
