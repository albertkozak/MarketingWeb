import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUserPlus , faBoxOpen} from "@fortawesome/free-solid-svg-icons";
import firebase from '../../firebase'
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";

const EventVendorItem = (props) => {
	const vendor = props.vendor;
	const eventVendorId = vendor.eventVendorId
	const vendorName = vendor.vendorName
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
					props.handleChange()
				} else if (result.status === 400) {
					alert("The vendor cannot be removed from the event")
				} else {
					alert("Error: Something went wrong, please try again")
					console.log(result.status)
				} 
			}
	}

	return (
		<div className="eventVendor">
		<div 
            className="eventVendorItem"
            onMouseEnter={() => setIsShown(true)}
			onMouseLeave={() => setIsShown(false)}
        >
				
				<p className="vendorName">{vendor.vendorName}</p>
            {
				isShown && (
					<div className="icons">
						<Link
							to={{
								pathname: '/addeventvendoruser',
								state: { 
									eventVendorId, vendorName, 
									eventName }
							}}
						>
							<FontAwesomeIcon
							className="addUser"
							icon={faUserPlus}
							/>
						</Link>
						<FontAwesomeIcon 
							className="delete" 
							icon={faTimes}
							onClick={removeEventVendor}
						/>
						<Link to ={{
							pathname:'/vendordetailproductlist',
							state:{
								eventVendorId: eventVendorId,
							 eventId: eventId ,
							 eventName: eventName}
						
						}}
						>
						<FontAwesomeIcon
						className="Product"
						 icon={faBoxOpen}
						/>
						</Link>
						</div>
				)
			}
			
		</div>
			{/* add input here for users */}


		</div>
	);
};

export default EventVendorItem;
