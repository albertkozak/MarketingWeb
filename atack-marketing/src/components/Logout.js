import React from 'react';
import firebase from '../firebase';

const Logout = (props) => {
	async function signOutUser() {
		await firebase
			.auth()
			.signOut()
			.then(() => {
				props.getLoggedIn(false);
			})
			.catch(function (error) {
				// An error happened.
			});
	}
	return (
		<a href="/" onClick={() => signOutUser()}>
			Log out
		</a>
	);
};

export default Logout;
