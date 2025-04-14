import { createContext, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //fun that used to store Json web token in local storage
  const storeJWTinLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  return (
    <AuthContext.Provider value={{ storeJWTinLS }}>
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
