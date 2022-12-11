import React from "react";
import TodoProcess from "./TodoProcess";
import ProgressProcess from "./ProgressProcess";
import DoneProcess from "./DoneProcess";

const ProcessCollection = () => (
  <div className="m-6 flex h-full justify-center space-x-6">
    <TodoProcess />
    <ProgressProcess />
    <DoneProcess />
  </div>
);

export default ProcessCollection;
