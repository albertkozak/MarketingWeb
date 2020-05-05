import React, { useState, useEffect } from 'react';
import VendorInputSelector from './VendorInputSelector';
import firebase from '../../firebase'
import { useHistory } from 'react-router-dom';

const AddEventVendor = (props) => {
    const eventId = props.location.state.currentEvent.eventId
    const eventName = props.location.state.currentEvent.eventName;
	const [selectedVendor, setSelectedVendor] = useState([])
    const [fetchedVendors, setFetchedVendors] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
	const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/"
    const history = useHistory()
    
    const getAllVendors = () => {
        firebase
		.auth()
		.currentUser.getIdTokenResult()
		.then((tokenResponse) => {
		  fetch(BASE_URL + "VendorManagement", {
			method: "GET",
			headers: {
			  Accept: "application/json",
			  Authorization: `Bearer ${tokenResponse.token}`,
			},
		  })
			.then((response) => response.json())
			.then((responseData) => {
			  setFetchedVendors(
				  responseData.map((vendor, index) => ({
					  value: vendor.vendorId,
					  label: vendor.name
				  })));
			  console.log(responseData)
			  console.log(fetchedVendors);
			});
		});
        
	}   

	useEffect(() => {
    	getAllVendors();
    });

    async function addVendors(event) {
		event.preventDefault();

		//Validate
		if (selectedVendor.length === 0 ) {
			setErrorMessage("Please select a vendor.")
		} else {
			setErrorMessage("")

			let JWToken = await firebase.auth().currentUser.getIdTokenResult();

			if (JWToken !== null) {
				const result = await fetch(BASE_URL + "EventVendor/add", {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Bearer ${JWToken.token}`
					},
					body: JSON.stringify({
						eventId: eventId,
						vendorId: selectedVendor[0].value
					})
				});
				if (result.status === 201) {
					await fetch(BASE_URL + `Events/${eventId}`, {
						METHOD: "GET",
						headers: {
						  Accept: "application/json",
						  "Content-Type": "application/json",
						  Authorization: `Bearer ${JWToken.token}`
						}
					  })
						.then(response => response.json())
						.then(data => history.push("/event", { event: data }));
				} else if (result.status === 400 ){
					setErrorMessage("User is already an event organizer for this event.")
				} else if (result.status === 403 ){
					setErrorMessage("User cannot be added as an event organizer at this time")
				} else if (result.status === 400 ){
					setErrorMessage("User is already an event organizer for this event.")
				} else {
					alert("Error: Something went wrong, please try again")
				}
				}
			}
		}

    function handleVendorSelect(selection) {
        setSelectedVendor(selection)
    }

    function cancelButton(event) {
        event.preventDefault();
        history.goBack();
      }
    
    return (
		<div className="container">
			<h1>Vendors for {eventName}</h1>
			<p className="form-error">{errorMessage}</p>
			<div className="input-selector">
				<VendorInputSelector 
					options={fetchedVendors}
					values={selectedVendor}
					handleEOSelect={handleVendorSelect}
				/>
			</div>
			 <div className="buttons">
            <button className="submit" onClick={addVendors} >
              Add Vendors
            </button>
            <button className="cancel" onClick={cancelButton}>
              Cancel
            </button>
          </div>
           
		</div>

	);
};

export default AddEventVendor;