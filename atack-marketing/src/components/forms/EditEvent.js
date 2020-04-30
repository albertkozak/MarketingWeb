import React, { useState } from 'react';
import VenueInputSelector from './VenueInputSelector';
import EventOrganizerInputSelector from './EventOrganizerInputSelector';

const EditEvent = (props) => {
	const event = props.location.state.event;
	const [ eventName, setEventName ] = useState(event.eventName);
	const [ eventStartDateTime, setEventStartDateTime ] = useState(event.eventStartDateTime);
	// Need to adjust selector form - pending
	const [ venueName, setVenueName ] = useState(event.venue.venueName);
	const [ errorMessage, setErrorMessage ] = useState('');
	// Add GET Request here for Venues & Event Organizers
	// const dummyDataVenues = [
	// 	{
	// 		venueId: 1,
	// 		venueName: 'Rogers Arena',
	// 		website: 'https://rogersarena.com/'
	// 	},
	// 	{
	// 		venueId: 2,
	// 		venueName: 'Vancouver Convention Centre',
	// 		website: 'https://www.vancouverconventioncentre.com/'
	// 	}
	// ];

	// const dummyDataEOs = [
	// 	{
	// 		eventOrganizerId: 1,
	// 		userId: 7,
	// 		userEmail: 'eventies@events.com'
	// 	},
	// 	{
	// 		eventOrganizerId: 2,
	// 		userId: 12,
	// 		userEmail: 'abc@123.com'
	// 	},
	// 	{
	// 		eventOrganizerId: 5,
	// 		userId: 198,
	// 		userEmail: 'whatisricebowl@wut.com'
	// 	}
	// ];

	const editEvent = async (event) => {
		event.preventDefault();
		const { eventName, eventStartDateTime, venueName } = event.target.elements;

		// Validation
		if (eventName.value === '' || eventStartDateTime.value === '' || venueName.value === '') {
			setErrorMessage('Please fill all required fields.');
		} else if (
			eventName === event.eventName &&
			eventStartDateTime.value === event.eventStartDateTime &&
			eventVenueName.value === event.venueName
		) {
			setErrorMessages('No changes have been made');
		} else {
			setErrorMessages('');
		}

		// Add POST Request here
		alert(`POST-request: ${eventName.value} ${eventStartDateTime.value} ${venueName}`);
	};

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
						value={eventStartDateTime}
						name="eventStartDateTime"
						type="date"
						placeholder="Start Date"
					/>
					<div className="input-selector">
						<VenueInputSelector data={dummyDataVenues} />
					</div>
					<div className="input-selector">
						<EventOrganizerInputSelector data={dummyDataEOs} />
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
