import React from 'react';
import { Link } from 'react-router-dom';

const EventOrganizerItem = (props) => {
	const eo = props.eo;
	console.log(eo);

	return (
		<div className="eoItem">
			<h3 className="eoTitle">{eo.userEmail}</h3>
		</div>
	);
};

export default EventOrganizerItem;
