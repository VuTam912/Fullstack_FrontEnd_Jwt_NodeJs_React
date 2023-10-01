import { useEffect, useState, useContext } from 'react';
import './Login.scss';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService';
import { UserContext } from '../../context/UserContext';

const Login = (props) => {
	const { loginContext } = useContext(UserContext);

	let history = useHistory(); // replace to NavLink or Link if use button

	const [valueLogin, setValueLogin] = useState('');
	const [password, setPassword] = useState('');

	// validate Input Login
	const defaultObjValidInput = {
		isValidValueLogin: true,
		isValidPassword: true,
	};
	const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

	const handleCreateNewAccount = () => {
		// chuyến hướng register Page
		history.push('/register');
	};

	// Login
	const handleLogin = async () => {
		setObjValidInput(defaultObjValidInput);

		if (!valueLogin) {
			setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
			toast.error('Please enter your email address or phone number');
			return;
		}
		if (!password) {
			//set change class="is-invalid"
			setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
			toast.error('Please enter your password');
			return;
		}

		// call API  from userService
		let response = await loginUser(valueLogin, password);
		if (response && +response.EC === 0) {
			let groupwtihRoles = response.DT.groupwtihRoles;
			let email = response.DT.email;
			let username = response.DT.username;
			let token = response.DT.access_token;

			// success -> chuyển hướng trang users
			// set sessionStorage - luu thong tin trang thai
			let data = {
				isAuthenticated: true,
				token,
				acoount: {
					groupwtihRoles,
					email,
					username,
				},
			};

			sessionStorage.setItem('account', JSON.stringify(data)); // JSON.
			loginContext(data); // set context

			// chú ý nó sẽ ko render component (App) lai khi chuyển huong trang mà chi render User trong switch cảu router
			// fix: refresh cả trang lai App
			history.push('/users');
			// window.location.reload(); // refresh lai
		}

		if (response && +response.EC !== 0) {
			// error
			toast.error(response.EM);
		}
		// console.log('-- check response: ', response);
	};

	// Click login by key Enter
	const handlePressEnter = (event) => {
		if (event.charCode === 13 && event.code === 'Enter') {
			handleLogin();
		}
	};

	// Check if user has loggin and want access Login agains
	useEffect(() => {
		let session = sessionStorage.getItem('account');
		// nếu user đã login rồi thì đây vào trang home
		if (session) {
			history.push('/');
			// window.location.reload(); // reload để show navigation
		}
	}, []);

	return (
		<div className='Login-container '>
			<div className='container'>
				{/* padding-x: Login */}
				<div className='row px-3 px-sm-0'>
					{/* sm : ≥768px | */}
					<div className='content-left col-12 d-none col-sm-8 d-sm-block'>
						<div className='title-brand'>RYO Education</div>
						<div className='detail'>
							RYO Education helps you connect and share with the people in your
							life.
						</div>
					</div>
					<div className='content-right col-sm-4 col-12 d-flex flex-column gap-3 py-3 px-3'>
						<div className='title-brand d-sm-none'>RYO Education</div>
						<input
							type='text'
							className={
								objValidInput.isValidValueLogin
									? 'form-control py-2'
									: 'form-control py-2 is-invalid'
							}
							placeholder='Email adress or phone number'
							value={valueLogin}
							onChange={(event) => setValueLogin(event.target.value)}
						/>
						<input
							type='password'
							className={
								objValidInput.isValidPassword
									? 'form-control py-2'
									: 'form-control py-2 is-invalid'
							}
							placeholder='Password'
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							onKeyPress={(event) => handlePressEnter(event)}
						/>
						<button
							className='btn btn-primary fw-bold py-2 fs-5'
							onClick={() => handleLogin()}
						>
							Login
						</button>
						<span className='text-center'>
							<a className='forget-password' href='#test'>
								Forget your password?
							</a>
						</span>
						<hr />
						<div className='text-center'>
							<button
								className='btn btn-success fw-bold py-2'
								onClick={handleCreateNewAccount}
							>
								Create new account
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
