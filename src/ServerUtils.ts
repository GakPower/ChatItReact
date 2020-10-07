const SERVER_IP = 'http://localhost:5000';

export const registerUser = ({
	username,
	email,
	password,
}: {
	username: string;
	email: string;
	password: string;
}) => {
	return fetch(`${SERVER_IP}/join`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username, email, password }),
	});
};

export const loginUser = (
	{ emailUsername, password }: { emailUsername?: string; password: string },
	emailLogin: boolean
) => {
	const fieldToPass = emailLogin
		? { email: emailUsername }
		: { username: emailUsername };
	return fetch(`${SERVER_IP}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ fieldToPass, password, emailLogin }),
	});
};
