import { SERVER_URL } from './../getEnvVariables';
const AUTH_PATH = `${SERVER_URL}/app`;
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
