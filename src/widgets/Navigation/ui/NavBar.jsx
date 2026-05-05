import { useDispatch } from "react-redux";
import { useState, useCallback } from "react";
import bell from "../../../shared/assets/images/bell.png";
import hamburg from "../../../shared/assets/images/hamburg.png";
import logo from "../../../shared/assets/images/logo.png";
import profile from "../../../shared/assets/images/profile.png";
import { toggleSidebar } from "../../../shared/model/uiSlice";
import { useSelector } from "react-redux";
import { PopUp } from "../../../shared/ui/popUp/PopUp.jsx";
import "./navbar.scss";

export function NavBar() {
	    const [isPopUpOpened, setIsPopUpOpened] = useState(false)
		const [popUpMessage, setPopUpMessage] = useState("")
		const [popUpType, setPopUpType] = useState("")

		const dispatch = useDispatch();
        const { currentUser } = useSelector((state) => state.user)
	
		const handlePopUpClose = useCallback(() => {
			setIsPopUpOpened(false)
		}, [])

		const triggerPopUpError = (message = "No such page available yet") => {
			setPopUpType("error")
			setPopUpMessage(message)
			setIsPopUpOpened(true)
		}
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
					<button className="bell-button" type="button" onClick={() => {triggerPopUpError()}}>
						<img src={bell} alt="notifications" />
					</button>
					<div className="profile-wrapper">
					  <button style={{all: "unset"}} type="button" onClick={() => {triggerPopUpError()}}>
						<img src={`https://i.pravatar.cc/150?u=${currentUser.id}`} alt={profile} className="profile-avatar" />
					  </button>		
					</div>
				</div>
			</div>
			{isPopUpOpened && (
				<PopUp
				type={popUpType}
				message={popUpMessage}
				onClose={handlePopUpClose} />
			)}
		</header>
	);
}
