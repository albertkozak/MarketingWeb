import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import firebase from "../firebase";
import EventOrganizerItem from "../components/eventOrganizers/EventOrganizerItem";
import EventVendorItem from "../components/eventVendor/EventVendorItem";
import * as moment from "moment-timezone";
import VendorDetailProductList from "../components/products/VendorDetailProductList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMapMarkerAlt, faGlobe } from "@fortawesome/free-solid-svg-icons";

const ViewEvent = (props) => {
  const currentEvent = props.location.state.event;
  const user = props.location.state.user;
  const venue = currentEvent.venue;
  const id = currentEvent.eventId;
  const [fetchedEOs, setFetchedEOs] = useState([]);
  const [fetchedVendors, setFetchedVendors] = useState([]);
  const [refreshComponent, setRefreshComponent] = useState(false);
  const [productVendor, setProductVendor] = useState(null);

  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/";
  const EO_URL = BASE_URL + "EventOrganizer/";
  const VENDOR_URL = BASE_URL + "Events/" + id;

  const [isAdmin, setIsAdmin] = useState(false)
  const [isEO, setIsEO] = useState(false)
  const [isVendor, setIsVendor] = useState(false)

  let history = useHistory();

  const renderScreen = () => {
    if(user.isAdmin) {
      setIsAdmin(true)
    } else if (user.isEventOrganizer) {
      setIsEO(true)
    } else if (user.isVendor) {
      setIsVendor(true)
    }
  }

  const fetchEOs = () => {
    // if(isAdmin || isEO ){
    firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then((tokenResponse) => {
        fetch(EO_URL + id, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenResponse.token}`,
          },
        })
          .then((response) => response.json())
          .then((responseData) => {
            setFetchedEOs(responseData.eventOrganizers);
          });
      });
  };
// }

  const fetchVendors = () => {
    // if(isAdmin || isEO ){
    firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then((tokenResponse) => {
        fetch(VENDOR_URL + "/Vendors", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenResponse.token}`,
          },
        })
          .then((response) => response.json())
          .then((responseData) => {
            setFetchedVendors(responseData.vendors);
          });
      });
  };
