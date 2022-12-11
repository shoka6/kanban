import React, { useState } from "react";

const Task = () => {
  const [text, setText] = useState("");
  const title = "水やり";
  const deadline = "12/31";
  return (
    <div className="w-48 rounded-md border-2 border-black">
      <div className="">{title}</div>
      <input value={text} onChange={(event) => setText(event.target.value)} />
      <div>{deadline}</div>
    </div>
  );
};

export default Task;
