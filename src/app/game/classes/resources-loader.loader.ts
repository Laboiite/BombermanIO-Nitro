import { Loader, Texture, Resource } from "excalibur";

export class ResourcesLoader extends Loader {

	constructor(rezList, basePath: string= "assets/") {
		super();

		this.addAllResources(rezList, basePath);
	}

	private addAllResources(rezList, basePath: string) {

		// tslint:disable-next-line: forin
		for(const tile in rezList.tiles) {
			rezList.tiles[tile]= new Texture(basePath + rezList.tiles[tile]);
			this.addResource( rezList.tiles[tile] );
		}

		// tslint:disable-next-line: forin
		for(const sprite in rezList.sprites) {
			const txt= new Texture(basePath + rezList.sprites[sprite]);
			rezList.sprites[sprite]= txt.asSprite();
			this.addResource(  txt );
		}

		// tslint:disable-next-line: forin
		rezList.levels.forEach( (filepath, idx) => {
			const jsonRez= new Resource(basePath + rezList.levels[idx], "json");

			this.addResource(  jsonRez );

			jsonRez.processData= (data: any) => {
				rezList.levels[idx]= data;
			};

		});

	}

}
