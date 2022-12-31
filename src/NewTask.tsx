import React from "react";
import { created } from "./tasksSlice";
import { AppDispatch } from "./store";

const TodoProcess = () => (
  <button
    type="button"
    onClick={() => AppDispatch(created({ requirement: "新規タスク" }))}
  >
    新規
  </button>
);

export default TodoProcess;
