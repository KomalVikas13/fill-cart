import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    profile: JSON.parse(localStorage.getItem("profile")) || null,
};


// Redux slice
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        saveUser: (state, action) => {
            console.log(action.payload, "hi");
            state.profile = action.payload;
            localStorage.setItem("profile", JSON.stringify(action.payload)); // Save to localStorage
        },
    }
});

export const { saveUser } = userSlice.actions;
export default userSlice.reducer;
