import React from "react";
import { useDrag } from "react-aria";

const Task = () => {
  // eslint-disable-next-line no-unused-vars
  const { dragProps, isDragging: _ } = useDrag({
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
      <div>でも</div>
    </div>
  );
};

// const Task = () => {
//   const [text, setText] = useState("");
//   const title = "水やり";
//   const deadline = "12/31";
//   return (
//     <div className="w-48 rounded-md border-2 border-black">
//       <div className="">{title}</div>
//       <input value={text} onChange={(event) => setText(event.target.value)} />
//       <div>{deadline}</div>
//     </div>
//   );
// };

export default Task;
