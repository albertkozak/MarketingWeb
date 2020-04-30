import React, { useState, useEffect } from 'react';

const EditVenue = (props) => {
    //const venueNameValue = props.venueName;
    const venue = props.location.state.venue;
    const [venueName, setVenueName] = useState(venue.venueName)
    const [venueWebsite, setVenueWebsite] = useState(venue.venueWebsite)
    const [errorMessage, setErrorMessage] = useState("")

	const editVenue = async (venue) => {
		venue.preventDefault();
        const { venueName, venueWebsite } = venue.target.elements;
        
        // Validation
        if (venueName.value === "") {
            setErrorMessage("Please fill all required fields")
        } else if (
            venueName.value === venue.venueName &&
            venueWebsite.value === venue.venueWebsite
        ) {
            setErrorMessage("No changes have been made")
        } else {
            setErrorMessage("")
        }

		// Add POST Request here
		alert(`POST-request: ${venueName.value} ${venueWebsite.value}`);
	};

	const clearForm = (event) => {
		event.preventDefault();
        //document.getElementById('add-venue-form').reset();
        setVenueName(venue.venueName)
        setVenueWebsite(venue.venueWebsite)
    };
    
    useEffect(() => {}, [errorMessage])

	return (
		<div className="container">
			<h1 className="addVenueName">Edit Venue</h1>
			<div className="venueForm">
				<form onSubmit={editVenue} id="edit-venue-form" className="addVenueForm">
                <p className="form-error">{errorMessage}</p>
					<input onChange={event => { setVenueName(event.target.value)}} value={venueName} name="venueName" type="text" placeholder="Venue Name" value={venueNameValue} />
					<input onChange={event => { setVenueWebsite(event.target.value)}} value={venueWebsite} name="venueWebsite" type="text" placeholder="Website" />
					<div className="buttons">
						<button className="submit" variant="" type="submit">
							Add Venue
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
