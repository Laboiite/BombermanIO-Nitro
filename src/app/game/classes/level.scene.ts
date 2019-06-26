import { Scene, TileMap, Engine, SpriteSheet, Texture, TileSprite } from "excalibur";
import { Resources } from "../resources/resources";
import { ITiledMap, ITiledTileSet, ITiledMapLayer } from "../interfaces/tiledmap.intf";
import { Walls } from "./walls.actor";

const 	LAYER_FLOOR= "floor",
		LAYER_WALLS= "blocks";

export class Level extends Scene {

	// private _levelDef: LevelDef;
	private _level: number;
	private _offsetX: number;
	private _offsetY: number;
	private _tileMap: TileMap;
	private _tiledMapFile: ITiledMap;

	constructor(engine: Engine, x: number, y: number, level: number) {
		super(engine);

		this._offsetX= x;
		this._offsetY= y;
		this._level= level;
		this._tiledMapFile= Resources.levels[this._level] as any;

		this._tileMap= this.createTileMap([LAYER_FLOOR]);
		this.addTileMap(this._tileMap);
		this.addWalls([LAYER_WALLS]);
	}

	private createTileMap(useLayers: string[]) {
		let tileMap: TileMap;

		if(this._tiledMapFile.version !== 1.2 && this._tiledMapFile.type !== "map") {
			throw new Error("Unable to read this level !");
		}

		tileMap= new TileMap(
								this._offsetX, this._offsetY,
								this._tiledMapFile.tilewidth, this._tiledMapFile.tileheight, this._tiledMapFile.height, this._tiledMapFile.width
							);


		for(const ts of this._tiledMapFile.tilesets) {
			const cols= Math.floor(ts.imagewidth / ts.tilewidth);
			const rows= Math.floor(ts.imageheight / ts.tileheight);
			const ss= new SpriteSheet(Resources.tiles[ts.name], cols, rows, ts.tilewidth, ts.tileheight);
			tileMap.registerSpriteSheet(ts.name, ss);
		}

		this.filterLayers(useLayers).forEach(layer => {
				(layer.data as number[]).forEach((sgid, idx) => {
					if(sgid!==0) {
						const ts= this.getTilesetForTile(sgid);
						tileMap.data[idx].pushSprite( new TileSprite(ts.name, sgid - ts.firstgid) );
					}
				});
			});

		// for(const layer of tiledMapFile.layers) {
		// 	if(layer.type!=="tilelayer") {
		// 		continue;
		// 	}
		// 	(layer.data as number[]).forEach((sgid, idx) => {
		// 		if(sgid!==0) {
		// 			const ts= this.getTilesetForTile(tiledMapFile, sgid);
		// 			tileMap.data[idx].pushSprite( new TileSprite(ts.name, sgid - ts.firstgid) );
		// 		}
		// 	});
		// }

		return tileMap;

	}

	private addWalls(useLayers: string[]) {
		const offsetX= this._offsetX + this._offsetX/2;
		const offsetY= this._offsetX + this._offsetY/2;
		this.filterLayers(useLayers).forEach(layer => {
				(layer.data as number[]).forEach((sgid, idx) => {
					if(sgid!==0) {
						const x= this._tiledMapFile.tilewidth * (idx % this._tiledMapFile.width) + offsetX;
						const y= this._tiledMapFile.tileheight * Math.floor(idx / this._tiledMapFile.width) + offsetY;
						this.add( new Walls(x, y) );
					}
				});
			});
	}

	private filterLayers(useLayers: string[]): ITiledMapLayer[] {
		return this._tiledMapFile.layers.filter(layer => layer.type==="tilelayer" && useLayers.includes(layer.name));
	}

	private getTilesetForTile(gid: number): ITiledTileSet {
		for (let idx = this._tiledMapFile.tilesets.length - 1; idx >= 0; idx--) {
			const ts= this._tiledMapFile.tilesets[idx];

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
