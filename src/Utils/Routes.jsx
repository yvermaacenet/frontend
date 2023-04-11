import On_Boarding from "../Component/Boarding/On_Boarding";
import Off_Boarding from "../Component/Boarding/Off_Boarding";
import Cabin_Add from "../Component/Cabin/Cabin_Add";
import Cabin_List from "../Component/Cabin/Cabin_List";
import Cabin_Slot_Booking from "../Component/Cabin/Cabin_Slot_Booking";
import Cabin_Update from "../Component/Cabin/Cabin_Update";
import Dashboard from "../Component/Dashboard";
import User_List from "../Component/User/User_List";
import Form12BB from "../Component/Forms/Form12BB";
import Flexible_Benefit_Plan from "../Component/Forms/Flexible_Benefit_Plan";
const Routes_Array = [
  //   <!================= User ==================>
  {
    path: "/dashboard/*",
    component: Dashboard,
    allowedRoles: ["Admin", "Hr", "Finance", "Management", "Team member"],
  },
  {
    path: "/user_list/:status_code",
    component: User_List,
    allowedRoles: ["Admin", "Hr", "Finance", "Management"],
  },

  {
    path: "/cabin_add",
    component: Cabin_Add,
    allowedRoles: ["Admin", "Hr", "Finance", "Management", "Team member"],
  },
  {
    path: "/cabin_list",
    component: Cabin_List,
    allowedRoles: ["Admin", "Hr", "Finance", "Management", "Team member"],
  },
  {
    path: "/cabin_update/:_id",
    component: Cabin_Update,
    allowedRoles: ["Admin", "Hr", "Finance", "Management", "Team member"],
  },
  //   <!================= Cabin Slot Booking ==================>
  {
    path: "/cabin_slot_booking",
    component: Cabin_Slot_Booking,
    allowedRoles: ["Admin", "Hr", "Finance", "Management", "Team member"],
  },

  //   <!================= Boarding ==================>
  {
    path: "/on_boarding/:_id",
    component: On_Boarding,
    allowedRoles: ["Admin", "Hr", "Finance", "Management", "Team member"],
  },
  {
    path: "/off_boarding/:_id",
    component: Off_Boarding,
    allowedRoles: ["Admin", "Hr", "Finance", "Management", "Team member"],
  },
  //   <!================= Form's ==================>
  {
    path: "/form12bb",
    component: Form12BB,
    allowedRoles: ["Admin", "Hr", "Finance", "Management", "Team member"],
  },

  {
    path: "/flexible_benefit_plan",
    component: Flexible_Benefit_Plan,
    allowedRoles: ["Admin", "Hr", "Finance", "Management", "Team member"],
  },
];

export default Routes_Array;
