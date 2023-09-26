import { useState } from 'react';
import './Login.scss';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService';

const Login = (props) => {
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

		await loginUser(valueLogin, password);
	};

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
