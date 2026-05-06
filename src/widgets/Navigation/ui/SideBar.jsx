import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router";
import "./sidebar.scss";
import { setSidebarOpen } from "../../../shared/model/uiSlice";

export function SideBar() {
	const isOpen = useSelector((state) => state.ui.isSidebarOpen);
	const dispatch = useDispatch()
	const links = [
		{ text: "Dashboard", to: "/" },
		{ text: "Apointments", to: "/appointments" },
		{ text: "Medical staff", to: "/medical-staff" },
		{ text: "Feedback", to: "/feedback" },
	];

	return (
		<aside
			className={`sidebar ${isOpen ? "sidebar-opened" : "sidebar-closed"}`}
		>
			<nav className="sidebar-nav">
				{links.map((link) => (
					<NavLink
					   onClick={() => {
						if(window.innerWidth < 768){
						dispatch(setSidebarOpen(false))
						}}}
						key={link.text}
						to={link.to}
						className={({ isActive }) =>
							`sidebar-link ${isActive ? "active" : ""}`
						}
					>
						{link.text}
					</NavLink>
				))}
			</nav>
		</aside>
	);
}
