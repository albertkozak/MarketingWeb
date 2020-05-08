import React, { useEffect, useState } from "react";
import firebase from "../../firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("Should We Check User?")
        if (user.emailVerified) {
          console.log("GUUCHI")
          setCurrentUser(user);
        } else {
          setCurrentUser(null)
        }
      }
    });
    setPending(false);
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
