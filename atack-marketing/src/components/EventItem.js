import React from 'react'

const EventItem = ({props}) => {
    return (
        <div className="eventItem">
            <h3 className="eventTitle">{props.event.evetName}</h3>
            <p className="eventStartDateTime">{props.event.eventStartDateTime}</p>
            {/* links for these */}
            <div className="edit-del-links">Edit / Delete</div>
        </div>

    )
}

export default EventItem;