import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MaterialModule } from "./modules/material.module";
import { TranslateModule } from "./modules/translate.module";
import { BaseModule } from "./modules/base.module";
import { AppHeaderComponent } from "./components/app-header/app-header.component";
import { GameComponent } from "./pages/game/game.component";
import { ProviderModule } from "./modules/providers.module";
import { LoginComponent } from './pages/login/login.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		AppHeaderComponent,
		GameComponent,
		LoginComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		BaseModule,
		ProviderModule.forRoot(),
		MaterialModule,
		AppRoutingModule
	],
	exports: [
		TranslateModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
