import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useDrag } from "react-aria";
import {
  Task,
  requirementUpdated,
  deadlineUpdated,
  taskRemoved,
  selectTaskDeadline,
} from "./tasksSlice";
import { AppDispatch, useAppSelector } from "./store";
import { calculateRemainingDate } from "./util";

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
      <div className="flex justify-between">
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
        <button
          type="button"
          onClick={() => {
            AppDispatch(taskRemoved({ id }));
          }}
        >
          <XMarkIcon className="m-1 h-4 w-4 rounded-sm hover:bg-stone-300" />
        </button>
      </div>
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
        <div>{`あと${calculateRemainingDate(deadline)}日`}</div>
      </div>
    </div>
  );
};

export default TaskCard;
