import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false
}

const taskSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(state.user))
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
    }

});

export const { setUser, setLoading } = taskSlice.actions;
export default taskSlice.reducer;