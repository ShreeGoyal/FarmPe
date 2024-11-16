import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user={
                id: action.payload._id,
                name: action.payload.name,
                username: action.payload.username,
                email: action.payload.email,
                userType: action.payload.userType
            }
        },
        deletePost: (state, action) => {
            state.user = initialState
        }
    }
})

export const { addUser, deleteUser} = userSlice.actions;
export default userSlice.reducer;