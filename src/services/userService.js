// export instance và import axios <= được phép đặt tên khác.
import axios from '../setup/axios';
// import axios from 'axios';
// USER - cac thao xu ly logic duoc backend xu ly khi frontend goi
// AXIOS - API - Backend

// Call API from backend to Login/Register
const registerNewUser = (email, phone, username, password) => {
	// post - api
	return axios.post('/api/v1/register', {
		email,
		phone,
		username,
		password,
	});
};

const loginUser = (valueLogin, password) => {
	// post - api
	return axios.post('/api/v1/login', {
		valueLogin,
		password,
	});
};

// get Data from backend
// get all User
const fetchAllUser = (page, limit) => {
	return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`); // templete string
};

// delete a user
const deleteUser = (user) => {
	return axios.delete('/api/v1/user/delete', {
		data: { id: user.id },
	});
};

// get data group - fetchGroup
const getGroup = () => {
	return axios.get(`/api/v1/group/read`);
};

// create a user
const createNewUser = (userData) => {
	return axios.post(`/api/v1/user/create`, {
		...userData,
	});
};

// update user
const updateCurrentUser = (userData) => {
	return axios.put(`/api/v1/user/update`, {
		...userData,
	});
};

// get info User Account when login
const getUserAccount = () => {
	return axios.get(`/api/v1/account`);
};

// logout
const logoutUser = () => {
	return axios.post(`/api/v1/logout`);
};

export {
	registerNewUser,
	loginUser,
	fetchAllUser,
	deleteUser,
	getGroup,
	createNewUser,
	updateCurrentUser,
	getUserAccount,
	logoutUser,
};
