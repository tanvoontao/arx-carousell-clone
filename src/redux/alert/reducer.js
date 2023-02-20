import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: false,
    message: "default",
    severity: "info"
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state) => {
            state.show = true;
        },
        hideAlert: (state) => {
            state.show = false;
        },
        setAlert(state, action) {
            const { show, message, severity } = action.payload;
            state.show = show;
            state.message = message;
            state.severity = severity;
        }
    },
})

export const { showAlert, hideAlert, setAlert } = alertSlice.actions;
export default alertSlice.reducer;