import React from "react";
import "./App.css";
import { BrowserRouter as Router, Form, Route, Routes } from "react-router-dom";
import Sign_In from "./Component/Sign_In";
import Private_Routes from "./Utils/Private_Routes";
import Routes_Array from "./Utils/Routes";
function App() {
  return (
    <>
      <Router>
        <Routes>
          {Routes_Array?.map((val) => (
            <Route
              path={val?.path}
              element={
                <Private_Routes allowedRoles={val?.allowedRoles}>
                  <val.component />
                </Private_Routes>
              }
            />
          ))}
          <Route exact path="/" element={<Sign_In />} />
          <Route exact path="*" element={<Sign_In />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
