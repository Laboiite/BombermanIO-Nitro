import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { TranslateModule } from "@ngx-translate/core";
import { ProviderModule } from "./providers.module";


const exportModules = [
	CommonModule,
	MaterialModule,
	ReactiveFormsModule,
	TranslateModule,
	ProviderModule,
	FormsModule
];

const importModules = [
	exportModules,
	TranslateModule.forChild()
];

const exportComponents = [

];

const declarations = [

];

@NgModule({
	declarations: [
		declarations,
		exportComponents
	],
	imports: [
		importModules
	],
	exports: [
		exportModules,
		exportComponents
	],
	entryComponents: [
	]
})

export class BaseModule { }
