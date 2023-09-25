import './Login.scss';

const Login = (props) => {
	return (
		<div className='Login-container mt-3'>
			<div className='container'>
				<div className='row'>
					{/* md : ≥768px | */}
					<div className='content-left col-7  '>
						<div className=''>RYO Education</div>
						<div className='detail'>
							RYO helps you connect and share with the people in your life.
						</div>
					</div>
					<div className='content-right col-5 d-flex flex-column gap-3 py-3'>
						<input
							type='text'
							className='form-control'
							placeholder='Email adress or phone number'
						/>
						<input
							type='password'
							className='form-control'
							placeholder='Password'
						/>
						<button className='btn btn-primary fw-bold'>Login</button>
						<span className='text-center'>Forget your password ?</span>
						<hr />
						<div className='text-center'>
							<button className='btn btn-success fw-bold'>
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
