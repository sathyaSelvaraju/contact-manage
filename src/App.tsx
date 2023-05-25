import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Charts from "./pages/Maps";
import Contact from "./pages/Contact";
import Maps from "./pages/Charts";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="charts" element={<Charts />}>
          {" "}
        </Route>
        <Route path="/" element={<Contact />}></Route>
        <Route path="maps" element={<Maps />}></Route>
      </Routes>
    </div>
  );
}

export default App;
