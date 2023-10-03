import axios from '../setup/axios';

// Call Api ben phia backend de xu ly logic cho frontend

const createRoles = (roles) => {
	// post - api
	return axios.post('/api/v1/role/create', [...roles]); // note: phai tra ve array voi object , ko tra 1 object
};

export { createRoles };
