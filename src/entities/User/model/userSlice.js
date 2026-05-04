import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
        currentUser: null,
        feedback: [],
        activities: [],
        surveys: [],
    },
	reducers: {
		setUser: (state, action) => {
            state.currentUser = action.payload;
        },
        
        updateContactInfo: (state, action) => {
            state.currentUser.contactInfo = {...state.currentUser.contactInfo,...action.payload}
        },

        updatePersonalInfo: (state, action) => {
            state.currentUser.personal = {...state.currentUser.personal,...action.payload}
        },

       
        updateInsuranceInfo: (state, action) => {
            state.currentUser.insurance = {...state.currentUser.insurance,...action.payload}
        },

        updateContactPreferences: (state, action) => {
           state.currentUser.contact_preferences = {...state.currentUser.contact_preferences,...action.payload}
        },

        setActivities: (state, action) => {
            state.activities = action.payload;
        },
 
        addActivity: (state, action) => {
            state.activities.unshift(action.payload);
        },

        setSurveys: (state, action) => {
            state.surveys = action.payload;
        },

        setFeedback: (state, action) => {
            state.feedback = action.payload;
        },

        addSurveys: (state, action) => {
            state.surveys.unshift(action.payload)
        },

        addFeedback: (state, action) => {
            state.feedback.unshift(action.payload)
        },
	},
});

export const { setUser, updateContactInfo, updatePersonalInfo, updateContactPreferences, updateInsuranceInfo, setActivities, setFeedback, setSurveys, addActivity, addFeedback, addSurveys } =
	userSlice.actions;

export default userSlice.reducer
