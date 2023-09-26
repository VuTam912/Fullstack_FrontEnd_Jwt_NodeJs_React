import axios from 'axios';

// Call API from backend

const registerNewUser = (email, phone, username, password) => {
	// post - api
	return axios.post('http://localhost:8000/api/v1/register', {
		email,
		phone,
		username,
		password,
	});
};

const loginUser = (valueLogin, password) => {
	// post - api
	return axios.post('http://localhost:8000/api/v1/login', {
		valueLogin,
		password,
	});
};

export { registerNewUser, loginUser };
