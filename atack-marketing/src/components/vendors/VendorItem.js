import React from 'react';
import { Link } from 'react-router-dom';

const VendorItem = (props) => {
	const vendor = props.vendor;
	console.log(vendor);

	return (
		<div className="vendorItem">
			<Link
					to={{
						pathname: '/viewvendor',
						state: { vendor }
					}}
				>
			<h3 className="vendorTitle">{vendor.name}</h3>
			</Link>
			<div className="edit-del-links">
				<Link
					to={{
						pathname: '/viewvendor',
						state: { vendor }
					}}
				>
					<p className="editVendor">View Vendor</p>
				</Link>
			</div>
		</div>
	);
};

export default VendorItem;
