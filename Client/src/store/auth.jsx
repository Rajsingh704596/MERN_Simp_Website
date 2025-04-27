import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //state variable create to get token from localstorage which name is token
  const [token, setToken] = useState(localStorage.getItem("token")); // store jwt token
  const [user, setUser] = useState(null); // store user data after jwt verification
  const [service, setService] = useState([]); // store services data
  const [isLoading, setIsLoading] = useState(true); // store loading state when token not get

  const AuthorizationBearerToken = `Bearer ${token}`; // Bearer token store in variable so we use this variable here , also in consumer component(like admin panel) that jwt token pass from localstorage to backend for jwt verify also show user is login

  const API = import.meta.env.VITE_APP_URI_API; //here API pass in every consumer where it's need

  //^ fun that used to store Json web token in local storage (when login or register)
  const storeJWTinLS = (serverToken) => {
    setToken(serverToken); //after login / register token variable store that token  , so this component render again and isLoggedIn value true
    return localStorage.setItem("token", serverToken);
  };

  // variable that store boolean value of token (true , false), that help to show in navbar which link show login or logout
  const isLoggedIn = !!token; //we can also use :-  Boolean(token)
  console.log("is logged in ?", isLoggedIn);

  //^ fun for logout functionality
  const LogoutUser = () => {
    setToken(""); // token is empty
    setUser(null); // Clear user data on logout
    return localStorage.removeItem("token"); //token remove from local storage
  };

  //^ JWT Authentication :- to get the currently loggedIn user data
  const userAuthentication = async () => {
    try {
      setIsLoading(true); // first loading true

      // If there's no token, skip the API call
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${API}/api/auth/user`, {
        method: "GET",
        headers: {
          //  Authorization: `Bearer ${token}`, //token data pass to backend for verify
          Authorization: AuthorizationBearerToken,
        },
      });

      if (response.ok) {
        const data = await response.json(); // response convert into json obj. format
        console.log("user data", data);
        setUser(data.msg);
        // after get current logging userData (token get) , isLoading set to false
        setIsLoading(false);
      } else {
        // If token is invalid, clear it
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
        // if user data not get then isLoading set to false
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data", error);
      localStorage.removeItem("token");
      setToken("");
      setUser(null);
      setIsLoading(false);
    }
  };

  // fun for fetch the services data from the database
  const getServicesDataReq = async () => {
    try {
      const res = await fetch(`${API}/api/data/service`, {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setService(data.msg);
      }
    } catch (error) {
      console.error(`services frontend error:${error}`);
    }
  };

  useEffect(() => {
    getServicesDataReq();
    userAuthentication(); // fun call
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        storeJWTinLS,
        LogoutUser,
        isLoggedIn,
        user,
        service,
        AuthorizationBearerToken,
        isLoading,
        API,
      }}
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
