import { useGetUserQuery } from "../../../entities/Dashboard";
import { useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { updateContactPreferences, addFeedback, } from "../../../entities/User"
import InlineError from "../../../shared/ui/InlineError/InlineError.jsx";
import { PopUp } from "../../../shared/ui/popUp/PopUp.jsx";
import "./dashboardPage.scss"

const activities = [
    { id: 1, title: "Screening test", description: "Sent by", author: "marketing", date: "21-04-2021" },
    { id: 2, title: "Appointment: Approved", description: "by", author: "CRMadmin", date: "20-04-2021" },
    { id: 3, title: "Outcoming call: Doctor visit", description: "by", author: "CRMadmin", date: "18-04-2021" }
];

const survays = [
    { id: 1, title: "Chest examination", completedOn: "Details" },
    { id: 2, title: "Blood test feedback", completedOn: "12-04-2021" }
];

export const Dashboard = () => {
     
    const [isFeedBackOpened, setIsFeedBackOpened ] = useState(false)
    const [selectedDoc, setSelectedDoc] = useState("")
    const [rating, setRating] = useState(1)
    const [isPopUpOpened, setIsPopUpOpened] = useState(false)
    const [popUpMessage, setPopUpMessage] = useState("")
    const [popUpType, setPopUpType] = useState("")

    const handlePopUpClose = useCallback(() => {
        setIsPopUpOpened(false)
    }, [])

    const { appointments } = useSelector((state) => state.appointments)
    const { currentUser } = useSelector((state) => state.user)
    const { feedback } = useSelector((state) => state.user)
    //const { activities } = useSelector((state) => state.user)
    //const { survays } = useSelector((state) => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { data, error, isError, isFetching, refresh } = useGetUserQuery(undefined, {skip: !!currentUser})

    const availableDoctors = appointments?.reduce((acc, app) => {
        if (!acc.find(doc => doc.id === app.doctorId)) {
            acc.push({
                fullname: app.doctorName, 
                specialization: app.specialization,
                id: app.doctorId
            });
        }
        return acc;
    }, []) || [];
   
    if(isFetching) return <div>Loading...</div>

    const errorMessage = error?.user?.message || error?.error
    
    const displayedUser = currentUser || data.user[0]

    const triggerPopUpError = (message = "No such page available yet") => {
        setPopUpType("error")
        setPopUpMessage(message)
        setIsPopUpOpened(true)
    }
 
    const handleContactPreferences = (pref) => {
        dispatch(updateContactPreferences(pref))
    }

    const handleCloseFeedbackModal = () => {
        setIsFeedBackOpened(false);
        setSelectedDoc("");
        setRating(1);
    };

    const handleSubmitFeedback = (e) => {
        e.preventDefault();
        const newFeedback = {
            id: Date.now(),
            caseTitle: `Dr. ${selectedDoc}`,
            date: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
            status: "★".repeat(rating) + "☆".repeat(5 - rating)
        };
        
        dispatch(addFeedback(newFeedback));
        setPopUpType("success")
        setPopUpMessage("FeedBack added successfuly")
        setIsPopUpOpened(true)
        handleCloseFeedbackModal();
    };

    return (
        isError ? <InlineError message={errorMessage} onRetry={refresh} /> :
        <div className="patient-dashboard">
            <header className="dashboard-header">
                <div className="user-profile-summary">
                    <img src={`https://i.pravatar.cc/150?u=${currentUser.id}`} alt={displayedUser?.contact_info?.fullName} className="avatar" />
                    <div className="user-titles">
                        <h1>{displayedUser?.contact_info?.fullName}</h1>
                        <span className="role-badge">Patient</span>
                    </div>
                </div>
                
                <nav className="dashboard-tabs">
                    <button type="button" className="tab active">Summary</button>
                    <button type="button" className="tab" onClick={() => {triggerPopUpError()}}>Care plan</button>
                    <button type="button" className="tab" onClick={() => {triggerPopUpError()}}>Lab results</button>
                    <button type="button" className="tab" onClick={() => {triggerPopUpError()}}>PGHD</button>
                    <button type="button" className="tab" onClick={() => {triggerPopUpError()}}>Prescriptions</button>
                </nav>
            </header>

            <main className="dashboard-grid">
                <div className="grid-column">
                    <div className="card">
                        <div className="card-header">
                            <h2>Contact info</h2>
                            <button type="button" className="icon-btn edit-btn" onClick={() => {triggerPopUpError("Not yet available")}}>✏️</button>
                        </div>
                        <div className="card-body">
                            <div className="info-group">
                                <p>Full Name</p>
                                <p>{displayedUser?.contact_info?.fullName}</p>
                            </div>
                            <div className="info-group">
                                <p>Phone</p>
                                <p>{displayedUser?.contact_info?.phone}</p>
                            </div>
                            <div className="info-group">
                                <p>Home Phone</p>
                                <p>{displayedUser?.contact_info?.homePhone || "-"}</p>
                            </div>
                            <div className="info-group">
                                <p>Address</p>
                                <p>{displayedUser?.contact_info?.address}</p>
                            </div>
                            <div className="info-group">
                                <p>Email</p>
                                <p className="text-green">{displayedUser?.contact_info?.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h2>Personal</h2>
                            <button type="button" className="icon-btn edit-btn" onClick={() => {triggerPopUpError("Not yet available")}}>✏️</button>
                        </div>
                        <div className="card-body">
                            <div className="info-group">
                                <p>Gender</p>
                                <p>{displayedUser?.personal?.gender}</p>
                            </div>
                            <div className="info-group">
                                <p>Birth (Age)</p>
                                <p>{displayedUser?.personal?.birthAndAge}</p>
                            </div>
                            <div className="info-group">
                                <p>Patient ID</p>
                                <p>{displayedUser?.id}</p>
                            </div>
                            <div className="info-group">
                                <p>Nationality</p>
                                <p>{displayedUser?.personal?.nationality}</p>
                            </div>
                            <div className="info-group">
                                <p>Marital status</p>
                                <p>{displayedUser?.personal?.maritalStatus}</p>
                            </div>
                            <div className="info-group">
                                <p>Emergency contact</p>
                                <p>{displayedUser?.personal?.emergencyContact}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid-column">
                    <div className="card activities-card">
                        <div className="card-header">
                            <h2>Activities</h2>
                            <button type="button" className="icon-btn add-btn" onClick={() => {triggerPopUpError("Not yet available")}}>+</button>
                        </div>
                        <div className="activities-input">
                            <input type="text" placeholder="Type a post ..." />
                        </div>
                        <div className="inner-tabs">
                            <button type="button" className="inner-tab active">Time line</button>
                            <button type="button" className="inner-tab">Tasks</button>
                            <button type="button" className="inner-tab">Notes</button>
                        </div>
                        <div className="timeline">
                            {activities?.map((activity, index) => (
                                <div className="timeline-item" key={activity.id || index}>
                                    <div className="timeline-content">
                                        <h4>{activity.title}</h4>
                                        <p>{activity.description || "Sent by"} <span className="text-green">{activity.author}</span></p>
                                    </div>
                                    <span className="timeline-date">{activity.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h2>Insurance Info</h2>
                             <button type="button" className="icon-btn edit-btn" onClick={() => {triggerPopUpError("Not yet available")}}>✏️</button>
                        </div>
                        <div className="card-body">
                            <div className="info-group">
                                <p>Member ID</p>
                                <p>{displayedUser?.insurance?.memberId}</p>
                            </div>
                            <div className="info-group">
                                <p>Insurance Provider</p>
                                <p>{displayedUser?.insurance?.provider}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid-column">
                    <div className="card table-card">
                        <div className="card-header">
                            <h2>Appointments</h2>
                            <button type="button" className="icon-btn add-btn" onClick={() => navigate("/medical-staff")}>+</button>
                        </div>
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Start Time</th>
                                    <th>Speciality</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments?.map((appointment) => (
                                    <tr key={appointment.id}>
                                        <td>{appointment.date}<br/><span>{appointment.time}</span></td>
                                        <td>{appointment.specialization}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="card table-card">
                        <div className="card-header">
                            <h2>Surveys</h2>
                            <button type="button" className="icon-btn add-btn" onClick={() => {triggerPopUpError("Not yet available")}}>+</button>
                        </div>
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Completed on</th>
                                </tr>
                            </thead>
                            <tbody>
                                {survays?.map((survey) => (
                                    <tr key={survey.id}>
                                        <td>{survey.title}</td>
                                        <td>{survey.completedOn}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="card table-card">
                        <div className="card-header">
                            <h2>Feedback</h2>
                            <button type="button" className="icon-btn add-btn" onClick={() => setIsFeedBackOpened(true)}>+</button>
                        </div>
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Case Title</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedback?.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.caseTitle}</td>
                                        <td>{item.date}</td>
                                        <td className="stars">{item.status || item.rate || "*****"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="card preferences-card">
                        <div className="card-header">
                            <h2>Contact preferences</h2>
                        </div>
                        
                        <div className="preferences-table">
                            <div className="pref-header">
                                <span>Contact Method</span>
                            </div>
                            <div className="preferences-list">
                                <div className="pref-item">
                                    <span>Email</span>
                                    <div className="toggle-group">
                                        <span className="label deny">DENY</span>
                                        <input type="checkbox" className="toggle" checked={displayedUser?.contact_preferences?.email} 
                                        onChange={(e) => handleContactPreferences({ email: e.target.checked })}/>
                                        <span className="label allow">ALLOW</span>
                                    </div>
                                </div>
                                <div className="pref-item">
                                    <span>Mobile Phone</span>
                                    <div className="toggle-group">
                                        <span className="label deny">DENY</span>
                                        <input type="checkbox" className="toggle" checked={displayedUser?.contact_preferences?.phone}
                                        onChange={(e) => handleContactPreferences({ phone: e.target.checked })} />
                                        <span className="label allow">ALLOW</span>
                                    </div>
                                </div>
                                <div className="pref-item">
                                    <span>Mail</span>
                                    <div className="toggle-group">
                                        <span className="label deny">DENY</span>
                                        <input type="checkbox" className="toggle" checked={displayedUser?.contact_preferences?.mail} 
                                        onChange={(e) => {handleContactPreferences({mail: e.target.checked})}}/>
                                        <span className="label allow">ALLOW</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
            {isFeedBackOpened && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Leave Feedback</h3>
                        <form onSubmit={handleSubmitFeedback}>
                            <div className="form-group">
                                {availableDoctors.length > 0 ? (
                                 <>   
                                <p>Select Doctor:</p>    
                                <select 
                                required 
                                value={selectedDoc} 
                                onChange={(e) => setSelectedDoc(e.target.value)}
                            >
                                <option value="" disabled>Choose a doctor</option>
                                {availableDoctors.map(doc => (
                                    <option key={doc.id} value={doc.fullname}>
                                        {doc.fullname} - {doc.specialization}
                                    </option>
                                ))}
                            </select>
                            </>) : (
                                <p>
                                    U first need to schedule an appointment with the Doctor
                                </p>
                            )}
                            </div>
                            
                            <div className="form-group">
                                { availableDoctors.length !== 0 && (
                                <>    
                                <p>Rating:</p>
                                <div className="star-rating" style={{ display: "flex", gap: "8px", marginTop: "5px" }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            type="button"
                                            key={star}
                                            onClick={() => setRating(star)}
                                            style={{
                                                all: "unset",
                                                cursor: "pointer",
                                                fontSize: "28px",
                                                lineHeight: "1",
                                                color: rating >= star ? "#FFD700" : "#D3D3D3",
                                                transition: "color 0.2s ease-in-out"
                                            }}
                                        >
                                            {rating >= star ? "★" : "☆"}
                                        </button>
                                    ))}
                                </div>
                                </>
                                )}
                            </div>
                            
                            <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={handleCloseFeedbackModal}>Cancel</button>
                                <button type="submit" className="btn-submit" disabled={availableDoctors.length === 0 || selectedDoc === ""}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {isPopUpOpened && (
                <PopUp
                type={popUpType}
                message = {popUpMessage}
                onClose = {handlePopUpClose}    
                />
            )}
        </div>
    );
}