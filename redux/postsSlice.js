import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  selectedPost: {
    id: 0,
    title: "",
    body: "",
  },
};

const postSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    setPostsToStore(state, action) {
      state.posts = action.payload;
    },

    setSelectedPost(state, action) {
      state.selectedPost = action.payload;
    },
  },
});

export const { setPostsToStore, setSelectedPost } = postSlice.actions;
export default postSlice.reducer;
