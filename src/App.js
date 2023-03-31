import React from "react";
import "./App.css";
import { BrowserRouter as Router, Form, Route, Routes } from "react-router-dom";
import Sign_In from "./Component/Sign_In";
import Sign_Up from "./Component/Sign_Up";
import Private_Routes from "./Utils/Private_Routes";
import Routes_Array from "./Utils/Routes";
import $ from "jquery";
import Form12BB from "./Component/Form12BB";
import Get_Form12bb_Data from "./Component/Get_Form12bb_Data";
import Flexible_Benefit_Plan from "./Component/Flexible_Benefit_Plan";
import Get_Form_Flexi_Benefit_Data from "./Component/Get_Form_Flexi_Benefit_Data";
import Forms from "./Component/Forms";
import Forms_Data_Download from "./Component/Forms_Data_Download";
function App() {
  return (
    <>
      <Router>
        <Routes>
          {Routes_Array.map((val) => (
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
          {/* <Route exact path="*" element={<Sign_In />} /> */}
          <Route exact path="/sign_up" element={<Sign_Up />} />
          <Route exact path="/forms" element={<Forms />} />
          <Route
            exact
            path="/forms_data_download"
            element={<Forms_Data_Download />}
          />
          <Route exact path="/form12bb" element={<Form12BB />} />
          <Route
            exact
            path="/get_form12bb_data"
            element={<Get_Form12bb_Data />}
          />
          <Route
            exact
            path="/flexible_benefit_plan"
            element={<Flexible_Benefit_Plan />}
          />
          <Route
            exact
            path="/get_flexi_form_data"
            element={<Get_Form_Flexi_Benefit_Data />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
