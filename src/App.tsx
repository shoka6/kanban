import React from "react";
import ProcessCollection from "./ProcessCollection";

function App() {
  return (
    <div className="h-screen">
      <header className="flex justify-center bg-emerald-300 p-6">
        <p className="">かんばん君</p>
      </header>
      <ProcessCollection />
    </div>
  );
}

export default App;
