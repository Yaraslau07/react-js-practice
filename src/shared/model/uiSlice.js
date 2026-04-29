import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isSidebarOpen: false,
	isBookingModalOpened: false,
	selectedDoctor: null,
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		toggleSidebar: (state) => {
			state.isSidebarOpen = !state.isSidebarOpen;
		},
		setSidebarOpen: (state, action) => {
			state.isSidebarOpen = action.payload;
		},
		openBookingModal: (state, action) => {
			state.isBookingModalOpened = true;
			state.selectedDoctor = action.payload;
		},
		closeBookingModal: (state) => {
			state.isBookingModalOpened = false;
			state.selectedDoctor = null;
		},
	},
});

export const {
	toggleSidebar,
	setSidebarOpen,
	openBookingModal,
	closeBookingModal,
} = uiSlice.actions;

export default uiSlice.reducer;
