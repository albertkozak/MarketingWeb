////this file can be deleted///

import React from 'react';
const VendorDetailProduct = (props) => {
	const product = props.product;
	const vendor = props.vendorDetails;

	return (
		<div className="product">
			{/* <h1> {vendor.vendorName}</h1>
			<p> {vendor.description}</p>
			<p>{vendor.email}</p>
			<a href={vendor.website} /> */}
			{/* <ul>
				<li className="productName">{product.productName}</li>
				<li className="price">Price: ${product.productPrice}</li>
			</ul> */}
			<table>
			
				<tbody>
					<tr>{product.productName}{product.productPrice}</tr>
				</tbody>

			</table>
				{/* <p className="productName">{product.productName}</p>
				<p className="price">Price: ${product.productPrice}</p> */}
		</div>
	);
};
export default VendorDetailProduct;
