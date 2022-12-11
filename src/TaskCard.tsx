import React, { useState } from "react";
import { useDrag } from "react-aria";
import { Task, requirementUpdated, taskRemoved } from "./tasksSlice";
import { AppDispatch } from "./store";

const TaskCard = ({ id, requirement }: Pick<Task, "id" | "requirement">) => {
  const [state, setState] = useState(requirement);
  const { dragProps } = useDrag({
    getItems() {
      return [
        {
          id: id as string,
        },
      ];
    },
  });
  return (
    <div
      {...dragProps}
      className="relative mx-auto my-6 w-60 space-y-3 rounded-md border-2 border-black"
      draggable
    >
      <button
        type="button"
        className="absolute top-0 right-0 text-lg"
        onClick={() => {
          AppDispatch(taskRemoved({ id }));
        }}
      >
        X
      </button>
      <input
        value={state}
        onChange={(event) => setState(event.target.value)}
        onBlur={() => {
          // dispatch する。
          AppDispatch(requirementUpdated({ id, requirement: state }));
          console.log("フォーカス外れたよ");
        }}
        className="bg-inherit"
      />
      <div className="text-right">12/31</div>
    </div>
  );
};

export default TaskCard;
