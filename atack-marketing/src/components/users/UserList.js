import React, { useState, useEffect } from "react";
import UserItem from "./UserItem";
import firebase from "../../firebase";
import SearchBar from "../SearchBar";

const UserList = (props) => {
  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/";
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = () => {
    firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then((tokenResponse) => {
        fetch(BASE_URL + "User/userlist", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenResponse.token}`,
          },
        })
          .then((response) => response.json())
          .then((responseData) => {
            if (responseData != null) {
              responseData.sort((a, b) => {
                return a.email.localeCompare(b.email);
              });
              setFetchedUsers(responseData);
            }
          });
      });
  };

  useEffect(() => {
    fetchUsers();
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
      {fetchedUsers.length === 0 ? (
        <p>There are no users at this time.</p>
      ) : (
        <div>
          {fetchedUsers
            .filter((user) =>
              user.email.toLowerCase().includes(search.toLowerCase())
            )
            .map((user) => (
              <UserItem key={user.email} user={user} />
            ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
