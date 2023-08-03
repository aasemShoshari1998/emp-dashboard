export const login = () => ({
  type: "LOGIN",
});

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const logout = () => ({
  type: "LOGOUT",
});

export const getEmployees = () => ({
  type: "GET_EMPLOYEES",
});
