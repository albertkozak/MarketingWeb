import React from 'react';
import UserList from '../components/users/UserList';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Roles = () => {
	const history = useHistory();
	return (
		<div className="container">
			<button className="userButton" onClick={() => history.push('/adduser')}>
				Create User
			</button>
			<UserList />
		</div>
	);
};

export default Roles;
