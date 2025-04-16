import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //state variable create to get token from localstorage which name is token
  const [token, setToken] = useState(localStorage.getItem("token")); // store jwt token
  const [user, setUser] = useState(null); // store user data after jwt verification

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
    setUser(null); // Clear user data on logout
    return localStorage.removeItem("token"); //token remove from local storage
  };

  //JWT Authentication :- to get the currently loggedIn user data
  const userAuthentication = async () => {
    try {
      if (!token || token === "") {
        setUser(null); // Clear user if no token
        return;
      }

      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, //token data pass to backend for verify
        },
      });

      if (response.ok) {
        const data = await response.json(); // response convert into json obj. format
        console.log("user data", data);
        setUser(data.msg);
      }
    } catch (error) {
      console.error("Error fetching user data", error);
      setUser(null); // Clear user if request fails
    }
  };

  useEffect(() => {
    userAuthentication(); // fun call
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ storeJWTinLS, LogoutUser, isLoggedIn, user }}
    >
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
