import React from "react";
import { useDrag } from "react-aria";
import { Task } from "./tasksSlice";

const TaskCard = ({ requirement }: Pick<Task, "requirement">) => {
  const { dragProps } = useDrag({
    getItems() {
      return [
        {
          "text/plain": "hello world",
        },
      ];
    },
  });
  return (
    <div
      {...dragProps}
      className="w-48 rounded-md border-2 border-black"
      draggable
    >
      <div>{requirement}</div>
    </div>
  );
};

export default TaskCard;
