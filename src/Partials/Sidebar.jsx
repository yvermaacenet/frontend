import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ImportScript from "../Utils/ImportScript";

const Sidebar = () => {
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [state, setState] = useState(LocalStorageData);
  const scriptArrsy = ["/assets/js/misc.js"];
  ImportScript(scriptArrsy);
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
            {(state?.zoho_role === "Admin" ||
              state?.zoho_role === "Hr" ||
              state?.zoho_role === "Finance" ||
              state?.zoho_role === "Management") && (
              <li class="nav-item">
                <a
                  class="nav-link"
                  data-bs-toggle="collapse"
                  href="#ui-basic"
                  aria-expanded="false"
                  aria-controls="ui-basic"
                >
                  <span class="menu-title">Users</span>
                  <i class="menu-arrow"></i>
                  <i class="mdi mdi-account-multiple-outline menu-icon"></i>
                </a>
                <div class="collapse" id="ui-basic">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/user_list/active_users"
                      >
                        Users List
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            )}
            <li class="nav-item">
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
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                data-bs-toggle="collapse"
                href="#ui-form"
                aria-expanded="false"
                aria-controls="ui-basic"
              >
                <span class="menu-title">Forms</span>
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
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/travelrequestform">
                      Travel Request
                    </NavLink>
                  </li>

                  {LocalStorageData?.zoho_role === "Finance" ||
                    (LocalStorageData?.zoho_role === "Admin" && (
                      <>
                        <li className="nav-item">
                          <NavLink className="nav-link" to="/get_form12bb_data">
                            Download Form 12 BB <br /> Data
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            className="nav-link"
                            to="/get_form_flexi_benefit_data"
                          >
                            Download Form Flexible <br /> Benefit Data
                          </NavLink>
                        </li>
                      </>
                    ))}
                </ul>
              </div>
            </li>
          </>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
