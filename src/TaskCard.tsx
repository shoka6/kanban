import React, { useState, useCallback } from "react";
import { useDrag } from "react-aria";
import { Task, requirementUpdated, taskRemoved } from "./tasksSlice";
import { AppDispatch } from "./store";

const TaskCard = ({ id, requirement }: Pick<Task, "id" | "requirement">) => {
  const [state, setState] = useState(requirement);
  const todayValue = useCallback(() => {
    const today = new Date();
    today.setDate(today.getDate());
    const yyyy = today.getFullYear();
    const mm = `0${today.getMonth() + 1}`.slice(-2);
    const dd = `0${today.getDate()}`.slice(-2);
    return `${yyyy}-${mm}-${dd}`;
  }, []);

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
        value={state}
        onChange={(event) => setState(event.target.value)}
        onBlur={() => {
          AppDispatch(requirementUpdated({ id, requirement: state }));
        }}
        className="bg-inherit"
      />
      <div className="flex flex-row-reverse">
        <input
          type="date"
          value={todayValue()}
          className="bg-inherit text-right"
        />
        <div>あとN日</div>
      </div>
    </div>
  );
};

export default TaskCard;
