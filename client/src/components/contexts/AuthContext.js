import React, { useEffect, useState } from "react";
import app from "../../firebase/config";

//2.
export const AuthContext = React.createContext();

//3.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    app.auth().onAuthStateChanged(user => {
      setUser(user)
      if(user)
        setSignedIn(true)
      else
        setSignedIn(false)
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, signedIn }}>{children}</AuthContext.Provider>
  );
};