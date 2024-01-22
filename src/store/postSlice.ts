import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPosts, updatePost, deletePost } from "../api/api";
import { IPost } from "../types/IPost.interface";

interface PostState {
  posts: IPost[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (userId: string) => {
    const response = await getPosts(userId);
    return response.data as IPost[];
  }
);

export const updatePostThunk = createAsyncThunk(
  "posts/updatePost",
  async (post: IPost) => {
    const response = await updatePost(post);
    return response.data as IPost;
  }
);

export const deletePostThunk = createAsyncThunk(
  "posts/deletePost",
  async (postId: number) => {
    await deletePost(postId);
    return postId;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch posts";
    });
    builder.addCase(updatePostThunk.fulfilled, (state, action) => {
      const updatedPost = action.payload;
      const index = state.posts.findIndex((post) => post.id === updatedPost.id);

      if (index !== -1) {
        state.posts[index] = updatedPost;
      }
    });
    builder.addCase(deletePostThunk.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    });
  },
});

export default postsSlice.reducer;
