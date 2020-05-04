import React from 'react';
import { Link } from 'react-router-dom';

const VendorItemSL = (props) => {
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
			<h3 className="vendorTitle">{vendor.vendorName}</h3>
            </Link>
		</div>
	);
};

export default VendorItemSL;
