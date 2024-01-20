import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers, updateUser } from '../api/api';
import { IUser } from '../types/IUser';
  
  interface IUserState {
    users: IUser[];
    isLoading: boolean;
    error: string | null;
  }
  
  const initialState: IUserState = {
    users: [],
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

export const updateUserThunk = createAsyncThunk(
  'users/updateUser',
  async (user: IUser) => {
    const response = await updateUser(user);

    return response.data;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      // state.error = action.error.message;
    });
    builder.addCase(updateUserThunk.pending, (state) => {
      state.isLoading = true;
    });
  
    builder.addCase(updateUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedUser = action.payload;
      const index = state.users.findIndex(user => user.id === updatedUser.id);
      state.users[index] = updatedUser;
    });
  
    builder.addCase(updateUserThunk.rejected, (state, action) => {    
      state.isLoading = false;
      // state.error = action.error.message;
    });
  },
});

export default usersSlice.reducer;
