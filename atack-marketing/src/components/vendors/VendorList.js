import React, { useState, useEffect } from "react";
import VendorItem from "./VendorItem";
import firebase from "../../firebase";
import SearchBar from "../SearchBar";

const VendorList = () => {
  const BASE_URL =
    "https://atackmarketingapi.azurewebsites.net/api/VendorManagement";
  const [fetchedVendors, setFetchedVendors] = useState([]);
  const [search, setSearch] = useState("");
  // const [searchedVendors, setSearchedVendors] = useState("");

  const fetchVendors = () => {
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
            setFetchedVendors(responseData);
            console.log(responseData);
            console.log(fetchedVendors);
          });
        // setSearchedVendors(
        //   fetchedVendors.filter((vendor) => {
        //     return vendor.name.toLowerCase().includes(search.toLowerCase());
        //   })
        // );
      });
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  // let vendorData;
  // if (search.length === 0) {
  //   vendorData = fetchedVendors;
  // } else {
  //   vendorData = searchedVendors;
  // }

  function handleSearchTerm(event) {
    setSearch(event.target.value);
  }

  return (
    <div className="wrapper">
      <SearchBar
        search={search}
        handleSearchTerm={(e) => handleSearchTerm(e)}
        value={search}
      />
      {fetchedVendors.length === 0 ? (
        <p>There are no vendors at this time.</p>
      ) : (
        <div>
          {fetchedVendors
            .filter((vendor) =>
              vendor.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((vendor) => (
              <VendorItem key={vendor.id} vendor={vendor} />
            ))}
        </div>
      )}
    </div>
  );
};

export default VendorList;
