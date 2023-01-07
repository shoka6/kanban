import React from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { created } from "./tasksSlice";
import { AppDispatch } from "./store";

const NewTask = () => (
  <button
    className="col-start-8 w-fit rounded-md px-5 py-1 text-center hover:bg-emerald-400"
    type="button"
    onClick={() =>
      AppDispatch(created({ requirement: "ここにタスクを入力してください" }))
    }
  >
    <div className="flex justify-center space-x-2">
      <PlusIcon className="w-5" />
      <div>新規</div>
    </div>
  </button>
);

export default NewTask;
