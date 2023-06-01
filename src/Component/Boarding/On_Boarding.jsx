import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import axios from "axios";
const On_Boarding = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [renderComponent, setRenderComponent] = useState(false);
  const [active, setActive] = useState();
  const [getUserDetailsById, setGetUserDetailsById] = useState({});
  const [roless, setRoless] = useState([]);
  const [updated_data, setUpdated_data] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    hr: {
      onboard_meet_and_greet_welcome_call: false,
      verify_acenet_email_id_zoho_id_laptop_provision_to_employee: false,
      introduction_meeting_with_buddy: false,
      introduction_meeting_with_line_manager_respective_senior_manager: false,
      handover_to_project_complete: false,
      introduction_call_with_ceo: false,
      hr_on_boarding_status: false,
    },
    finance: {
      genrate_mail_id: false,
      one_drive_access: false,
      teams_access: false,
      add_to_official_dls: false,
      biometric: false,
      acenet_laptop: false,
      client_laptop: false,
      t_shirt: false,
      welcome_kit: false,
      aadhar_card: false,
      pan_card: false,
      passport: false,
      dl: false,
      ten_th: false,
      tweleve_th: false,
      graduation: false,
      post_graduation: false,
      pay_slips: false,
      experience_proof: false,
      forms_16: false,
      passport_size_photo: false,
      signed_offer_latter: false,
      documents_verification: false,
      covid_certificate: false,
      employee_data_sheet_bank_details: false,
      other_official_documents: false,
      pf_form_recieved: false,
      pf_submitted_to_ca_team: false,
      PF_number_shared_with_the_employee: false,
      gratuity_Form_Received: false,
      gratuity_Form_submitteed_to_CA_Team: false,
      ghi_documents_received: false,
      ghi_initiated: false,
      ghi_eCard_issued: false,
      zoho_people_account_created: false,
      bgv_initiated: false,
      bgv_invoice_Paid: false,
      bgv_report_Received: false,
      update_linkedIn: false,
      finance_on_boarding_status: false,
    },
  });

  const inputEventHr = (e) => {
    const { name, checked } = e.target;
    setInputData({ ...inputData, hr: { ...inputData?.hr, [name]: checked } });
    setUpdated_data({ ...updated_data, [name]: checked });
  };
  const inputEventFinance = (e) => {
    const { name, checked } = e.target;
    setInputData({
      ...inputData,
      finance: { ...inputData?.finance, [name]: checked },
    });
    setUpdated_data({ ...updated_data, [name]: checked });
  };
  useEffect(() => {
    setLoading(true);
    async function get_on_boarding_list() {
      await axios
        .get(`/on_boarding/${_id}`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((result) => {
          const resp = result.data[0];
          return (
            setInputData({ ...inputData, ...resp }), setRenderComponent(false)
          );
        })
        .catch((err) => {
          if (err.response.status === 500) {
            navigate("/error_500");
          } else {
            navigate("/error_403");
          }
        });
    }
    get_on_boarding_list();
    async function get_user_list_by_role_name() {
      const result = await axios
        .get(`/get_user_list_by_role_name`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((resp) => {
          return (
            setRoless(resp.data),
            setActive(
              resp.data?.Hr?.includes(LocalStorageData?.user_id) === true ||
                resp.data?.Admin?.includes(LocalStorageData?.user_id) === true
                ? 1
                : resp.data?.Finance?.includes(LocalStorageData?.user_id) ===
                  true
                ? 2
                : 1
            ),
            setRenderComponent(false),
            setLoading(false)
          );
        })
        .catch((err) => {
          if (err.response.status === 500) {
            navigate("/error_500");
          } else {
            navigate("/error_403");
          }
        });
    }
    get_user_list_by_role_name();
    async function get_user_details_by_id() {
      await axios
        .get(`/get_user_details_By_Id/${_id}`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((resp) => {
          const resp_user_list_by_id = resp?.data;
          console.log("resp_user_list_by_id", resp);
          return setGetUserDetailsById(resp_user_list_by_id);
        })
        .catch((err) => {
          if (err.response.status === 500) {
            navigate("/error_500");
          } else {
            navigate("/error_403");
          }
        });
    }
    get_user_details_by_id();
  }, [renderComponent === true]);

  const checkAllPropertiesAreTrue = (
    objIncludeProperty,
    objExcludeProperty
  ) => {
    const response = Object.keys(objIncludeProperty).every((property) => {
      if (objExcludeProperty.includes(property)) {
        return true; // Exclude introduction_call_with_ceo
      } else {
        return (
          objIncludeProperty.hasOwnProperty(property) &&
          objIncludeProperty[property] === true
        );
      }
    });
    return response;
  };

  const onSaveNextButton = async (event) => {
    event.preventDefault();
    await axios
      .post(
        `/on_boarding/${_id}`,
        {
          ...inputData,
          hr: {
            ...inputData?.hr,
            hr_on_boarding_status: checkAllPropertiesAreTrue(inputData?.hr, [
              "hr_on_boarding_status",
            ]),
          },
          finance: {
            ...inputData?.finance,
            finance_on_boarding_status: checkAllPropertiesAreTrue(
              inputData?.finance,
              ["finance_on_boarding_status", "biometric", "client_laptop"]
            ),
          },
          updated_by: [
            {
              user_id: LocalStorageData?.user_id,
              user_name: LocalStorageData?.name,
              updated_data,
            },
          ],
        },
        {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        }
      )
      .then(async (res) => {
        if (res.data.message === "created") {
          setActive(active + 1);
          setRenderComponent(true);
          navigate("/user_list/active_employee");
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          navigate("/error_500");
        } else {
          navigate("/error_403");
        }
      });
  };
  const onUpdateNextButton = async (event) => {
    event.preventDefault();
    await axios
      .put(
        `/on_boarding/${inputData?._id}`,
        {
          ...inputData,
          hr: {
            ...inputData?.hr,
            hr_on_boarding_status: checkAllPropertiesAreTrue(inputData?.hr, [
              "hr_on_boarding_status",
            ]),
          },
          finance: {
            ...inputData?.finance,
            finance_on_boarding_status: checkAllPropertiesAreTrue(
              inputData?.finance,
              ["finance_on_boarding_status", "biometric", "client_laptop"]
            ),
          },

          updated_by: [
            {
              user_id: LocalStorageData?.user_id,
              user_name: LocalStorageData?.name,
              updated_data,
            },
          ],
        },
        {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        }
      )
      .then(async (res) => {
        if (res.data.message === "updated") {
          setActive(active + 1);
          setRenderComponent(true);
          setUpdated_data([]);
          navigate("/user_list/active_employee");
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          navigate("/error_500");
        } else {
          navigate("/error_403");
        }
      });
  };

  function convertDateFormate(str) {
    const date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }
  function capitalize(ss) {
    const newData = ss.split("_").join(" ");
    const words = newData.split(" ");
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(" ");
  }
  const setAllPropertiesToTrue = (e, obj) => {
    if (obj === "hr") {
      const objHr = inputData?.hr;
      for (let property in objHr) {
        objHr[property] = e.target.checked;
      }
      const response = objHr;
      setInputData({ ...inputData, hr: response });
    } else {
      const objFinance = inputData?.finance;
      for (let property in objFinance) {
        objFinance[property] = e.target.checked;
      }
      const response = objFinance;
      setInputData({ ...inputData, finance: response });
    }
  };
  return (
    <div class="container-scroller">
      <Navbar />
      <div class="container-fluid page-body-wrapper">
        <Sidebar />
        <div class="main-panel">
          <div class="content-wrapper">
            <Page_Header
              page_heading="Boarding"
              page_title_icon="mdi-view-dashboard"
              page_title_button="Back"
              page_title_button_link="/user_list/pending_onboarding_users"
            />
            {loading && (
              <div className="loader-container">
                <div class="loader"></div>
              </div>
            )}
            <div class="row">
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th> Employee Id </th>
                          <th> Name </th>
                          <th> Designation </th>
                          <th> Joining Date </th>
                          <th> Department </th>
                          <th> Status </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{getUserDetailsById["Employee ID"]}</td>
                          <td>
                            {getUserDetailsById["First Name"]}
                            {getUserDetailsById["Last Name"]}
                          </td>
                          <td>
                            {getUserDetailsById?.Designation !== undefined
                              ? getUserDetailsById?.Designation
                              : "NA"}
                          </td>
                          <td>{getUserDetailsById["Date of Joining"]}</td>

                          <td>{getUserDetailsById["Department"]}</td>
                          <td>
                            {inputData?.hr?.hr_on_boarding_status === true &&
                            inputData?.finance?.finance_on_boarding_status ===
                              true ? (
                              <label className="badge badge-success">
                                Completed
                              </label>
                            ) : (
                              <label className="badge badge-danger">
                                Pending
                              </label>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div class="col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div class="card-body">
                    <div className=" d-flex justify-content-between align-items-center">
                      <span class="card-description">On Boarding Process</span>
                      <div>
                        <a
                          style={{ float: "right" }}
                          className=" nav-link count-indicator dropdown-toggle mb-4"
                          id="notificationDropdown"
                          href="#"
                          data-bs-toggle="dropdown"
                          title="updation history"
                        >
                          <i className="mdi mdi-bell-outline"></i>
                          <span className="count-symbol bg-danger"></span>
                        </a>
                        <div
                          style={{ height: "50vh", overflowY: "scroll" }}
                          className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                          aria-labelledby="notificationDropdown"
                        >
                          <h6 className="mt-0 p-3">History</h6>

                          {inputData?.updated_by?.map((item) => {
                            return (
                              <>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                  <div className="preview-thumbnail">
                                    <div
                                      className="preview-icon  "
                                      style={{
                                        background: `#${Math.random()
                                          .toString(16)
                                          .slice(2, 8)
                                          .padEnd(6, 0)}`,
                                        color: "#f8f8f8",
                                      }}
                                    >
                                      <i className="mdi mdi-calendar"></i>
                                    </div>
                                  </div>
                                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                    <span className="preview-subject fw-bold mb-1">
                                      {`Updated by : ${item?.user_name}`}
                                    </span>
                                    <span className="preview-subject fw-bold mb-1">
                                      {`Updated At : ${convertDateFormate(
                                        item?.updated_date
                                      )}`}
                                    </span>

                                    {Object.entries(item?.updated_data).map(
                                      ([key, val]) => {
                                        return val ? (
                                          <span className="text-success ">
                                            {capitalize(key)}
                                          </span>
                                        ) : (
                                          <span className="text-danger ">
                                            {capitalize(key)}
                                          </span>
                                        );
                                      }
                                    )}
                                  </div>
                                </a>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <ul
                      class="nav nav-tabs d-flex"
                      id="myTabjustified"
                      role="tablist"
                    >
                      <li class="nav-item flex-fill" role="presentation">
                        <button
                          class="nav-link w-100 active"
                          id="hr-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#home-justified"
                          type="button"
                          role="tab"
                          aria-controls="home"
                          aria-selected="false"
                          tabindex="-1"
                        >
                          Hr
                        </button>
                      </li>
                      <li class="nav-item flex-fill" role="presentation">
                        <button
                          class="nav-link w-100 "
                          id="finance-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#profile-justified"
                          type="button"
                          role="tab"
                          aria-controls="profile"
                          aria-selected="true"
                        >
                          Finance
                        </button>
                      </li>
                    </ul>
                    <form class="forms-sample">
                      <div class="tab-content pt-2" id="myTabjustifiedContent">
                        <div
                          class="tab-pane fade active show"
                          id="home-justified"
                          role="tabpanel"
                          aria-labelledby="hr-tab"
                        >
                          <>
                            {/* {getUserDetailsById?.initiate_on_boarding_status &&
                              (inputData?.hr?.hr_on_boarding_status ? (
                                <div
                                  class="alert alert-success alert-dismissible fade show"
                                  role="alert"
                                >
                                  <i class="mdi mdi-check-circle-outline me-1"></i>
                                  This step has been completed.
                                  <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="alert"
                                    aria-label="Close"
                                  ></button>
                                </div>
                              ) : (
                                <div
                                  class="alert alert-danger alert-dismissible fade show"
                                  role="alert"
                                >
                                  <i class="mdi mdi-alert-octagon me-1"></i>
                                  "This step is pending !!"
                                  <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="alert"
                                    aria-label="Close"
                                  ></button>
                                </div>
                              ))} */}

                            <div
                              class="form-check form-check-success"
                              style={{ float: "right" }}
                            >
                              <label class="form-check-label">
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                  onChange={(e) =>
                                    setAllPropertiesToTrue(e, "hr")
                                  }
                                  checked={checkAllPropertiesAreTrue(
                                    inputData?.hr,
                                    ["hr_on_boarding_status"]
                                  )}
                                />
                                Select All <i class="input-helper"></i>
                              </label>
                            </div>
                            <table class="table table-hover">
                              <thead>
                                <tr>
                                  <th> Field Name </th>
                                  <th> Action </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="w-100">
                                    Onboard Meet and Greet / Welcome call
                                  </td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="onboard_meet_and_greet_welcome_call"
                                          class="form-control form-control-sm"
                                          onChange={inputEventHr}
                                          checked={
                                            inputData?.hr
                                              ?.onboard_meet_and_greet_welcome_call
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    Verify AceNet email id /zoho id/ laptop
                                    provision to employee
                                  </td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="verify_acenet_email_id_zoho_id_laptop_provision_to_employee"
                                          class="form-control form-control-sm"
                                          onChange={inputEventHr}
                                          checked={
                                            inputData?.hr
                                              ?.verify_acenet_email_id_zoho_id_laptop_provision_to_employee
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Introduction meeting with buddy</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="introduction_meeting_with_buddy"
                                          class="form-control form-control-sm"
                                          onChange={inputEventHr}
                                          checked={
                                            inputData?.hr
                                              ?.introduction_meeting_with_buddy
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    Introduction meeting with line manager +
                                    respective senior manager
                                  </td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="introduction_meeting_with_line_manager_respective_senior_manager"
                                          class="form-control form-control-sm"
                                          onChange={inputEventHr}
                                          checked={
                                            inputData?.hr
                                              ?.introduction_meeting_with_line_manager_respective_senior_manager
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Handover to project complete</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="handover_to_project_complete"
                                          class="form-control form-control-sm"
                                          onChange={inputEventHr}
                                          checked={
                                            inputData?.hr
                                              ?.handover_to_project_complete
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td> Introduction Call With CEO</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="introduction_call_with_ceo"
                                          class="form-control form-control-sm"
                                          onChange={inputEventHr}
                                          checked={
                                            inputData?.hr
                                              ?.introduction_call_with_ceo
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </>{" "}
                        </div>
                        <div
                          class="tab-pane fade "
                          id="profile-justified"
                          role="tabpanel"
                          aria-labelledby="finance-tab"
                        >
                          <>
                            {/* <>
                              {getUserDetailsById?.initiate_on_boarding_status &&
                                (inputData?.finance
                                  ?.finance_on_boarding_status ? (
                                  <div
                                    class="alert alert-success alert-dismissible fade show"
                                    role="alert"
                                  >
                                    <i class="mdi mdi-check-circle-outline me-1"></i>
                                    This step has been completed.
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="alert"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                ) : (
                                  <div
                                    class="alert alert-danger alert-dismissible fade show"
                                    role="alert"
                                  >
                                    <i class="mdi mdi-alert-octagon me-1"></i>
                                    "This step is pending !!"
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="alert"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                ))}
                            </> */}
                            <div
                              class="form-check form-check-success"
                              style={{ float: "right" }}
                            >
                              <label class="form-check-label">
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                  onChange={(e) =>
                                    setAllPropertiesToTrue(e, "finance")
                                  }
                                  checked={checkAllPropertiesAreTrue(
                                    inputData?.finance,
                                    ["finance_on_boarding_status"]
                                  )}
                                />
                                Select All <i class="input-helper"></i>
                              </label>
                            </div>
                            <table class="table table-hover">
                              <thead>
                                <tr>
                                  <th> Field Name </th>
                                  <th> Action </th>
                                </tr>
                              </thead>
                              <tbody>
                                <p class="card-description mt-2 mb-0 text-center">
                                  First Day Formalities
                                </p>

                                <tr>
                                  <td className="w-100"> Generate Mail Id </td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="genrate_mail_id"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={
                                            inputData?.finance?.genrate_mail_id
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> One Drive Access </td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="one_drive_access"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={
                                            inputData?.finance?.one_drive_access
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Add To Official DLs</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="add_to_official_dls"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={
                                            inputData?.finance
                                              ?.add_to_official_dls
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Teams Access</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="teams_access"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={
                                            inputData?.finance?.teams_access
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Biometric </td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="biometric"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={
                                            inputData?.finance?.biometric
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Acenet Laptop</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="acenet_laptop"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={
                                            inputData?.finance?.acenet_laptop
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Client Laptop</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="client_laptop"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={
                                            inputData?.finance?.client_laptop
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td> T-Shirt</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="t_shirt"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={inputData?.finance?.t_shirt}
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Welcome Kit</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="welcome_kit"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={
                                            inputData?.finance?.welcome_kit
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>

                                <p class="card-description mt-2 mb-0 text-center">
                                  Documents
                                </p>
                                <tr>
                                  <td>Aadhar Card</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="aadhar_card"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={
                                            inputData?.finance?.aadhar_card
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> PAN Card</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="pan_card"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={inputData?.finance?.pan_card}
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Passport </td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="passport"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={inputData?.finance?.passport}
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> DL </td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="dl"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={inputData?.finance?.dl}
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> 10th </td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="ten_th"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={inputData?.finance?.ten_th}
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> 12th </td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="tweleve_th"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={
                                            inputData?.finance?.tweleve_th
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Graduation </td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="graduation"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={
                                            inputData?.finance?.graduation
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Post Graduation</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="post_graduation"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={
                                            inputData?.finance?.post_graduation
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    Experience proof - Relieving letter from
                                    previous employers (if previously employed)
                                  </td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="experience_proof"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={
                                            inputData?.finance?.experience_proof
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Passport size photograph</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="passport_size_photo"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={
                                            inputData?.finance
                                              ?.passport_size_photo
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Signed Offer Letter</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="signed_offer_latter"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={
                                            inputData?.finance
                                              ?.signed_offer_latter
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Document Verification</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="documents_verification"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={
                                            inputData?.finance
                                              ?.documents_verification
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Covid Certificate</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="covid_certificate"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={
                                            inputData?.finance
                                              ?.covid_certificate
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Employee Data Sheet (Bank Details)</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="employee_data_sheet_bank_details"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={
                                            inputData?.finance
                                              ?.employee_data_sheet_bank_details
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Other official document</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="other_official_documents"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={
                                            inputData?.finance
                                              ?.other_official_documents
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Pay slips - Last 3 months</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="pay_slips"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={
                                            inputData?.finance?.pay_slips
                                          }
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    Form 16 or Taxable income statement
                                    <br />
                                    duly certified by previous
                                    employer(Statement showing
                                    <br />
                                    deductions and Taxable income with break up)
                                  </td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="forms_16"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={inputData?.finance?.forms_16}
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <p class="card-description mt-2 mb-0 text-center">
                                  Compliance Documents
                                </p>
                                <tr>
                                  <td> PF Form Received</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="pf_form_recieved"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          checked={
                                            inputData?.finance?.pf_form_recieved
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>PF Form submitted to CA Team</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="pf_submitted_to_ca_team"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          checked={
                                            inputData?.finance
                                              ?.pf_submitted_to_ca_team
                                          }
                                        />
                                        <span
                                          class="slider round"
                                          disabled
                                        ></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>PF Number shared with the employee</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="PF_number_shared_with_the_employee"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          checked={
                                            inputData?.finance
                                              ?.PF_number_shared_with_the_employee
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Gratuity Form Received</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="gratuity_Form_Received"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          checked={
                                            inputData?.finance
                                              ?.gratuity_Form_Received
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Gratuity Form submitteed to CA Team</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="gratuity_Form_submitteed_to_CA_Team"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          checked={
                                            inputData?.finance
                                              ?.gratuity_Form_submitteed_to_CA_Team
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> GHI Documents Received</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="ghi_documents_received"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          checked={
                                            inputData?.finance
                                              ?.ghi_documents_received
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>GHI Initiated</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="ghi_initiated"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          checked={
                                            inputData?.finance?.ghi_initiated
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>GHI E-Card issued</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="ghi_eCard_issued"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          checked={
                                            inputData?.finance?.ghi_eCard_issued
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>

                                <p class="card-description mt-2 mb-0 text-center">
                                  Zoho Accounts
                                </p>
                                <tr>
                                  <td>ZOHO People Account Created</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="zoho_people_account_created"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          style={{ opacity: 0 }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          checked={
                                            inputData?.finance
                                              ?.zoho_people_account_created
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>

                                <p class="card-description mt-2 mb-0 text-center">
                                  Other Formalities
                                </p>
                                <tr>
                                  <td> BGV Initiated</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="bgv_initiated"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          style={{ opacity: 0 }}
                                          checked={
                                            inputData?.finance?.bgv_initiated
                                          }
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> BGV Invoice Paid</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="bgv_invoice_Paid"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          style={{ opacity: 0 }}
                                          checked={
                                            inputData?.finance?.bgv_invoice_Paid
                                          }
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> BGV Report Received</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="bgv_report_Received"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          style={{ opacity: 0 }}
                                          checked={
                                            inputData?.finance
                                              ?.bgv_report_Received
                                          }
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Update LinkedIn</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label class="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="update_linkedIn"
                                          class="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          style={{ opacity: 0 }}
                                          checked={
                                            inputData?.finance?.update_linkedIn
                                          }
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                        />
                                        <span class="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </>{" "}
                        </div>
                      </div>{" "}
                      {/* <!==========  Update & Save Button ============> */}
                      {inputData?._id ? (
                        <>
                          <button
                            className="btn btn-sm btn-gradient-dark me-2 mt-4 mb-4"
                            onClick={onUpdateNextButton}
                            style={{
                              float: "right",
                              display:
                                LocalStorageData?.zoho_role === "Hr" &&
                                active === 1
                                  ? "block"
                                  : LocalStorageData?.zoho_role === "Finance" &&
                                    active === 2
                                  ? "block"
                                  : LocalStorageData?.zoho_role ===
                                      "Management" && active === 3
                                  ? "block"
                                  : LocalStorageData?.zoho_role === "Admin"
                                  ? "block"
                                  : "none",
                            }}
                          >
                            Submit
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn btn-sm btn-gradient-dark me-2 mt-4 mb-4"
                          onClick={onSaveNextButton}
                          style={{
                            float: "right",
                            display:
                              LocalStorageData?.zoho_role === "Hr" &&
                              active === 1
                                ? "block"
                                : LocalStorageData?.zoho_role === "Finance" &&
                                  active === 2
                                ? "block"
                                : LocalStorageData?.zoho_role ===
                                    "Management" && active === 3
                                ? "block"
                                : LocalStorageData?.zoho_role === "Admin"
                                ? "block"
                                : "none",
                          }}
                        >
                          Submit
                        </button>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer class="footer">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default On_Boarding;
