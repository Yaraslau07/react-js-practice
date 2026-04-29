import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { store } from "./providers/store.js";
import { route } from "./routes.js";
import "./styles/global.scss";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./providers/store.js";

const root = createRoot(document.getElementById("root"));

root.render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<RouterProvider router={route} />
			</PersistGate>
		</Provider>
	</StrictMode>,
);
