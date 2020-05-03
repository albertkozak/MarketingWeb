import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link, withRouter } from "react-router-dom";
import firebase from '../firebase'

const ViewVendor = (props) => {
    const currentVendor = props.location.state.vendor;
    const id = currentVendor.vendorId
    const [vendor, setVendor] = useState([])
    let history = useHistory();

    const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/VendorManagement/"

    const fetchVendorDetails = () => {
		firebase
		  .auth()
		  .currentUser.getIdTokenResult()
		  .then((tokenResponse) => {
			fetch(BASE_URL + id, {
			  method: "GET",
			  headers: {
				Accept: "application/json",
				Authorization: `Bearer ${tokenResponse.token}`,
			  },
			})
			  .then((response) => response.json())
			  .then((responseData) => {
				setVendor(responseData);
				console.log(responseData)
				console.log(vendor);
			  });
		  });
	  };

	  useEffect(() => {
		fetchVendorDetails();
	  }, []);
	
	return (
		<div className="container">
			<div className="eventWrapper">
				<div className="eventHeader">
					<h2>{vendor.name}</h2>
				</div>
				<div className="edit-del-links">
				<Link
					to={{
						pathname: '/editVendor',
						state: { vendor }
					}}
				> <p className="edit">Edit Vendor</p> </Link>
				<Link
					to={{
						pathname: '/deleteVendor',
						state: { vendor }
					}}
				> <p className="delete">Delete</p> </Link>
				 </div>
				<div className="vendorContainer">
                <p className="description">{vendor.description}</p>
				<div className="vendorDetails">
				<p className="vendor">{vendor.email}</p>
				<p className="vendorWebsite">{vendor.description}</p>
				</div>
				</div>
			</div>
		</div>
	);
};

export default ViewVendor;
