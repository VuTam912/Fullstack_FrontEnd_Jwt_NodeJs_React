import axios from 'axios';
// USER
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
const fetchAllUser = (page, limit) => {
	return axios.get(
		`http://localhost:8000/api/v1/user/read?page=${page}&limit=${limit}`
	); // templete string
};

// delete a user
const deleteUser = (user) => {
	return axios.delete('http://localhost:8000/api/v1/user/delete', {
		data: { id: user.id },
	});
};

// get data group
const getGroup = () => {
	return axios.get(`http://localhost:8000/api/v1/group/read`);
};
export { registerNewUser, loginUser, fetchAllUser, deleteUser, getGroup };
