import React, { useRef } from "react";
import { useDrop } from "react-aria";
import { AppDispatch, useAppSelector } from "./store";
import TaskCard from "./TaskCard";
import { statusUpdated, selectDoneTask } from "./tasksSlice";

const DoneProcess = () => {
  const ref = useRef(null);
  const { dropProps } = useDrop({
    ref,
    async onDrop(e) {
      await Promise.all(
        e.items.map(async (item) => {
          if (item.kind === "text") {
            const id = await item.getText("id");
            AppDispatch(statusUpdated({ id, status: "DONE" }));
          }
        })
      );
    },
  });
  const doneTasks = useAppSelector(selectDoneTask);

  return (
    <div
      {...dropProps}
      ref={ref}
      className="h-5/6 w-1/3 bg-stone-200 text-center"
    >
      <div>完了</div>
      {doneTasks.map((task) => (
        <TaskCard key={task.id} id={task.id} requirement={task.requirement} />
      ))}
    </div>
  );
};

export default DoneProcess;
