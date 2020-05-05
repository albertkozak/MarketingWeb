import React, { useState, useEffect } from 'react'
import firebase from '../../firebase';
import VendorDetailProduct from './VendorDetailProduct';

const VendorDetailProductList =(props)=>{
const BASE_URL ='https://atackmarketingapi.azurewebsites.net/api/Events/1/Vendors/1';
  const [fetchedData, setFetchedData] = useState([]);
  const [vendorDetails, setVendorDetails]= useState('');
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
                    })
                
			});
  };

  useEffect(() => {
		fetchData();
  }, []);
   return (
		<div className="productList">
			{/* <h3> {vendorDetails.vendorName}</h3>
			<p> {vendorDetails.description}</p>
			<p>{vendorDetails.email}</p>
			<a href={`${vendorDetails.website}`}>{vendorDetails.website}</a> */}
 
			{/* {vendorDetails.map((vendor) => (
				<VendorDetailProduct
					key={vendor.eventVendorId}
					vendor={vendor}
				/>
                
			))} */}
			{fetchedData.map((product) => (
				<VendorDetailProduct
					key={product.productId}
					product={product}
				/>
			))}
		</div>
   );
};


export default VendorDetailProductList;