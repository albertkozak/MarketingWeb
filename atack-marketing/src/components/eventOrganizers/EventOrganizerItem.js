import React from 'react';
import { Link } from 'react-router-dom';

const EventOrganizerItem = (props) => {
	const eo = props.eventOrganizer;
	console.log(eo);

	return (
		<div className="eoItem">
			<h3 className="vendorTitle">{eo.userEmail}</h3>
		</div>
	);
};

export default VendorItem;
