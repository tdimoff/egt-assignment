import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getTasks } from '../api/api';

interface Task {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filters: {
    status: 'all' | 'completed' | 'notCompleted';
    title: string;
    userId: number | null;
  };
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  filters: {
    status: 'all',
    title: '',
    userId: null,
  },
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const response = await getTasks();
    return response.data as Task[];
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<{ key: string, value: string | number | null }>) {
      const { key, value } = action.payload;
      if (key in state.filters) {
        (state.filters as any)[key] = value;
      }
    },

    toggleTaskStatus(state, action: PayloadAction<number>) {
      const taskId = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch tasks';
    });
  },
});

export const { setFilter, toggleTaskStatus } = taskSlice.actions;

export default taskSlice.reducer;
