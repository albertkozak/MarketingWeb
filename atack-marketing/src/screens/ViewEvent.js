import React from 'react';
import EventList from '../components/events/EventList';
import { useHistory } from 'react-router-dom';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { Link, withRouter } from "react-router-dom";
import firebase from '../firebase'

const ViewEvent = (props) => {
	const currentEvent = props.location.state.event;
	const venue = currentEvent.venue
	const id = currentEvent.eventId

	let history = useHistory();
	
	// const handleBack = () => {
	// 	history.goBack();
	// };

	return (
		<div className="container">
			<div className="eventWrapper">
				<div className="eventHeader">
					<h2>{currentEvent.eventName}</h2>
					<p>{Date(currentEvent.eventStartDateTime)}</p>
				</div>
				<div className="edit-del-links">
				<Link
					to={{
						pathname: '/editEvent',
						state: { currentEvent }
					}}
				> <p className="edit">Edit Event</p> </Link>
				<Link
					to={{
						pathname: '/deleteEvent',
						state: { currentEvent }
					}}
				> <p className="delete">Delete</p> </Link>
				 </div>
				<div className="venueContainer">
				<div className="venueDetails">
				<p className="venue">{venue.venueName}</p>
				<p className="venueWebsite">{venue.venueWebsite}</p>
				</div>
				<Link
        			to={{
          			pathname: "/editVenue",
          			state: { venue, id },
        			}}
      			><p className="editVenue">Edit Venue</p>
				</Link>
				</div>
				<div className="eventDetailsWrapper">
					<div className="eventOrganziersContainer">
						<h3 className="eventOrganizers">Event Organizers</h3>
						<ul className="eventOrganizersList" />
					</div>
					
					<div className="eventVendorsContainer">
						<h3 className="eventVendors">Event Vendors</h3>
						<ul className="eventVendorsList" />
					</div>
					<button className="addVendorButton" onClick={() => history.push('/addvendor')}>
						Add Vendor
					</button>
					{/* <button className="addVendorButton" onClick={handleBack}>
						Back <br />
						<FaRegArrowAltCircleLeft />
					</button> */}
				</div>
			</div>
		</div>
	);
};

export default ViewEvent;
