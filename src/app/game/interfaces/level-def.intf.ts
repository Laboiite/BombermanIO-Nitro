
export interface MapCellDefinition {
	x: number;
	y: number;
	tileId: number;
	sheetId: string;
}

export interface IMapTileSheet {
	id: string;
	resourceName: string;
	columns: number;
	rows: number;
	spacing?: number;
	firstGID: number;
}

export interface LevelDef {
	cells: MapCellDefinition[];
	tileSheets: IMapTileSheet[];
	columns: number;
	rows: number;
	tileWidth: number;
	tileHeight: number;
}
