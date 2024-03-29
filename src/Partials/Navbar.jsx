import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Navbar = () => {
  const navigate = useNavigate();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [cookies, setCookie, removeCookie] = useCookies();
  const [getData, setGetData] = useState({});
  const [isManager, setIsManager] = useState(false);

  // useEffect(() => {
  //   // const getAllManagersList = async () => {
  //   //   const resp = await axios.get(
  //   //     `${process.env.REACT_APP_BASE_URL}/get_user_list_By_Role_Name`
  //   //   );
  //   //   const allManagersId = resp.data.Reporting_Manager;
  //   //   const filtered = allManagersId.includes(LocalStorageData?.emp_id);
  //   //   setIsManager(filtered);
  //   // };
  //   // getAllManagersList();

  //   const get_notifications_counter = async () => {
  //     const res = await axios
  //       .get(
  //         `${process.env.REACT_APP_BASE_URL}/notifications_counter/${LocalStorageData?.reporting_manager}/${LocalStorageData?.zoho_role}`,
  //         {
  //           headers: { authorization: LocalStorageData?.generate_auth_token },
  //         }
  //       )
  //       .then((res) => setGetData(res.data))
  //       .catch((err) => {
  //         if (err.response.status === 500) {
  //           navigate("/error_500");
  //         } else {
  //           navigate("/error_403");
  //         }
  //       });
  //   };
  //   get_notifications_counter();
  // }, []);
  useEffect(() => {
    document.getElementById("body").classList.add("sidebar-icon-only");
  }, []);
  return (
    <>
      <nav className="navbar default-layout-navbar p-0 fixed-top d-flex flex-row">
        <div className="navbar-menu-wrapper w-100 d-flex align-items-stretch">
          {/* <div className="search-field d-none d-md-block">
            <form className="d-flex align-items-center h-100" action="#">
              <div className="input-group">
                <div className="input-group-prepend bg-transparent">
                  <i className="input-group-text border-0 mdi mdi-magnify"></i>
                </div>
                <input
                  type="text"
                  className="form-control bg-transparent border-0"
                  placeholder="Search projects"
                />
              </div>
            </form>
          </div> */}
          <div className="w-100 d-flex">
            <div className="w-100 d-flex align-items-center justify-content-between">
              <div>
                <button
                  className="navbar-toggler ms-4 navbar-toggler align-self-center"
                  type="button"
                  data-bs-toggle="minimize"
                  onClick={() =>
                    document
                      .getElementById("body")
                      .classList.toggle("sidebar-icon-only")
                  }
                >
                  <span className="mdi mdi-menu"></span>
                </button>
              </div>
              <div>
                <NavLink to="/" style={{ textDecoration: "none" }}>
                  {/* <img src="../assets/images/aceAppsTitle.png" alt="logo" /> */}
                  <h1>
                    A<span style={{ fontWeight: "200" }}>ce</span>Apps
                  </h1>
                </NavLink>
              </div>
              <div>
                <ul className="navbar-nav navbar-nav-right">
                  <li className="nav-item nav-profile dropdown">
                    <a
                      // className="nav-link dropdown-toggle"
                      className="nav-link"
                      id="profileDropdown"
                      href="#"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="nav-profile-img">
                        <img src={LocalStorageData?.photo} alt="image" />
                        <span className="availability-status online"></span>
                      </div>
                      <div className="nav-profile-text">
                        <p className="mb-1 text-black">
                          {LocalStorageData?.name}
                        </p>
                      </div>
                    </a>
                    {/* <div
                className="dropdown-menu navbar-dropdown"
                aria-labelledby="profileDropdown"
              >
                <NavLink
                  className="dropdown-item"
                  to={`/profile_update/${LocalStorageData?.user_id}`}
                >
                  <i className="mdi mdi-account me-2 text-primary"></i> Profile
                </NavLink>
                <div className="dropdown-divider"></div>
                <NavLink
                  className="dropdown-item"
                  to={`/on_boarding/${LocalStorageData?.user_id}`}
                >
                  <i className="mdi mdi-airplane me-2 text-success"></i>
                  On-Boarding
                </NavLink>
                <div className="dropdown-divider"></div>
                <NavLink
                  className="dropdown-item"
                  to={`/off_boarding/${LocalStorageData?.user_id}`}
                >
                  <i className="mdi mdi-airplane-off me-2 text-danger"></i>
                  Off-Boarding
                </NavLink>
                <div className="dropdown-divider"></div>
              </div> */}

                    <ReactTooltip
                      anchorId="fullscreen_tooltip"
                      place="bottom"
                      content="Go Full Screen"
                    />
                  </li>
                  {/* <li
              data-for="enrich"
              data-tip="sooooo cute"
              id="fullscreen_tooltip"
              className="nav-item d-none d-lg-block full-screen-link"
            >
              <a className="nav-link">
                <i className="mdi mdi-fullscreen" id="fullscreen-button"></i>
              </a>
            </li> */}
                  {/* <li className="nav-item dropdown">
              <a
                className="nav-link count-indicator dropdown-toggle"
                id="messageDropdown"
                href="#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="mdi mdi-email-outline"></i>
                <span className="count-symbol bg-warning"></span>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                aria-labelledby="messageDropdown"
              >
                <h6 className="p-3 mb-0">Messages</h6>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img
                      src="../assets/images/faces/face4.jpg"
                      alt="image"
                      className="profile-pic"
                    />
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject ellipsis mb-1 font-weight-normal">
                      Mark send you a message
                    </h6>
                    <p className="text-gray mb-0"> 1 Minutes ago </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img
                      src="../assets/images/faces/face2.jpg"
                      alt="image"
                      className="profile-pic"
                    />
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject ellipsis mb-1 font-weight-normal">
                      Cregh send you a message
                    </h6>
                    <p className="text-gray mb-0"> 15 Minutes ago </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img
                      src="../assets/images/faces/face3.jpg"
                      alt="image"
                      className="profile-pic"
                    />
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject ellipsis mb-1 font-weight-normal">
                      Profile picture updated
                    </h6>
                    <p className="text-gray mb-0"> 18 Minutes ago </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <h6 className="p-3 mb-0 text-center">4 new messages</h6>
              </div>
            </li> */}
                  {/* {(isManager ||
              LocalStorageData?.zoho_role === "Management" ||
              LocalStorageData?.zoho_role === "Admin") && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link count-indicator dropdown-toggle"
                  id="notificationDropdown"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  <i className="mdi mdi-bell-outline"></i>
                  <span
                    className={`count-symbol ${
                      getData?.Total_Notification === "0"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  ></span>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                  aria-labelledby="notificationDropdown"
                >
                  <h6 className="p-3 mb-0">Notifications</h6>
                  <div className="dropdown-divider"></div>
                  {getData?.Total_Notification > 0 && (
                    <NavLink
                      className="dropdown-item preview-item"
                      to="/travelrequestreceived"
                    >
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-danger">
                          <i className="mdi mdi-wallet-travel"></i>
                        </div>
                      </div>

                      <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject font-weight-normal mb-1">
                          Travel Request
                        </h6>
                        <p className="text-gray ellipsis mb-0">
                          {getData?.Total_Notification} request has been pending
                        </p>
                      </div>
                    </NavLink>
                  )}
                  <div className="dropdown-divider"></div> */}
                  {/* <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-warning">
                      <i className="mdi mdi-settings"></i>
                    </div>
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject font-weight-normal mb-1">
                      Settings
                    </h6>
                    <p className="text-gray ellipsis mb-0">Update dashboard</p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-info">
                      <i className="mdi mdi-link-variant"></i>
                    </div>
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject font-weight-normal mb-1">
                      Launch Admin
                    </h6>
                    <p className="text-gray ellipsis mb-0"> New admin wow! </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div> */}
                  {/* <h6 className="p-3 mb-0 text-center">See all notifications</h6> */}
                  {/* </div>
              </li>
            )} */}
                  <ReactTooltip
                    anchorId="logout_tooltip"
                    place="bottom"
                    content="Logout"
                  />

                  <li
                    id="logout_tooltip"
                    className="nav-item nav-logout d-none d-lg-block"
                  >
                    <NavLink
                      className="nav-link"
                      onClick={() => {
                        return (
                          localStorage.clear(), removeCookie(), navigate("/")
                          // alert("");
                        );
                      }}
                      to="/"
                    >
                      <i
                        className="mdi mdi-logout"
                        style={{ color: "#d14124" }}
                      ></i>
                    </NavLink>
                  </li>

                  {/* <ReactTooltip
              anchorId="scrolltotop"
              place="bottom"
              content="Scroll To Top"
            /> */}
                  {/* <li
              id="scrolltotop"
              className="nav-item nav-settings d-none d-lg-block"
            >
              <a className="nav-link" href="#">
                <i className="mdi mdi-format-line-spacing"></i>
              </a>
            </li> */}
                </ul>
              </div>
              {/* <NavLink to="/">
                <img
                  src="../assets/images/aceAppsTitle.png"
                  alt="logo"
                  // style={{ height: "12rem" }}
                />
              </NavLink> */}
              {/* <NavLink to="/" className="navbar-brand brand-logo-mini">
                <img
                  // src="../assets/images/aceAppsLogo.png"
                  src="../assets/images/aceAppsTitle.png"
                  alt="logo"
                  style={{ height: "8rem", width: "8rem" }}
                />
              </NavLink> */}
            </div>
          </div>

          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            onClick={() =>
              document.getElementById("sidebar").classList.toggle("active")
            }
          >
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
