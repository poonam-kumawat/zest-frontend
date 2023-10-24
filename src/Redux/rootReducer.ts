import { combineReducers } from "redux";
import cartReducer from "./reducer/cartReducer";
import locationReducer from "./reducer/locationReducer";

export const root = combineReducers({
  cart: cartReducer,
  location: locationReducer
  // user: userReducer,
});

export type rootType = ReturnType<typeof root>;
