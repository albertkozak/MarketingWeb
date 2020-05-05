import React, { useState, useEffect } from 'react';
import EventOrganizerInputSelector from './EventOrganizerInputSelector';
import firebase from '../../firebase'
import EventOrganizerItem from '../eventOrganizers/EventOrganizerItem'

const EditEventOrganizers = (props) => {
    const currentEos = props.location.state.fetchedEos;
    const eventId = props.location.state.currentEvent.eventId
    const eventName = props.location.state.currentEvent.eventName;
    const [ eosAdd, setEosAdd ] = useState([]);
    const [ eosRemove, setEosRemove ] = useState([]);
    const [allEos, setAllEos] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/"
    
    const getAllEOs = () => {
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
			  setAllEos(responseData);
			  console.log(allEos);
			});
		});
        
	}   
	        useEffect(() => {
            getAllEOs();
          });

	return (
		<div className="container">
			<h1>Event Organizers for {eventName}</h1>
			{/* <div className="input-selector">
				<EventOrganizerInputSelector data={allEos} />
			</div> */}
			{eosAdd.length === 0 ? (
				<p className="nullText">No Event Organizers have been added yet.</p>
			) : (
				<ul className="eventOrganizersList">
				{eosAdd.map((eo) => (
					<EventOrganizerItem key={eo.eventOrganizerId} eo={eo} />
				))}</ul>
			)}
           
		</div>
	);
};

export default EditEventOrganizers;
