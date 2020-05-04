import React, { useState, useEffect } from 'react';
import firebase from '../../firebase'

const EditVendor = (props) => {
	const vendor = props.location.state.vendor;
	const id = props.location.state.id;
	const [ name, setName ] = useState(vendor.name);
	const [ description, setDescription ] = useState(vendor.description);
	const [ email, setEmail ] = useState(vendor.email);
	const [ website, setWebsite ] = useState(vendor.website);
	const [ errorMessage, setErrorMessage ] = useState('');

	const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/VendorManagement/"

	const editVendor = async (event) => {
		event.preventDefault();
		const { name, description, email, website } = event.target.elements;

		// Validation
		if (name.value === '') {
			setErrorMessage('Please fill all required fields');
		} else if (
			name.value === vendor.name &&
			description.value === vendor.description &&
			email.value === vendor.email &&
			website.value === vendor.website
		) {
			setErrorMessage('No changes have been made');
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
							name: name.value,
							description: description.value,
							email: email.value,
							website: website.value
						})
					});
					if (result.status === 200) {
						window.location.href = "/vendors"
					} else {
						alert("Error: Something went wrong, please try again");
			}
			document.getElementById('edit-vendor-form').reset();
					}
				}
		}

	const clearForm = (vendor) => {
		vendor.preventDefault();
		setName(vendor.name);
		setDescription(vendor.description);
		setEmail(vendor.email);
		setWebsite(vendor.website);
	};

	useEffect(() => {}, [ errorMessage ]);

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
