import { Outlet } from "react-router";
import { NavBar } from "../../Navigation/index.js";
import { SideBar } from "../../Navigation/index.js";

export function MainLayout() {
	return (
		<div className="main-container">
			<NavBar />
			<div className="main-contact">
			<SideBar />
			<div className="page-wrapper">
			<Outlet />
			</div>
			</div>
     		<footer className="footer">
			   <span>@2026 HCare</span>
			</footer>
		</div>
	);
}
