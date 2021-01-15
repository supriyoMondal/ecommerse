import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { CART_ITEM, USER } from "./reducers/types";
import { userReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  user: userReducer,
});

const cartItemsFromStorage = localStorage.getItem(CART_ITEM)
  ? JSON.parse(localStorage.getItem(CART_ITEM))
  : [];
const userInfoFromStorage = localStorage.getItem(USER)
  ? JSON.parse(localStorage.getItem(USER))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
  user: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
