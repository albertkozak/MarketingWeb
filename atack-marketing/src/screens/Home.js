import React, { useState, useEffect } from "react";
import EventList from "../components/events/EventList";
import { useHistory } from "react-router-dom";

const Home = (props) => {
  const history = useHistory();
  const user = props.user
  const isAdmin = user.isAdmin;
  const isEO = user.isEventOrganizer;
  const isVendor = user.isVendor
  console.log(isAdmin)

  return (
    <div className="container">
      <button className="eventButton" onClick={() => history.push("/addevent")}>
        Create Event
      </button>
      <EventList user={user} isAdmin={isAdmin} isEO={isEO} isVendor={isVendor} />
    </div>
  );
};

export default Home;