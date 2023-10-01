import { useEffect, useContext } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

// Xử lý nếu User đã login chưa ?
const PrivateRoutes = (props) => {
	let history = useHistory();
	const { user } = useContext(UserContext);

	useEffect(() => {
		console.log('>>> check content user: ', user);
		let session = sessionStorage.getItem('account');
		// nếu cố nhập/vào URL mà chưa Login thì đẩy sang trang Login
		if (!session) {
			history.push('/login');
			// window.location.reload(); // reload để hide navigation lại
		}
		if (session) {
			//code
		}
	}, []);

	return (
		<>
			<Route path={props.path} component={props.component} />
		</>
	);
};

export default PrivateRoutes;
