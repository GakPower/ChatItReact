const SERVER_IP = 'http://localhost:5000';
const AUTH_PATH = `${SERVER_IP}/app`;
export const getEmojis = async () => {
	try {
		const res = await fetch(`${AUTH_PATH}/emojis`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const jsonRes = await res.json();
		return jsonRes.emojis;
	} catch (error) {
		console.log(error);
		return [];
	}
};
