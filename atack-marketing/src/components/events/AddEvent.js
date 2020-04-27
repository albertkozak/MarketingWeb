import React from 'react'
import VenueInputSelector from '../forms/VenueInputSelector'

const AddEvent = () => {
    // Add GET Request here for Vendors
    const dummyData = [
        {
            venueId: 1,
            venueName: "Rogers Arena",
            website: "https://rogersarena.com/"
        },
        {
            venueId: 2,
            venueName: "Vancouver Convention Centre",
            website: "https://www.vancouverconventioncentre.com/"
        },
    ]

    const createEvent = async event => {
        event.preventDefault();
        const { eventName, eventStartDateTime, venueName } = event.target.elements;

        // Add POST Request here
        alert(`POST-request: ${eventName.value} ${eventStartDateTime.value} ${venueName}`)

    };

    const clearForm = event => {
        event.preventDefault();
        document.getElementById("add-event-form").reset()
    };

    return (
        <div className="container">
            <h1 className="addEventTitle">Add Event</h1>
        <div className="eventForm">
            <form onSubmit={createEvent} id="add-event-form" className="addEventForm">
                <input name="eventName" type="text" placeholder="Title" />
                <input name="eventStartDateTime" type="date" placeholder="Start Date" />
                <div className="input-selector">
                <VenueInputSelector 
                    data={dummyData} />
                </div>
                <div className="buttons">
                <button className="cancel" onClick={clearForm}>Cancel</button>
                <button className="submit" variant="" type="submit">Add Event</button>
                </div>
            </form>
        </div>
        </div>
    )
    
}

export default AddEvent;