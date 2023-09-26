import './Register.scss';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Register = (props) => {
	// Form's State
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	let history = useHistory(); // replace to NavLink or Link if use button
	const handleLogin = () => {
		// chuyến hướng register Page
		history.push('/Login');
	};

	// when render done.
	useEffect(() => {
		// axios.get('http://localhost:8000/api/test-api').then((data) => {
		// 	console.log(data);
		// });
	}, []);

	// Handle Registe
	const handleRegister = () => {
		let userData = { email, phone, username, password, confirmPassword };

		console.log('--Check user data: ', userData);
	};

	return (
		<div className='Register-container '>
			<div className='container'>
				{/* padding-x: Register */}
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
						<div className='form-group'>
							<label>Email: </label>
							<input
								type='text'
								className='form-control py-2'
								placeholder='Email adress '
								value={email}
								onChange={(event) => setEmail(event.target.value)}
							/>
						</div>

						<div className='form-group'>
							<label>Phone number: </label>
							<input
								type='text'
								className='form-control py-2'
								placeholder='Phone number'
								value={phone}
								onChange={(event) => setPhone(event.target.value)}
							/>
						</div>
						<div className='form-group'>
							<label>Username: </label>
							<input
								type='text'
								className='form-control py-2'
								placeholder='Username'
								value={username}
								onChange={(event) => setUsername(event.target.value)}
							/>
						</div>

						<div className='form-group'>
							<label>Password: </label>
							<input
								type='password'
								className='form-control py-2'
								placeholder='Password'
								value={password}
								onChange={(event) => setPassword(event.target.value)}
							/>
						</div>

						<div className='form-group'>
							<label> Re-enter password: </label>
							<input
								type='password'
								className='form-control py-2'
								placeholder='Re-enter password'
								value={confirmPassword}
								onChange={(event) => setConfirmPassword(event.target.value)}
							/>
						</div>

						<button
							className='btn btn-primary fw-bold py-2 fs-5'
							onClick={() => handleRegister()}
						>
							Register
						</button>
						<hr />
						<div className='text-center'>
							<button
								className='btn btn-success fw-bold py-2'
								onClick={handleLogin}
							>
								Already have an account. Login
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
