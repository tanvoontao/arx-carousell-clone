import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    type: null,
    data: null
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal: (state, action) => {
            const { type, data } = action.payload

            state.type = type;
            state.data = data;
        }
    }
})

export const { setModal } = modalSlice.actions
export default modalSlice.reducer;