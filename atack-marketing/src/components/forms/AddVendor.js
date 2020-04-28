import React from 'react';

const AddVendor = () => {
	const createVendor = async (vendor) => {
		vendor.preventDefault();
		const { name, description, email, website } = vendor.target.elements;

		// Add POST Request here
		alert(`POST-request: ${name.value} ${description.value} ${email.value} ${website.value}`);
	};

	const clearForm = (vendor) => {
		vendor.preventDefault();
		document.getElementById('add-vendor-form').reset();
	};

	return (
		<div className="container">
			<h1 className="addVendorName">Add Vendor</h1>
			<div className="vendorForm">
				<form onSubmit={createVendor} id="add-vendor-form" className="addVendorForm">
					<input name="name" type="text" placeholder="Vendor Name" />
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
