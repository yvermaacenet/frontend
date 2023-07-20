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
      acceptance_of_resignation_and_last_date_communication_to_employee: "NO",
      appraisals_for_reportees: "NO",
      hr_off_boarding_status: false,
    },
    offboarding_finance: {
      informed_client_on_exit: "NO",
      project_official_duties_handover: "NO",
      important_mails_transferred: "NO",
      official_document_handover: "NO",
      acenet_laptop: "NO",
      id_card: "NO",
      client_asset: "NO",
      biometric_disabled: "NO",
      office_365_account_deletion: "NO",
      email_forwarded: "NO",
      zoho_account_deleted: "NO",
      relieving_letter_shared: "NO",
      fnf_statement_shared: "NO",
      fnf_cleared: "NO",
      employee_datasheet_updated: "NO",
      ghi_deletion: "NO",
      employee_folder_moved_to_past_employee_folder: "NO",
      ghi_opt_out: "NO",
      ghi_initiated: "NO",
      ghi_e_card_issued: "NO",
      finance_off_boarding_status: false,
    },
    offboarding_management: {
      handover_complete: "NO",
      management_off_boarding_status: false,
      eligible_for_rehire: "NO",
    },
  });
  const [renderComponent, setRenderComponent] = useState(false);
  const [active, setActive] = useState();
  const [getUserDetailsById, setGetUserDetailsById] = useState({});
  const [loading, setLoading] = useState(false);
  const [updated_data, setUpdated_data] = useState([]);
  const inputEventHr = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      offboarding_hr: { ...inputData?.offboarding_hr, [name]: value },
    });
    // setUpdated_data({ ...updated_data, [name]: value });
  };

  const inputEventFinance = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      offboarding_finance: {
        ...inputData?.offboarding_finance,
        [name]: value,
      },
    });
    setUpdated_data({ ...updated_data, [name]: value });
  };
  const inputEventManagement = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      offboarding_management: {
        ...inputData?.offboarding_management,
        [name]: value,
      },
    });
    setUpdated_data({ ...updated_data, [name]: value });
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
            // setActive(
            //   LocalStorageData?.zoho_role === "Hr" ||
            //     LocalStorageData?.zoho_role === "Admin"
            //     ? 1
            //     : LocalStorageData?.zoho_role === "Finance"
            //     ? 2
            //     : 3
            // ),
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
    async function get_user_list_by_role_name() {
      const result = await axios
        .get(`/get_user_list_by_role_name`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((resp) => {
          return (
            // setRoless(resp.data),
            setActive(
              resp.data?.Hr?.includes(LocalStorageData?.user_id) === true
                ? 1
                : resp.data?.Finance?.includes(LocalStorageData?.user_id) ===
                  true
                ? 2
                : resp.data?.Management?.includes(LocalStorageData?.user_id) ===
                  true
                ? 3
                : 1
            ),
            // setRenderComponent(false),
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
        return "YES"; // Exclude introduction_call_with_ceo
      } else {
        return (
          objIncludeProperty.hasOwnProperty(property) &&
          objIncludeProperty[property] === "YES"
        );
      }
    });
    return response;
  };

  const onFinalSubmit = async (btn_value) => {
    const callAPI = async () => {
      // console.log("inputData", inputData);
      // return;
      await axios
        .post(
          `/off_boarding/${btn_value}/${_id}/${inputData?._id}`,
          {
            ...inputData,
            offboarding_hr: {
              ...inputData?.offboarding_hr,
              hr_off_boarding_status:
                btn_value === "hr_offboarding_complete"
                  ? true
                  : inputData?.offboarding_hr?.hr_off_boarding_status,
            },
            offboarding_finance: {
              ...inputData?.offboarding_finance,
              finance_off_boarding_status:
                btn_value === "finance_offboarding_complete"
                  ? true
                  : inputData?.offboarding_finance?.finance_off_boarding_status,
            },
            offboarding_management: {
              ...inputData?.offboarding_management,
              management_off_boarding_status:
                btn_value === "management_offboarding_complete"
                  ? true
                  : inputData?.offboarding_management
                      ?.management_off_boarding_status,
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
          alert.success(res.data.message);
          setRenderComponent(true);
          if (
            res.data.message !== "Offboarding form has been saved successfully!"
          ) {
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
    };
    const confirmationButton =
      btn_value === "save"
        ? callAPI()
        : window.confirm(
            `Do you really want to submit ${
              active == "1" ? "HR" : active == "2" ? "Finance" : "Management"
            } offboarding?`
          );
    confirmationButton === true && callAPI();
  };
  const setAllPropertiesToTrue = (e, obj) => {
    if (obj === "hr") {
      const objHr = inputData?.offboarding_hr;
      for (let property in objHr) {
        objHr[property] = e.target.checked === true ? "YES" : "NO";
      }
      const response = objHr;
      setInputData({
        ...inputData,
        offboarding_hr: { ...response, hr_off_boarding_status: false },
      });
    } else if (obj === "finance") {
      const objFinance = inputData?.offboarding_finance;
      for (let property in objFinance) {
        objFinance[property] = e.target.checked ? "YES" : "NO";
      }
      const response = objFinance;
      setInputData({
        ...inputData,
        offboarding_finance: {
          ...response,
          finance_off_boarding_status: false,
        },
      });
    } else {
      const objManagement = inputData?.offboarding_management;
      for (let property in objManagement) {
        objManagement[property] = e.target.checked ? "YES" : "NO";
      }
      const response = objManagement;
      setInputData({
        ...inputData,
        offboarding_management: {
          ...response,
          management_off_boarding_status: false,
        },
      });
    }
  };
  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            {/* <Page_Header
              page_heading="Boarding"
              page_title_icon="mdi-view-dashboard"
              page_title_button="Back"
              page_title_button_link="/user_list/pending_offboarding_employee"
            /> */}
            {loading && (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            )}
            <div className="row">
              <div class="col-lg-12 grid-margin stretch-card">
                <div className="card" style={{ borderRadius: "20px" }}>
                  <div className="card-body">
                    <div className=" d-flex justify-content-between align-items-center">
                      <span class="card-description">Employee Information</span>
                    </div>
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
                <div className="card" style={{ borderRadius: "20px" }}>
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
                            {/* <div
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
                            </div> */}
                            <table className="table table-hover">
                              <thead>
                                <tr>
                                  <th> Field Name </th>
                                  <th> Action </th>
                                </tr>
                              </thead>
                              <tbody>
                                {(!inputData?.offboarding_hr
                                  ?.hr_off_boarding_status ||
                                  LocalStorageData?.zoho_role === "Hr") && (
                                  <tr>
                                    <td className="w-75"></td>

                                    <td colSpan={4}>
                                      <div class="form-check form-check-success mb-0 mt-0 ">
                                        <label class="form-check-label">
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
                                              LocalStorageData?.zoho_role ===
                                                "Hr" &&
                                              !inputData?.offboarding_hr
                                                ?.hr_off_boarding_status
                                                ? false
                                                : true
                                            }
                                          />
                                          Select All
                                          <i class="input-helper"></i>
                                        </label>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                                <tr>
                                  <td className="w-75">
                                    Acceptance of Resignation and Last Date
                                    communication to employee
                                  </td>
                                  <td>
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="acceptance_of_resignation_and_last_date_communication_to_employee"
                                          onChange={inputEventHr}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_hr
                                              ?.acceptance_of_resignation_and_last_date_communication_to_employee ===
                                              "YES" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Hr" &&
                                            !inputData?.offboarding_hr
                                              ?.hr_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="acceptance_of_resignation_and_last_date_communication_to_employee"
                                          onChange={inputEventHr}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_hr
                                              ?.acceptance_of_resignation_and_last_date_communication_to_employee ===
                                              "NO" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Hr" &&
                                            !inputData?.offboarding_hr
                                              ?.hr_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="acceptance_of_resignation_and_last_date_communication_to_employee"
                                          onChange={inputEventHr}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_hr
                                              ?.acceptance_of_resignation_and_last_date_communication_to_employee ===
                                              "NA" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Hr" &&
                                            !inputData?.offboarding_hr
                                              ?.hr_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Appraisals for reportees</td>
                                  <td>
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="appraisals_for_reportees"
                                          onChange={inputEventHr}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_hr
                                              ?.appraisals_for_reportees ===
                                              "YES" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Hr" &&
                                            !inputData?.offboarding_hr
                                              ?.hr_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="appraisals_for_reportees"
                                          onChange={inputEventHr}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_hr
                                              ?.appraisals_for_reportees ===
                                              "NO" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Hr" &&
                                            !inputData?.offboarding_hr
                                              ?.hr_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="appraisals_for_reportees"
                                          onChange={inputEventHr}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_hr
                                              ?.appraisals_for_reportees ===
                                              "NA" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Hr" &&
                                            !inputData?.offboarding_hr
                                              ?.hr_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
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
                                  // disabled={
                                  //   LocalStorageData?.zoho_role === "Finance" ||
                                  //   LocalStorageData?.zoho_role === "Admin"
                                  //     ? false
                                  //     : true
                                  // }
                                  disabled={
                                    LocalStorageData?.zoho_role === "Finance" &&
                                    !inputData?.offboarding_finance
                                      ?.finance_off_boarding_status
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
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="informed_client_on_exit"
                                          onChange={inputEventFinance}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.informed_client_on_exit ===
                                              "YES" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="informed_client_on_exit"
                                          onChange={inputEventFinance}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.informed_client_on_exit ===
                                              "NO" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="informed_client_on_exit"
                                          onChange={inputEventFinance}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.informed_client_on_exit ===
                                              "NA" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Project/official duties handover</td>
                                  <td>
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="project_official_duties_handover"
                                          onChange={inputEventFinance}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.project_official_duties_handover ===
                                              "YES" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="project_official_duties_handover"
                                          onChange={inputEventFinance}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.project_official_duties_handover ===
                                              "NO" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="project_official_duties_handover"
                                          onChange={inputEventFinance}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.project_official_duties_handover ===
                                              "NA" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Important mails transferred</td>
                                  <td>
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="important_mails_transferred"
                                          onChange={inputEventFinance}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.important_mails_transferred ===
                                              "YES" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="important_mails_transferred"
                                          onChange={inputEventFinance}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.important_mails_transferred ===
                                              "NO" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="important_mails_transferred"
                                          onChange={inputEventFinance}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.important_mails_transferred ===
                                              "NA" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Official document handover</td>
                                  <td>
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="official_document_handover"
                                          onChange={inputEventFinance}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.official_document_handover ===
                                              "YES" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="official_document_handover"
                                          onChange={inputEventFinance}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.official_document_handover ===
                                              "NO" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="official_document_handover"
                                          onChange={inputEventFinance}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.official_document_handover ===
                                              "NA" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Acenet - Laptop</td>
                                  <td>
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="acenet_laptop"
                                          onChange={inputEventFinance}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.acenet_laptop === "YES" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="acenet_laptop"
                                          onChange={inputEventFinance}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.acenet_laptop === "NO" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="acenet_laptop"
                                          onChange={inputEventFinance}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.acenet_laptop === "NA" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> ID Card</td>
                                  <td>
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="id_card"
                                          onChange={inputEventFinance}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.id_card === "YES" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="id_card"
                                          onChange={inputEventFinance}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.id_card === "NO" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="id_card"
                                          onChange={inputEventFinance}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.id_card === "NA" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td> Client Asset </td>
                                  <td>
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="client_asset"
                                          onChange={inputEventFinance}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.client_asset === "YES" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="client_asset"
                                          onChange={inputEventFinance}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.client_asset === "NO" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="client_asset"
                                          onChange={inputEventFinance}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.client_asset === "NA" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Biometric Disabled </td>
                                  <td>
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="biometric_disabled"
                                          onChange={inputEventFinance}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.biometric_disabled === "YES" &&
                                            true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="biometric_disabled"
                                          onChange={inputEventFinance}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.biometric_disabled === "NO" &&
                                            true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="biometric_disabled"
                                          onChange={inputEventFinance}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.biometric_disabled === "NA" &&
                                            true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Office 365 account deletion</td>
                                  <td>
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="office_365_account_deletion"
                                          onChange={inputEventFinance}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.office_365_account_deletion ===
                                              "YES" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="office_365_account_deletion"
                                          onChange={inputEventFinance}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.office_365_account_deletion ===
                                              "NO" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="office_365_account_deletion"
                                          onChange={inputEventFinance}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.office_365_account_deletion ===
                                              "NA" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Email Forwarded </td>
                                  <td>
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="email_forwarded"
                                          onChange={inputEventFinance}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.email_forwarded === "YES" &&
                                            true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="email_forwarded"
                                          onChange={inputEventFinance}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.email_forwarded === "NO" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="email_forwarded"
                                          onChange={inputEventFinance}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.email_forwarded === "NA" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Zoho Account Deleted</td>
                                  <td>
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="zoho_account_deleted"
                                          onChange={inputEventFinance}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.zoho_account_deleted ===
                                              "YES" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="zoho_account_deleted"
                                          onChange={inputEventFinance}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.zoho_account_deleted === "NO" &&
                                            true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="zoho_account_deleted"
                                          onChange={inputEventFinance}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.zoho_account_deleted === "NA" &&
                                            true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> Relieving Letter shared</td>
                                  <td>
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="relieving_letter_shared"
                                          onChange={inputEventFinance}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.relieving_letter_shared ===
                                              "YES" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="relieving_letter_shared"
                                          onChange={inputEventFinance}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.relieving_letter_shared ===
                                              "NO" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="relieving_letter_shared"
                                          onChange={inputEventFinance}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.relieving_letter_shared ===
                                              "NA" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> FnF Statement shared</td>
                                  <td>
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="fnf_statement_shared"
                                          onChange={inputEventFinance}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.fnf_statement_shared ===
                                              "YES" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="fnf_statement_shared"
                                          onChange={inputEventFinance}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.fnf_statement_shared === "NO" &&
                                            true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="fnf_statement_shared"
                                          onChange={inputEventFinance}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.fnf_statement_shared === "NA" &&
                                            true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>FnF Cleared</td>
                                  <td>
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="fnf_cleared"
                                          onChange={inputEventFinance}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.fnf_cleared === "YES" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="fnf_cleared"
                                          onChange={inputEventFinance}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.fnf_cleared === "NO" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="fnf_cleared"
                                          onChange={inputEventFinance}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.fnf_cleared === "NA" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Employee data sheet updated</td>
                                  <td>
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="employee_datasheet_updated"
                                          onChange={inputEventFinance}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.employee_datasheet_updated ===
                                              "YES" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="employee_datasheet_updated"
                                          onChange={inputEventFinance}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.employee_datasheet_updated ===
                                              "NO" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="employee_datasheet_updated"
                                          onChange={inputEventFinance}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.employee_datasheet_updated ===
                                              "NA" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>GHI Deletion</td>
                                  <td>
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="ghi_deletion"
                                          onChange={inputEventFinance}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.ghi_deletion === "YES" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="ghi_deletion"
                                          onChange={inputEventFinance}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.ghi_deletion === "NO" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="ghi_deletion"
                                          onChange={inputEventFinance}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.ghi_deletion === "NA" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    Employee folder moved to Past Employee
                                    Folder
                                  </td>
                                  <td>
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="employee_folder_moved_to_past_employee_folder"
                                          onChange={inputEventFinance}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.employee_folder_moved_to_past_employee_folder ===
                                              "YES" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="employee_folder_moved_to_past_employee_folder"
                                          onChange={inputEventFinance}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.employee_folder_moved_to_past_employee_folder ===
                                              "NO" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="employee_folder_moved_to_past_employee_folder"
                                          onChange={inputEventFinance}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.employee_folder_moved_to_past_employee_folder ===
                                              "NA" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>GHI Opt out</td>
                                  <td>
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="ghi_opt_out"
                                          onChange={inputEventFinance}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.ghi_opt_out === "YES" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="ghi_opt_out"
                                          onChange={inputEventFinance}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.ghi_opt_out === "NO" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="ghi_opt_out"
                                          onChange={inputEventFinance}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.ghi_opt_out === "NA" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td>GHI Initiated</td>
                                  <td>
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="ghi_initiated"
                                          onChange={inputEventFinance}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.ghi_initiated === "YES" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="ghi_initiated"
                                          onChange={inputEventFinance}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.ghi_initiated === "NO" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="ghi_initiated"
                                          onChange={inputEventFinance}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.ghi_initiated === "NA" && true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>GHI E-Card issued</td>
                                  <td>
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="ghi_e_card_issued"
                                          onChange={inputEventFinance}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.ghi_e_card_issued === "YES" &&
                                            true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="ghi_e_card_issued"
                                          onChange={inputEventFinance}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.ghi_e_card_issued === "NO" &&
                                            true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="ghi_e_card_issued"
                                          onChange={inputEventFinance}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_finance
                                              ?.ghi_e_card_issued === "NA" &&
                                            true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Finance" &&
                                            !inputData?.offboarding_finance
                                              ?.finance_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
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
                                      "Management" &&
                                    !inputData?.offboarding_management
                                      ?.management_off_boarding_status
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
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="handover_complete"
                                          onChange={inputEventManagement}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_management
                                              ?.handover_complete === "YES" &&
                                            true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Management" &&
                                            !inputData?.offboarding_management
                                              ?.management_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="handover_complete"
                                          onChange={inputEventManagement}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_management
                                              ?.handover_complete === "NO" &&
                                            true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Management" &&
                                            !inputData?.offboarding_management
                                              ?.management_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="handover_complete"
                                          onChange={inputEventManagement}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_management
                                              ?.handover_complete === "NA" &&
                                            true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Management" &&
                                            !inputData?.offboarding_management
                                              ?.management_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Eligible for Rehire?</td>
                                  <td>
                                    <div class="form-check form-check-success mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="eligible_for_rehire"
                                          onChange={inputEventManagement}
                                          value="YES"
                                          checked={
                                            inputData?.offboarding_management
                                              ?.eligible_for_rehire === "YES" &&
                                            true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Management" &&
                                            !inputData?.offboarding_management
                                              ?.management_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        YES<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-danger mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="eligible_for_rehire"
                                          onChange={inputEventManagement}
                                          value="NO"
                                          checked={
                                            inputData?.offboarding_management
                                              ?.eligible_for_rehire === "NO" &&
                                            true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Management" &&
                                            !inputData?.offboarding_management
                                              ?.management_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NO<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="form-check form-check-info mb-0 mt-0">
                                      <label class="form-check-label">
                                        <input
                                          type="radio"
                                          name="eligible_for_rehire"
                                          onChange={inputEventManagement}
                                          value="NA"
                                          checked={
                                            inputData?.offboarding_management
                                              ?.eligible_for_rehire === "NA" &&
                                            true
                                          }
                                          style={{ opacity: "0" }}
                                          disabled={
                                            LocalStorageData?.zoho_role ===
                                              "Management" &&
                                            !inputData?.offboarding_management
                                              ?.management_off_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        NA<i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </>
                        </div>
                      </div>
                      {/* <!==========  Update & Save Button ============> */}
                      {/* <div className="text-center">
                        {inputData?._id ? (
                          <>
                            <button
                              className="btn btn-sm btn-gradient-dark mt-4"
                              // onClick={onUpdateNextButton}
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
                            // onClick={onSaveNextButton}
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
                      </div> */}
                    </form>
                  </div>
                  <div className="text-center mb-4">
                    {!getUserDetailsById?.on_boarding_status && (
                      <>
                        {(active == "1"
                          ? inputData?.offboarding_hr?.hr_off_boarding_status
                          : active == "2"
                          ? inputData?.offboarding_finance
                              ?.finance_off_boarding_status
                          : inputData?.offboarding_management
                              ?.management_off_boarding_status) && (
                          <div className="text-success fw-bold">
                            {active == "1"
                              ? "HR "
                              : active == "2"
                              ? "Finance "
                              : "Management "}
                            offboarding has been completed
                          </div>
                        )}
                      </>
                    )}

                    <div
                      style={{
                        display:
                          LocalStorageData?.zoho_role === "Hr" &&
                          active == "1" &&
                          !inputData?.offboarding_hr?.hr_off_boarding_status
                            ? "inline"
                            : LocalStorageData?.zoho_role === "Finance" &&
                              active == "2" &&
                              !inputData?.offboarding_finance
                                ?.finance_off_boarding_status
                            ? "inline"
                            : LocalStorageData?.zoho_role === "Management" &&
                              active == "3" &&
                              !inputData?.offboarding_management
                                ?.management_off_boarding_status
                            ? "inline"
                            : LocalStorageData?.zoho_role === "Admin"
                            ? "inline"
                            : "none",
                      }}
                    >
                      <button
                        type="button"
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => onFinalSubmit("save")}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-gradient-success me-2"
                        onClick={() =>
                          onFinalSubmit(
                            active == "1"
                              ? "hr_offboarding_complete"
                              : active == "2"
                              ? "finance_offboarding_complete"
                              : "management_offboarding_complete"
                          )
                        }
                      >
                        Save & Submit
                      </button>
                    </div>
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
