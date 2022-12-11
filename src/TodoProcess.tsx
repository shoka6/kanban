import React from "react";
import TaskCard from "./TaskCard";
import { selectTodoTask, created } from "./tasksSlice";
import { useAppSelector, AppDispatch } from "./store";

const TodoProcess = () => {
  const todoTasks = useAppSelector(selectTodoTask);
  console.log(todoTasks);
  return (
    <div className="h-5/6 w-1/3 bg-stone-200 text-center">
      <div>待機</div>
      <button
        type="button"
        onClick={() => AppDispatch(created({ requirement: "aaaa" }))}
      >
        新規
      </button>
      {todoTasks.map((task) => (
        <TaskCard key={task.id} requirement={task.requirement} />
      ))}
    </div>
  );
};

export default TodoProcess;
