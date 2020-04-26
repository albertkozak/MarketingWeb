import React from 'react'

const AddEvent = () => {
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
        <div className="eventForm">
            <form onSubmit={createEvent} id="add-event-form">
                <input name="eventName" type="text" placeholder="Title" />
                <input name="eventStartDateTime" type="date" placeholder="Start Date" />
                <button onClick={clearForm}>Cancel</button>
                <button variant="" type="submit">Create</button>
            </form>
        </div>
    )
    
}

export default AddEvent;