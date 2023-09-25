import './App.scss';
import Login from './components/Login/Login';
import Nav from './components/Navigation/Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div className='app-container'>
				{/* <Nav /> */}
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
					<Route path='/' exact>
						Home
					</Route>
					<Route path='*'>404 - Not found</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
