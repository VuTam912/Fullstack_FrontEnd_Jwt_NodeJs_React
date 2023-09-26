import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './Users.scss';

const Users = (props) => {
	let history = useHistory();

	useEffect(() => {
		let session = sessionStorage.getItem('account');
		// nếu cố nhập URL: user mà ko Login thì đây sang trang Login
		if (!session) {
			history.push('/login');
		}
	}, []);

	return <div>User component</div>;
};

export default Users;
