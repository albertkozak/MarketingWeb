import React from 'react';
import { Link, withRouter } from "react-router-dom";

const UserItem = (props) => {
	const user = props.user
	console.log(user)
	
	const showAdmin = () => {
		let access;
		if (user.isAdmin) {
			access = "Admin"
		} else {
			access = ""
		}
		return access;
	}


	return (
		<div className="userItem">
			<h3 className="userTitle">{user.email}</h3>
	<p className="isAdmin">{showAdmin()}</p>
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
