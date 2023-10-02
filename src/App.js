import './App.scss';
import Nav from './components/Navigation/Nav';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, useContext } from 'react';
import AppRoutes from './routes/AppRoutes';
import { TailSpin } from 'react-loader-spinner';
import { UserContext } from './context/UserContext';

function App() {
	const { user } = useContext(UserContext);

	return (
		<>
			<Router>
				{/* fix error: refresh */}
				{user && user.isLoading ? (
					<div className='loading-container'>
						<TailSpin
							height='80'
							width='80'
							color='#3e93cd'
							ariaLabel='tail-spin-loading'
							radius='1'
							wrapperStyle={{}}
							wrapperClass=''
							visible={true}
						/>
						<div className='title_loading'>Loading data...</div>
					</div>
				) : (
					<>
						<div className='app-header'>
							<Nav />
						</div>

						<div className='app-container'>
							<AppRoutes />
						</div>
					</>
				)}
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
