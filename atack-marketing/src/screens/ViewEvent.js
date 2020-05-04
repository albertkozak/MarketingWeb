import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import firebase from '../firebase'
import EventOrganizerItem from '../components/eventOrganizers/EventOrganizerItem'

const ViewEvent = (props) => {
	const currentEvent = props.location.state.event;
	const venue = currentEvent.venue
	const id = currentEvent.eventId
	const [fetchedEOs, setFetchedEOs] = useState([])

	const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/";
	const EO_URL = BASE_URL + "EventOrganizer/"

	let history = useHistory();
	
	const fetchEOs = () => {
		firebase
		.auth()
		.currentUser.getIdTokenResult()
		.then((tokenResponse) => {
		  fetch(EO_URL + id, {
			method: "GET",
			headers: {
			  Accept: "application/json",
			  Authorization: `Bearer ${tokenResponse.token}`,
			},
		  })
			.then((response) => response.json())
			.then((responseData) => {
			  setFetchedEOs(responseData.eventOrganizers);
			  console.log(fetchedEOs);
			});
		});
	};

	useEffect(() => {
		fetchEOs();
	  });

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
						<ul className="eventOrganizersList">
				{fetchedEOs.map((eo) => (
					<EventOrganizerItem key={eo.eventOrganizerId} eo={eo} />
				))}</ul>
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
