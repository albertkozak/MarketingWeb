import React from 'react';
const VendorDetailProduct = (props) => {
	const product = props.product;
	const vendor = props.vendorDetails;

	return (
		<div>
			{/* <h1> {vendor.vendorName}</h1>
			<p> {vendor.description}</p>
			<p>{vendor.email}</p>
			<a href={vendor.website} /> */}
			<ul>
				<li>{product.productName}</li>
				<li>Price: ${product.productPrice}</li>
			</ul>
		</div>
	);
};
export default VendorDetailProduct;
