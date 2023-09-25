import React from 'react';
import './Nav.scss';
import { NavLink } from 'react-router-dom';

const Nav = (props) => {
	return (
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
							<NavLink to='/news'>News</NavLink>
						</li>
						<li>
							<NavLink to='/contact'>Contact</NavLink>
						</li>
						<li>
							<NavLink to='/about'>About</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</section>
	);
};

export default Nav;
