
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalDisplayApp from "./GlobalDisplayApp";
import "./index.css";
import LineChart from "./chart";

//R

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<GlobalDisplayApp />} />
          <Route path="/chart" element={<LineChart />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));