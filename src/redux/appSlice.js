import {
    createSlice
} from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        applicants: []
    },
    reducers: {
        setApplicants: (state, action) => {
            state.applicants = action.payload
        },
    }
})

export const {
    setApplicants,
} = appSlice.actions;
export default appSlice.reducer;