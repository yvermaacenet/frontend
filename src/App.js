import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sign_In from "./Component/Sign_In";
import Sign_Up from "./Component/Sign_Up";
import Private_Routes from "./Utils/Private_Routes";
import Dashboard from "./Component/Dashboard";
import User_List from "./Component/User/User_List";
import Cabin_Slot_Booking from "./Component/Cabin/Cabin_Slot_Booking";
import Cabin_List from "./Component/Cabin/Cabin_List";
import Department_List from "./Component/Department/Department_List";
import User_Update from "./Component/User/User_Update";
import User_Add from "./Component/User/User_Add";
import Cabin_Add from "./Component/Cabin/Cabin_Add";
import Cabin_Update from "./Component/Cabin/Cabin_Update";
import Department_Add from "./Component/Department/Department_Add";
import Department_Update from "./Component/Department/Department_Update";
import Multi_Step_Form from "./Component/Multi_Step_Form";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Private_Routes />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
            {/* <!================= User ==================> */}
            <Route exact path="/user_list" element={<User_List />} />
            <Route exact path="/user_add" element={<User_Add />} />
            <Route exact path="/user_update/:_id" element={<User_Update />} />
            {/* <!================= Role ==================> */}
            <Route
              exact
              path="/department_list"
              element={<Department_List />}
            />
            <Route exact path="/department_add" element={<Department_Add />} />
            <Route
              exact
              path="/department_update/:_id"
              element={<Department_Update />}
            />
            {/* <!================= Cabin ==================> */}
            <Route exact path="/cabin_add" element={<Cabin_Add />} />
            <Route exact path="/cabin_update/:_id" element={<Cabin_Update />} />
            <Route exact path="/cabin_list" element={<Cabin_List />} />
            {/* <!================= Cabin Slot Booking ==================> */}
            <Route
              exact
              path="/cabin_slot_booking"
              element={<Cabin_Slot_Booking />}
            />
            {/* <!================= Boarding ==================> */}
            <Route
              exact
              path="/Multi_Step_Form"
              element={<Multi_Step_Form />}
            />
          </Route>
          <Route exact path="/" element={<Sign_In />} />
          <Route exact path="*" element={<Sign_In />} />
          <Route exact path="/sign_up" element={<Sign_Up />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
