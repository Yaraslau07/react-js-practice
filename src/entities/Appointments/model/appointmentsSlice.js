import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	appointments: [],
};

const appointmentsSlice = createSlice({
	name: "appointments",
	initialState,
	reducers: {
		addAppointment: (state, action) => {
			state.appointments.push(action.payload);
		},
		deleteAppointment: (state, action) => {
			const idToDelete = action.payload.id;
			state.appointments = state.appointments.filter(
				(app) => app.id !== idToDelete,
			);
		},
		editAppointment: (state, action) => {
			const idToEdit = action.payload.id;
			state.appointments = state.appointments.map((app) => {
				if (app.id === idToEdit) {
					return action.payload;
				}
				return app;
			});
		},
	},
});

export const { addAppointment, deleteAppointment, editAppointment } =
	appointmentsSlice.actions;

export default appointmentsSlice.reducer;
