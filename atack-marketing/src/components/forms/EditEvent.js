import React, { useState, useEffect } from 'react';
import VenueInputSelector from './VenueInputSelector';
import EventOrganizerInputSelector from './EventOrganizerInputSelector';
import firebase from '../../firebase'

const EditEvent = (props) => {
	const event = props.location.state.currentEvent;
	const eventId = event.eventId;
	const [ eventName, setEventName ] = useState(event.eventName);
	const [ eventStartDateTime, setEventStartDateTime ] = useState(event.eventStartDateTime);
	const formDate = new Date(eventStartDateTime).toISOString().slice(0, 10);
	// Need to adjust selector form - pending
	const [ venueName, setVenueName ] = useState(event.venue.venueName);
	const [ errorMessage, setErrorMessage ] = useState('');
	const [fetchedVenues, setFetchedVenues] = useState([])
	const [fetchedUsers, setFetchedUsers] = useState([])
	const [selectedVenue, setSelectedVenue] = useState('')
	const [selectedEventOrganizers, setSelectedEventOrgainizers] = useState([])

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
				console.log(responseData)
				console.log(fetchedVenues);
			  });
		  });
	  };

	  const fetchUsers = () => {
		firebase
		  .auth()
		  .currentUser.getIdTokenResult()
		  .then((tokenResponse) => {
			fetch(BASE_URL + "User/userlist", {
			  method: "GET",
			  headers: {
				Accept: "application/json",
				Authorization: `Bearer ${tokenResponse.token}`,
			  },
			})
			  .then((response) => response.json())
			  .then((responseData) => {
				setFetchedUsers(responseData);
				console.log(fetchedUsers);
			  });
		  });
	  };
	
	  useEffect(() => {
		fetchVenues(); 
		fetchUsers();
	  });

	const editEvent = async (event) => {
		event.preventDefault();
		const { eventName, eventStartDateTime, venueId } = event.target.elements;

		// Validation
		if (eventName.value === '' || eventStartDateTime.value === '' || selectedVenue === '') {
			setErrorMessage('Please fill all required fields.');
		} else if (
			eventName.value === event.eventName &&
			eventStartDateTime.value === event.eventStartDateTime &&
			selectedVenue === event.venue.venueId
		) {
			console.log(eventName.value)
			console.log(event.eventName)
			console.log(eventStartDateTime.value)
			console.log(event.eventStartDateTime)
			console.log(formDate)
			console.log(selectedVenue)
			//console.log(event.venue.venueId)
			setErrorMessage('No changes have been made');

		} else {
			console.log(eventName.value)
			console.log(event.eventName)
			console.log(eventStartDateTime.value)
			console.log(event.eventStartDateTime)
			console.log(formDate)
			console.log(selectedVenue)
			//console.log(event.venue.venueId)
			setErrorMessage('');

			let JWToken = await (
				await firebase.auth().currentUser.getIdTokenResult()).token;
			
				if (JWToken !== null) {
					const result = await fetch(BASE_URL + "Events/update/" + eventId, {
						method: "PUT",
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
					});
					if (result.status === 200) {
						window.location.href = "/"
					} else {
						alert("Error: Something went wrong, please try again");
			}
			document.getElementById('edit-event-form').reset();
					}
				}
		}

		const callbackFunction = (childData) => {
			//let venueId = childData.value;
			//setSelectedVenue(childData)
			console.log(childData)
			console.log(childData.value)
			console.log(selectedVenue)
			setSelectedVenue(1)
		}
	
		const callbackFunctionEOs = (childData) => {
			//let venueId = childData.value;
			//setSelectedVenue(childData)
			console.log(childData)
			console.log(childData.value)
			setSelectedEventOrgainizers(1)
		}

	const clearForm = (event) => {
		event.preventDefault();
		setEventName(event.eventName);
		setEventStartDateTime(event.eventStartDateTime);
		setVenueName(event.venueName);
		// document.getElementById('add-event-form').reset();
	};

	useEffect(() => {}, [ errorMessage ]);

	return (
		<div className="container">
			<h1 className="addEventTitle">Edit Event</h1>
			<div className="eventForm">
				<form onSubmit={editEvent} id="edit-event-form" className="addEventForm">
					<p className="form-error">{errorMessage}</p>
					<input
						onChange={(event) => {
							setEventName(event.target.value);
						}}
						value={eventName}
						name="eventName"
						type="text"
						placeholder="Title"
					/>
					<input
						onChange={(event) => {
							setEventStartDateTime(event.target.value);
						}}
						value={formDate}
						name="eventStartDateTime"
						type="date"
						placeholder="Start Date"
					/>
					<div className="input-selector">
						<VenueInputSelector data={fetchedVenues} parentCallback={callbackFunction} />
					</div>
					<div className="input-selector">
						<EventOrganizerInputSelector data={fetchedUsers} parentCallback={callbackFunctionEOs} />
					</div>
					<div className="buttons">
						<button className="submit" variant="" type="submit">
							Edit Event
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

export default EditEvent;
