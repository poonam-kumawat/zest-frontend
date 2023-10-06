import { combineReducers } from "redux";
import cartReducer from "./reducer/cartReducer";

export const root = combineReducers({
  cart: cartReducer,
  // user: userReducer,
});

export type rootType = ReturnType<typeof root>;
