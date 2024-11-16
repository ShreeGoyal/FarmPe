import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    post: [],
}

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        addPost: (state, action) => {
            const newPost = {
                id: action.payload._id,
                image: action.payload.image.url,
                title: action.payload.title,
                description: action.payload.description,
                amountRequired: action.payload.amountRequired,
                price: action.payload.price,
                country: action.payload.country,
                location: action.payload.location,
                owner: action.payload.owner
            }
            state.post.unshift(newPost);
        },
        deletePost: (state, action) => {
            state.post = state.post.filter((p) => p.id !== action.payload);
        },
        deleteAllPost: (state, action) => {
            return initialState;
        }
    }
})

export const { addPost, deletePost, deleteAllPost } = postSlice.actions;
export default postSlice.reducer;