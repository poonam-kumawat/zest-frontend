import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import root from "./redux//reducers/reducers";

// const persistConfig = {
//   key: "Clip_Magic",
//   storage,
//   whitelist: ["user"],
// };

// const reducer = persistReducer(persistConfig, root);

const store = configureStore({
  reducer:{},
  
});

export {store}