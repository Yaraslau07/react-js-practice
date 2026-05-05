import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAppointment } from "../../../entities/Appointments";
import { closeBookingModal } from "../../../shared/model/uiSlice";
import "./bookingModal.scss";

export const generateTimeSlotes = (from, to) => {
	const timeSlots = [];
	const start = parseInt(from, 10);
	const finish = parseInt(to, 10);
	for (let i = start; i < finish; i++) {
		const hour = i.toString().padStart(2, "0");
		timeSlots.push(`${hour} : 00`);
	}
	return timeSlots;
};

export function BookingModal({triggerPopUp}) {
	const { isBookingModalOpened, selectedDoctor } = useSelector(
		(state) => state.ui,
	);
	const { appointments } = useSelector((state) => state.appointments);
	const dispatch = useDispatch();
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");

	const availableSlots = useMemo(() => {
		if (!date || !selectedDoctor) return null;

		const validSlots = generateTimeSlotes(
			selectedDoctor.hoursFrom,
			selectedDoctor.hoursTo,
		);

		const bookedTimes = appointments
			.filter((app) => app.doctorId === selectedDoctor.id && app.date === date)
			.map((app) => app.time);

		return validSlots.filter((slot) => !bookedTimes.includes(slot));
	}, [date, selectedDoctor, appointments]);

	if (!isBookingModalOpened || !selectedDoctor) return null;

	const handleConfirmBooking = (e) => {
		e.preventDefault();

		dispatch(
			addAppointment({
				id: crypto.randomUUID(),
				doctorId: selectedDoctor.id,
				doctorName: selectedDoctor.fullname,
				date,
				time,
                specialization: selectedDoctor.specialization,
                doctorFrom: selectedDoctor.hoursFrom,
                doctorTo: selectedDoctor.hoursTo
			}),
		);
		dispatch(closeBookingModal());
		triggerPopUp()
	};

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<h2>Book Appointment</h2>
				<p>
					Doctor: <strong>{selectedDoctor.fullname}</strong>
				</p>
				<p>Specialization: {selectedDoctor.specialization}</p>

				<form onSubmit={handleConfirmBooking}>
					<label>
						Select Date:
						<input
							type="date"
							value={date}
							min={new Date().toISOString().split("T")[0]}
							onChange={(e) => {
								setDate(e.target.value);
								setTime("");
							}}
							required
						/>
					</label>
					<label>
						Select Time:
						<select
							value={time}
							onChange={(e) => setTime(e.target.value)}
							required
							disabled={!date}
						>
							<option value="" disabled>
								{!date
									? "Please select a date first"
									: availableSlots.length === 0
										? "No slots available"
										: "Select a time slot"}
							</option>

							{availableSlots?.map((slot) => (
								<option key={slot} value={slot}>
									{slot}
								</option>
							))}
						</select>
					</label>

					<div className="modal-actions">
						<button type="button" onClick={() => dispatch(closeBookingModal())}>
							Cancel
						</button>
						<button type="submit">Confirm Booking</button>
					</div>
				</form>
			</div>
		</div>
	);
}
