import './Register.scss';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Register = (props) => {
	// Form's State
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	// default value for isVlidate Input
	const defaultValidInput = {
		isValidEmail: true,
		isValidPhone: true,
		isValidPassword: true,
		isValidConfirmPassword: true,
	};

	// set className for isVlidate Input
	const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

	let history = useHistory(); // replace to NavLink or Link if use button
	const handleLogin = () => {
		// chuyến hướng register Page
		history.push('/Login');
	};

	// when render done.
	useEffect(() => {
		// axios.get('http://localhost:8000/api/v1/test-api').then((data) => {
		// 	console.log(data);
		// });
	}, []);

	// Validate Form
	// Note: Do chay tu tren xuong nen phai sap xep if hop ly
	const isValidateInputs = () => {
		// Khi tien Validate cho input thi set lai gia tri default => mực địch để có thể Submit/check lại nhiều lần nếu enter sai/thiếu.
		setObjCheckInput(defaultValidInput);

		if (!email) {
			toast.error('Email is required');
			// tao một object mới với sao chép ...defaultValidInput và ghi de giá trí isValidEmail (phải cùng tên)
			setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
			return false;
		}

		// regex email
		let regex = /\S+@\S+\.\S+/;
		if (!regex.test(email)) {
			setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
			toast.error('Please enter a valid email address.');
			return false;
		}

		if (!phone) {
			toast.error('Phone is required');
			setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
			return false;
		}
		if (!password) {
			toast.error('Password is required');
			setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
			return false;
		}

		if (password !== confirmPassword) {
			toast.error('Your password is not the same');
			setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
			return false;
		}

		// neu tat ca o tren ko bat duoc if thi tra ve true
		return true;
	};

	// Handle Registe
	const handleRegister = () => {
		let check = isValidateInputs();

		//
		if (check === true) {
			// post - api
			axios.post('http://localhost:8000/api/v1/register', {
				email,
				phone,
				username,
				password,
			});

			toast.success('Register success');
		}
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
								className={
									// <-- change className
									objCheckInput.isValidEmail
										? 'form-control py-2'
										: 'form-control is-invalid py-2'
								}
								placeholder='Email adress '
								value={email}
								onChange={(event) => setEmail(event.target.value)}
							/>
						</div>

						<div className='form-group'>
							<label>Phone number: </label>
							<input
								type='text'
								className={
									// <-- change className
									objCheckInput.isValidPhone
										? 'form-control py-2'
										: 'form-control is-invalid py-2'
								}
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
								className={
									// <-- change className
									objCheckInput.isValidPassword
										? 'form-control py-2'
										: 'form-control is-invalid py-2'
								}
								placeholder='Password'
								value={password}
								onChange={(event) => setPassword(event.target.value)}
							/>
						</div>

						<div className='form-group'>
							<label> Re-enter password: </label>
							<input
								type='password'
								className={
									// <-- change className
									objCheckInput.isValidConfirmPassword
										? 'form-control py-2'
										: 'form-control is-invalid py-2'
								}
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
