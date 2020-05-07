import React, { useState, useEffect } from "react";
import VenueItem from "./VenueItem";
import firebase from "../../firebase";
import SearchBar from "../SearchBar";

const VenueList = () => {
  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/";
  const [fetchedVenues, setFetchedVenues] = useState([]);
  const [search, setSearch] = useState("");

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
      });
  }

  useEffect(() => {
    fetchVenues();
  }, []);

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
      {fetchedVenues.length === 0 ? (
        <p>There are no venues at this time.</p>
      ) : (
        <div>
          {fetchedVenues
            .filter((venue) =>
              venue.venueName.toLowerCase().includes(search.toLowerCase())
            )
            .map((venue) => (
              <VenueItem key={venue.venueid} venue={venue} />
            ))}
        </div>
      )}
    </div>
  );
};

export default VenueList;
