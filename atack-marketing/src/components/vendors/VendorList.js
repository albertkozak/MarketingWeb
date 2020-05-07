import React, { useState, useEffect } from "react";
import VendorItem from "./VendorItem";
import firebase from "../../firebase";
import SearchBar from "../SearchBar";

const VendorList = () => {
  const BASE_URL =
    "https://atackmarketingapi.azurewebsites.net/api/VendorManagement";
  const [fetchedVendors, setFetchedVendors] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedVendors, setSearchedVendors] = useState("");

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
        setSearchedVendors(
          fetchedVendors.filter((vendor) => {
            return vendor.name.toLowerCase().includes(search.toLowerCase());
          })
        );
      });
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  let vendorData;
  if (search.length === 0) {
    vendorData = fetchedVendors;
  } else {
    vendorData = searchedVendors;
  }

  return (
    <div className="wrapper">
      <SearchBar
        search={search}
        onTermChange={(newSearch) => setSearch(newSearch)}
        onTermSubmit={() => fetchVendors()}
      />
      {vendorData.map((vendor) => (
        <VendorItem key={vendor.id} vendor={vendor} />
      ))}
    </div>
  );
};

export default VendorList;
