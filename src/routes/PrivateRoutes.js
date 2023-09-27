import { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

// Xử lý nếu User đã login chưa ?
const PrivateRoutes = (props) => {
	let history = useHistory();

	useEffect(() => {
		let session = sessionStorage.getItem('account');
		// nếu cố nhập/vào URL mà chưa Login thì đẩy sang trang Login
		if (!session) {
			history.push('/login');
			window.location.reload(); // reload để hide navigation lại
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
