import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getTasks, updateTaskStatus } from "../api/api";
import { ITask } from "../types/ITask.interface";

interface ITaskState {
  tasks: ITask[];
  loading: boolean;
  error: string | null;
  filters: {
    status: "all" | "completed" | "notCompleted";
    title: string;
    userId: number | null;
  };
  total: number;
}

const initialState: ITaskState = {
  tasks: [],
  loading: false,
  error: null,
  filters: {
    status: "all",
    title: "",
    userId: null,
  },
  total: 0,
};

interface IFetchTaskArgs {
  page: number;
  limit: number;
}

interface IToggleTaskArgs {
  taskId: number;
  completed: boolean;
}

export const fetchTasks = createAsyncThunk<
  { tasks: ITask[]; totalCount: number }, IFetchTaskArgs>(
    "tasks/fetchTasks",
  async ({ page, limit}) => {
  const start = page * limit;

  return await getTasks(start, limit);
});

export const updateTaskStatusThunk = createAsyncThunk<void, IToggleTaskArgs>(
  "tasks/updateStatus",
  async ({ taskId, completed }, { dispatch }) => {
    const updatedTask = await updateTaskStatus(taskId, completed);

    if (updatedTask) {
      dispatch(toggleTaskStatus(taskId));
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleTaskStatus(state, action: PayloadAction<number>) {
      const taskId = action.payload;
      const task = state.tasks.find((task) => task.id === (taskId));

      if (task) {
        task.completed = !task.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload.tasks;
      state.total = action.payload.totalCount;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;
      state.total = 0;
      state.error = action.error.message || "Failed to fetch tasks";
    });
  },
});

export const { toggleTaskStatus } = taskSlice.actions;

export default taskSlice.reducer;
