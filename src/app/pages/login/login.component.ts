import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { GameService } from "src/app/services/game/game.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

	public form: FormGroup;
	constructor(private fb: FormBuilder, private router: Router, private gameService: GameService) { }

	ngOnInit() {
		this.setForm();
	}

	public setForm() {
		this.form = this.fb.group({
			nickName: []
		});
	}
	public navigateToHome() {
		this.gameService.initSocket(this.form.controls.nickName.value);
		this.router.navigate(["/home"]);
	}


}
