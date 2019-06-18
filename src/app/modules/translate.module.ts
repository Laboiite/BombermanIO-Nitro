import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { TranslateLoader, TranslateModule as NgxTranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { environment } from "src/environments/environment";

// AoT requires an exported function for factories, allowing us to have custom localization for our languages .json
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, `${environment.resourceUrl}locale/`, ".json");
}

@NgModule({
	imports: [
		HttpClientModule,
		NgxTranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	exports: [
		NgxTranslateModule
	]
})
export class TranslateModule {
	constructor(public translate: TranslateService) {
		translate.addLangs(["fr", "en"]);
		translate.setDefaultLang("fr");
		translate.use("fr");
	}
}
