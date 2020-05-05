import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import firebase from '../../firebase'
import { useHistory } from 'react-router-dom';

const EventVendorItem = (props) => {
	const vendor = props.vendor;
    const eventId= props.eventId
    const eventName = props.eventName
	const [isShown, setIsShown] = useState(false)
    const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/";
    const EVENTVENDOR_URL = BASE_URL + "EventVendor/remove/"
    const history = useHistory()
    
    async function removeEventVendor(event) {
		event.preventDefault();

        let JWToken = await firebase.auth().currentUser.getIdTokenResult();
    

			if (JWToken !== null) {
				const result = await fetch(EVENTVENDOR_URL + vendor.eventVendorId, {
					method: "DELETE",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Bearer ${JWToken.token}`
					},
					body: JSON.stringify({
                        deleteVendorString: eventName + " - " + vendor.vendorName
					})
				});
				if (result.status === 200) {
					await fetch(BASE_URL + `Events/${eventId}`, {
						METHOD: "GET",
						headers: {
						  Accept: "application/json",
						  "Content-Type": "application/json",
						  Authorization: `Bearer ${JWToken.token}`
						}
					  })
						.then(response => response.json())
						.then(
							props.handleChange,
							data => history.push("/event", { event: data }));
				} else {
					alert("Error: Something went wrong, please try again")
				} 
			}
	}

	return (
        <div 
            className="eventVendorItem"
            onMouseEnter={() => setIsShown(true)}
			onMouseLeave={() => setIsShown(false)}
        >
			<p className="vendorName">{vendor.vendorName}</p>
            {
				isShown && (
					<FontAwesomeIcon 
						className="delete" 
						icon={faTimes}
						onClick={removeEventVendor, props.handleChange}
						/>
				)
			}
			
		</div>
	);
};

export default EventVendorItem;
