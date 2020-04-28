import React from 'react';

const AddUser = () => {
	const createUser = async (user) => {
		user.preventDefault();
		const { userEmail, isAdmin } = user.target.elements;

		// Add POST Request here
		alert(`POST-request: ${userEmail.value} ${isAdmin}`);
	};

	const clearForm = (user) => {
		user.preventDefault();
		document.getElementById('add-user-form').reset();
	};

	return (
		<div className="container">
			<h1 className="addUserEmail">Add User</h1>
			<div className="userForm">
				<form onSubmit={createUser} id="add-user-form" className="addUserForm">
					<input name="userEmail" type="text" placeholder="Email" />
					{/* <input name="isAdmin" type="checkbox" placeholder="Admin" /> */}
					<div className="buttons">
						<button className="submit" variant="" type="submit">
							Create
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

export default AddUser;
