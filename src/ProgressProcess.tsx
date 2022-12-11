import React, { useState, useRef } from "react";
import { useDrop, DropItem } from "react-aria";

const ProgressProcess = () => {
  const [dropped, setDropped] = useState<DropItem[]>([]);
  const ref = useRef(null);
  const { dropProps } = useDrop({
    ref,
    async onDrop(e) {
      const items: DropItem[] = await Promise.all(
        e.items
          .filter(
            (item) =>
              item.kind === "text" &&
              (item.types.has("text/plain") ||
                item.types.has("my-app-custom-type"))
          )
          .map(async (item) => {
            if (item.kind === "text" && item.types.has("my-app-custom-type")) {
              return JSON.parse(await item.getText("my-app-custom-type"));
            }
            return { message: "aaa" };
          })
      );
      setDropped(items);
    },
  });
  if (dropped.length) {
    console.log(dropped);
    setDropped([]);
  }

  return (
    <div
      {...dropProps}
      ref={ref}
      className="h-5/6 w-1/3 bg-stone-200 text-center"
    >
      <div>処理中</div>
    </div>
  );
};

export default ProgressProcess;
