import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { appointmentsReducer } from "../../entities/Appointments";
import { dummyApi } from "../../shared/api/dummyAPi";
import uiReducer from "../../shared/model/uiSlice";

const rootReducer = combineReducers({
	ui: uiReducer,
	appointments: appointmentsReducer,
	[dummyApi.reducerPath]: dummyApi.reducer,
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["appointments"],
};

const persistRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistRootReducer,

	middleware: (middlewareDefault) =>
		middlewareDefault({
			serializableCheck: {
				ignoredActions: [
					"persist/PERSIST",
					"persist/REHYDRATE",
					"persist/REGISTER",
				],
			},
		}).concat(dummyApi.middleware),
});

export const persistor = persistStore(store);
