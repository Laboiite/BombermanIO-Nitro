import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { WebsocketService } from "src/app/services/websocket/websocket.service";
import { GameService } from "src/app/services/game/game.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

	public form: FormGroup;
	constructor(private router: Router, private gameService: GameService, private fb: FormBuilder) { }
	//
	ngOnInit() {
		this.setForm();
	}

	/**
	 * enterNewGame()
	 * Triggers the navigation to our board
	 */
	public enterNewGame() {
		this.router.navigate(["/game"]);
	}
	/**
	 * testWS()
	 * Test of our websocket conneciton
	 */
	public testWS() {
		this.gameService.enterGame();
	}
	/**
	 * closeWS()
	 * Test of our websocket conneciton
	 */
	public closeWS() {
		this.gameService.endGame();
	}

	/**
	 * sendTest()
	 * Test of our websocket conneciton
	 */
	public sendTest() {
		this.gameService.sendTest(this.form.controls.message.value, this.form.controls.gateway.value);
	}
	/**
	 * setForm()
	 * Test of our websocket conneciton
	 */
	public setForm() {
		this.form = this.fb.group({
			gateway: [],
			message: [],
		});
	}



}
