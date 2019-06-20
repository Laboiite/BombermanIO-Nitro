import { Scene, TileMap, Engine, SpriteSheet, Texture, TileSprite } from "excalibur";
import { LevelDef, IMapTileSheet } from "../interfaces/level-def.intf";
import { Resources } from "../resources/resources";

export class Level extends Scene {

	private _levelDef: LevelDef;
	private _tileMap: TileMap;

	constructor(engine: Engine, x: number, y: number, tiledLevelDef: any) {
		super(engine);

		this._levelDef= this.convertTiledLevel(tiledLevelDef);

		this._tileMap= new TileMap(
									x, y,
									this._levelDef.tileWidth, this._levelDef.tileHeight,
									this._levelDef.rows, this._levelDef.columns
									);

	}

	public onInitialize() {
		this._levelDef.tileSheets.forEach(sheet => {
			this._tileMap.registerSpriteSheet(sheet.id,
				new SpriteSheet(Resources.tiles[sheet.resourceName], sheet.columns, sheet.rows, this._levelDef.tileWidth, this._levelDef.tileHeight)
			);
		});

		this._levelDef.cells.forEach((cell, idx) => {
			const ts = new TileSprite(cell.sheetId, cell.tileId);
			this._tileMap.getCellByIndex(idx).pushSprite(ts);
		});

		this.addTileMap(this._tileMap);
	}

	private convertCellIDs(def: LevelDef, spriteGID) {

		return def.tileSheets.reduce((acc: any, val: IMapTileSheet)=> {
			return spriteGID >= val.firstGID ? { tileID: spriteGID - val.firstGID, sheetID: val.id } : acc;
		}, {});

	}

	private convertTiledLevel(tiledDef: any): LevelDef {
		const def: LevelDef= <any>{ tileSheets: [], cells: [] };

		if(tiledDef["version"] !== 1.2 && tiledDef["type"] !== "map") {
			throw new Error("Unable to read this level !");
		}

		def.columns= tiledDef["width"];
		def.rows= tiledDef["height"];

		def.tileWidth= tiledDef["tilewidth"];
		def.tileHeight= tiledDef["tileheight"];

		tiledDef["tilesets"].forEach(tileset => {
			def.tileSheets.push({
				id: tileset["name"],
				resourceName: tileset["name"],
				columns: tileset["columns"],
				rows: tileset["tilecount"] / tileset["columns"],
				spacing: tileset["spacing"],
				firstGID: tileset["firstgid"]
			});
		});

		const map: number[]= tiledDef["layers"][0]["data"];

		map.forEach(spriteGID => {
			const {tileID, sheetID}= this.convertCellIDs(def, spriteGID);
			def.cells.push({
				tileId: tileID,
				sheetId: sheetID,
				x: 0,
				y: 0
			});
		});

		return def;
	}
}
