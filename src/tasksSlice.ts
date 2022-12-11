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

const { addOne } = tasksAdapter;

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksInitialEntityState,
  reducers: {
    created: (state, action: PayloadAction<{ requirement: string }>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // eslint-disable-next-line no-param-reassign
      addOne(state, {
        id: nanoid(),
        status: "TODO",
        requirement: action.payload.requirement,
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { created } = tasksSlice.actions;

const { selectAll } = tasksAdapter.getSelectors(
  (state: RootState) => state.tasks
);
export const selectTodoTask = createSelector(selectAll, (tasks) =>
  tasks.filter((task) => task.status === "TODO")
);

export default tasksSlice.reducer;
