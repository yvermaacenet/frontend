import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MultiStepForm, Step } from "react-multi-form";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import axios from "axios";
import { useAlert } from "react-alert";

const Off_Boarding = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const { _id } = useParams();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [inputData, setInputData] = useState({
    offboarding_hr: {
      acceptance_of_resignation_and_last_date_communication_to_employee: false,
      appraisals_for_reportees: false,
      hr_off_boarding_status: false,
    },
    offboarding_finance: {
      informed_client_on_exit: false,
      project_official_duties_handover: false,
      important_mails_transferred: false,
      official_document_handover: false,
      acenet_laptop: false,
      id_card: false,
      // data_card_hotspot: false,
      client_asset: false,
      biometric_disabled: false,
      office_365_account_deletion: false,
      email_forwarded: false,
      zoho_account_deleted: false,
      relieving_letter_shared: false,
      fnf_statement_shared: false,
      fnf_cleared: false,
      employee_datasheet_updated: false,
      ghi_deletion: false,
      employee_folder_moved_to_past_employee_folder: false,
      ghi_opt_out: false,
      ghi_initiated: false,
      finance_off_boarding_status: false,
      ghi_e_card_issued: false,
    },
    offboarding_management: {
      handover_complete: false,
      management_off_boarding_status: false,
      eligible_for_rehire: false,
    },
  });
  const [renderComponent, setRenderComponent] = useState(false);
  const [active, setActive] = useState();
  const [getUserDetailsById, setGetUserDetailsById] = useState({});
  const [loading, setLoading] = useState(false);
  const [updated_data, setUpdated_data] = useState([]);
  const inputEventHr = (e) => {
    const { name, checked } = e.target;
    setInputData({
      ...inputData,
      offboarding_hr: { ...inputData?.offboarding_hr, [name]: checked },
    });
    setUpdated_data({ ...updated_data, [name]: checked });
  };
  const inputEventFinance = (e) => {
    const { name, checked } = e.target;
    setInputData({
      ...inputData,
      offboarding_finance: {
        ...inputData?.offboarding_finance,
        [name]: checked,
      },
    });
    setUpdated_data({ ...updated_data, [name]: checked });
  };
  const inputEventManagement = (e) => {
    const { name, checked } = e.target;
    setInputData({
      ...inputData,
      offboarding_management: {
        ...inputData?.offboarding_management,
        [name]: checked,
      },
    });
    setUpdated_data({ ...updated_data, [name]: checked });
  };
  useEffect(() => {
    setLoading(true);

    async function get_off_boarding_list() {
      await axios
        .get(`/off_boarding/${_id}`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((result) => {
          const resp = result.data[0];
          return (
            setInputData({ ...inputData, ...resp }),
            setActive(
              LocalStorageData?.zoho_role === "Hr" ||
                LocalStorageData?.zoho_role === "Admin"
                ? 1
                : LocalStorageData?.zoho_role === "Finance"
                ? 2
                : 3
            ),
            setRenderComponent(false)
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
    get_off_boarding_list();

    async function get_user_details_by_id() {
      const result_user_list_by_id = await axios
        .get(`/get_user_details_By_Id/${_id}`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((resp) => {
          const resp_user_list_by_id = resp?.data;
          return setGetUserDetailsById(resp_user_list_by_id);
        })
        .catch((err) => {
          if (err.response.status === 500) {
            navigate("/error_500");
          } else {
            navigate("/error_403");
          }
        });
      setLoading(false);
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
    setLoading(true);
    await axios
      .post(
        `/off_boarding/${_id}`,
        {
          ...inputData,

          offboarding_hr: {
            ...inputData?.offboarding_hr,
            hr_off_boarding_status: checkAllPropertiesAreTrue(
              inputData?.offboarding_hr,
              ["hr_off_boarding_status"]
            ),
          },
          offboarding_finance: {
            ...inputData?.offboarding_finance,
            finance_off_boarding_status: checkAllPropertiesAreTrue(
              inputData?.offboarding_finance,
              [
                "finance_off_boarding_status",
                "ghi_opt_out",
                "ghi_initiated",
                "ghi_e_card_issued",
              ]
            ),
          },
          offboarding_management: {
            ...inputData?.offboarding_management,
            management_off_boarding_status: checkAllPropertiesAreTrue(
              inputData?.offboarding_management,
              ["management_off_boarding_status"]
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
          navigate("/user_list/pending_offboarding_employee");
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          navigate("/error_500");
        } else {
          navigate("/error_403");
        }
      });
    setLoading(false);
  };
  const onUpdateNextButton = async (event) => {
    event.preventDefault();
    setLoading(true);
    await axios
      .put(
        `/off_boarding/${inputData?._id}`,
        {
          ...inputData,

          offboarding_hr: {
            ...inputData?.offboarding_hr,
            hr_off_boarding_status: checkAllPropertiesAreTrue(
              inputData?.offboarding_hr,
              ["hr_off_boarding_status"]
            ),
          },
          offboarding_finance: {
            ...inputData?.offboarding_finance,
            finance_off_boarding_status: checkAllPropertiesAreTrue(
              inputData?.offboarding_finance,
              [
                "finance_off_boarding_status",
                "ghi_opt_out",
                "ghi_initiated",
                "ghi_e_card_issued",
              ]
            ),
          },
          offboarding_management: {
            ...inputData?.offboarding_management,
            management_off_boarding_status: checkAllPropertiesAreTrue(
              inputData?.offboarding_management,
              ["management_off_boarding_status"]
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
          navigate("/user_list/pending_offboarding_employee");
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          navigate("/error_500");
        } else {
          navigate("/error_403");
        }
      });
    setLoading(false);
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
      const objHr = inputData?.offboarding_hr;
      for (let property in objHr) {
        objHr[property] = e.target.checked;
      }
      const response = objHr;
      setInputData({ ...inputData, hr: response });
    } else if (obj === "finance") {
      const objFinance = inputData?.offboarding_finance;
      for (let property in objFinance) {
        objFinance[property] = e.target.checked;
      }
      const response = objFinance;
      setInputData({ ...inputData, finance: response });
    } else {
      const objManagement = inputData?.offboarding_management;
      for (let property in objManagement) {
        objManagement[property] = e.target.checked;
      }
      const response = objManagement;
      setInputData({ ...inputData, management: response });
    }
  };
  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <Page_Header
              page_heading="Boarding"
              page_title_icon="mdi-view-dashboard"
              page_title_button="Back"
              page_title_button_link="/user_list/pending_offboarding_employee"
            />
            {loading && (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            )}
            <div className="row">
              <div class="col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th> Employee Id </th>
                          <th> Name </th>
                          <th> Designation </th>
                          <th> Joining Date </th>
                          <th> Department </th>
                          {getUserDetailsById?.initiate_off_boarding_status && (
                            <th> Status </th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{getUserDetailsById["Employee ID"]}</td>
                          <td>
                            {getUserDetailsById["First Name"]}{" "}
                            {getUserDetailsById["Last Name"]}
                          </td>
                          <td>
                            {getUserDetailsById?.Designation !== undefined
                              ? getUserDetailsById?.Designation
                              : "NA"}
                          </td>
                          <td>{getUserDetailsById["Date of Joining"]}</td>

                          <td>{getUserDetailsById["Department"]}</td>
                          {getUserDetailsById?.initiate_off_boarding_status && (
                            <td>
                              {inputData?.offboarding_hr
                                ?.hr_off_boarding_status === true &&
                              inputData?.offboarding_finance
                                ?.finance_off_boarding_status === true &&
                              inputData?.offboarding_management
                                ?.management_off_boarding_status === true ? (
                                <label className="badge badge-success">
                                  Completed
                                </label>
                              ) : (
                                <label className="badge badge-danger">
                                  Pending
                                </label>
                              )}
                            </td>
                          )}
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
                      <span class="card-description">Off Boarding Process</span>
                      {/* <div>
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
                      </div> */}
                    </div>
                    <ul
                      class="nav nav-tabs d-flex"
                      id="myTabjustified"
                      role="tablist"
                    >
                      <li class="nav-item flex-fill" role="presentation">
                        <button
                          class={`nav-link w-100 ${active == "1" && "active"}`}
                          id="hr-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#home-justified"
                          type="button"
                          role="tab"
                          aria-controls="home"
                          aria-selected="false"
                          tabindex="-1"
                          onClick={() => setActive(1)}
                        >
                          HR
                        </button>
                      </li>
                      <li class="nav-item flex-fill" role="presentation">
                        <button
                          class={`nav-link w-100 ${active == "2" && "active"}`}
                          id="finance-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#profile-justified"
                          type="button"
                          role="tab"
                          aria-controls="profile"
                          aria-selected="true"
                          onClick={() => setActive(2)}
                        >
                          Finance
                        </button>
                      </li>
                      <li class="nav-item flex-fill" role="presentation">
                        <button
                          class={`nav-link w-100 ${active == "3" && "active"}`}
                          id="management-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#contact-justified"
                          type="button"
                          role="tab"
                          aria-controls="contact"
                          aria-selected="false"
                          tabindex="-1"
                          onClick={() => setActive(3)}
                        >
                          Management
                        </button>
                      </li>
                    </ul>
                    <form class="forms-sample">
                      <div class="tab-content pt-2" id="myTabjustifiedContent">
                        <div
                          class={`tab-pane fade ${
                            active == "1" && "active show"
                          }`}
                          id="home-justified"
                          role="tabpanel"
                          aria-labelledby="hr-tab"
                        >
                          <>
                            {/* <>
                              {getUserDetailsById?.initiate_off_boarding_status &&
                                (inputData?.offboarding_hr_off_boarding_status ? (
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
                              style={{ float: "right", marginRight: "0.6rem" }}
                            >
                              <label
                                class="form-check-label"
                                style={{
                                  display:
                                    LocalStorageData?.zoho_role === "Hr" ||
                                    LocalStorageData?.zoho_role === "Admin"
                                      ? "block"
                                      : "none",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                  onChange={(e) =>
                                    setAllPropertiesToTrue(e, "hr")
                                  }
                                  checked={checkAllPropertiesAreTrue(
                                    inputData?.offboarding_hr,
                                    ["hr_off_boarding_status"]
                                  )}
                                  disabled={
                                    LocalStorageData?.zoho_role === "Hr" ||
                                    LocalStorageData?.zoho_role === "Admin"
                                      ? false
                                      : true
                                  }
                                />
                                Select All <i class="input-helper"></i>
                              </label>
                            </div>
                            <table className="table table-hover">
                              <thead>
                                <tr>
                                  <th> Field Name </th>
                                  <th> Action </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="w-100">
                                    Acceptance of Resignation and Last Date
                                    communication to employee
                                  </td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label className="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="acceptance_of_resignation_and_last_date_communication_to_employee"
                                          className="form-control form-control-sm"
                                          onChange={inputEventHr}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          style={{ opacity: "0" }}
                                          checked={
                                            inputData?.offboarding_hr
                                              ?.acceptance_of_resignation_and_last_date_communication_to_employee
                                          }
                                        />
                                        <span className="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Appraisals for reportees</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label className="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="appraisals_for_reportees"
                                          className="form-control form-control-sm"
                                          onChange={inputEventHr}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          style={{ opacity: "0" }}
                                          checked={
                                            inputData?.offboarding_hr
                                              ?.appraisals_for_reportees
                                          }
                                        />
                                        <span className="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </>
                        </div>
                        <div
                          class={`tab-pane fade ${
                            active == "2" && "active show"
                          }`}
                          id="profile-justified"
                          role="tabpanel"
                          aria-labelledby="finance-tab"
                        >
                          <>
                            {/* <>
                              {getUserDetailsById?.initiate_off_boarding_status &&
                                (inputData?.offboarding_finance_off_boarding_status ? (
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
                              style={{ float: "right", marginRight: "0.6rem" }}
                            >
                              <label
                                class="form-check-label"
                                style={{
                                  display:
                                    LocalStorageData?.zoho_role === "Finance" ||
                                    LocalStorageData?.zoho_role === "Admin"
                                      ? "block"
                                      : "none",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                  onChange={(e) =>
                                    setAllPropertiesToTrue(e, "finance")
                                  }
                                  checked={checkAllPropertiesAreTrue(
                                    inputData?.offboarding_finance,
                                    ["finance_off_boarding_status"]
                                  )}
                                  disabled={
                                    LocalStorageData?.zoho_role === "Finance" ||
                                    LocalStorageData?.zoho_role === "Admin"
                                      ? false
                                      : true
                                  }
                                />
                                Select All <i class="input-helper"></i>
                              </label>
                            </div>
                            <table className="table table-hover">
                              <thead>
                                <tr>
                                  <th> Field Name </th>
                                  <th> Action </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="w-100">
                                    Informed Client on Exit
                                  </td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label className="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="informed_client_on_exit"
                                          className="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          style={{ opacity: "0" }}
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.informed_client_on_exit
                                          }
                                        />
                                        <span className="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Project/official duties handover</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label className="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="project_official_duties_handover"
                                          className="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          style={{ opacity: "0" }}
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.project_official_duties_handover
                                          }
                                        />
                                        <span className="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Important mails transferred</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label className="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="important_mails_transferred"
                                          className="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          style={{ opacity: "0" }}
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.important_mails_transferred
                                          }
                                        />
                                        <span className="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Official document handover</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label className="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="official_document_handover"
                                          className="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          style={{ opacity: "0" }}
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.official_document_handover
                                          }
                                        />
                                        <span className="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Acenet - Laptop</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label className="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="acenet_laptop"
                                          className="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.acenet_laptop
                                          }
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          style={{ opacity: "0" }}
                                        />
                                        <span className="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> ID Card</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label className="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="id_card"
                                          className="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          style={{ opacity: "0" }}
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.id_card
                                          }
                                        />
                                        <span className="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                {/* <tr>
                                          <td> Data card/hotspot </td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label className="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="data_card_hotspot"
                                                  className="form-control form-control-sm"
                                                  onChange={inputEventFinance}
                                                  disabled={
                                                    LocalStorageData?.zoho_role ===
                                                      "Finance" ||
                                                    LocalStorageData?.zoho_role ===
                                                      "Admin"
                                                      ? false
                                                      : true
                                                  }
                                                  style={{ opacity: "0" }}
                                                  checked={
                                                    inputData?.offboarding_finance?.data_card_hotspot
                                                  }
                                                />
                                                <span className="slider round"></span>
                                              </label>
                                              <span>Yes</span>
                                            </div>
                                          </td>
                                        </tr> */}
                                <tr>
                                  <td> Client Asset </td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label className="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="client_asset"
                                          className="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          style={{ opacity: "0" }}
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.client_asset
                                          }
                                        />
                                        <span className="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Biometric Disabled </td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label className="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="biometric_disabled"
                                          className="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          style={{ opacity: "0" }}
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.biometric_disabled
                                          }
                                        />
                                        <span className="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Office 365 account deletion</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label className="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="office_365_account_deletion"
                                          className="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          style={{ opacity: "0" }}
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.office_365_account_deletion
                                          }
                                        />
                                        <span className="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Email Forwarded </td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label className="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="email_forwarded"
                                          className="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          style={{ opacity: "0" }}
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.email_forwarded
                                          }
                                        />
                                        <span className="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Zoho Account Deleted</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label className="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="zoho_account_deleted"
                                          className="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          style={{ opacity: "0" }}
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.zoho_account_deleted
                                          }
                                        />
                                        <span className="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Relieving Letter shared</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label className="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="relieving_letter_shared"
                                          className="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          style={{ opacity: "0" }}
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.relieving_letter_shared
                                          }
                                        />
                                        <span className="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> FnF Statement shared</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label className="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="fnf_statement_shared"
                                          className="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          style={{ opacity: "0" }}
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.fnf_statement_shared
                                          }
                                        />
                                        <span className="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>FnF Cleared</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label className="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="fnf_cleared"
                                          className="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          style={{ opacity: "0" }}
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.fnf_cleared
                                          }
                                        />
                                        <span className="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Employee data sheet updated</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label className="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="employee_datasheet_updated"
                                          className="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          style={{ opacity: "0" }}
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.employee_datasheet_updated
                                          }
                                        />
                                        <span className="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>GHI Deletion</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label className="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="ghi_deletion"
                                          className="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          style={{ opacity: "0" }}
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.ghi_deletion
                                          }
                                        />
                                        <span className="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    Employee folder moved to Past Employee
                                    Folder
                                  </td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label className="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="employee_folder_moved_to_past_employee_folder"
                                          className="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.employee_folder_moved_to_past_employee_folder
                                          }
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          style={{ opacity: "0" }}
                                        />
                                        <span className="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>GHI Opt out</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label className="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="ghi_opt_out"
                                          className="form-control form-control-sm"
                                          onChange={inputEventFinance}
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.ghi_opt_out
                                          }
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          style={{ opacity: "0" }}
                                        />
                                        <span className="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                {inputData?.offboarding_finance
                                  ?.ghi_opt_out && (
                                  <>
                                    <tr>
                                      <td>GHI Initiated</td>
                                      <td>
                                        <div className="board">
                                          <span>No</span>
                                          <label className="switch ms-1 me-1 mt-1 ">
                                            <input
                                              type="checkbox"
                                              name="ghi_initiated"
                                              className="form-control form-control-sm"
                                              onChange={inputEventFinance}
                                              checked={
                                                inputData?.offboarding_finance
                                                  ?.ghi_initiated
                                              }
                                              disabled={
                                                LocalStorageData?.zoho_role ===
                                                  "Finance" ||
                                                LocalStorageData?.zoho_role ===
                                                  "Admin"
                                                  ? false
                                                  : true
                                              }
                                              style={{ opacity: "0" }}
                                            />
                                            <span className="slider round"></span>
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
                                          <label className="switch ms-1 me-1 mt-1 ">
                                            <input
                                              type="checkbox"
                                              name="ghi_e_card_issued"
                                              className="form-control form-control-sm"
                                              onChange={inputEventFinance}
                                              checked={
                                                inputData?.offboarding_finance
                                                  ?.ghi_e_card_issued
                                              }
                                              disabled={
                                                LocalStorageData?.zoho_role ===
                                                  "Finance" ||
                                                LocalStorageData?.zoho_role ===
                                                  "Admin"
                                                  ? false
                                                  : true
                                              }
                                              style={{ opacity: "0" }}
                                            />
                                            <span className="slider round"></span>
                                          </label>
                                          <span>Yes</span>
                                        </div>
                                      </td>
                                    </tr>
                                  </>
                                )}
                              </tbody>
                            </table>
                          </>
                        </div>
                        <div
                          class={`tab-pane fade ${
                            active == "3" && "active show"
                          }`}
                          id="contact-justified"
                          role="tabpanel"
                          aria-labelledby="management-tab"
                        >
                          <>
                            {/* <>
                              {getUserDetailsById?.initiate_off_boarding_status &&
                                (inputData?.offboarding_management
                                  ?.management_off_boarding_status ? (
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
                              style={{ float: "right", marginRight: "0.6rem" }}
                            >
                              <label
                                class="form-check-label"
                                style={{
                                  display:
                                    LocalStorageData?.zoho_role ===
                                      "Management" ||
                                    LocalStorageData?.zoho_role === "Admin"
                                      ? "block"
                                      : "none",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                  onChange={(e) =>
                                    setAllPropertiesToTrue(e, "management")
                                  }
                                  checked={checkAllPropertiesAreTrue(
                                    inputData?.offboarding_management,
                                    ["management_off_boarding_status"]
                                  )}
                                  disabled={
                                    LocalStorageData?.zoho_role ===
                                      "Management" ||
                                    LocalStorageData?.zoho_role === "Admin"
                                      ? false
                                      : true
                                  }
                                />
                                Select All <i class="input-helper"></i>
                              </label>
                            </div>
                            <table className="table table-hover">
                              <thead>
                                <tr>
                                  <th> Field Name </th>
                                  <th> Action </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="w-100">Handover Complete</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label className="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="handover_complete"
                                          className="form-control form-control-sm"
                                          onChange={inputEventManagement}
                                          checked={
                                            inputData?.offboarding_management
                                              ?.handover_complete
                                          }
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Management" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          style={{ opacity: "0" }}
                                        />
                                        <span className="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Eligible for Rehire?</td>
                                  <td>
                                    <div className="board">
                                      <span>No</span>
                                      <label className="switch ms-1 me-1 mt-1 ">
                                        <input
                                          type="checkbox"
                                          name="eligible_for_rehire"
                                          className="form-control form-control-sm"
                                          onChange={inputEventManagement}
                                          checked={
                                            inputData?.offboarding_management
                                              ?.eligible_for_rehire
                                          }
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Management" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin"
                                              ? false
                                              : true
                                          }
                                          style={{ opacity: "0" }}
                                        />
                                        <span className="slider round"></span>
                                      </label>
                                      <span>Yes</span>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </>
                        </div>
                      </div>
                      {/* <!==========  Update & Save Button ============> */}
                      <div className="text-center">
                        {inputData?._id ? (
                          <>
                            <button
                              className="btn btn-sm btn-gradient-dark mt-4"
                              onClick={onUpdateNextButton}
                              style={{
                                display:
                                  LocalStorageData?.zoho_role === "Hr" &&
                                  active === 1
                                    ? "inline"
                                    : LocalStorageData?.zoho_role ===
                                        "Finance" && active === 2
                                    ? "inline"
                                    : LocalStorageData?.zoho_role ===
                                        "Management" && active === 3
                                    ? "inline"
                                    : LocalStorageData?.zoho_role === "Admin"
                                    ? "inline"
                                    : "none",
                              }}
                            >
                              Submit
                            </button>
                          </>
                        ) : (
                          <button
                            className="btn btn-sm btn-gradient-dark  mt-4  "
                            onClick={onSaveNextButton}
                            style={{
                              display:
                                LocalStorageData?.zoho_role === "Hr" &&
                                active === 1
                                  ? "inline"
                                  : LocalStorageData?.zoho_role === "Finance" &&
                                    active === 2
                                  ? "inline"
                                  : LocalStorageData?.zoho_role ===
                                      "Management" && active === 3
                                  ? "inline"
                                  : LocalStorageData?.zoho_role === "Admin"
                                  ? "inline"
                                  : "none",
                            }}
                          >
                            Submit
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Off_Boarding;
