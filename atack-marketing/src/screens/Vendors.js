import React from 'react';
import VendorList from '../components/vendors/VendorList';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Vendors = () => {
	const history = useHistory();
	return (
		<div className="container">
			<button className="vendorButton" onClick={() => history.push('/addvendor')}>
				Create Vendor
			</button>
			<VendorList />
		</div>
	);
};

export default Vendors;
