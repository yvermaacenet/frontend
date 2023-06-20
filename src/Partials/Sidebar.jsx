import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ImportScript from "../Utils/ImportScript";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [state, setState] = useState(LocalStorageData);
  const scriptArrsy = ["/assets/js/misc.js"];
  ImportScript(scriptArrsy);
  const [isManager, setIsManager] = useState(false);
  const [counterList, setCounterList] = useState([]);

  // useEffect(() => {
  //   async function get_counterList() {
  //     await axios
  //       .get(
  //         `/documents_counter/${LocalStorageData?.user_id}/${LocalStorageData?.emp_id}/${LocalStorageData?.zoho_role}/${LocalStorageData?.email}`,
  //         {
  //           headers: { Access_Token: LocalStorageData?.generate_auth_token },
  //         }
  //       )
  //       .then((res) => {
  //         return setCounterList(res?.data);
  //       })
  //       .catch((err) => {
  //         if (err.response.status === 500) {
  //           navigate("/error_500");
  //         } else {
  //           navigate("/error_403");
  //         }
  //       });
  //   }

  //   get_counterList();
  // }, []);

  return (
    <>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <NavLink className="nav-link" to="/">
              <div className="nav-profile-image">
                <img src={LocalStorageData?.photo} alt="image" />
                <span className="login-status online"></span>
              </div>
              <div className="nav-profile-text d-flex flex-column">
                <span className="font-weight-bold mb-2">
                  {LocalStorageData?.name}
                </span>
                <span className="text-secondary text-small">
                  {LocalStorageData?.department}
                </span>
              </div>
              <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink className="nav-link" to="/">
              <span className="menu-title">Dashboard</span>
              <i className="mdi mdi-home menu-icon"></i>
            </NavLink>
          </li> */}

          <>
            {state?.zoho_role !== "Team member" && (
              <li class="nav-item">
                <a
                  class="nav-link"
                  data-bs-toggle="collapse"
                  href="#ui-basic"
                  aria-expanded="false"
                  aria-controls="ui-basic"
                >
                  <span class="menu-title">Employee</span>
                  <i class="menu-arrow"></i>
                  <i class="mdi mdi-account-multiple-outline menu-icon"></i>
                </a>
                <div class="collapse" id="ui-basic">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/user_list/active_employee"
                      >
                        Employee List
                        {/* ({counterList?.Active_Users}) */}
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/user_list/pending_onboarding_employee"
                      >
                        Pending Onboarding
                        {/* ({counterList?.Pending_Onboarding}) */}
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/user_list/pending_offboarding_employee"
                      >
                        Pending Offboarding
                        {/* ({counterList?.Pending_Offboarding}) */}
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            )}
            {/* <li class="nav-item">
              <a
                class="nav-link"
                data-bs-toggle="collapse"
                href="#ui-cabin"
                aria-expanded="false"
                aria-controls="ui-basic"
              >
                <span class="menu-title">Cabin</span>
                <i class="menu-arrow"></i>
                <i class="mdi mdi-home-modern menu-icon"></i>
              </a>
              <div class="collapse" id="ui-cabin">
                <ul class="nav flex-column sub-menu">
                  {state?.zoho_role === "Admin" && (
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/cabin_list">
                        Cabin List
                      </NavLink>
                    </li>
                  )}

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/cabin_slot_booking">
                      Cabin Booking
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li> */}
            <li class="nav-item">
              <a
                class="nav-link"
                data-bs-toggle="collapse"
                href="#ui-form"
                aria-expanded="false"
                aria-controls="ui-basic"
              >
                <span class="menu-title">Tax Forms</span>
                <i class="menu-arrow"></i>
                <i class="mdi mdi-book-plus menu-icon"></i>
              </a>
              <div class="collapse" id="ui-form">
                <ul class="nav flex-column sub-menu">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/form12bb">
                      Form 12 BB
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/flexible_benefit_plan">
                      Form Flexible Benefit
                    </NavLink>
                  </li>

                  {(LocalStorageData?.zoho_role === "Finance" ||
                    LocalStorageData?.zoho_role === "Admin") && (
                    <>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/get_form12bb_data">
                          Download Form <br />
                          12 BB Data
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          to="/get_form_flexi_benefit_data"
                        >
                          Download Form <br /> Flexible Benefit Data
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                data-bs-toggle="collapse"
                href="#ui-travel_request"
                aria-expanded="false"
                aria-controls="ui-basic"
              >
                <span class="menu-title">Travel Request</span>
                <i class="menu-arrow"></i>
                <i class="mdi mdi-wallet-travel menu-icon"></i>
              </a>
              <div class="collapse" id="ui-travel_request">
                <ul class="nav flex-column sub-menu">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/alltravelrequest">
                      My Requests ({counterList?.Travel_Request_By_User_ID})
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/travelrequestform">
                      Create Request
                    </NavLink>
                  </li>
                  {(LocalStorageData?.zoho_role === "Management" ||
                    LocalStorageData?.zoho_role === "Admin") && (
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/travelrequestreceived">
                        Approval/Decline
                        <br /> Request (
                        {counterList?.Travel_Request_For_Approval_and_Decline})
                      </NavLink>
                    </li>
                  )}
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cabin_slot_booking">
                <span className="menu-title">Cabin Booking</span>
                <i className="mdi mdi-home-modern menu-icon"></i>
              </NavLink>
            </li>
          </>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
