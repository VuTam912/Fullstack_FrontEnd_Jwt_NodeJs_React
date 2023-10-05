import './App.scss';
import NavHeader from './components/Navigation/NavHeader';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, useContext } from 'react';
import AppRoutes from './routes/AppRoutes';
import { TailSpin } from 'react-loader-spinner';
import { UserContext } from './context/UserContext';
import { Scrollbars } from 'react-custom-scrollbars';

function App() {
	const { user } = useContext(UserContext);

	// scrollbars
	const [scrollHeight, setScrollHeight] = useState(0);

	useEffect(() => {
		let windowHeight = window.innerHeight;
		setScrollHeight(windowHeight);
	}, [user]);

	return (
		<>
			<Scrollbars autoHide style={{ height: scrollHeight }}>
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
								<NavHeader />
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
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme='light'
				/>
			</Scrollbars>
		</>
	);
}

export default App;
