import { createBrowserRouter } from "react-router";
import ErrorComponent from "./components/errors/ErrorComponent.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import MedicalStaffLayout from "./features/medicalstaff/MedicalStaffLayout.jsx";

export const route = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [{
			errorElement: <ErrorComponent />,
			children: [{
               path: "/medical-staff",
			   element: <MedicalStaffLayout />
			},]
		}],
	},
]);
