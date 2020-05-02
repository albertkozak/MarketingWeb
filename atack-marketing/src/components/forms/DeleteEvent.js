import React from 'react';
import { Link, withRouter } from "react-router-dom";
import firebase from '../../firebase'
import { useHistory } from 'react-router-dom';

const DeleteEvent = (props) => {
    const currentEvent = props.location.state.currentEvent;

const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/"

	const deleteEvent = async event => {
		let JWToken = await (await firebase.auth().currentUser.getIdTokenResult()).token;

		if (JWToken !== null) {
			const id = currentEvent.eventId;
			const result = await fetch(BASE_URL + "Events/remove/" + id, {
				method: "DELETE",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${JWToken}`
                },
                body: JSON.stringify({
                    deleteConfirmation: "ConfirmDELETE - " + currentEvent.eventName
                })
			});
			if (result.status === 200) {
				window.location.href = "/"
			} else {
				alert("Error: Something went wrong, please try again")
			}
		}
    };

    return (
<div className="container">
			<h1 className="addEventTitle">Are you sure you want to delete this event?</h1>
			<div className="eventForm">
					<input
						placeholder={currentEvent.eventName}
					/>
					<input
						placeholder={currentEvent.eventStartDateTime}
					/>
					<div className="input-selector">
                        <p clasName="venue">
                            {currentEvent.venue.venueName}
                        </p>
						{/* <VenueInputSelector data={fetchedVenues} parentCallback={callbackFunction} /> */}
					</div>
					{/* <div className="input-selector">
						<EventOrganizerInputSelector data={fetchedUsers} parentCallback={callbackFunctionEOs} />
					</div> */}
					<div className="buttons">
						<button className="cancel" onClick={deleteEvent}>
							Delete
						</button>
                        <Link to="/">
						<button className="submit" variant="" type="submit">
							Cancel
						</button>
                        </Link>
					</div>
			</div>
		</div>
    )
    
}

export default DeleteEvent