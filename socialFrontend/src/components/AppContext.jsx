// AppContext.jsx
import React, { createContext, useContext, useReducer } from "react";
import { initialUserState } from "./initialState";
import { appReducer, actionTypes } from "./reducer";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    user: initialUserState,
  });

  const loginUser = (userData) => {
    dispatch({
      type: actionTypes.LOGIN,
      payload: userData,
    });
  };

  const logoutUser = () => {
    dispatch({
      type: actionTypes.LOGOUT,
    });
  };

  return (
    <AppContext.Provider value={{ state, loginUser, logoutUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
