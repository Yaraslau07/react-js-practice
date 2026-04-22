import { createBrowserRouter } from "react-router";
//import ErrorComponent from "./components/errors/ErrorComponent";
import MainLayout from "./layouts/MainLayout.jsx";

export const route = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		//errorElement: <ErrorComponent />,
		children: [],
	},
]);
