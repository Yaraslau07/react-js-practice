import { useState, useMemo } from "react";
import "./appointments.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAppointment, editAppointment } from "../../../entities/Appointments";
import { generateTimeSlotes } from "../../../features/BookAppointmentModal";

export function Appointments() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { appointments } = useSelector((state) => state.appointments);

  const [activeAppointment, setActiveAppointment] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ date: "", time: "" });
  
  const calcAvailableSlots = useMemo(() => {
    if (!activeAppointment || !editForm.date) return [];
     const allSlots =  generateTimeSlotes(activeAppointment.doctorFrom, activeAppointment.doctorTo)
     console.log(allSlots)
     const bookedSlotes = appointments.filter((app) => app.doctorId === activeAppointment.doctorId && app.date === editForm.date && app.time !== activeAppointment.time).map((app) => app.time)
     console.log(bookedSlotes)
     return allSlots.filter((el) => !bookedSlotes.includes(el))
  },[editForm, activeAppointment, appointments]) 

  if (!appointments || appointments.length < 1) {
    return (
      <div className="appointments-empty">
        <p>You got no appointments yet</p>
        <button type="button" onClick={() => navigate("/medical-staff")}>
          Make an appointment
        </button>
      </div>
    );
  }
   
  const openDeleteModal = (app) => {
    setActiveAppointment(app)
    setIsDeleteModalOpen(true)
  };

  const confirmDelete = () => {
    dispatch(deleteAppointment({ id: activeAppointment.id }))
    setIsDeleteModalOpen(false);
    setActiveAppointment(null)
  };

  const openEditModal = (app) => {
    setActiveAppointment(app);
    setEditForm({ date: app.date, time: app.time });
    setIsEditModalOpen(true)
  };

  const saveEdit = () => {
    dispatch(
      editAppointment({
        ...activeAppointment,
        date: editForm.date,
        time: editForm.time,
      })
    );
    setIsEditModalOpen(false)
    setActiveAppointment(null)
  };

  const closeModals = () => {
    setIsEditModalOpen(false)
    setIsDeleteModalOpen(false)
    setActiveAppointment(null)
  };

  return (
    <div className="appointments-container">
      <h2>Your Appointments</h2>
      
      <div className="appointments-list">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="appointment-card">
            <div className="appointment-info">
              <h3>Dr. {appointment.doctorName}</h3>
              <div className="datetime">
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
              </div>
            </div>

            <div className="appointment-actions">
              <button type="button" className="btn-edit" onClick={() => openEditModal(appointment)}>
                Edit
              </button>
              <button type="button" className="btn-delete" onClick={() => openDeleteModal(appointment)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Appointment</h3>
            <p className="modal-subtitle">Update your appointment with Dr. {activeAppointment?.doctorName}</p>
            
            <div className="modal-form">
              <label>
                Date:
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                />
              </label>
              <label>
                Time:
                <select
					value={editForm.time}
					onChange={(e) => setEditForm({...editForm, time: e.target.value})}
					required
					disabled={!editForm.date}
					>
					<option value="" disabled>
						{!editForm.date
							? "Please select a date first"
							: calcAvailableSlots.length === 0
								? "No slots available"
								: "Select a time slot"}
        			</option>
						{calcAvailableSlots?.map((slot) => (
							<option key={slot} value={slot}>
								{slot}
							</option>
						))}
					</select>
              </label>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-save" onClick={saveEdit}>Save Changes</button>
              <button type="button" className="btn-cancel" onClick={closeModals}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Cancel Appointment?</h3>
            <p>Are you sure you want to cancel your appointment with <strong>Dr. {activeAppointment?.doctorName}</strong> on {activeAppointment?.date} at {activeAppointment?.time}?</p>
            
            <div className="modal-actions">
              <button type="button" className="btn-delete" onClick={confirmDelete}>Yes</button>
              <button type="button" className="btn-cancel" onClick={closeModals}>Nah</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}