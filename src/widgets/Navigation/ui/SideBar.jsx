import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import "./sidebar.scss";

export function SideBar() {
	const links = [
		{ text: "Dashboard", to: "/dashboard" },
		{ text: "Apointments", to: "/appointments" },
		{ text: "Medical staff", to: "/medical-staff" },
		{ text: "Feedback", to: "/feedback" },
	];

	const isOpen = useSelector((state) => state.ui.isSidebarOpen);

	return (
		<aside
			className={`sidebar ${isOpen ? "sidebar-opened" : "sidebar-closed"}`}
		>
			<nav className="sidebar-nav">
				{links.map((link) => (
					<NavLink
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
