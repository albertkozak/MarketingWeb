import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";

const ViewVendor = (props) => {
  const currentVendor = props.location.state.vendor;
  const id = currentVendor.vendorId;
  const [vendor, setVendor] = useState([]);

  const BASE_URL =
    "https://atackmarketingapi.azurewebsites.net/api/VendorManagement/";

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
            console.log(responseData);
            console.log(vendor);
          });
      });
  };

  useEffect(() => {
    fetchVendorDetails();
  });

  return (
    <div className="container">
      <div className="vendorWrapper">
        <div className="vendorHeader">
          <h2>{vendor.name}</h2>
        </div>
        <div className="edit-del-links">
          <Link
            to={{
              pathname: "/editvendor",
              state: { vendor, id },
            }}
          >
            {" "}
            <p className="edit">Edit Vendor</p>{" "}
          </Link>
          <Link
            to={{
              pathname: "/deletevendor",
              state: { vendor, id },
            }}
          >
            {" "}
            <p className="delete">Delete</p>{" "}
          </Link>
        </div>
        <div className="vendorContainer">
          <p className="description">{vendor.description}</p>
          <div className="vendorEmail">
            <a
              href={"mailto:" + vendor.email}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon className="email" icon={faEnvelope} />
              {vendor.email}
            </a>
          </div>
          <div className="vendorWebsite">
            <a href={vendor.website} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className="website" icon={faGlobe} />{" "}
              {vendor.website}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewVendor;
