import {
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "./types";

export const productListReducer = (
  state = { products: [], loading: false },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: payload,
      };
    case PRODUCT_LIST_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
