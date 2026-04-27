import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Provider } from 'react-redux';
import { store } from "./providers/store.js";
import { route } from "./routes.js";
import './styles/global.scss'

const root = createRoot(document.getElementById("root"));

root.render(
	<StrictMode>
		<Provider store={store}>
		   <RouterProvider router={route} />
		</Provider>    
	</StrictMode>,
);
