import React, { useState, useEffect } from 'react';
import firebase from '../../firebase'
import { useHistory } from "react-router-dom";

const EditVendor = (props) => {
	// const vendor = props.location.state.vendor;
	// const id = props.location.state.id;
	const [id, setId]= useState(0)
	const [ name, setName ] = useState([]);
	const [ description, setDescription ] = useState([]);
	const [ email, setEmail ] = useState([]);
	const [ website, setWebsite ] = useState([]);
	const [ errorMessage, setErrorMessage ] = useState('');
	const history = useHistory();

	const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/VendorManagement/"

	useEffect(() => {
		if (props.location.state === undefined) {
			history.goBack()
		} else {
			let vendor = props.location.state.vendor;
			let id = props.location.state.id
			setId(id)
			setName(vendor.name)
			setDescription(vendor.description)
			setEmail(vendor.email)
			setWebsite(vendor.website)
		}
	}, 
	[errorMessage])

	const editVendor = async (event) => {
		event.preventDefault();
		// const { name, description, email, website } = event.target.elements;

		//Clean
		var nameTrimmed = name.trim()
		var descriptionTrimmed = description.trim()
		var emailTrimmed = email.trim()
		var websiteTrimmed = website.trim()

		// Validation
		if (nameTrimmed === '') {
			setErrorMessage('Please fill all required fields');
		} else {
			setErrorMessage('');

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
							name: nameTrimmed,
							description: descriptionTrimmed,
							email: emailTrimmed,
							website: websiteTrimmed,
						})
					});
					if (result.status === 200) {
						await fetch(BASE_URL + id, {
							METHOD: "GET",
							headers: {
							  Accept: "application/json",
							  "Content-Type": "application/json",
							  Authorization: `Bearer ${JWToken}`
							}
						  })
							.then(response => response.json())
							.then(data => history.push("/viewvendor", { vendor: data }));
					} else {
						alert("Error: Something went wrong, please try again");
			}
					}
				}
		}

	const clearForm = (event) => {
		event.preventDefault();
		history.goBack();
		// setName(vendor.name);
		// setDescription(vendor.description);
		// setEmail(vendor.email);
		// setWebsite(vendor.website);
	};

	return (
		<div className="container">
			<h1 className="addVendorName">Edit Vendor</h1>
			<div className="vendorForm">
				<form onSubmit={editVendor} id="edit-vendor-form" className="addVendorForm">
					<p className="form-error">{errorMessage}</p>
					<input
						onChange={(event) => {
							setName(event.target.value);
						}}
						value={name}
						name="name"
						type="text"
						placeholder="Vendor"
					/>
					<input
						onChange={(event) => {
							setDescription(event.target.value);
						}}
						value={description}
						name="description"
						type="text"
						placeholder="Description"
					/>
					<input
						onChange={(event) => {
							setEmail(event.target.value);
						}}
						value={email}
						name="email"
						type="text"
						placeholder="Email"
					/>
					<input
						onChange={(event) => {
							setWebsite(event.target.value);
						}}
						value={website}
						name="website"
						type="text"
						placeholder="Website"
					/>
					<div className="buttons">
						<button className="submit" variant="" type="submit">
							Edit Vendor
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

export default EditVendor;
