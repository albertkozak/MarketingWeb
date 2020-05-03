import React, { useState } from 'react';
import firebase from '../../firebase'

const AddVendor = () => {
	const [errorMessage, setErrorMessage] = useState('')
	const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/VendorManagement/AddVendor"

	const createVendor = async (event) => {
		event.preventDefault();
		const { name, description, email, website } = event.target.elements;

		//Validation
		if (name.value === "") {
			setErrorMessage("Please fill all required fields")
		} else {
			setErrorMessage("")

			let JWToken = await (
				await firebase.auth().currentUser.getIdTokenResult()).token;
				if(JWToken !== null) {
					const result = await fetch(BASE_URL, {
						method: "POST",
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
					if (result.status === 201) {
						window.location.href="/vendors"
					} else if (result.status === 400) {
						alert("Vendor already exists")
					} else {
						alert("Error: Something went wrong, please try again");
					}
					document.getElementById('add-vendor-form').reset();
				}
		}
	};

	const clearForm = (event) => {
		event.preventDefault();
		document.getElementById('add-vendor-form').reset();
	};

	return (
		<div className="container">
			<h1 className="addVendorName">Add Vendor</h1>
			<div className="vendorForm">
			<p className="form-error">{errorMessage}</p>
				<form onSubmit={createVendor} id="add-vendor-form" className="addVendorForm">
					<input name="name" type="text" placeholder="Vendor" />
					<input name="description" type="text" placeholder="Description" />
					<input name="email" type="text" placeholder="Email" />
					<input name="website" type="text" placeholder="Website" />
					<div className="buttons">
						<button className="submit" variant="" type="submit">
							Add Vendor
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

export default AddVendor;
