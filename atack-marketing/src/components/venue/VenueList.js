import React, { useState, useEffect } from "react";
import VenueItem from "./VenueItem";
import firebase from "../../firebase";
import SearchBar from "../SearchBar";

const VenueList = (props) => {
  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/";
  const [fetchedVenues, setFetchedVenues] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedVenues, setSearchedVenues] = useState("");

  function fetchVenues() {
    firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then((tokenResponse) => {
        fetch(BASE_URL + "Venues", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenResponse.token}`,
          },
        })
          .then((response) => response.json())
          .then((responseData) => {
            setFetchedVenues(responseData);
          });
        setSearchedVenues(
          fetchedVenues.filter((venue) => {
            return venue.venueName.toLowerCase().includes(search.toLowerCase());
          })
        );
      });
  }

  useEffect(() => {
    fetchVenues();
  }, []);

  let venueData;
  if (search.length === 0) {
    venueData = fetchedVenues;
  } else {
    venueData = searchedVenues;
  }

  return (
    <div className="wrapper">
      <SearchBar
        search={search}
        onTermChange={(newSearch) => setSearch(newSearch)}
        onTermSubmit={() => fetchVenues()}
      />
      {venueData.map((venue) => (
        <VenueItem key={venue.venueid} venue={venue} />
      ))}
    </div>
  );
};

export default VenueList;
