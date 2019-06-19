import { Engine } from "excalibur";
import { TileActor } from "./tile.class";

const	TILE_WIDTH= 32,
		TILE_HEIGHT= 32;

export class Board  {

	private columns: number;
	private rows: number;
	private tileWidth: number;
	private tileHeight: number;
	private map: string[];

	constructor(columns: number, rows: number, mapTmpl: string) {
		this.rows= rows;
		this.columns= columns;
		this.tileWidth= TILE_WIDTH;
		this.tileHeight= TILE_HEIGHT;

		this.map= mapTmpl.split("").filter(i=>i.match(/[A-Z0-9]/));
	}

	render(engine: Engine) {
		const	padding= 5,
				xoffset= 32,
				yoffset= 32,
				tiles= [];

		for (let rowIdx = 0; rowIdx < this.rows; rowIdx++) {
			let line= "";
			for (let colIdx = 0; colIdx < this.columns; colIdx++) {
				line+= this.map[rowIdx*this.columns+colIdx];
				const actor= new TileActor(
					this.map[rowIdx*this.columns+colIdx],
					xoffset + colIdx * (this.tileWidth + padding) + padding,
					yoffset + rowIdx * (this.tileHeight + padding) + padding
				);
				tiles.push(actor);
			}
			console.log(line);
		}

		tiles.forEach(function(tile) {
			// Add the brick to the current scene to be drawn
			engine.add(tile);
		});

	}

}
