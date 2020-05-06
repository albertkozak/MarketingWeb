import React, { useState, useEffect } from 'react';
import VenueItem from './VenueItem';
import firebase from "../../firebase";

const VendorList = (props) => {
	const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/"
	const [ fetchedVenues, setFetchedVenues] = useState([]);

	function fetchVenues() {
        firebase
          .auth()
          .currentUser.getIdTokenResult()
          .then(tokenResponse => {
            fetch(BASE_URL + "Venues", {
              method: "GET",
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${tokenResponse.token}`
              }
            })
              .then(response => response.json())
              .then(responseData => {
                setFetchedVenues(responseData)
                });
            });
        };
    
      useEffect(() => {
        fetchVenues();
      }, []);

	return <div className="wrapper">{fetchedVenues.map((venue) => <VenueItem key={venue.venueid} venue={venue} />)}</div>;
};

export default VendorList;
