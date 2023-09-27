import axios from 'axios';

// AXIOS - API - Backend

// Call API from backend to Login/Register
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

// get Data from backend
// get all User
const fetchAllUser = () => {
	return axios.get('http://localhost:8000/api/v1/user/read');
};

export { registerNewUser, loginUser, fetchAllUser };
