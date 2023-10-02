import React, { useState } from 'react';
import { getUserAccount } from '../services/userService';
import { useEffect } from 'react';
// React Context: Luu thong tin global - cho phép các component có thể truy cập được biến mà ko cần phải truyền props từ cha sang con (component)

const UserContext = React.createContext(null); // biến khởi tạo

// children = component
const UserProivder = ({ children }) => {
	// User is the name of the "data" that gets stored in context
	const [user, setUser] = useState({
		isAuthenticated: false,
		token: '',
		acoount: {},
	});

	// Login updates the user data with a name parameter
	const loginContext = (userData) => {
		setUser(userData);
	};

	// Logout updates the user data to default
	const logout = () => {
		setUser((user) => ({
			name: '',
			auth: false,
		}));
	};

	const fetchUser = async () => {
		let response = await getUserAccount(); // call tu phia server
		if (response && response.EC === 0) {
			let groupwtihRoles = response.DT.groupwtihRoles;
			let email = response.DT.email;
			let username = response.DT.username;
			let token = response.DT.access_token;

			// set sessionStorage - luu thong tin trang thai
			let data = {
				isAuthenticated: true,
				token,
				acoount: {
					groupwtihRoles,
					email,
					username,
				},
			};

			setUser(data);
		}
	};

	// thuc thi khi render xong
	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<UserContext.Provider value={{ user, loginContext, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProivder };
