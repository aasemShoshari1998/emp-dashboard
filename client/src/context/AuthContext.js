import React from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import AuthReducer from "./AuthReducer";
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  employees: [],
  isLoading: false,
  darken: false,
};

const AuthContext = React.createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  const getEmployees = async () => {
    const response = await fetch("http://localhost:8000/get-employees");
    const data = await response.json();
    dispatch({ type: "GET_EMPLOYEES", payload: data });
  };
  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        darken: state.darken,
        employees: state.employees,
        getEmployees,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
