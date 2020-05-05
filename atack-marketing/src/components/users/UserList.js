import React, { useState, useEffect } from 'react';
import UserItem from './UserItem';
import firebase from "../../firebase";

const UserList = (props) => {
	const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/"
	const [ fetchedUsers, setFetchedUsers ] = useState([]);

	const fetchUsers = () => {
		firebase
		  .auth()
		  .currentUser.getIdTokenResult()
		  .then((tokenResponse) => {
			fetch(BASE_URL + "User/userlist", {
			  method: "GET",
			  headers: {
				Accept: "application/json",
				Authorization: `Bearer ${tokenResponse.token}`,
			  },
			})
			  .then((response) => response.json())
			  .then((responseData) => {
				if(responseData != null) {
				  responseData.sort((a,b) => {
					  return (a.email.localeCompare(b.email))
				  })
				setFetchedUsers(responseData);
				console.log(fetchedUsers); }
			  });
		  });
	  };
	
	  useEffect(() => {
		fetchUsers();
	  });
	
	return <div className="wrapper">{fetchedUsers.map((user) => <UserItem key={user.email} user={user} />)}</div>;
};

export default UserList;
