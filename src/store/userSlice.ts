import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers, getUserById, updateUser } from '../api/api';
import { IUser } from '../types/IUser.interface';

interface IUserState {
  users: IUser[];
  selectedUser: IUser | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IUserState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await getUsers();

    return response.data;
  }
);

export const fetchUserDetails = createAsyncThunk(
  'users/fetchUserDetails',
  async (userId: string) => {
    const response = await getUserById(userId as any);

    return response.data;
  }
);

export const updateUserThunk = createAsyncThunk(
  'users/updateUser',
  async (user: IUser, userId) => {
    const response = await updateUser(user);

    return response.data;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedUser = action.payload;
        const index = state.users.findIndex(user => user.id === updatedUser.id);
        
        if (index !== -1) {
          state.users[index] = updatedUser;
        }

        state.selectedUser = updatedUser;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default usersSlice.reducer;
