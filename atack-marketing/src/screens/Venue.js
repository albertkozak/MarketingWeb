import React from 'react';

const Venue = (props) => {
	const venue = props.venue;
	
	return (
		<div className="VenueItem">
			<p className="venue">{venue.venueId}</p>
            <p className="venue">{venue.venueName}</p>
            <p className="venue">{venue.venueWebsite}</p>
		</div>
	);
};

export default Venue;
