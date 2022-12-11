import {
  createSlice,
  createEntityAdapter,
  nanoid,
  createSelector,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type Task = {
  id: string;
  status: "TODO" | "PROGRESS" | "DONE";
  requirement: string;
};

export type TasksState = {
  tasks: Task[];
};

const tasksAdapter = createEntityAdapter<Task>({
  selectId: (post) => post.id,
});
// const id = nanoid();
const tasksInitialEntityState = tasksAdapter.getInitialState();

const { addOne, updateOne } = tasksAdapter;

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksInitialEntityState,
  reducers: {
    created: (state, action: PayloadAction<{ requirement: string }>) => {
      addOne(state, {
        id: nanoid(),
        status: "TODO",
        requirement: action.payload.requirement,
      });
    },
    statusUpdated: (
      state,
      action: PayloadAction<Pick<Task, "status" | "id">>
    ) => {
      updateOne(state, {
        id: action.payload.id,
        changes: {
          status: action.payload.status,
        },
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { created, statusUpdated } = tasksSlice.actions;

const { selectAll } = tasksAdapter.getSelectors(
  (state: RootState) => state.tasks
);
export const selectTodoTask = createSelector(selectAll, (tasks) =>
  tasks.filter((task) => task.status === "TODO")
);
export const selectProgressTask = createSelector(selectAll, (tasks) =>
  tasks.filter((task) => task.status === "PROGRESS")
);

export default tasksSlice.reducer;
