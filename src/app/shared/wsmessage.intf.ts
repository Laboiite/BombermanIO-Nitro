export interface WSMessage {
	event: string;
	data: {
		sender: any,
		content: any,
	};
}