// }

  useEffect(() => {
    renderScreen();
    fetchEOs();
    fetchVendors();
    setRefreshComponent(false);
  }, [refreshComponent]);

  function handleChange() {
    setRefreshComponent(true);
  }

  function handleClickedProduct(product) {
    setProductVendor(product);
  }

  return (
    <div className="container">
      <div className="eventWrapper">
        <div className="eventHeader">
          <h2>{currentEvent.eventName}</h2>
          <div className="eventTime">
          <FontAwesomeIcon className="clock" icon={faClock} />
          <p>
            {moment
              .utc(currentEvent.eventStartDateTime)
              .local()
              .format("dddd, MMM DD YYYY @ hh:mm A")}
          </p>
          </div>
        </div>
        <div className="venueContainer">
          <div className="venueDetails">
            <div className="venueLocation">
            <FontAwesomeIcon className="location" icon={faMapMarkerAlt} />
            <p className="venue">{venue.venueName}</p>
            </div>
            <div className="venueLocation">
            <a
            href={venue.venueWebsite}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon className="website" icon={faGlobe} />{" "}
            {venue.website}
          </a>
            </div>
          </div>
        </div>
        {/*  */}
        {isAdmin && (
          <>
        <div className="edit-del-links">
          <Link
             to={{
              pathname: "/editEvent",
              state: { currentEvent },
            }}
          >
        {" "}
        <p className="edit">Edit Event</p>{" "}
        </Link>
    <Link
        to={{
          pathname: "/deleteEvent",
          state: { currentEvent },
        }}
    >
  {" "}
      <p className="delete">Delete</p>{" "}
      </Link>
        </div>

       
        <div className="eventDetailsWrapper">
          <div className="eventOrganziersContainer">
            <div className="containerHeading">
              <h3 className="eventOrganizers">Event Organizers</h3>
              <Link
                to={{
                  pathname: "/addeventorganizers",
                  state: { currentEvent, fetchedEOs },
                }}
              >
                <button className="addVendorButton">Add Organizer</button>
              </Link>
            </div>
            {fetchedEOs.length === 0 ? (
              <p className="nullText">
                No event organizers have been added yet.
              </p>
            ) : (
              <ul className="eventOrganizersList">
                {fetchedEOs.map((eo) => (
                  <EventOrganizerItem
                    key={eo.eventOrganizerId}
                    eo={eo}
                    eventId={id}
                    handleChange={handleChange}
                  />
                ))}
              </ul>
            )}
          </div>

          <div className="eventVendorsContainer">
            <div className="containerHeading">
              <h3 className="eventVendors">Event Vendors</h3>
              <Link
                to={{
                  pathname: "/addeventvendor",
                  state: { currentEvent, fetchedVendors },
                }}
              >
                <button className="addVendorButton">Add Vendor</button>
              </Link>
            </div>

            {fetchedVendors.length === 0 ? (
              <p>No Vendors have been added yet.</p>
            ) : (
              <ul className="eventVendorsList">
                {fetchedVendors.map((vendor) => (
                  <>
                    <EventVendorItem
                      key={vendor.eventVendorId}
                      vendor={vendor}
                      eventId={id}
                      eventName={currentEvent.eventName}
                      handleChange={handleChange}
                      handleClickedProduct={handleClickedProduct}
                    />
                  </>
                ))}
              </ul>
            )}
          </div>
        </div>
        </>
         )}
          {isEO && (
        <div className="eventDetailsWrapper">
          <div className="eventOrganziersContainer">
            <div className="containerHeading">
              <h3 className="eventOrganizers">Event Organizers</h3>
              <Link
                to={{
                  pathname: "/addeventorganizers",
                  state: { currentEvent, fetchedEOs },
                }}
              >
                <button className="addVendorButton">Add Organizer</button>
              </Link>
            </div>
            {fetchedEOs.length === 0 ? (
              <p className="nullText">
                No event organizers have been added yet.
              </p>
            ) : (
              <ul className="eventOrganizersList">
                {fetchedEOs.map((eo) => (
                  <EventOrganizerItem
                    key={eo.eventOrganizerId}
                    eo={eo}
                    eventId={id}
                    handleChange={handleChange}
                  />
                ))}
              </ul>
            )}
          </div>

          <div className="eventVendorsContainer">
            <div className="containerHeading">
              <h3 className="eventVendors">Event Vendors</h3>
              <Link
                to={{
                  pathname: "/addeventvendor",
                  state: { currentEvent, fetchedVendors },
                }}
              >
                <button className="addVendorButton">Add Vendor</button>
              </Link>
            </div>

            {fetchedVendors.length === 0 ? (
              <p>No Vendors have been added yet.</p>
            ) : (
              <ul className="eventVendorsList">
                {fetchedVendors.map((vendor) => (
                  <>
                    <EventVendorItem
                      key={vendor.eventVendorId}
                      vendor={vendor}
                      eventId={id}
                      eventName={currentEvent.eventName}
                      handleChange={handleChange}
                      handleClickedProduct={handleClickedProduct}
                    />
                  </>
                ))}
              </ul>
            )}
          </div>
        </div>

         )}
         {isVendor && (
        <div className="eventVendorWrapper">
          <div className="vendorProductListContainer">
            {/* <div className="containerHeading">
              <h3 className="eventVendorProducts">Event Products</h3>
              <Link
                to={{
                  pathname: "/addvendorproduct",
                  state: { currentEvent },
                }}
              >
                <button className="addProductButton">Add Products</button>
              </Link>
            </div> */}

            {/* {productVendor && ( */}
              <VendorDetailProductList 
                eventId={id}
                eventName={currentEvent.eventName}
                eventVendorId={14}
               />
            {/* )} */}
          </div>
          {/* <div className="qrGenerator">
            <button className="qrButton">Generate QR Code</button>
          </div> */}
        </div>
    )}
      </div>
    </div>
  );
};

export default ViewEvent;
