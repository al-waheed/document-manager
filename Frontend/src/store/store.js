import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import documentsReducer from "./documentsSlice";
import invoicesReducer from "./invoicesSlice";
import authReducer from "./authSlice";

const persistConfig = {
  key: "root",
  storage,

  // Documents should always be loaded from the backend.
  blacklist: ["documents"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  documents: documentsReducer,
  invoices: invoicesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
