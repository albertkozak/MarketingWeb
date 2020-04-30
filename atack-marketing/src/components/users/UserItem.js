import React from 'react';
import { Link, withRouter } from "react-router-dom";

const UserItem = (props) => {
	const user = props.user

	return (
		<div className="userItem">
			<h3 className="userTitle">{user.userEmail}</h3>
			<p className="isAdmin">{user.isAdmin}</p>
			{/* links for these */}
			<div className="edit-del-links">
			<Link
        			to={{
          			pathname: "/editUser",
          			state: { user },
        			}}
      			><p className="editUser">Edit Access</p>
				</Link>
			</div>
		</div>
	);
};

export default UserItem;
