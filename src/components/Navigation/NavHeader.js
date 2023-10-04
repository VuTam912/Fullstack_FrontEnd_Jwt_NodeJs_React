import React, { useEffect, useState, useContext } from 'react';
import './Nav.scss';
import { Link, NavLink, useLocation, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../logo.svg';
import { logoutUser } from '../../services/userService';
import { toast } from 'react-toastify';

const NavHeader = (props) => {
	const { user, logoutContext } = useContext(UserContext); // su de show thong tin user logged tren navbar
	// lay duong url hien tai khi user dang truy cap vao
	const location = useLocation();

	// back to login or home
	const history = useHistory();

	// xu ly logut
	const handleLogout = async () => {
		// cần 3 bước để logout thành công or xóa sạch
		let data = await logoutUser(); // clear cookie
		localStorage.removeItem('jwt'); // delete local storage
		logoutContext(); // clear user in context
		if (data && data.EC === 0) {
			toast.success('log out success');
			history.push('/login');
		} else {
			toast.error(data.EM);
		}
	};

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
									<NavLink to='/roles' className='nav-link'>
										Roles
									</NavLink>
									<NavLink to='/group-roles' className='nav-link'>
										Group-Role
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
									{user && user.isAuthenticated === true ? (
										<>
											<Nav.Item className='nav-link'>
												Walcome {user.acoount.username} !
											</Nav.Item>
											<div>
												<NavDropdown title='Settings' id='basic-nav-dropdown'>
													<NavDropdown.Item>Change password</NavDropdown.Item>
													<NavDropdown.Divider />
													<NavDropdown.Item>
														<span onClick={() => handleLogout()}>Log out</span>
													</NavDropdown.Item>
												</NavDropdown>
											</div>
										</>
									) : (
										<>
											<Link to='/login' className='nav-link'>
												Login
											</Link>
										</>
									)}
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
