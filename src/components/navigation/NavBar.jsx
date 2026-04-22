import hamburg from '../../assets/images/hamburg.png'
import logo from '../../assets/images/logo.png'
import bell from '../../assets/images/bell.png'
import profile from '../../assets/images/profile.png'
import { useDispatch } from 'react-redux'
import { toggleSidebar } from '../../store/uiSlice'

export default function NavBar(){
    
    const dispatch = useDispatch()

    return(
        <header className="navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    <button className="menu-button" type='button' onClick={() => dispatch(toggleSidebar())}>
                        <img src={hamburg} alt="menu" />
                    </button>
                    <div className='logo-wrapper'>
                        <img src={logo} alt="logo" />
                    </div>    
                </div>

                <div className="navbar-right">
                    <button className='bell-button' type='button'>
                        <img src={bell} alt="notifications" />
                    </button>
                    <div className="profile-wrapper">
                        <img src={profile} alt="profile" className="profile-avatar" />
                    </div>
                </div>
            </div>
    </header>
    )
}