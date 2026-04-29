import { createBrowserRouter } from "react-router";
import { MedicalStaffLayout } from "../pages/MedicalStaffPage/index.js";
import ErrorComponent from "../shared/ui/ErrorComponent/ErrorComponent.jsx";
import { MainLayout } from "../widgets/MainLayout/index.js";

export const route = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				errorElement: <ErrorComponent />,
				children: [
					{
						path: "/medical-staff",
						element: <MedicalStaffLayout />,
					},
				],
			},
		],
	},
]);
