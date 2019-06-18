import { NgModule } from "@angular/core";
import { MAT_DATE_LOCALE, MatSliderModule, MatBottomSheetModule, MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSortModule } from "@angular/material/sort";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";

import "hammerjs";
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
const modules = [
	MatButtonModule,
	MatAutocompleteModule,
	MatCardModule,
	MatCheckboxModule,
	MatDialogModule,
	MatExpansionModule,
	MatIconModule,
	MatBadgeModule,
	MatInputModule,
	MatMenuModule,
	MatSliderModule,
	MatPaginatorModule,
	MatProgressBarModule,
	MatBottomSheetModule,
	MatProgressSpinnerModule,
	MatRadioModule,
	MatSelectModule,
	MatSidenavModule,
	MatSortModule,
	MatStepperModule,
	MatTableModule,
	MatTabsModule,
	MatToolbarModule,
	MatButtonToggleModule,
	MatDatepickerModule,
	MatSlideToggleModule,
	MatListModule,
	MatDividerModule,
	MatChipsModule,
	MatTooltipModule,
	MatSnackBarModule
];

@NgModule({
	imports: [modules],
	exports: [modules],
	providers: [
		{ provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
		{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 1500, horizontalPosition: "center", verticalPosition: "top" } }
	]
})
export class MaterialModule {
	constructor(
		private matIconRegistry: MatIconRegistry,
		private domSanitizer: DomSanitizer
	) {
		this.matIconRegistry.addSvgIcon("fr-flag", this.domSanitizer.bypassSecurityTrustResourceUrl(`${environment.resourceUrl}/icons/fr.svg`));
		this.matIconRegistry.addSvgIcon("en-flag", this.domSanitizer.bypassSecurityTrustResourceUrl(`${environment.resourceUrl}/icons/gb.svg`));

	}
}
