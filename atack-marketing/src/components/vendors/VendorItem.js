import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const VendorItem = (props) => {
	const vendor = props.vendor;
	console.log(vendor);

	return (
		<div className="vendorItem">
			<h3 className="vendorTitle">{vendor.name}</h3>
			<p className="description">{vendor.description}</p>
			<p className="email">{vendor.email}</p>
			<p className="website">{vendor.website}</p>
			{/* links for these */}
			<div className="edit-del-links">
				<Link
					to={{
						pathname: '/editVendor',
						state: { vendor }
					}}
				>
					<p className="editVendor">Edit Vendor</p>
				</Link>
			</div>
		</div>
	);
};

export default VendorItem;
