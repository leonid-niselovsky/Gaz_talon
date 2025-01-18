import { configureStore } from "@reduxjs/toolkit";

import appReducer from "./appSlice";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Api } from "./api.ts";

const persistedAppReducer = persistReducer(
  {
    key: "app",
    storage,
  },
  appReducer,
);

const store = configureStore({
  reducer: {
    app: persistedAppReducer,
    [Api.reducerPath]: Api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(Api.middleware),
});

const persistor = persistStore(store);

export { store, persistor };
