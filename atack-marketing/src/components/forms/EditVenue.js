import React, { useState, useEffect } from 'react';
import firebase from '../../firebase'

const EditVenue = (props) => {
	const venue = props.location.state.venue;
	const eventId = props.location.state.id
	const id = venue.venueId;
    const [venueName, setVenueName] = useState(venue.venueName)
    const [website, setWebsite] = useState(venue.website)
	const [errorMessage, setErrorMessage] = useState("")
	const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/Venues/update/"
	
	const editVenue = async (event) => {
		event.preventDefault();
        const { venueName, website } = event.target.elements;
        
        // Validation
        if (venueName.value === "" || website.value === "") {
            setErrorMessage("Please fill all required fields")
        } else if (
            venueName.value === venue.venueName &&
            website.value === venue.website
        ) {
            setErrorMessage("No changes have been made")
        } else {
			setErrorMessage("")
			
			let JWToken = await (
				await firebase.auth().currentUser.getIdTokenResult()).token;

				if(JWToken !== null) {
					const result = await fetch (BASE_URL + id, {
						method: "PUT",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
							Authorization: `Bearer ${JWToken}`
						},
						body: JSON.stringify({
							venueName: venueName.value,
							website: website.value
						})
					});
					if (result.status === 200) {
						window.location.href = "/"
					} else {
						alert("Error: Something went wrong, please try again");
			}
			document.getElementById('edit-venue-form').reset();
					}
				}
		}

	const clearForm = (event) => {
		event.preventDefault();
        setVenueName(venue.venueName)
        setWebsite(venue.website)
    };
    
    useEffect(() => {}, [errorMessage])

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
