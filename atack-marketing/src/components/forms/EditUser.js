import React, { useState, useEffect } from 'react';

const EditUser = (props) => {
	const user = props.location.state.user;
	const [isAdmin, setIsAdmin] = useState(user.isAdmin)
	const updateIsAdmin = () => setIsAdmin(!isAdmin)

	const editUser = async (user) => {
		user.preventDefault();
		const { userEmail, isAdmin } = user.target.elements;

		// Add POST Request here
		alert(`POST-request: ${userEmail.value} ${isAdmin}`);
	};

	const clearForm = (user) => {
		user.preventDefault();
		setIsAdmin(user.isAdmin)
	};

	//useEffect(() => {}, [])

	return (
		<div className="container">
			<h1 className="addUserEmail">Edit User Access</h1>
			<div className="userForm">
				<form onSubmit={editUser} id="add-user-form" className="addUserForm">
					<input readOnly value={user.userEmail} name="userEmail" type="text" placeholder="Email" />
					<input checked={user.isAdmin}
            		onChange={updateIsAdmin}name="isAdmin" type="checkbox" placeholder="Admin" />
					<div className="buttons">
						<button className="submit" variant="" type="submit">
							Edit Access
						</button>
						<button className="cancel" onClick={clearForm}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditUser;