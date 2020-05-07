import React, { useEffect, useState } from "react";
import firebase from "../../firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);


  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      //Snoop to find out if the email address is verified, if not then we
      //will ignore the firebase user object as they most likley have just
      //registered therefore block sign in
      if (user) {
        if (user.emailVerified) {
          setCurrentUser(user);
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
