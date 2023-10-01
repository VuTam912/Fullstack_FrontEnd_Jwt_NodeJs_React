import React, { useState } from 'react';

// React Context: Luu thong tin global

const UserContext = React.createContext({ name: '', auth: false });

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

	return (
		<UserContext.Provider value={{ user, loginContext, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProivder };
