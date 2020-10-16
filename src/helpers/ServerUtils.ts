import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
const SERVER_IP = 'http://localhost:5000';

const cookies = new Cookies();

export const joinUser = async ({
	username,
	email,
	password,
}: {
	username: string;
	email: string;
	password: string;
}) => {
	try {
		const res = await fetch(`${SERVER_IP}/api/auth/join`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, email, password }),
		});
		const resJson = await res.json();
		if (resJson.valid) {
			cookies.set('token', resJson.token, { path: '/', sameSite: 'strict' });
		}
		return resJson;
	} catch (error) {
		console.log({ error });
		return error;
	}
};

export const loginUser = async (
	{ emailUsername, password }: { emailUsername?: string; password: string },
	emailLogin: boolean
) => {
	try {
		const res = await fetch(`${SERVER_IP}/api/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ emailUsername, password, emailLogin }),
		});

		const resJson = await res.json();
		if (resJson.valid) {
			cookies.set('token', resJson.token, { path: '/', sameSite: 'strict' });
		}

		return resJson;
	} catch (error) {
		console.log({ error });

		return error;
	}
};

export const logPosts = async () => {
	try {
		const res = await fetch(`${SERVER_IP}/api/auth/posts`, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + cookies.get('token'),
				'Content-Type': 'application/json',
			},
		});
		const { valid, data, expired, token, message } = await res.json();
		if (valid) {
			console.log({ data });
		} else if (expired) {
			cookies.set('token', token, { path: '/', sameSite: 'strict' });
			await logPosts();
		} else if (message) {
			console.log({ message });
		}
	} catch (error) {
		console.log(error);
	}
};

export const forgotPass = async ({ email }: { email: string }) => {
	try {
		const res = await fetch(`${SERVER_IP}/api/auth/forgotPass`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		});
		await res.json();
	} catch (error) {
		console.log(error);
	}
};

export const isResetIdValid = async (id: string) => {
	try {
		const res = await fetch(`${SERVER_IP}/api/auth/checkResetId`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id }),
		});
		const jsonRes = await res.json();

		return !!jsonRes.valid;
	} catch (error) {
		console.log(error);
	}
};

export const updatePassword = async (id: string, newPassword: string) => {
	try {
		const res = await fetch(`${SERVER_IP}/api/auth/updatePassword`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id, newPassword }),
		});
		const jsonRes = await res.json();

		return jsonRes;
	} catch (error) {
		console.log(error);
	}
};

export const logout = async () => {
	const token = cookies.get('token');
	try {
		const res = await fetch(`${SERVER_IP}/api/auth/logout`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token }),
		});
		const jsonRes = await res.json();
		cookies.remove('token');

		return jsonRes;
	} catch (error) {
		console.log(error);
	}
};

export const isTokenValid = async () => {
	const token = cookies.get('token');
	try {
		const res = await fetch(`${SERVER_IP}/api/auth/isTokenValid`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token }),
		});

		const jsonRes = await res.json();

		return !!jsonRes.valid;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const refreshToken = async () => {
	const token = cookies.get('token');
	try {
		const res = await fetch(`${SERVER_IP}/api/auth/refreshToken`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token }),
		});

		const jsonRes = await res.json();
		if (jsonRes.valid) {
			cookies.set('token', jsonRes.token, { path: '/', sameSite: 'strict' });
		}
		return !!jsonRes.valid;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const getGoogleAuthLink = async () => {
	try {
		const res = await fetch(`${SERVER_IP}/api/auth/getGoogleAuthLink`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const jsonRes = await res.json();
		return jsonRes.link;
	} catch (error) {
		console.log(error);
	}
};