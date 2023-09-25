import './Login.scss';

const Login = (props) => {
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
							className='form-control py-2'
							placeholder='Email adress or phone number'
						/>
						<input
							type='password'
							className='form-control py-2'
							placeholder='Password'
						/>
						<button className='btn btn-primary fw-bold py-2 fs-5'>Login</button>
						<span className='text-center'>
							<a className='forget-password' href='#'>
								Forget your password?
							</a>
						</span>
						<hr />
						<div className='text-center'>
							<button className='btn btn-success fw-bold py-2'>
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
