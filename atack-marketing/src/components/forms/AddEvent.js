import React, { useState, useEffect, useCallback } from 'react';
import VenueInputSelector from './VenueInputSelector';
import EventOrganizerInputSelector from './EventOrganizerInputSelector';
import firebase from '../../firebase'

const AddEvent = () => {
	const [errorMessage, setErrorMessage] = useState('')
	const [fetchedVenues, setFetchedVenues] = useState([])
	const [fetchedUsers, setFetchedUsers] = useState([])
	const [selectedVenue, setSelectedVenue] = useState('')
	const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/"

	// Add GET Request here for Venues & Event Organizers

	const fetchVenues = () => {
		firebase
		  .auth()
		  .currentUser.getIdTokenResult()
		  .then((tokenResponse) => {
			fetch(BASE_URL + "Venues", {
			  method: "GET",
			  headers: {
				Accept: "application/json",
				Authorization: `Bearer ${tokenResponse.token}`,
			  },
			})
			  .then((response) => response.json())
			  .then((responseData) => {
				setFetchedVenues(responseData);
				console.log(fetchedVenues);
			  });
		  });
	  };

	  const fetchUsers = () => {
		firebase
		  .auth()
		  .currentUser.getIdTokenResult()
		  .then((tokenResponse) => {
			fetch(BASE_URL + "User", {
			  method: "GET",
			  headers: {
				Accept: "application/json",
				Authorization: `Bearer ${tokenResponse.token}`,
			  },
			})
			  .then((response) => response.json())
			  .then((responseData) => {
				setFetchedUsers(responseData.user);
				console.log(fetchedUsers);
			  });
		  });
	  };
	
	  useEffect(() => {
		fetchVenues(); 
		fetchUsers();
	  }, []);

	const dummyDataVenues = [
		{
			venueId: 1,
			venueName: 'Rogers Arena',
			website: 'https://rogersarena.com/'
		},
		{
			venueId: 2,
			venueName: 'Vancouver Convention Centre',
			website: 'https://www.vancouverconventioncentre.com/'
		}
	];

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
		const { eventName, eventStartDateTime, venueId } = event.target.elements;

		// Add POST Request here
		// alert(`POST-request: ${eventName.value} ${eventStartDateTime.value} ${venueName}`);

		//Validation 
		if(eventName.value === "" || eventStartDateTime.value === "") {
			setErrorMessage("Please fill all required fields");
		} else {
			setErrorMessage("")
		}

		let JWToken = await (
			await firebase.auth().currentUser.getIdTokenResult()
		).token;
		if (JWToken !== null) {
			const result = await fetch(BASE_URL + "Events", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${JWToken}`
				},
				body: JSON.stringify({
					eventName: eventName.value,
					eventStartDateTime: eventStartDateTime.value,
					venueId: selectedVenue
				})
			})
		}
	};


	const callbackFunction = (childData) => {
		//let venueId = childData.value;
		setSelectedVenue(childData)
		console.log(childData)
		//console.log(childData.value)
		console.log(selectedVenue)
	}


	const clearForm = (event) => {
		event.preventDefault();
		document.getElementById('add-event-form').reset();
	};

	return (
		<div className="container">
			<h1 className="addEventTitle">Add Event</h1>
			<div className="eventForm">
				<form onSubmit={createEvent} id="add-event-form" className="addEventForm">
				<p className="form-error">{errorMessage}</p>
					<input name="eventName" type="text" placeholder="Title" />
					<input name="eventStartDateTime" type="date" placeholder="Start Date" />
					<div className="input-selector">
						<VenueInputSelector data={fetchedVenues} parentCallback={callbackFunction} />
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
