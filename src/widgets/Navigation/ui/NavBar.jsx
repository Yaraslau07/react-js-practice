import { useDispatch } from "react-redux";
import bell from "../../../shared/assets/images/bell.png";
import hamburg from "../../../shared/assets/images/hamburg.png";
import logo from "../../../shared/assets/images/logo.png";
import profile from "../../../shared/assets/images/profile.png";
import { toggleSidebar } from "../../../shared/model/uiSlice";
import "./navbar.scss";

export function NavBar() {
	const dispatch = useDispatch();

	return (
		<header className="navbar">
			<div className="navbar-container">
				<div className="navbar-left">
					<button
						className="menu-button"
						type="button"
						onClick={() => dispatch(toggleSidebar())}
					>
						<img src={hamburg} alt="menu" />
					</button>
					<div className="logo-wrapper">
						<img src={logo} alt="logo" />
					</div>
				</div>

				<div className="navbar-right">
					<button className="bell-button" type="button">
						<img src={bell} alt="notifications" />
					</button>
					<div className="profile-wrapper">
						<img src={profile} alt="profile" className="profile-avatar" />
					</div>
				</div>
			</div>
		</header>
	);
}
