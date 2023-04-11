import On_Boarding from "../Component/Boarding/On_Boarding";
import Off_Boarding from "../Component/Boarding/Off_Boarding";
import Cabin_Add from "../Component/Cabin/Cabin_Add";
import Cabin_List from "../Component/Cabin/Cabin_List";
import Cabin_Slot_Booking from "../Component/Cabin/Cabin_Slot_Booking";
import Cabin_Update from "../Component/Cabin/Cabin_Update";
import Dashboard from "../Component/Dashboard";
import Department_Add from "../Component/Department/Department_Add";
import Department_List from "../Component/Department/Department_List";
import Department_Update from "../Component/Department/Department_Update";
import User_Add from "../Component/User/User_Add";
import User_List from "../Component/User/User_List";
import User_Update from "../Component/User/User_Update";
import Profile_Update from "../Component/User/Profile_Update";
import Form12BB from "../Component/Form12BB";
import Flexible_Benefit_Plan from "../Component/Flexible_Benefit_Plan";
import Form12BB_Final_Submit from "../Component/Form12BB_Final_Submit";
const Routes_Array = [
  //   <!================= User ==================>
  // {
  //   path: "/dashboard/*",
  //   component: Dashboard,
  //   allowedRoles: ["Admin", "Employee"],
  // },
  {
    path: "/user_list/:status_code",
    component: User_List,
    allowedRoles: ["Admin", "Hr", "Finance", "Managment", "Team member"],
  },
  {
    path: "/user_add",
    component: User_Add,
    allowedRoles: ["Admin", "Hr", "Finance", "Managment", "Team member"],
  },
  {
    path: "/user_update/:_id",
    component: User_Update,
    allowedRoles: ["Admin", "Hr", "Finance", "Managment", "Team member"],
  },
  {
    path: "/profile_update/:_id",
    component: Profile_Update,
    allowedRoles: ["Admin", "Hr", "Finance", "Managment", "Team member"],
  },
  //   <!================= Department ==================>
  {
    path: "/department_list",
    component: Department_List,
    allowedRoles: ["Admin", "Hr", "Finance", "Managment", "Team member"],
  },
  {
    path: "/department_add",
    component: Department_Add,
    allowedRoles: ["Admin", "Hr", "Finance", "Managment", "Team member"],
  },
  {
    path: "/department_update/:_id",
    component: Department_Update,
    allowedRoles: ["Admin", "Hr", "Finance", "Managment", "Team member"],
  },
  //   <!================= Cabin ==================>

  {
    path: "/cabin_add",
    component: Cabin_Add,
    allowedRoles: ["Admin", "Hr", "Finance", "Managment", "Team member"],
  },
  {
    path: "/cabin_list",
    component: Cabin_List,
    allowedRoles: ["Admin", "Hr", "Finance", "Managment", "Team member"],
  },
  {
    path: "/cabin_update/:_id",
    component: Cabin_Update,
    allowedRoles: ["Admin", "Hr", "Finance", "Managment", "Team member"],
  },
  //   <!================= Cabin Slot Booking ==================>
  {
    path: "/cabin_slot_booking",
    component: Cabin_Slot_Booking,
    allowedRoles: ["Admin", "Hr", "Finance", "Managment", "Team member"],
  },

  //   <!================= Boarding ==================>
  {
    path: "/on_boarding/:_id",
    component: On_Boarding,
    allowedRoles: ["Admin", "Hr", "Finance", "Managment", "Team member"],
  },
  {
    path: "/off_boarding/:_id",
    component: Off_Boarding,
    allowedRoles: ["Admin", "Hr", "Finance", "Managment", "Team member"],
  },
  //   <!================= Form's ==================>
  {
    path: "/form12bb",
    component: Form12BB,
    allowedRoles: ["Admin", "Hr", "Finance", "Managment", "Team member"],
  },

  {
    path: "/flexible_benefit_plan",
    component: Flexible_Benefit_Plan,
    allowedRoles: ["Admin", "Hr", "Finance", "Managment", "Team member"],
  },
];

export default Routes_Array;
