import React, { useState, useEffect } from "react";
import UserItem from "./UserItem";
import firebase from "../../firebase";
import SearchBar from "../SearchBar";

const UserList = () => {
  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/";
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedUsers, setSearchedUsers] = useState("");

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
              console.log(fetchedUsers);
            }
          });
        setSearchedUsers(
          fetchedUsers.filter((user) => {
            return user.email.toLowerCase().includes(search.toLowerCase());
          })
        );
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  let userData;
  if (search.length === 0) {
    userData = fetchedUsers;
  } else {
    userData = searchedUsers;
  }

  return (
    <div className="wrapper">
      <SearchBar
        search={search}
        onTermChange={(newSearch) => setSearch(newSearch)}
        onTermSubmit={() => fetchUsers()}
      />
      {userData.map((user) => (
        <UserItem key={user.email} user={user} />
      ))}
    </div>
  );
};

export default UserList;
