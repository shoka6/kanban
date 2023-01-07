import React from "react";
import ProcessCollection from "./ProcessCollection";
import NewTask from "./NewTask";

function App() {
  return (
    <div className="h-screen">
      <header className="grid grid-cols-9 items-center bg-emerald-300 p-5">
        <p className="col-start-5 text-center">かんばん君</p>
        <NewTask />
      </header>
      <ProcessCollection />
    </div>
  );
}

export default App;
