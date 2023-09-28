import React, { useEffect, useState } from 'react';
import './Nav.scss';
import { NavLink, useLocation } from 'react-router-dom';

const Nav = (props) => {
	const [isShow, setIsShow] = useState(true); // default là hiện navigation
	// get URL vị trí hiện tại dang dùng - nếu user access URL login
	let location = useLocation();

	useEffect(() => {
		// nếu Navgiation show ở trang Login thì hide navgiation
		if (location.pathname === '/login') {
			setIsShow(false); // hide navigation
		}
	}, []);

	return (
		<>
			{isShow === true && (
				<div className='topnav'>
					<NavLink to='/' exact>
						Home
					</NavLink>
					<NavLink to='/users'>Users</NavLink>
					<NavLink to='/projects'>Projects</NavLink>
					<NavLink to='/about'>About</NavLink>
				</div>
			)}
		</>
	);
};

export default Nav;
