import React from "react";
import Converter from "./components/Converter";
import "./stylesheets/index.css";

function App() {
  return (
    <div>
      <div className="max-w-4xl m-auto pb-6 pt-40">
        <Converter />
      </div>
    </div>
  );
}

export default App;
