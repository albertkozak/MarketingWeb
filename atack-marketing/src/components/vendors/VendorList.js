import React, { useState } from 'react';
import VendorItem from './VendorItem';

const VendorList = () => {
	const [ name, description, email, website ] = useState([]);

	const dummyData = [
		{
			name: '7-11',
			description: 'Cheap Coffee Haven',
			email: '711@711.com',
			website: 'www.711.com'
		},
		{
			name: 'Audi Canada',
			description: 'Das Auto',
			email: 'audi@audicanada.ca',
			website: 'www.audi.ca'
		}
	];

	// Add GET Request here

	return <div className="wrapper">{dummyData.map((vendor) => <VendorItem key={vendor.name} vendor={vendor} />)}</div>;
};

export default VendorList;
