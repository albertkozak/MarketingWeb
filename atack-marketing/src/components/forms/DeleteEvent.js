import React from 'react';
import { Link, withRouter } from "react-router-dom";
import firebase from '../../firebase'
import { useHistory } from 'react-router-dom';

const DeleteEvent = (props) => {
    const currentEvent = props.location.state.currentEvent;
    const history = useHistory();

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
    <h1 className="addEventTitle">Delete {currentEvent.eventName}?</h1>
    <div className="eventForm">
            <form id="edit-event-form" className="addEventForm">
            <input
                        placeholder={currentEvent.eventName}
                    />
                    <input
                        placeholder={currentEvent.eventStartDateTime}
                    />
                    <input
                        placeholder={currentEvent.venue.venueName}
                    />

					<div className="buttons">
						<button className="submit" onClick={deleteEvent}>
							Delete
						</button>
                        <button className="cancel" variant="" type="submit" onClick={() => history.push('/')}>
                            Cancel
                        </button>

					</div>
                    </form>
			</div>
		</div>
    )
    
}

export default DeleteEvent