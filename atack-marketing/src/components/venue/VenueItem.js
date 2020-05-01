import React from 'react';
import { Link } from 'react-router-dom';

const VenueItem = (props) => {
	const venue = props.venue;
	
	return (
		<div className="VenueItem">
			<p className="venue">{venue.venueId}</p>
            <p className="venue">{venue.venueName}</p>
            <p className="venue">{venue.venueWebsite}</p>
		</div>
	);
};

export default VenueItem;
