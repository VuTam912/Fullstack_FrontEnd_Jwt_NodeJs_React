import './App.scss';
import Login from './components/Login/Login';
import Nav from './components/Navigation/Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Users from './components/ManageUsers/Users';
import { useEffect, useState } from 'react';
import _ from 'lodash';

function App() {
	// sessionStorage
	const [account, setAccount] = useState({});

	useEffect(() => {
		let session = sessionStorage.getItem('account');
		if (session) {
			setAccount(JSON.parse(session)); // parse JSON
		}
	}, []);

	return (
		<Router>
			<div className='app-container'>
				{account && !_.isEmpty(account) && account.isAuthenticated && <Nav />}

				{/* Switch: Handle router display component */}
				<Switch>
					<Route path='/news'>
						{/* display content */}
						News
					</Route>
					<Route path='/about'>About</Route>
					<Route path='/contact'>Contact</Route>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/register'>
						<Register />
					</Route>
					<Route path='/users'>
						<Users />
					</Route>
					<Route path='/' exact>
						Home
					</Route>
					<Route path='*'>404 - Not found</Route>
				</Switch>
			</div>
			{/* Toast - alert*/}
			<ToastContainer
				position='bottom-center'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
		</Router>
	);
}

export default App;
