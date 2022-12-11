import React, { useRef } from "react";
import { useDrop } from "react-aria";
import { statusUpdated, selectProgressTask } from "./tasksSlice";
import { AppDispatch, useAppSelector } from "./store";
import TaskCard from "./TaskCard";

const ProgressProcess = () => {
  const ref = useRef(null);
  const { dropProps } = useDrop({
    ref,
    async onDrop(e) {
      await Promise.all(
        e.items.map(async (item) => {
          if (item.kind === "text") {
            const id = await item.getText("id");
            AppDispatch(statusUpdated({ id, status: "PROGRESS" }));
          }
        })
      );
    },
  });

  const todoTasks = useAppSelector(selectProgressTask);
  return (
    <div
      {...dropProps}
      ref={ref}
      className="h-5/6 w-1/3 bg-stone-200 text-center"
    >
      <div>処理中</div>
      {todoTasks.map((task) => (
        <TaskCard key={task.id} id={task.id} requirement={task.requirement} />
      ))}
    </div>
  );
};

export default ProgressProcess;
