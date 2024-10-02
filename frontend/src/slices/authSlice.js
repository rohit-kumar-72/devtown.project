import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    loading: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSignupData: (state, action) => {
            state.signupData = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", JSON.stringify(state.token))
        }
    }

});

export const { setSignupData, setToken, setLoading } = authSlice.actions;
export default authSlice.reducer;