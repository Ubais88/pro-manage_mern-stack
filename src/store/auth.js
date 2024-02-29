import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState(null);
  const [menuModalState, setMenuModalState] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [sortingTime, setSortingTime] = useState("This Week");
  const navigate = useNavigate();

  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // logout - remove token from local storage
  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    navigate("/");
    return;
  };

  const isLoggedIn = !!token;
  //console.log("isloggedin", isLoggedIn);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        authorizationToken,
        BASE_URL,
        LogoutUser,
        name,
        setName,
        loading,
        setLoading,
        cardData,
        setCardData,
        menuModalState,
        setMenuModalState,
        editModalOpen,
        setEditModalOpen,
        logoutModalOpen,
        setLogoutModalOpen,
        actionType,
        setActionType,
        sortingTime,
        setSortingTime,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
