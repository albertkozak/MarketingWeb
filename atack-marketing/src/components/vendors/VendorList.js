import React, { useState, useEffect } from 'react';
import VendorItem from './VendorItem';
import firebase from "../../firebase";

const VendorList = (props) => {
	const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/VendorManagement"
	const [ fetchedVendors, setFetchedVendors] = useState([]);

	// const dummyData = [
	// 	{
	// 		name: '7-11',
	// 		description: 'Cheap Coffee Haven',
	// 		email: '711@711.com',
	// 		website: 'www.711.com'
	// 	},
	// 	{
	// 		name: 'Audi Canada',
	// 		description: 'Das Auto',
	// 		email: 'audi@audicanada.ca',
	// 		website: 'www.audi.ca'
	// 	}
	// ];

	// Add GET Request here

	const fetchVendors = () => {
		firebase
		  .auth()
		  .currentUser.getIdTokenResult()
		  .then((tokenResponse) => {
			fetch(BASE_URL, {
			  method: "GET",
			  headers: {
				Accept: "application/json",
				Authorization: `Bearer ${tokenResponse.token}`,
			  },
			})
			  .then((response) => response.json())
			  .then((responseData) => {
				setFetchedVendors(responseData);
				console.log(responseData)
				console.log(fetchedVendors);
			  });
		  });
	  };

	  useEffect(() => {
		fetchVendors();
	  }, []);

	return <div className="wrapper">{fetchedVendors.map((vendor) => <VendorItem key={vendor.id} vendor={vendor} />)}</div>;
};

export default VendorList;
