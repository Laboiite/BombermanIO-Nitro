import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { GameComponent } from "./pages/game/game.component";
import { LoginComponent } from "./pages/login/login.component";

const routes: Routes = [
	{
		path: "",
		pathMatch: "full",
		redirectTo: "login",
	},
	{
		path: "login",
		component: LoginComponent
	},
	{
		path: "home",
		component: HomeComponent
	},
	{
		path: "game",
		component: GameComponent
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
