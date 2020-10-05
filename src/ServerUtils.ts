export const registerUser = ({
	username,
	email,
	password,
}: {
	username: string;
	email: string;
	password: string;
}) => {
	return fetch('http://localhost:5000/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username, email, password }),
	});
};
