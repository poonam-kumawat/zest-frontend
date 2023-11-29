import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { root } from "./Redux/rootReducer";

const persistConfig = {
  key: "Zest",
  storage,
  // whitelist: ["user"],
};

const reducer = persistReducer(persistConfig, root);

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistedStore = persistStore(store);
