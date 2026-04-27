import { createBrowserRouter } from "react-router";
import ErrorComponent from "../shared/ui/ErrorComponent/ErrorComponent.jsx";
import { MainLayout } from "../widgets/MainLayout/index.js";
import { MedicalStaffLayout } from "../pages/MedicalStaffPage/index.js";

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
