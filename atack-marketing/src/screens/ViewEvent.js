import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import firebase from '../firebase'
import EventOrganizerItem from '../components/eventOrganizers/EventOrganizerItem'
import EventVendorItem from '../components/eventVendor/EventVendorItem'
import * as moment from "moment-timezone";
import VendorDetailProductList from '../components/products/VendorDetailProductList'

const ViewEvent = (props) => {
	const currentEvent = props.location.state.event;
	const venue = currentEvent.venue
	const id = currentEvent.eventId
	const [fetchedEOs, setFetchedEOs] = useState([])
	const [fetchedVendors, setFetchedVendors] = useState([])
	const [refreshComponent, setRefreshComponent] = useState(false)

	const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/";
	const EO_URL = BASE_URL + "EventOrganizer/"
	const VENDOR_URL = BASE_URL + "Events/" + id;

	let history = useHistory();
	
	const fetchEOs = () => {
		firebase
		.auth()
		.currentUser.getIdTokenResult()
		.then((tokenResponse) => {
		  fetch(EO_URL + id, {
			method: "GET",
			headers: {
			  Accept: "application/json",
			  Authorization: `Bearer ${tokenResponse.token}`,
			},
		  })
			.then((response) => response.json())
			.then((responseData) => {
			  setFetchedEOs(responseData.eventOrganizers);
			});
		});
	};

	const fetchVendors = () => {
		firebase
		.auth()
		.currentUser.getIdTokenResult()
		.then((tokenResponse) => {
		  fetch(VENDOR_URL + "/Vendors", {
			method: "GET",
			headers: {
			  Accept: "application/json",
			  Authorization: `Bearer ${tokenResponse.token}`,
			},
		  })
			.then((response) => response.json())
			.then((responseData) => {
			  setFetchedVendors(responseData.vendors);
			});
		});
	};

	useEffect(() => {
		fetchEOs();
		fetchVendors();
	  }, []);

	return (
		<div className="container">
			<div className="eventWrapper">
				<div className="eventHeader">
					<h2>{currentEvent.eventName}</h2>
					<p>
            {moment
              .utc(currentEvent.eventStartDateTime)
              .local()
              .format("dddd, MMM DD YYYY @ hh:mm A")}
          </p>
				</div>
				<div className="venueContainer">
				<div className="venueDetails">
				<p className="venue">{venue.venueName}</p>
				<p className="venueWebsite">{venue.venueWebsite}</p>
				</div>
				<Link
        			to={{
          			pathname: "/editVenue",
          			state: { venue, id },
        			}}
      			><p className="editVenue">Edit Venue</p>
				</Link>
				</div>
				<div className="edit-del-links">
				<Link
					to={{
						pathname: '/editEvent',
						state: { currentEvent }
					}}
				> <p className="edit">Edit Event</p> </Link>
				<Link
					to={{
						pathname: '/deleteEvent',
						state: { currentEvent }
					}}
				> <p className="delete">Delete</p> </Link>
				 </div>
				<div className="eventDetailsWrapper">
					<div className="eventOrganziersContainer">
					<div className="containerHeading">
						<h3 className="eventOrganizers">Event Organizers</h3>
						<Link
        			to={{
          			pathname: "/addeventorganizers",
          			state: { currentEvent, fetchedEOs },
        			}}
      			>
					<button className="addVendorButton"
						>
						Add Organizer
					</button>
					</Link>
					</div>
							{fetchedEOs.length === 0 ? (
								<p className="nullText">No event organizers have been added yet.</p>
							): (
								<ul className="eventOrganizersList">
								{fetchedEOs.map((eo) => (
									<EventOrganizerItem 
									key={eo.eventOrganizerId} 
									eo={eo}
									eventId={id}
									 />
								))}
								</ul>
							)}
					</div>
					
					<div className="eventVendorsContainer">
						<div className="containerHeading">
						<h3 className="eventVendors">Event Vendors</h3>
						<Link
        			to={{
          			pathname: "/addeventvendor",
          			state: { currentEvent, fetchedVendors },
        			}}
      			>
					<button className="addVendorButton"
						>
						Add Vendor
					</button>
					</Link>
					</div>
					{fetchedVendors.length === 0 ? (
						<p>No Vendors have been added yet.</p>
					) : (
						<ul className="eventVendorsList">
						{fetchedVendors.map((vendor) => (
					<EventVendorItem
					key={vendor.eventVendorId} 
					vendor={vendor}
					eventId={id}
					eventName={currentEvent.eventName}
					 />
					))}
					</ul>
					)}
					</div>
				
					

				</div>
				<div className="eventVendorWrapper">
				<div className="vendorProductListContainer">
					<div className="containerHeading">
						<h3 className="eventVendorProducts">Event Products</h3>
						<Link
        					to={{
          					pathname: "/addvendorproduct",
          					state: { currentEvent },
        					}}
      					>
							<button className="addProductButton"
							>
								Add Products
							</button>
						</Link>
					</div>
					<VendorDetailProductList />
				</div>
				<div className="qrGenerator">
					<button className="qrButton">
						Generate QR Code
					</button>
				</div>
				</div>
			</div>
		</div>
	);
};

export default ViewEvent;
