import { Scene, TileMap, Engine, SpriteSheet, Texture, TileSprite } from "excalibur";
import { MapDefinition } from "./interfaces/mapDef.intf";
import { Resources } from "./resources/resources";

export class MapScene extends Scene {

	private _mapDefinition: MapDefinition;
	private _tileMap: TileMap;

	constructor(engine: Engine, x: number, y: number, mapDef: MapDefinition) {
		super(engine);

		this._mapDefinition = mapDef;

		this._tileMap= new TileMap(
									x, y,
									mapDef.tileWidth, mapDef.tileHeight,
									// mapDef.width / mapDef.tileWidth, mapDef.height / mapDef.tileHeight
									mapDef.rows, mapDef.columns
									);
	}

	public onInitialize() {
		// build our map based on JSON config
		// build sprite sheets
		this._mapDefinition.tileSheets.forEach(sheet => {
			// register sprite sheet with the tile map
			// normally, you will want to ensure you load the Texture before
			// creating the SpriteSheet
			// this can be done outside the Map class, in a Loader
			this._tileMap.registerSpriteSheet(sheet.id,
				new SpriteSheet(Resources[sheet.path], sheet.columns, sheet.rows,
				this._mapDefinition.tileWidth, this._mapDefinition.tileHeight));
		});
			// fill cells with sprites
		this._mapDefinition.cells.forEach(cell => {
			// create a TileSprite
			// assume tileId is the index of the frame in the sprite sheet
			const ts = new TileSprite(cell.sheetId, cell.tileId);
			// add to cell
			this._tileMap.getCell(cell.x, cell.y).pushSprite(ts);
		});

		this.addTileMap(this._tileMap);
	}

}
