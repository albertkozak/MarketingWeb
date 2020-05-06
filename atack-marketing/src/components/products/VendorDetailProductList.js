import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import VendorDetailProduct from "./VendorDetailProduct";
import { QRCode } from "react-qr-svg";

const VendorDetailProductList = (props) => {
  const BASE_URL =
    "https://atackmarketingapi.azurewebsites.net/api/Events/1/Vendors/1";
  const [fetchedData, setFetchedData] = useState([]);
  const [vendorDetails, setVendorDetails] = useState("");
  const [eventInfo, setEventInfo] = useState(null);
  const fetchData = () => {
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
            setVendorDetails(responseData.vendor);
            setFetchedData(responseData.vendor.products);
            setEventInfo(responseData);
            console.log(responseData);
          });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
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
          <VendorDetailProduct key={product.productId} product={product} />
        ))}
      </div>
      <div className="qrGenerator">
        {eventInfo && (
          <QRCode
            level="Q"
            style={{ width: 256 }}
            value={JSON.stringify({
              eventVendorId: eventInfo.vendor.eventVendorId,
              vendorName: eventInfo.vendor.vendorName,
              eventId: eventInfo.eventId,
            })}
          />
        )}
      </div>
    </div>
  );
};

export default VendorDetailProductList;
