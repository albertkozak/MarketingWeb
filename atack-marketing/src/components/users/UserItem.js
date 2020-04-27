import React from 'react';

const UserItem = (props) => {
	console.log(props);
	return (
		<div className="userItem">
			<h3 className="userTitle">{props.user.userEmail}</h3>
			<p className="isAdmin">{props.user.isAdmin}</p>
			{/* links for these */}
			<div className="edit-del-links">Edit / Delete</div>
		</div>
	);
};

export default UserItem;
