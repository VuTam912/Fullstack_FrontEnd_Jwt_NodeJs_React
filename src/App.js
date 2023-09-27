import './App.scss';
import Nav from './components/Navigation/Nav';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';

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
		<>
			<Router>
				<div className='app-header'>
					<Nav />
				</div>

				<div className='app-container'>
					<AppRoutes />
				</div>
			</Router>
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
		</>
	);
}

export default App;
