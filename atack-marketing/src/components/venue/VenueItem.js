import React from 'react';
import { Link } from 'react-router-dom';

const VenueItem = (props) => {
	const venue = props.venue;
	
	return (
		<div className="VenueItem">
			<Link
				to={{
					pathname: '/viewvenue',
					state: { venue }
				}}
			>
			<h3 className="vendorTitle">{vendor.venueName}</h3>
			</Link>
			<div className="edit-del-links">
				<Link
					to={{
						pathname: '/viewvenue',
						state: { vennue }
					}}
					>
					<p className="editVenue">View Venue</p>
				</Link>
			</div>
		</div>
	);
};

export default VenueItem;
