import React from "react";
import ProcessCollection from "./ProcessCollection";
import NewTask from "./NewTask";

function App() {
  return (
    <div className="h-screen">
      <header className="flex justify-around space-x-20 bg-emerald-300 p-6">
        <div className="" />
        <p className="">かんばん君</p>
        <NewTask />
      </header>
      <ProcessCollection />
    </div>
  );
}

export default App;
