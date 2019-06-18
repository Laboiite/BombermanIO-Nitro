import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
	selector: "app-header",
	templateUrl: "./app-header.component.html",
	styleUrls: ["./app-header.component.scss"]
})
export class AppHeaderComponent implements OnInit {


	public french= true;
	constructor(private translateService: TranslateService) { }

	ngOnInit() {
	}

	/**
	  * (click)="switchFR()".
	  * On click, switch the language used by translateService to french
	  */
	public switchFR() {
		this.translateService.use("fr");
		this.french = true;
	}
	/**
	* (click)="switchEN()".
	* On click, switch the language used by translateService to english
	*/
	public switchEN() {
		this.translateService.use("en");
		this.french = false;
	}

}
