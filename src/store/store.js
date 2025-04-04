import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import documentsReducer from "./documentsSlice";
import invoicesReducer from "./invoicesSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
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
