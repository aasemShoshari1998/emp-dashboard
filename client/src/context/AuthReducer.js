const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: null, isLoading: true };

    case "LOGIN_SUCCESS":
      return { ...state, user: action.payload, isLoading: false };

    case "LOGOUT":
      return { ...state, user: null, isLoading: false };

    case "DARKEN":
      return { ...state, darken: action.payload };
    case "GET_EMPLOYEES":
      return { ...state, employees: action.payload };
    // case "ADD_EMPLOYEE":
    //   return { ...state, employees: [...state.employees, action.payload] };
    default:
      return state;
  }
};

export default AuthReducer;
