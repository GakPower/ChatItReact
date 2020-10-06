export const registerUser = ({
	username,
	email,
	password,
}: {
	username: string;
	email: string;
	password: string;
}) => {
	return fetch('http://localhost:5000/join', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username, email, password }),
	});
};

export const loginUser = (
	{
		username,
		email,
		password,
	}: { username?: string; email?: string; password: string },
	usernameLogin: boolean
) => {
	const fieldToPass = usernameLogin ? { username } : { email };
	return fetch('http://localhost:5000/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ fieldToPass, password }),
	});
};
