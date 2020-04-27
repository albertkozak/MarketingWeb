import React, { useState } from 'react';
import UserItem from './UserItem';

const UserList = () => {
	const [ users, setUsers ] = useState([]);

	const dummyData = [
		{
			userEmail: 'gtong@gmail.com',
			isAdmin: true
		},
		{
			userEmail: 'pweier@gmail.com',
			isAdmin: true
		},
		{
			userEmail: 'jharrison@gmail.com',
			isAdmin: false
		},
		{
			userEmail: 'pmcgee@gmail.com',
			isAdmin: true
		}
	];

	// Add GET Request here

	return <div className="wrapper">{dummyData.map((user) => <UserItem key={user.userEmail} user={user} />)}</div>;
};

export default UserList;
