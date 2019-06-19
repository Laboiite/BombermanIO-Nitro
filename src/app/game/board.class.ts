import { Engine } from "excalibur";
import { TileActor } from "./tile.class";
import { MapScene } from "./map.class";
import { MapCellDefinition } from "./interfaces/mapDef.intf";

const	TILE_WIDTH= 32,
		TILE_HEIGHT= 32,
		GRID_GAP= 2;

const mapDef= {
	cells: [],
	tileSheets: [{id: "tiles", path: "tilesSheet", columns: 3, rows: 1}],
	columns: 17,
	rows: 13,
	tileWidth: TILE_WIDTH,
	tileHeight: TILE_HEIGHT
};

export class Board  {

	// private columns: number;
	// private rows: number;
	// private tileWidth: number;
	// private tileHeight: number;
	private map: string[];

	constructor(columns: number, rows: number, mapTmpl: string) {
		// this.rows= rows;
		// this.columns= columns;
		// this.tileWidth= TILE_WIDTH;
		// this.tileHeight= TILE_HEIGHT;

		this.map= mapTmpl.split("").filter(i=>i.match(/[A-Z0-9]/));

		mapDef.cells= this.map.map((i, idx)=> {
			const cell: MapCellDefinition= <any>{};
			switch(i) {
				case "B": cell.tileId= 0; break;
				case "G": cell.tileId= 1; break;
				case "W": cell.tileId= 2; break;
			}
			cell.sheetId= "tiles";
			cell.x= idx % 17;
			cell.y= Math.floor(idx / 17);
			return cell;
		});

	}

	render(engine: Engine) {
		const map= new MapScene(engine, 32, 32, mapDef);
		engine.add("map1", map);
	}

	// render2(engine: Engine) {
	// 	const	xoffset= 32,
	// 			yoffset= 32,
	// 			tiles= [];

	// 	for (let rowIdx = 0; rowIdx < this.rows; rowIdx++) {
	// 		let line= "";
	// 		for (let colIdx = 0; colIdx < this.columns; colIdx++) {
	// 			line+= this.map[rowIdx*this.columns+colIdx];
	// 			const actor= new TileActor(
	// 				this.map[rowIdx*this.columns+colIdx],
	// 				xoffset + colIdx * (this.tileWidth + GRID_GAP) + GRID_GAP,
	// 				yoffset + rowIdx * (this.tileHeight + GRID_GAP) + GRID_GAP
	// 			);
	// 			tiles.push(actor);
	// 		}
	// 	}

	// 	tiles.forEach(function(tile) {
	// 		// Add the brick to the current scene to be drawn
	// 		engine.add(tile);
	// 	});

	// }

}
