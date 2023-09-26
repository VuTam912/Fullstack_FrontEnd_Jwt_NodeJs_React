import axios from 'axios';

const registerNewUser = (email, phone, username, password) => {
	// post - api
	return axios.post('http://localhost:8000/api/v1/register', {
		email,
		phone,
		username,
		password,
	});
};

export { registerNewUser };
