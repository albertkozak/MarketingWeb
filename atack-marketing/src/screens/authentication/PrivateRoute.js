import React, { useContext, useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './Auth'
import firebase from '../../firebase'
import {BASE_URL} from '../../Config'

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = useContext(AuthContext);
    const [user, setUser] = useState([])
    const [isAdmin, setAdmin] = useState(false)
    const [isEO, setEO] = useState(false)
    const [isVendor, setVendor] = useState(false)

    let render = null;
    if(!currentUser) {
      render = <Redirect to={"/login"} />
    } 
    useEffect(() => {
      fetchUserRole();
    }, [])
  
    function fetchUserRole() {
      if(currentUser) {
      firebase
        .auth()
        .currentUser.getIdTokenResult()
        .then(tokenResponse => {
        fetch(BASE_URL + "/User", {
          method: "GET",
          headers: {
          Accept: "application/json",
          Authorization: `Bearer ${tokenResponse.token}`
          }
        })
          .then(response => response.json())
          .then(responseData => {
          setUser(responseData);
          setAdmin(responseData.isAdmin)
          setEO(responseData.isEventOrganizer)
          setVendor(responseData.isVendor)
          console.log(responseData);
          });
        });
      }
    }

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        render === null ? <RouteComponent {...routeProps} /> : render
      }
    />
  );
};

export default PrivateRoute;
