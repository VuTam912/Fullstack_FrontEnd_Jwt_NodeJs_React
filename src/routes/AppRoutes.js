import { Switch, Route } from 'react-router-dom';
import Users from '../components/ManageUsers/Users';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = (props) => {
	const Project = () => {
		return <div>PROJECT..</div>;
	};

	return (
		<>
			{/* Switch: Handle router display component */}
			<Switch>
				{/* PrivateRoutes => check if user has logged in yet */}
				<PrivateRoutes path='/users' component={Users} />
				<PrivateRoutes path='/projects' component={Project} />

				<Route path='/login'>
					<Login />
				</Route>
				<Route path='/register'>
					<Register />
				</Route>

				<Route path='/' exact>
					Home
				</Route>
				<Route path='*'>404 - Not found</Route>
			</Switch>
		</>
	);
};

export default AppRoutes;
