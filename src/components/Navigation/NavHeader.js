import React, { useEffect, useState, useContext } from 'react';
import './Nav.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../logo.svg';

const NavHeader = (props) => {
	const { user } = useContext(UserContext);
	// lay duong url hien tai khi user dang truy cap vao
	const location = useLocation();

	// check user đã trong context nếu đã login (đã setContext khi login)
	if ((user && user.isAuthenticated === true) || location.pathname === '/') {
		// chỉ hiện nav ở trang home
		return (
			<>
				<div className='nav-header'>
					<Navbar expand='lg' bg='dark' data-bs-theme='dark'>
						<Container>
							<Navbar.Brand href='/'>
								<img
									src={logo}
									width='30'
									height='30'
									className='d-inline-block align-top'
									alt='React Bootstrap logo'
								/>
								<span className='brand-color'> React</span>
							</Navbar.Brand>
							<Navbar.Toggle aria-controls='basic-navbar-nav' />
							<Navbar.Collapse id='basic-navbar-nav'>
								<Nav className='me-auto'>
									<NavLink to='/' exact className='nav-link'>
										Home
									</NavLink>
									<NavLink to='/users' className='nav-link'>
										Users
									</NavLink>
									<NavLink to='/projects' className='nav-link'>
										Projects
									</NavLink>
									<NavLink to='/about' className='nav-link'>
										About
									</NavLink>
								</Nav>
								{/* right */}
								<Nav>
									<Nav.Item className='nav-link'>Walcome Ryo</Nav.Item>
									<div>
										<NavDropdown title='Settings' id='basic-nav-dropdown'>
											<NavDropdown.Item href='#action/3.1'>
												Change password
											</NavDropdown.Item>
											<NavDropdown.Divider />
											<NavDropdown.Item href='#action/3.4'>
												Log out
											</NavDropdown.Item>
										</NavDropdown>
									</div>
								</Nav>
							</Navbar.Collapse>
						</Container>
					</Navbar>
				</div>
			</>
		);
		// else : ko hien navgiation ở Login
	} else {
		return <></>;
	}
};

export default NavHeader;
