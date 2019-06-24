import { Scene, TileMap, Engine, SpriteSheet, Texture, TileSprite } from "excalibur";
import { LevelDef, IMapTileSheet } from "../interfaces/level-def.intf";
import { Resources } from "../resources/resources";
import { ITiledMap, ITiledTileSet } from "../interfaces/tiledmap.intf";

export class Level extends Scene {

	// private _levelDef: LevelDef;
	private _level: number;
	private _offsetX: number;
	private _offsetY: number;
	private _tileMap: TileMap;

	constructor(engine: Engine, x: number, y: number, level: number) {
		super(engine);

		this._offsetX= x;
		this._offsetY= y;
		this._level= level;

	}

	public onInitialize() {
		this._tileMap= this.createTileMap();
		this.addTileMap(this._tileMap);
	}

	private createTileMap() {
		const tiledMapFile: ITiledMap= Resources.levels[this._level] as any;
		let tileMap: TileMap;

		if(tiledMapFile.version !== 1.2 && tiledMapFile.type !== "map") {
			throw new Error("Unable to read this level !");
		}

		tileMap= new TileMap(
									this._offsetX, this._offsetY,
									tiledMapFile.tilewidth, tiledMapFile.tileheight, tiledMapFile.height, tiledMapFile.width
								);


		for(const ts of tiledMapFile.tilesets) {
			const cols= Math.floor(ts.imagewidth / ts.tilewidth);
			const rows= Math.floor(ts.imageheight / ts.tileheight);
			const ss= new SpriteSheet(Resources.tiles[ts.name], cols, rows, ts.tilewidth, ts.tileheight);
			tileMap.registerSpriteSheet(ts.name, ss);
		}

		for(const layer of tiledMapFile.layers) {
			if(layer.type!=="tilelayer") {
				continue;
			}
			(layer.data as number[]).forEach((sgid, idx) => {
				if(sgid!==0) {
					const ts= this.getTilesetForTile(tiledMapFile, sgid);
					tileMap.data[idx].pushSprite( new TileSprite(ts.name, sgid - ts.firstgid) );
				}
			});
		}

		return tileMap;

	}

	private getTilesetForTile(tiledMap: ITiledMap, gid: number): ITiledTileSet {
		for (let idx = tiledMap.tilesets.length - 1; idx >= 0; idx--) {
			const ts= tiledMap.tilesets[idx];

			if (ts.firstgid <= gid) {
				return ts;
			}
		}

		return null;
	}

	// private convertCellIDs(def: LevelDef, spriteGID) {

	// 	return def.tileSheets.reduce((acc: any, val: IMapTileSheet)=> {
	// 		return spriteGID >= val.firstGID ? { tileID: spriteGID - val.firstGID, sheetID: val.id } : acc;
	// 	}, {});

	// }

	// private convertTiledLevel(tiledDef: any): LevelDef {
	// 	const def: LevelDef= <any>{ tileSheets: [], cells: [] };

	// 	if(tiledDef["version"] !== 1.2 && tiledDef["type"] !== "map") {
	// 		throw new Error("Unable to read this level !");
	// 	}

	// 	def.columns= tiledDef["width"];
	// 	def.rows= tiledDef["height"];

	// 	def.tileWidth= tiledDef["tilewidth"];
	// 	def.tileHeight= tiledDef["tileheight"];

	// 	tiledDef["tilesets"].forEach(tileset => {
	// 		def.tileSheets.push({
	// 			id: tileset["name"],
	// 			resourceName: tileset["name"],
	// 			columns: tileset["columns"],
	// 			rows: tileset["tilecount"] / tileset["columns"],
	// 			spacing: tileset["spacing"],
	// 			firstGID: tileset["firstgid"]
	// 		});
	// 	});

	// 	const map: number[]= tiledDef["layers"][0]["data"];

	// 	map.forEach(spriteGID => {
	// 		const {tileID, sheetID}= this.convertCellIDs(def, spriteGID);
	// 		def.cells.push({
	// 			tileId: tileID,
	// 			sheetId: sheetID,
	// 			x: 0,
	// 			y: 0
	// 		});
	// 	});

	// 	return def;
	// }
}
