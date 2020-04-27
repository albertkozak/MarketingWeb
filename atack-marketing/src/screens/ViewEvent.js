import React from 'react';
import EventList from '../components/events/EventList'
import { useHistory } from 'react-router-dom';

const ViewEvent = (props) => {
    const history = useHistory();

    // Add GET requests for Event Organizers & Vendors here

    const dummyDataEO = [
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
        },
    ]

    const dummyDataV = [
        {
            eventVendorId: 1,
            vendorId: 7,
            vendorName: '711'
        },
        {
            eventVendorId: 2,
            vendorId: 2,
            vendorName: 'Amazon'
        },
        {
            eventVendorId: 3,
            vendorId: 7,
            vendorName: 'Microsoft'
        },
    ]
    
	return (
		<div className="container">
            <h2>{props.eventName}</h2>
            <p>{props.eventStartDateTime}</p>
            <p className="edit-del-links">Edit / Delete</p>
            <p className="venue">{props.venueName}</p>
            <div className="eventOrganziersContainer">
            <h3 className="eventOrganizers">Event Organizers</h3>
            <ul className="eventOrganizersList">
            {dummyDataEO.map (eventOrganizer => (
            <li key={eventOrganizer.eventOrganizerId}>
                {eventOrganizer.userEmail}
            </li>
           ))}
            </ul>
            </div>
            <div className="eventVendorsContainer">
            <h3 className="eventVendors">Event Vendors</h3>
            <ul className="eventVendorsList">
            {dummyDataV.map (vendor => (
            <li key={vendor.eventVendorId}>
                {vendor.vendorName}
            </li>
           ))}
            </ul>
            </div>
            <button
				className="addVendorButton"
				//onClick={() => history.push('/addvendor')}
			>Add Vendor
			</button> 
		</div>
	);
};

export default ViewEvent;