import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import firebase from '../firebase'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const ViewVenue = (props) => {
    const currentVenue = props.location.state.venue;
    const id = currentVenue.venueId
    const [venue, setVenue] = useState([])

    const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/Venues"

    const fetchVenueDetails = () => {
		firebase
		  .auth()
		  .currentUser.getIdTokenResult()
		  .then((tokenResponse) => {
			fetch(BASE_URL + "/" + id, {
			  method: "GET",
			  headers: {
				Accept: "application/json",
				Authorization: `Bearer ${tokenResponse.token}`,
			  },
			})
			  .then((response) => response.json())
			  .then((responseData) => {
				setVenue(responseData);
			  });
		  });
	  };

	  useEffect(() => {
		fetchVenueDetails();
	  });
	
	return (
		<div className="container">
			<div className="venueWrapper">
				<div className="venueHeader">
					<h2>{venue.venueName}</h2>
				</div>
				<div className="edit-del-links">
				<Link
					to={{
						pathname: '/editvenue',
						state: { venue, id }
					}}
				> <p className="edit">Edit Venue</p> </Link>
				<Link
					to={{
						pathname: '/deletevenue',
						state: { venue, id }
					}}
				> <p className="delete">Delete</p> </Link>
				 </div>
                <div className="venueWebsite">
                <a href={venue.venueWebsite} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon
            		className="website"
            		icon={faGlobe}
          		/> {venue.website}</a>
				</div>
				</div>
			</div>
	);
};

export default ViewVenue;
