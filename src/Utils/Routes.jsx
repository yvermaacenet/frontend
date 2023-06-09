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
import Get_Form_Flexi_Benefit_Data from "../Component/Forms/Get_Form_Flexi_Benefit_Data";
import Get_Form12bb_Data from "../Component/Forms/Get_Form12bb_Data";
import Travel_Request_Form from "../Component/Travel/Travel_Request_Form";
import Get_Travel_Request_Form_Data from "../Component/Travel/Get_Travel_Request_Form_Data";
import Travel_Approval_Request from "../Component/Travel/Travel_Approval_Request";
import Travel_Action from "../Component/Travel/Travel_Action";
import Edit_Travel_Action from "../Component/Travel/Edit_Travel_Action";
import Error_404 from "../Partials/Error_404";
import Error_403 from "../Partials/Error_403";
import Error_500 from "../Partials/Error_500";

// Akshay
//route
const Routes_Array = [
  //   <!================= User ==================>
  {
    path: "/dashboard",
    component: Dashboard,
    allowedRoles: ["Admin", "Hr", "Finance", "Management", "Team member", "CA"],
  },
  {
    path: "/user_list/:status_code",
    component: User_List,
    allowedRoles: ["Admin", "Hr", "Finance", "Management"],
  },

  {
    path: "/cabin_add",
    component: Cabin_Add,
    allowedRoles: ["Admin"],
  },
  {
    path: "/cabin_list",
    component: Cabin_List,
    allowedRoles: ["Admin"],
  },
  {
    path: "/cabin_update/:_id",
    component: Cabin_Update,
    allowedRoles: ["Admin"],
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
    allowedRoles: ["Admin", "Hr", "Finance", "Management"],
  },
  {
    path: "/off_boarding/:_id",
    component: Off_Boarding,
    allowedRoles: ["Admin", "Hr", "Management", "Finance"],
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
  {
    path: "/get_form12bb_data",
    component: Get_Form12bb_Data,
    allowedRoles: ["Admin"],
  },
  {
    path: "/get_form_flexi_benefit_data",
    component: Get_Form_Flexi_Benefit_Data,
    allowedRoles: ["Admin"],
  },
  {
    path: "/travelrequestform",
    component: Travel_Request_Form,
    allowedRoles: ["Admin", "Hr", "Finance", "Management", "Team member"],
  },

  {
    path: "/alltravelrequest",
    component: Get_Travel_Request_Form_Data,
    allowedRoles: ["Admin", "Hr", "Finance", "Management", "Team member"],
  },

  {
    path: "/travelrequestreceived",
    component: Travel_Approval_Request,
    allowedRoles: ["Admin", "Hr", "Finance", "Management"],
  },

  {
    path: "/travelactionpage/:_id",
    component: Travel_Action,
    allowedRoles: ["Admin", "Hr", "Finance", "Management", "Team member"],
  },
  {
    path: "/edittravelactionpage/:_id",
    component: Edit_Travel_Action,
    allowedRoles: ["Admin", "Hr", "Finance", "Management", "Team member"],
  },
  {
    path: "*",
    component: Dashboard,
    allowedRoles: ["Admin", "Hr", "Finance", "Management", "Team member", "CA"],
  },
  {
    path: "/error_404",
    component: Error_404,
    allowedRoles: ["Admin", "Hr", "Finance", "Management", "Team member", "CA"],
  },
  {
    path: "/error_403",
    component: Error_403,
    allowedRoles: ["Admin", "Hr", "Finance", "Management", "Team member", "CA"],
  },
  {
    path: "/error_500",
    component: Error_500,
    allowedRoles: ["Admin", "Hr", "Finance", "Management", "Team member", "CA"],
  },
];

export default Routes_Array;
