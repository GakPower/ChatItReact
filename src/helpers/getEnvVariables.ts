const production = false;

export const SERVER_URL = production
	? 'https://chatit.site'
	: 'http://localhost';
export const SOCKET_IO_URL = production ? '' : 'http://localhost';
