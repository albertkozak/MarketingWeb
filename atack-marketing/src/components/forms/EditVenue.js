import React, { useState, useEffect } from 'react';
import firebase from '../../firebase'
import { useHistory } from "react-router-dom";

const EditVenue = (props) => {
	//const venue = props.location.state.venue;
	// for passing to get back to previous selected event
	//const eventId = props.location.state.id
	//const id = venue.venueId;
	const [venueId, setVenueId] = useState(0)
    const [venueName, setVenueName] = useState([])
    const [website, setWebsite] = useState([])
	const [errorMessage, setErrorMessage] = useState("")
	const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/Venues/"
	const history = useHistory();

	useEffect(() => {
		if (props.location.state === undefined) {
			history.goBack()
		} else {
			let venue = props.location.state.venue;
			setVenueId(venue.venueId)
			setVenueName(venue.venueName)
			setWebsite(venue.website)
		}
	}, 
	[errorMessage])
	
	const editVenue = async (event) => {
		event.preventDefault();
		//const { venueName, website } = event.target.elements;
		
		//Clean
		var venueNameTrimmed = venueName.trim()
		var websiteTrimmed = website.trim()
        
        // Validation
        if (venueNameTrimmed === "" || websiteTrimmed === "") {
            setErrorMessage("Please fill all required fields")
        } else {
			setErrorMessage("")
			
			let JWToken = await (
				await firebase.auth().currentUser.getIdTokenResult()).token;

				if(JWToken !== null) {
					const result = await fetch (BASE_URL + "update/" + venueId, {
						method: "PUT",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
							Authorization: `Bearer ${JWToken}`
						},
						body: JSON.stringify({
							venueName: venueNameTrimmed,
							website: websiteTrimmed
						})
					});
					console.log(BASE_URL)
					if (result.status === 200) {
						await fetch(BASE_URL + venueId, {
							METHOD: "GET",
							headers: {
							  Accept: "application/json",
							  "Content-Type": "application/json",
							  Authorization: `Bearer ${JWToken}`
							}
						  })
							.then(response => response.json())
							.then(data => history.push("/viewvenue", { venue: data }));
					} else {
						alert("Error: Something went wrong, please try again");
			}
					}
				}
		}

	const clearForm = (event) => {
		event.preventDefault();
		history.goBack();
        // setVenueName(venue.venueName)
        // setWebsite(venue.website)
    };

	return (
		<div className="container">
			<h1 className="addVenueName">Edit Venue</h1>
			<div className="venueForm">
				<form onSubmit={editVenue} id="edit-venue-form" className="addVenueForm">
                <p className="form-error">{errorMessage}</p>
					<input onChange={event => { setVenueName(event.target.value)}} value={venueName} name="venueName" type="text" placeholder="Venue Name"  />
					<input onChange={event => { setWebsite(event.target.value)}} value={website} name="website" type="text" placeholder="Website" />
					<div className="buttons">
						<button className="submit" variant="" type="submit">
							Edit Venue
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

export default EditVenue;
