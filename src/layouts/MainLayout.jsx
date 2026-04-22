import { Outlet } from "react-router";
import NavBar from "../components/navigation/NavBar.jsx";
import SideBar from "../components/navigation/SideBar.jsx";

export default function MainLayout() {
	return (
		<div className="main-container">
			<NavBar />
			<SideBar />
			{/*	<Outlet />*/}
     		<footer className="footer">
			   <span>@2026 HCare</span>
			</footer>
		</div>
	);
}
