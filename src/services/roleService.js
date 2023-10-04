import axios from '../setup/axios';

// Call Api ben phia backend de xu ly logic cho frontend

const createRoles = (roles) => {
	// post - api
	return axios.post('/api/v1/role/create', [...roles]); // note: phai tra ve array voi object , ko tra 1 object
};

const fetchAllRoles = () => {
	return axios.get('/api/v1/role/read');
};

// delete a role
const deleteRole = (role) => {
	return axios.delete('/api/v1/role/delete', {
		data: { id: role.id },
	});
};

// get Role by Group
const fetchRoleByGroup = (groupId) => {
	return axios.get(`/api/v1/role/by-group/${groupId}`);
};

export { createRoles, fetchAllRoles, deleteRole, fetchRoleByGroup };
