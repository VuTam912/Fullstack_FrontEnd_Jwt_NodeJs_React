import { useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

// Xử lý nếu User đã login chưa ?
const PrivateRoutes = (props) => {
	// get info user ở trong useContent (ko cần props)
	const { user } = useContext(UserContext);

	// check user đã trong context nếu đã login (đã setContext khi login)
	if (user && user.isAuthenticated === true) {
		return (
			<>
				<Route path={props.path} component={props.component} />
			</>
		);
	} else {
		// chuyên tới trang login thì chưa đăng nhập.
		return <Redirect to='/login'></Redirect>;
	}
};

export default PrivateRoutes;
