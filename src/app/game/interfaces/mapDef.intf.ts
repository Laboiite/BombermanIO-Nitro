
export interface MapCellDefinition {
	x: number;
	y: number;
	tileId: number;
	sheetId: string;
}

export interface IMapTileSheet {
	id: string;
	path: string;
	columns: number;
	rows: number;
}

export interface MapDefinition {
	cells: MapCellDefinition[];
	tileSheets: IMapTileSheet[];
	// width: number;
	// height: number;
	columns: number;
	rows: number;
	tileWidth: number;
	tileHeight: number;
}
