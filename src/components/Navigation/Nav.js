import React, { useEffect, useState, useContext } from 'react';
import './Nav.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Nav = (props) => {
	const { user } = useContext(UserContext);
	// lay duong url hien tai khi user dang truy cap vao
	const location = useLocation();

	// check user đã trong context nếu đã login (đã setContext khi login)
	if ((user && user.isAuthenticated === true) || location.pathname === '/') {
		// chỉ hiện nav ở trang home
		return (
			<>
				<div className='topnav'>
					<NavLink to='/' exact>
						Home
					</NavLink>
					<NavLink to='/users'>Users</NavLink>
					<NavLink to='/projects'>Projects</NavLink>
					<NavLink to='/about'>About</NavLink>
				</div>
			</>
		);
		// else : ko hien navgiation ở Login
	} else {
		return <></>;
	}
};

export default Nav;
