import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import ImportScript from "../Utils/ImportScript";

const Sidebar = () => {
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));

  const scriptArrsy = ["/assets/js/misc.js"];
  ImportScript(scriptArrsy);

  return (
    <>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <NavLink className="nav-link" to="/">
              <div className="nav-profile-image">
                <img src="../assets/images/faces/face1.jpg" alt="profile" />
                <span className="login-status online"></span>
                {/* <!--change to offline or busy as needed--> */}
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
            {/* <a href="#" className="nav-link">
              <div className="nav-profile-image">
                <img src="../assets/images/faces/face1.jpg" alt="profile" />
                <span className="login-status online"></span>
                <!--change to offline or busy as needed-->
              </div>
              <div className="nav-profile-text d-flex flex-column">
                <span className="font-weight-bold mb-2">David Grey. H</span>
                <span className="text-secondary text-small">
                  Project Manager
                </span>
              </div>
              <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
            </a> */}
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              <span className="menu-title">Dashboard</span>
              <i className="mdi mdi-home menu-icon"></i>
            </NavLink>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              data-bs-toggle="collapse"
              href="#ui-basic"
              aria-expanded="false"
              aria-controls="ui-basic"
            >
              <span class="menu-title">Forms</span>
              <i class="menu-arrow"></i>
              <i class="mdi mdi-book-plus menu-icon"></i>
            </a>
            <div class="collapse" id="ui-basic">
              <ul class="nav flex-column sub-menu">
                <ul className="nav flex-column sub-menu">
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
                </ul>
              </ul>
            </div>
          </li>
          {LocalStorageData?.role?.map(
            (val) =>
              val?.name === "Admin" && (
                <>
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
                      <ul class="nav flex-column sub-menu">
                        <ul className="nav flex-column sub-menu">
                          <li className="nav-item">
                            <NavLink
                              className="nav-link"
                              to="/user_list/all_users"
                            >
                              Users List
                            </NavLink>
                          </li>
                        </ul>
                      </ul>
                    </div>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-bs-toggle="collapse"
                      href="#ui-role"
                      aria-expanded="false"
                      aria-controls="ui-basic"
                    >
                      <span class="menu-title">Department</span>
                      <i class="menu-arrow"></i>
                      <i class="mdi mdi-crosshairs-gps menu-icon"></i>
                    </a>
                    <div class="collapse" id="ui-role">
                      <ul class="nav flex-column sub-menu">
                        <ul className="nav flex-column sub-menu">
                          <li className="nav-item">
                            <NavLink className="nav-link" to="/department_list">
                              Department List
                            </NavLink>
                          </li>
                        </ul>
                      </ul>
                    </div>
                  </li>
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
                        <ul className="nav flex-column sub-menu">
                          <li className="nav-item">
                            <NavLink className="nav-link" to="/cabin_list">
                              Cabin List
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              className="nav-link"
                              to="/cabin_slot_booking"
                            >
                              Cabin Booking
                            </NavLink>
                          </li>
                        </ul>
                      </ul>
                    </div>
                  </li>
                </>
              )
          )}

          {/* <li class="nav-item">
            <a
              class="nav-link"
              data-bs-toggle="collapse"
              href="#ui-boarding"
              aria-expanded="false"
              aria-controls="ui-basic"
            >
              <span class="menu-title">Boaring</span>
              <i class="menu-arrow"></i>
              <i class="mdi mdi-airplane menu-icon"></i>
            </a>
            <div class="collapse" id="ui-boarding">
              <ul class="nav flex-column sub-menu">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/on_boarding">
                      On Boaring
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                      Off Boaring
                    </NavLink>
                  </li>
                </ul>
              </ul>
            </div>
          </li> */}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
