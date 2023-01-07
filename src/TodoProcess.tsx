import React, { useRef } from "react";
import { useDrop } from "react-aria";
import TaskCard from "./TaskCard";
import { selectTodoTask, statusUpdated } from "./tasksSlice";
import { useAppSelector, AppDispatch } from "./store";

const TodoProcess = () => {
  const ref = useRef(null);
  const { dropProps } = useDrop({
    ref,
    async onDrop(e) {
      await Promise.all(
        e.items.map(async (item) => {
          if (item.kind === "text") {
            const id = await item.getText("id");
            AppDispatch(statusUpdated({ id, status: "TODO" }));
          }
        })
      );
    },
  });
  const todoTasks = useAppSelector(selectTodoTask);
  return (
    <div
      {...dropProps}
      ref={ref}
      className="h-5/6 w-1/3 bg-stone-200 text-center"
    >
      <div>待機</div>
      <div className="h-5/6 overflow-scroll">
        {todoTasks.map((task) => (
          <TaskCard key={task.id} id={task.id} requirement={task.requirement} />
        ))}
      </div>
    </div>
  );
};

export default TodoProcess;
