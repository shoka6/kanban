import React from "react";
import { useDrag } from "react-aria";
import { Task } from "./tasksSlice";

const TaskCard = ({ id, requirement }: Pick<Task, "id" | "requirement">) => {
  const { dragProps } = useDrag({
    getItems() {
      return [
        {
          id,
        },
      ];
    },
  });
  return (
    <div
      {...dragProps}
      className="mx-auto my-6 w-48 rounded-md border-2 border-black"
      draggable
    >
      <div>{requirement}</div>
    </div>
  );
};

export default TaskCard;
