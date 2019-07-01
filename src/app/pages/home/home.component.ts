import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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
	constructor(private router: Router,
		private gameService: GameService,
		private fb: FormBuilder,
		private webSocketService: WebsocketService) { }
	//
	ngOnInit() {
		this.setForm();
		this.getGames();
	}

	/**
	 * createGame()
	 * Instanciates a websocket with our server
	 * Creates a new game
	 * Triggers the navigation to our board
	 */
	public createGame() {
		this.gameService.createGame(this.form.controls.nickName.value, this.form.controls.gameNameToCreate.value);
		this.router.navigate(["/game"]);
	}
	/**
	 * joinGame()
	 */
	public joinGame() {
		this.gameService.joinGame(this.form.controls.nickName.value, this.form.controls.gameNameToJoin.value);
		this.router.navigate(["/game"]);
	}


	/**
	 * getGames()
	 * Test of our websocket conneciton
	 */
	public getGames() {
		this.gameService.getGames();
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
	 * Test of our websocket connection
	 */
	public sendTest() {
		this.webSocketService.send(this.form.controls.gateway.value, this.form.controls.message.value);
	}

	/**
	 * getGameStatus()
	 * Get the game status
	 */
	public getGameStatus() {
		this.gameService.getStatus();
	}
	/**
	 * setForm()
	 * Test of our websocket conneciton
	 */
	public setForm() {
		this.form = this.fb.group({
			gateway: [],
			message: [],
			nickName: [],
			gameNameToCreate: [],
			gameNameToJoin: [],
			isReady: [{ value: false }],
			gameStatus: [{ value: "", disabled: true }],
		});
	}

	/**
	 * indicateReady()
	 * Indicate if we're ready or not
	 */
	public indicateReady() {
		console.log("check if ready : ", this.form.controls.isReady.value);
		// this.gameService.sendTest(this.form.controls.message.value, this.form.controls.nickName.value, this.form.controls.gateway.value);
	}


}
