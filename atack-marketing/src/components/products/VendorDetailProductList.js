import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
//import VendorDetailProduct from './VendorDetailProduct';
import { useHistory } from 'react-router-dom';
//import AddVendorProduct from '../forms/AddVendorProduct';
import currency from 'currency.js';

const VendorDetailProductList = (props) => {
	const eventId = props.location.state.eventId;
	const eventName = props.location.state.eventName;
	const eventVendorId = props.location.state.eventVendorId;
	const history = useHistory();

	const BASE_URL = `https://atackmarketingapi.azurewebsites.net/api/Events/${eventId}/Vendors/${eventVendorId}`;
	const ADDPRODUCT_URL = `https://atackmarketingapi.azurewebsites.net/api/EventVendor/${eventVendorId}/products/add`;
	const [fetchedData, setFetchedData] = useState([]);
	const [vendorDetails, setVendorDetails] = useState('');

	const fetchData = () => {
		firebase
			.auth()
			.currentUser.getIdTokenResult()
			.then((tokenResponse) => {
				fetch(BASE_URL, {
					method: 'GET',
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${tokenResponse.token}`,
					},
				})
					.then((response) => response.json())
					.then((responseData) => {
							setVendorDetails(responseData.vendor);
						setFetchedData(responseData.vendor.products);
						console.log(responseData.vendor);
					});
			});
	};

	useEffect(() => {
		fetchData();
	}, []);

	//const AddVendorProduct = () => {
	const createProduct = async (event) => {
		event.preventDefault();
		const { productName, productPrice } = event.target.elements;
		let JWToken = await firebase.auth().currentUser.getIdTokenResult();

		if (JWToken !== null) {
			const result = await fetch(ADDPRODUCT_URL, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${JWToken.token}`,
				},
				body: JSON.stringify({
					productName: productName.value,
					productPrice: currency(productPrice.value),
				}),
			});
			if (result.status === 201) {
				//history.push("/");
				console.log('succcess');
				fetchData();
				clearForm();
			} else {
				alert('Error: Something went wrong, please try again');
			}
		}
	};
	// Add POST Request here
	//	alert(
	//	`POST-request: ${productName.value} ${currency(
	//		productPrice.value
	//	)} `
	//);
	//};
	const clearForm = (event) => {
		//event.preventDefault();
		document.getElementById('add-product-form').reset();
	};
	const format = (amount) => {
		return Number(amount)
			.toFixed(2)
			.replace(/\d(?=(\d{3})+\.)/g, "$&,");
	};

	return (
		<>
			<div className="container">
				<h1 className="addProductTitle">Add Products</h1>
				<div>
					<form
						onSubmit={createProduct}
						id="add-product-form"
						className="addProductForm"
					>
						<input
							name="productName"
							type="text"
							placeholder="Product"
						/>
						<input
							name="productPrice"
							type="number"
							step=".01"
							min="0"
							placeholder="Price"
						/>

						<div className="buttons">
							<button className="submit" variant="" type="submit">
								Add Product
							</button>
							<button className="cancel" onClick={clearForm}>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
			<div className="productList">
				 <h3> {vendorDetails.vendorName}</h3>
				<h3>{eventName}</h3>
			{/* <p> {vendorDetails.description}</p>
			<p>{vendorDetails.email}</p>
			<a href={`${vendorDetails.website}`}>{vendorDetails.website}</a> */} 

				{/* {vendorDetails.map((vendor) => (
				<VendorDetailProduct
					key={vendor.eventVendorId}
					vendor={vendor}
				/>
                
			))} */}
				{/* {fetchedData.map((product) => (
					<VendorDetailProduct
						key={product.productId}
						product={product}
					/>
				))} */}
				<table className="productTable">
					<thead>
						<tr>
							<th>Product Name</th>
							<th>Product Price</th>
						</tr>
					</thead>
					<tbody>
						{fetchedData.map((product => (
							<tr key={product.productId}>
								<td>{product.productName}</td>
								<td>{"$" + format(product.productPrice)}</td>
							</tr>
						)))}
					</tbody>
					</table>
			</div>
		</>
	);
};

export default VendorDetailProductList;
