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
			.catch(function(error) {
				// An error happened.
			});
	}
	return (
		<button className="logout-button">
			<a href="/" onClick={() => signOutUser()}>
				Log out
			</a>
		</button>
	);
};

export default Logout;
