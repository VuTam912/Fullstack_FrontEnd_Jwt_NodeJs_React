import React, { useEffect, useState } from 'react';
import './Nav.scss';
import { NavLink, useLocation } from 'react-router-dom';

const Nav = (props) => {
	const [isShow, setIsShow] = useState(true); // default là hiện navigation
	// get URL dang dùng - nếu user access URL login
	let location = useLocation();

	useEffect(() => {
		// nếu Navgiation show ở trang Login thì hide navgiation
		if (location.pathname === '/login') {
			setIsShow(false);
		}
	}, []);

	return (
		<>
			{isShow === true && (
				<section className='navigation'>
					<div className='nav-container'>
						<div className='brand'>
							<a href='/'>Logo</a>
						</div>
						<nav>
							<ul className='nav-list'>
								<li>
									<NavLink to='/' exact>
										Home
									</NavLink>
								</li>
								<li>
									<NavLink to='/users'>Users</NavLink>
								</li>
								<li>
									<NavLink to='/projects'>Projects</NavLink>
								</li>
								<li>
									<NavLink to='/about'>About</NavLink>
								</li>
							</ul>
						</nav>
					</div>
				</section>
			)}
		</>
	);
};

export default Nav;
