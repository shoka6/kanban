import React, { useState } from "react";
import { useDrag } from "react-aria";
import {
  Task,
  requirementUpdated,
  deadlineUpdated,
  taskRemoved,
  selectTaskDeadline,
} from "./tasksSlice";
import { AppDispatch, useAppSelector } from "./store";

const TaskCard = ({ id, requirement }: Pick<Task, "id" | "requirement">) => {
  const [requirementState, setRequirementState] = useState(requirement);
  const deadline = useAppSelector((state) => selectTaskDeadline(state, id));

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
      className="mx-auto my-6 flex w-4/5 flex-col space-y-3 rounded-md border-2 border-black"
      draggable
    >
      <button
        type="button"
        className="top-0 right-0 text-right text-lg"
        onClick={() => {
          AppDispatch(taskRemoved({ id }));
        }}
      >
        X
      </button>
      <input
        value={requirementState}
        onChange={(event) => setRequirementState(event.target.value)}
        onBlur={() => {
          AppDispatch(
            requirementUpdated({ id, requirement: requirementState })
          );
        }}
        className="bg-inherit"
      />
      <div className="flex flex-row-reverse">
        <input
          type="date"
          value={deadline}
          onChange={(event) => {
            if (deadline)
              AppDispatch(
                deadlineUpdated({ id, deadline: event.target.value })
              );
          }}
          className="bg-inherit text-right"
        />
        <div>あとN日</div>
      </div>
    </div>
  );
};

export default TaskCard;
