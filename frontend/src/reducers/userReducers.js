import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "./types";

export const userReducer = (state = { loading: false }, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: payload,
        loading: false,
        error: "",
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        error: payload,
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
