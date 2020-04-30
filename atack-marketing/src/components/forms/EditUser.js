import React, { useState, useEffect } from 'react';

const EditUser = (props) => {
	const user = props.location.state.user;
	const [isAdmin, setIsAdmin] = useState(user.isAdmin)

	const handleToggle = () => {
		setIsAdmin(!isAdmin)
		console.log(isAdmin)

		// Add Put request here
	}

	return (
		<div className="container">
			<h1 className="editUserTitle">Edit User Access</h1>
			<h3 className="adminLabel">Admininstrative Access:</h3>
			<div className="userContainer">
			<p className="userName">{user.userEmail}</p>

			<div className='switchContainer'>
            <label className="switch">
			<input 
				type="checkbox" 
				value={isAdmin} 
				onChange={handleToggle} />
            <div className="slider"></div>
            </label>
        	</div>
			</div>
		</div>
	);
};

export default EditUser;
