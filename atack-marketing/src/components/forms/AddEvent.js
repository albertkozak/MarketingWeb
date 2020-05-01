import React, { useState, useEffect } from 'react';
import VenueInputSelector from './VenueInputSelector';
import EventOrganizerInputSelector from './EventOrganizerInputSelector';
import firebase from '../../firebase'

const AddEvent = () => {
	const [errorMessage, setErrorMessage] = useState('')
	const [fetchedVenues, setFetchedVenues] = useState('')
	const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/Events"

	// Add GET Request here for Venues & Event Organizers

	const fetchData = () => {
		firebase
		  .auth()
		  .currentUser.getIdTokenResult()
		  .then((tokenResponse) => {
			fetch(BASE_URL, {
			  method: "GET",
			  headers: {
				Accept: "application/json",
				Authorization: `Bearer ${tokenResponse.token}`,
			  },
			})
			  .then((response) => response.json())
			  .then((responseData) => {
				setFetchedVenues(responseData.events.venue);
				console.log(fetchedVenues);
			  });
		  });
	  };
	
	  useEffect(() => {
		fetchData();
	  }, []);

	const dummyDataEOs = [
		{
			eventOrganizerId: 1,
			userId: 7,
			userEmail: 'eventies@events.com'
		},
		{
			eventOrganizerId: 2,
			userId: 12,
			userEmail: 'abc@123.com'
		},
		{
			eventOrganizerId: 5,
			userId: 198,
			userEmail: 'whatisricebowl@wut.com'
		}
	];

	const createEvent = async (event) => {
		event.preventDefault();
		const { eventName, eventStartDateTime, venueName } = event.target.elements;

		// Add POST Request here
		alert(`POST-request: ${eventName.value} ${eventStartDateTime.value} ${venueName}`);
	};

	const clearForm = (event) => {
		event.preventDefault();
		document.getElementById('add-event-form').reset();
	};

	return (
		<div className="container">
			<h1 className="addEventTitle">Add Event</h1>
			<div className="eventForm">
				<form onSubmit={createEvent} id="add-event-form" className="addEventForm">
					<input name="eventName" type="text" placeholder="Title" />
					<input name="eventStartDateTime" type="date" placeholder="Start Date" />
					<div className="input-selector">
						<VenueInputSelector data={fetchedVenues} />
					</div>
					<div className="input-selector">
						<EventOrganizerInputSelector data={dummyDataEOs} />
					</div>
					<div className="buttons">
						<button className="submit" variant="" type="submit">
							Add Event
						</button>
						<button className="cancel" onClick={clearForm}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddEvent;
