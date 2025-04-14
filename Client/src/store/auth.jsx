import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //state variable create to get token from localstorage which name is token
  const [token, setToken] = useState(localStorage.getItem("token"));

  //fun that used to store Json web token in local storage (when login or register)
  const storeJWTinLS = (serverToken) => {
    setToken(serverToken); //after login / register token variable store that token  , so this component render again and isLoggedIn value true
    return localStorage.setItem("token", serverToken);
  };

  // variable that store boolean value of token (true , false), that help to show in navbar which link show login or logout
  const isLoggedIn = !!token; //we can also use :-  Boolean(token)
  console.log("is logged in ?", isLoggedIn);

  //fun for logout functionality
  const LogoutUser = () => {
    setToken(""); // token is empty
    return localStorage.removeItem("token"); //token remove from local storage
  };

  return (
    <AuthContext.Provider value={{ storeJWTinLS, LogoutUser, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook create for consumer
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  //else
  return authContextValue;
};
