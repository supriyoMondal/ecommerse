import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "./types";

export const userReducer = (state = { loading: false }, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        userInfo: payload,
        loading: false,
        registerError: "",
        loginError: "",
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        loginError: payload,
        loading: false,
      };
    case USER_REGISTER_FAILED:
      return {
        ...state,
        registerError: payload,
        loading: false,
      };
    case USER_LOGOUT:
      return {
        userInfo: null,
      };
    default:
      return state;
  }
};
