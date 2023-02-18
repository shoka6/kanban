import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useDrag } from "react-aria";
import {
  Task,
  requirementUpdated,
  deadlineUpdated,
  taskRemoved,
  selectTaskDeadline,
} from "./tasksSlice";
import { AppDispatch, useAppSelector } from "./store";
import { calculateRemainingHours } from "./util";

const TaskCard = ({ id, requirement }: Pick<Task, "id" | "requirement">) => {
  const [requirementState, setRequirementState] = useState(requirement);
  const deadline = useAppSelector((state) => selectTaskDeadline(state, id));

  const remainingHours = calculateRemainingHours(deadline);

  const displayText = () => {
    if (remainingHours === null) return "不明";
    if (remainingHours < 24) return `あと${remainingHours}時間`;
    return `あと${Math.floor(remainingHours / 24)}日`;
  };

  const [draggable, setDraggable] = useState(true);

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
      className="mx-auto my-6 flex w-4/5 flex-col space-y-3 rounded-md border-2 border-black p-2"
      draggable={draggable}
    >
      <div className="flex justify-between">
        <input
          className="bg-inherit hover:bg-stone-300"
          value={requirementState}
          onChange={(event) => setRequirementState(event.target.value)}
          onFocus={() => {
            setDraggable(false);
          }}
          onBlur={() => {
            setDraggable(true);
            AppDispatch(
              requirementUpdated({ id, requirement: requirementState })
            );
          }}
        />
        <button
          type="button"
          onClick={() => {
            AppDispatch(taskRemoved({ id }));
          }}
        >
          <XMarkIcon className="h-5 w-5 rounded-sm hover:bg-stone-300" />
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
          className="bg-inherit text-right hover:bg-stone-300"
        />
        <div
          className={
            remainingHours && remainingHours < 24 ? "text-rose-600" : ""
          }
        >
          {displayText()}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
