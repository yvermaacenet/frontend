import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import { useAlert } from "react-alert";

import axios from "axios";
const On_Boarding = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const alert = useAlert();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [renderComponent, setRenderComponent] = useState(false);
  const [active, setActive] = useState();
  const [getUserDetailsById, setGetUserDetailsById] = useState({});
  const [roless, setRoless] = useState([]);
  const [updated_data, setUpdated_data] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputDataChecked, setInputDataChecked] = useState({});

  const [inputData, setInputData] = useState({
    hr: {
      onboard_meet_and_greet_welcome_call: "NO",
      // verify_acenet_email_id_zoho_id_laptop_provision_to_employee: "NO",
      verify_acenet_email_id: "NO",
      laptop_provision_to_employee: "NO",
      verify_zoho_id: "NO",
      introduction_meeting_with_buddy: "NO",
      introduction_meeting_with_line_manager_respective_senior_manager: "NO",
      handover_to_project_complete: "NO",
      introduction_call_with_ceo: "NO",
      hr_on_boarding_status: false,
    },
    finance: {
      genrate_mail_id: "NO",
      one_drive_access: "NO",
      teams_access: "NO",
      add_to_official_dls: "NO",
      biometric: "NO",
      acenet_laptop: "NO",
      client_laptop: "NO",
      t_shirt: "NO",
      welcome_kit: "NO",
      aadhar_card: "NO",
      pan_card: "NO",
      passport: "NO",
      dl: "NO",
      ten_th: "NO",
      tweleve_th: "NO",
      graduation: "NO",
      post_graduation: "NO",
      pay_slips: "NO",
      experience_proof: "NO",
      forms_16: "NO",
      passport_size_photo: "NO",
      signed_offer_latter: "NO",
      documents_verification: "NO",
      covid_certificate: "NO",
      employee_data_sheet_bank_details: "NO",
      other_official_documents: "NO",
      pf_form_recieved: "NO",
      pf_submitted_to_ca_team: "NO",
      PF_number_shared_with_the_employee: "NO",
      gratuity_Form_Received: "NO",
      gratuity_Form_submitteed_to_CA_Team: "NO",
      ghi_documents_received: "NO",
      ghi_initiated: "NO",
      ghi_eCard_issued: "NO",
      zoho_people_account_created: "NO",
      bgv_initiated: "NO",
      bgv_invoice_Paid: "NO",
      bgv_report_Received: "NO",
      update_linkedIn: "NO",
      finance_on_boarding_status: false,
    },
  });

  const inputEventHr = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, hr: { ...inputData?.hr, [name]: value } });
    // setUpdated_data({ ...updated_data, [name]: checked });
  };

  const inputEventFinance = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      finance: { ...inputData?.finance, [name]: value },
    });
    // setUpdated_data({ ...updated_data, [name]: value });
  };

  useEffect(() => {
    setLoading(true);
    async function get_on_boarding_list() {
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/on_boarding/${_id}`, {
          headers: { authorization: LocalStorageData?.generate_auth_token },
        })
        .then((result) => {
          console.log("result0", result);
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
        .get(`${process.env.REACT_APP_BASE_URL}/get_user_list_by_role_name`, {
          headers: { authorization: LocalStorageData?.generate_auth_token },
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
      await axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/get_user_details_By_Id/${_id}`,
          {
            headers: { authorization: LocalStorageData?.generate_auth_token },
          }
        )
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

  // const onSaveNextButton = async (event) => {
  //   event.preventDefault();
  //   await axios
  //     .post(
  //       `/on_boarding/${_id}`,
  //       {
  //         ...inputData,
  //         hr: {
  //           ...inputData?.hr,
  //           hr_on_boarding_status: checkAllPropertiesAreTrue(inputData?.hr, [
  //             "hr_on_boarding_status",
  //           ]),
  //         },
  //         finance: {
  //           ...inputData?.finance,
  //           finance_on_boarding_status: checkAllPropertiesAreTrue(
  //             inputData?.finance,
  //             ["finance_on_boarding_status", "biometric", "client_laptop"]
  //           ),
  //         },
  //         updated_by: [
  //           {
  //             user_id: LocalStorageData?.user_id,
  //             user_name: LocalStorageData?.name,
  //             updated_data,
  //           },
  //         ],
  //       },
  //       {
  //         headers: { authorization: LocalStorageData?.generate_auth_token },
  //       }
  //     )
  //     .then(async (res) => {
  //       if (res.data.message === "created") {
  //         setActive(active + 1);
  //         setRenderComponent(true);
  //         navigate("/user_list/pending_onboarding_employee");
  //       }
  //     })
  //     .catch((err) => {
  //       if (err.response.status === 500) {
  //         navigate("/error_500");
  //       } else {
  //         navigate("/error_403");
  //       }
  //     });
  // };
  // const onUpdateNextButton = async (event) => {
  //   event.preventDefault();
  //   await axios
  //     .put(
  //       `/on_boarding/${inputData?._id}`,
  //       {
  //         ...inputData,
  //         hr: {
  //           ...inputData?.hr,
  //           hr_on_boarding_status: checkAllPropertiesAreTrue(inputData?.hr, [
  //             "hr_on_boarding_status",
  //           ]),
  //         },
  //         finance: {
  //           ...inputData?.finance,
  //           finance_on_boarding_status: checkAllPropertiesAreTrue(
  //             inputData?.finance,
  //             ["finance_on_boarding_status", "biometric", "client_laptop"]
  //           ),
  //         },

  //         updated_by: [
  //           {
  //             user_id: LocalStorageData?.user_id,
  //             user_name: LocalStorageData?.name,
  //             updated_data,
  //           },
  //         ],
  //       },
  //       {
  //         headers: { authorization: LocalStorageData?.generate_auth_token },
  //       }
  //     )
  //     .then(async (res) => {
  //       if (res.data.message === "updated") {
  //         setActive(active + 1);
  //         setRenderComponent(true);
  //         setUpdated_data([]);
  //         navigate("/user_list/pending_onboarding_employee");
  //       }
  //     })
  //     .catch((err) => {
  //       if (err.response.status === 500) {
  //         navigate("/error_500");
  //       } else {
  //         navigate("/error_403");
  //       }
  //     });
  // };

  const onFinalSubmit = async (btn_value) => {
    const callAPI = async () => {
      // return;
      await axios
        .post(
          `/on_boarding/${btn_value}/${_id}/${inputData?._id}`,
          {
            ...inputData,
            hr: {
              ...inputData?.hr,
              hr_on_boarding_status:
                btn_value === "hr_onboarding_complete"
                  ? true
                  : inputData?.hr?.hr_on_boarding_status,
            },
            finance: {
              ...inputData?.finance,
              finance_on_boarding_status:
                btn_value === "finance_onboarding_complete"
                  ? true
                  : inputData?.finance?.finance_on_boarding_status,
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
            headers: { authorization: LocalStorageData?.generate_auth_token },
          }
        )
        .then(async (res) => {
          alert.success(res.data.message);
          if (
            res.data.message !== "Onboarding form has been saved successfully!"
          ) {
            navigate("/user_list/pending_onboarding_employee");
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
              active == "1" ? "HR" : "Finance"
            } onboarding?`
          );
    confirmationButton === true && callAPI();
  };
  console.log("isssssss", inputData);

  const setAllPropertiesToTrue = (e, obj) => {
    if (obj === "hr") {
      const objHr = inputData?.hr;
      for (let property in objHr) {
        objHr[property] = e.target.checked === true ? "YES" : "NO";
      }
      const response = objHr;
      setInputData({
        ...inputData,
        hr: { ...response, hr_on_boarding_status: false },
      });
    } else {
      const objFinance = inputData?.finance;
      for (let property in objFinance) {
        objFinance[property] = e.target.checked ? "YES" : "NO";
      }
      const response = objFinance;
      setInputData({
        ...inputData,
        finance: { ...response, finance_on_boarding_status: false },
      });
    }
  };
  return (
    <div class="container-scroller">
      <Navbar />
      <div class="container-fluid page-body-wrapper">
        <Sidebar />
        <div class="main-panel">
          <div class="content-wrapper">
            {/* <Page_Header
              page_heading="Boarding"
              page_title_icon="mdi-view-dashboard"
              page_title_button="Back"
              page_title_button_link="/user_list/pending_onboarding_employee"
            /> */}
            {loading && (
              <div className="loader-container">
                <div class="loader"></div>
              </div>
            )}
            <div class="row">
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card" style={{ borderRadius: "20px" }}>
                  <div class="card-body overflow-auto">
                    <div className=" d-flex justify-content-between align-items-center">
                      <span class="card-description">Employee Information</span>
                    </div>
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th> Employee Id </th>
                          <th> Name </th>
                          <th> Designation </th>
                          <th> Joining Date </th>
                          <th> Department </th>
                          {getUserDetailsById?.initiate_on_boarding_status && (
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
                          {getUserDetailsById?.initiate_on_boarding_status && (
                            <td>
                              {inputData?.hr?.hr_on_boarding_status === true &&
                              inputData?.finance?.finance_on_boarding_status ===
                                true ? (
                                <label className="text-success fw-bold">
                                  Completed
                                </label>
                              ) : (
                                <label className="text-danger fw-bold">
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
                      <span class="card-description">On Boarding Process</span>
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
                          FINANCE
                        </button>
                      </li>
                    </ul>
                    <form class="forms-sample">
                      <div class="tab-content pt-2">
                        <div
                          class={`tab-pane fade ${
                            active == "1" && "active show"
                          }`}
                          id="home-justified"
                          role="tabpanel"
                          aria-labelledby="hr-tab"
                        >
                          <table class="table table-hover mt-4">
                            <thead>
                              <tr>
                                <th> Field Name </th>
                                <th colSpan={4}> Action </th>
                              </tr>
                            </thead>
                            <tbody>
                              {(!inputData?.hr?.hr_on_boarding_status ||
                                LocalStorageData?.zoho_role === "Hr" ||
                                LocalStorageData?.zoho_role === "Admin") && (
                                <tr>
                                  <td className="w-75"></td>

                                  <td colSpan={4}>
                                    <div
                                      class="form-check form-check-success mb-0 mt-0 "
                                      // style={{ float: "right", marginRight: "0.6rem" }}
                                    >
                                      <label
                                        class="form-check-label"
                                        // style={{
                                        //   display:
                                        //     LocalStorageData?.zoho_role ===
                                        //       "Hr" ||
                                        //     LocalStorageData?.zoho_role ===
                                        //       "Admin"
                                        //       ? "block"
                                        //       : "none",
                                        // }}
                                      >
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
                                          disabled={
                                            (LocalStorageData?.zoho_role ===
                                              "Hr" ||
                                              LocalStorageData?.zoho_role ===
                                                "Admin") &&
                                            !inputData?.hr
                                              ?.hr_on_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        Select All <i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                              )}
                              <tr>
                                <td className="w-75">
                                  Onboard Meet and Greet / Welcome call
                                </td>
                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="onboard_meet_and_greet_welcome_call"
                                        onChange={inputEventHr}
                                        value="YES"
                                        checked={
                                          inputData?.hr
                                            ?.onboard_meet_and_greet_welcome_call ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
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
                                        name="onboard_meet_and_greet_welcome_call"
                                        onChange={inputEventHr}
                                        value="NO"
                                        checked={
                                          inputData?.hr
                                            ?.onboard_meet_and_greet_welcome_call ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="onboard_meet_and_greet_welcome_call"
                                        onChange={inputEventHr}
                                        value="NA"
                                        checked={
                                          inputData?.hr
                                            ?.onboard_meet_and_greet_welcome_call ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75">Verify AceNet email id</td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="verify_acenet_email_id"
                                        onChange={inputEventHr}
                                        value="YES"
                                        checked={
                                          inputData?.hr
                                            ?.verify_acenet_email_id ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
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
                                        name="verify_acenet_email_id"
                                        onChange={inputEventHr}
                                        value="NO"
                                        checked={
                                          inputData?.hr
                                            ?.verify_acenet_email_id === "NO" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="verify_acenet_email_id"
                                        onChange={inputEventHr}
                                        value="NA"
                                        checked={
                                          inputData?.hr
                                            ?.verify_acenet_email_id === "NA" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75">Verify zoho id</td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="verify_zoho_id"
                                        onChange={inputEventHr}
                                        value="YES"
                                        checked={
                                          inputData?.hr?.verify_zoho_id ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
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
                                        name="verify_zoho_id"
                                        onChange={inputEventHr}
                                        value="NO"
                                        checked={
                                          inputData?.hr?.verify_zoho_id ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="verify_zoho_id"
                                        onChange={inputEventHr}
                                        value="NA"
                                        checked={
                                          inputData?.hr?.verify_zoho_id ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75">
                                  laptop provision to employee
                                </td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="laptop_provision_to_employee"
                                        onChange={inputEventHr}
                                        value="YES"
                                        checked={
                                          inputData?.hr
                                            ?.laptop_provision_to_employee ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
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
                                        name="laptop_provision_to_employee"
                                        onChange={inputEventHr}
                                        value="NO"
                                        checked={
                                          inputData?.hr
                                            ?.laptop_provision_to_employee ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="laptop_provision_to_employee"
                                        onChange={inputEventHr}
                                        value="NA"
                                        checked={
                                          inputData?.hr
                                            ?.laptop_provision_to_employee ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75">
                                  Introduction meeting with buddy
                                </td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="introduction_meeting_with_buddy"
                                        onChange={inputEventHr}
                                        value="YES"
                                        checked={
                                          inputData?.hr
                                            ?.introduction_meeting_with_buddy ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
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
                                        name="introduction_meeting_with_buddy"
                                        onChange={inputEventHr}
                                        value="NO"
                                        checked={
                                          inputData?.hr
                                            ?.introduction_meeting_with_buddy ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="introduction_meeting_with_buddy"
                                        onChange={inputEventHr}
                                        value="NA"
                                        checked={
                                          inputData?.hr
                                            ?.introduction_meeting_with_buddy ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75">
                                  Introduction meeting with line manager +
                                  respective senior manager
                                </td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="introduction_meeting_with_line_manager_respective_senior_manager"
                                        onChange={inputEventHr}
                                        value="YES"
                                        checked={
                                          inputData?.hr
                                            ?.introduction_meeting_with_line_manager_respective_senior_manager ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
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
                                        name="introduction_meeting_with_line_manager_respective_senior_manager"
                                        onChange={inputEventHr}
                                        value="NO"
                                        checked={
                                          inputData?.hr
                                            ?.introduction_meeting_with_line_manager_respective_senior_manager ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="introduction_meeting_with_line_manager_respective_senior_manager"
                                        onChange={inputEventHr}
                                        value="NA"
                                        checked={
                                          inputData?.hr
                                            ?.introduction_meeting_with_line_manager_respective_senior_manager ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75">
                                  Handover to project complete
                                </td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="handover_to_project_complete"
                                        onChange={inputEventHr}
                                        value="YES"
                                        checked={
                                          inputData?.hr
                                            ?.handover_to_project_complete ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
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
                                        name="handover_to_project_complete"
                                        onChange={inputEventHr}
                                        value="NO"
                                        checked={
                                          inputData?.hr
                                            ?.handover_to_project_complete ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="handover_to_project_complete"
                                        onChange={inputEventHr}
                                        value="NA"
                                        checked={
                                          inputData?.hr
                                            ?.handover_to_project_complete ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td className="w-75">
                                  Introduction Call With CEO
                                </td>
                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="introduction_call_with_ceo"
                                        onChange={inputEventHr}
                                        value="YES"
                                        checked={
                                          inputData?.hr
                                            ?.introduction_call_with_ceo ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
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
                                        onChange={inputEventHr}
                                        value="NO"
                                        checked={
                                          inputData?.hr
                                            ?.introduction_call_with_ceo ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
                                            ? false
                                            : true
                                        }
                                        name="introduction_call_with_ceo"
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        onChange={inputEventHr}
                                        name="introduction_call_with_ceo"
                                        value="NA"
                                        checked={
                                          inputData?.hr
                                            ?.introduction_call_with_ceo ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Hr" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.hr?.hr_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div
                          class={`tab-pane fade ${
                            active == "2" && "active show"
                          }`}
                          id="profile-justified"
                          role="tabpanel"
                          aria-labelledby="finance-tab"
                        >
                          <table class="table table-hover mt-4">
                            <thead>
                              <tr>
                                <th> Field Name </th>
                                <th colSpan={4}> Action </th>
                              </tr>
                            </thead>
                            <tbody>
                              {!inputData?.finance
                                ?.finance_on_boarding_status && (
                                <tr>
                                  <td className="w-75"></td>
                                  <td colSpan={4}>
                                    <div class="form-check form-check-success mb-0 mt-0">
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
                                          disabled={
                                            (LocalStorageData?.zoho_role ===
                                              "Finance" ||
                                              LocalStorageData?.zoho_role ===
                                                "Admin") &&
                                            !inputData?.finance
                                              ?.finance_on_boarding_status
                                              ? false
                                              : true
                                          }
                                        />
                                        Select All <i class="input-helper"></i>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                              )}
                              <p class="card-description mt-2 mb-0 fw-bold">
                                First Day Formalities
                              </p>

                              <tr>
                                <td className="w-75"> Generate Mail Id </td>
                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="genrate_mail_id"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance
                                            ?.genrate_mail_id === "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="genrate_mail_id"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance
                                            ?.genrate_mail_id === "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="genrate_mail_id"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance
                                            ?.genrate_mail_id === "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75"> One Drive Access </td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="one_drive_access"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance
                                            ?.one_drive_access === "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="one_drive_access"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance
                                            ?.one_drive_access === "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="one_drive_access"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance
                                            ?.one_drive_access === "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75"> Add To Official DLs</td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="add_to_official_dls"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance
                                            ?.add_to_official_dls === "YES" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="add_to_official_dls"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance
                                            ?.add_to_official_dls === "NO" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="add_to_official_dls"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance
                                            ?.add_to_official_dls === "NA" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75"> Teams Access</td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="teams_access"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance?.teams_access ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="teams_access"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance?.teams_access ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="teams_access"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance?.teams_access ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75"> Biometric </td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="biometric"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance?.biometric ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="biometric"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance?.biometric ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="biometric"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance?.biometric ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75"> Acenet Laptop</td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="acenet_laptop"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance?.acenet_laptop ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                          inputData?.finance?.acenet_laptop ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
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
                                          inputData?.finance?.acenet_laptop ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75"> Client Laptop</td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="client_laptop"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance?.client_laptop ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="client_laptop"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance?.client_laptop ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="client_laptop"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance?.client_laptop ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td className="w-75"> T-Shirt</td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="t_shirt"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance?.t_shirt ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="t_shirt"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance?.t_shirt ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="t_shirt"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance?.t_shirt ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75"> Welcome Kit</td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="welcome_kit"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance?.welcome_kit ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="welcome_kit"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance?.welcome_kit ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="welcome_kit"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance?.welcome_kit ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>

                              <p class="card-description mt-2 mb-0 fw-bold">
                                Documents
                              </p>
                              <tr>
                                <td className="w-75">Aadhar Card</td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="aadhar_card"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance?.aadhar_card ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="aadhar_card"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance?.aadhar_card ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="aadhar_card"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance?.aadhar_card ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75"> PAN Card</td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="pan_card"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance?.pan_card ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="pan_card"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance?.pan_card ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="pan_card"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance?.pan_card ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75"> Passport </td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="passport"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance?.passport ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="passport"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance?.passport ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="passport"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance?.passport ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75"> DL </td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="dl"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance?.dl === "YES" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="dl"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance?.dl === "NO" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="dl"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance?.dl === "NA" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75"> 10th </td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="ten_th"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance?.ten_th ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="ten_th"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance?.ten_th === "NO" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="ten_th"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance?.ten_th === "NA" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75"> 12th </td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="tweleve_th"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance?.tweleve_th ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="tweleve_th"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance?.tweleve_th ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="tweleve_th"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance?.tweleve_th ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75"> Graduation </td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="graduation"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance?.graduation ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="graduation"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance?.graduation ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="graduation"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance?.graduation ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75"> Post Graduation</td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="post_graduation"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance
                                            ?.post_graduation === "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="post_graduation"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance
                                            ?.post_graduation === "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="post_graduation"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance
                                            ?.post_graduation === "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75">
                                  Experience proof - Relieving letter from
                                  previous employers (if previously employed)
                                </td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="experience_proof"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance
                                            ?.experience_proof === "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="experience_proof"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance
                                            ?.experience_proof === "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="experience_proof"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance
                                            ?.experience_proof === "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75">
                                  {" "}
                                  Passport size photograph
                                </td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="passport_size_photo"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance
                                            ?.passport_size_photo === "YES" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="passport_size_photo"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance
                                            ?.passport_size_photo === "NO" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="passport_size_photo"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance
                                            ?.passport_size_photo === "NA" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75"> Signed Offer Letter</td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="signed_offer_latter"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance
                                            ?.signed_offer_latter === "YES" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="signed_offer_latter"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance
                                            ?.signed_offer_latter === "NO" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="signed_offer_latter"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance
                                            ?.signed_offer_latter === "NA" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75"> Document Verification</td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="documents_verification"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance
                                            ?.documents_verification ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="documents_verification"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance
                                            ?.documents_verification === "NO" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="documents_verification"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance
                                            ?.documents_verification === "NA" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75"> Covid Certificate</td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="covid_certificate"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance
                                            ?.covid_certificate === "YES" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="covid_certificate"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance
                                            ?.covid_certificate === "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="covid_certificate"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance
                                            ?.covid_certificate === "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75">
                                  Employee Data Sheet (Bank Details)
                                </td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="employee_data_sheet_bank_details"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance
                                            ?.employee_data_sheet_bank_details ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="employee_data_sheet_bank_details"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance
                                            ?.employee_data_sheet_bank_details ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="employee_data_sheet_bank_details"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance
                                            ?.employee_data_sheet_bank_details ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75">
                                  {" "}
                                  Other official document
                                </td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="other_official_documents"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance
                                            ?.other_official_documents ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="other_official_documents"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance
                                            ?.other_official_documents ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="other_official_documents"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance
                                            ?.other_official_documents ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75">
                                  {" "}
                                  Pay slips - Last 3 months
                                </td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="pay_slips"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance?.pay_slips ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="pay_slips"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance?.pay_slips ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="pay_slips"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance?.pay_slips ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75">
                                  Form 16 or Taxable income statement duly
                                  certified by
                                  <br /> previous employer(Statement showing
                                  deductions and Taxable income with break up)
                                </td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="forms_16"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance?.forms_16 ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="forms_16"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance?.forms_16 ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="forms_16"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance?.forms_16 ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <p class="card-description mt-2 mb-0 fw-bold">
                                Compliance Documents
                              </p>
                              <tr>
                                <td className="w-75"> PF Form Received</td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="pf_form_recieved"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance
                                            ?.pf_form_recieved === "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="pf_form_recieved"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance
                                            ?.pf_form_recieved === "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="pf_form_recieved"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance
                                            ?.pf_form_recieved === "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75">
                                  PF Form submitted to CA Team
                                </td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="pf_submitted_to_ca_team"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance
                                            ?.pf_submitted_to_ca_team ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="pf_submitted_to_ca_team"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance
                                            ?.pf_submitted_to_ca_team ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="pf_submitted_to_ca_team"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance
                                            ?.pf_submitted_to_ca_team ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75">
                                  PF Number shared with the employee
                                </td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="PF_number_shared_with_the_employee"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance
                                            ?.PF_number_shared_with_the_employee ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="PF_number_shared_with_the_employee"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance
                                            ?.PF_number_shared_with_the_employee ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="PF_number_shared_with_the_employee"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance
                                            ?.PF_number_shared_with_the_employee ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75">
                                  {" "}
                                  Gratuity Form Received
                                </td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="gratuity_Form_Received"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance
                                            ?.gratuity_Form_Received ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="gratuity_Form_Received"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance
                                            ?.gratuity_Form_Received === "NO" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="gratuity_Form_Received"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance
                                            ?.gratuity_Form_Received === "NA" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75">
                                  Gratuity Form submitteed to CA Team
                                </td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="gratuity_Form_submitteed_to_CA_Team"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance
                                            ?.gratuity_Form_submitteed_to_CA_Team ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="gratuity_Form_submitteed_to_CA_Team"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance
                                            ?.gratuity_Form_submitteed_to_CA_Team ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="gratuity_Form_submitteed_to_CA_Team"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance
                                            ?.gratuity_Form_submitteed_to_CA_Team ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75">
                                  {" "}
                                  GHI Documents Received
                                </td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="ghi_documents_received"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance
                                            ?.ghi_documents_received ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="ghi_documents_received"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance
                                            ?.ghi_documents_received === "NO" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="ghi_documents_received"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance
                                            ?.ghi_documents_received === "NA" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75">GHI Initiated</td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="ghi_initiated"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance?.ghi_initiated ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                          inputData?.finance?.ghi_initiated ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
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
                                          inputData?.finance?.ghi_initiated ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75">GHI E-Card issued</td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="ghi_eCard_issued"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance
                                            ?.ghi_eCard_issued === "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="ghi_eCard_issued"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance
                                            ?.ghi_eCard_issued === "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="ghi_eCard_issued"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance
                                            ?.ghi_eCard_issued === "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>

                              <p class="card-description mt-2 mb-0 fw-bold">
                                Zoho Accounts
                              </p>
                              <tr>
                                <td className="w-75">
                                  ZOHO People Account Created
                                </td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="zoho_people_account_created"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance
                                            ?.zoho_people_account_created ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="zoho_people_account_created"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance
                                            ?.zoho_people_account_created ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="zoho_people_account_created"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance
                                            ?.zoho_people_account_created ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>

                              <p class="card-description mt-2 mb-0 fw-bold">
                                Other Formalities
                              </p>
                              <tr>
                                <td className="w-75"> BGV Initiated</td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="bgv_initiated"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance?.bgv_initiated ===
                                            "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="bgv_initiated"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance?.bgv_initiated ===
                                            "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="bgv_initiated"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance?.bgv_initiated ===
                                            "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75"> BGV Invoice Paid</td>

                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="bgv_invoice_Paid"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance
                                            ?.bgv_invoice_Paid === "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="bgv_invoice_Paid"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance
                                            ?.bgv_invoice_Paid === "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="bgv_invoice_Paid"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance
                                            ?.bgv_invoice_Paid === "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75"> BGV Report Received</td>
                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="bgv_report_Received"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance
                                            ?.bgv_report_Received === "YES" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="bgv_report_Received"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance
                                            ?.bgv_report_Received === "NO" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="bgv_report_Received"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance
                                            ?.bgv_report_Received === "NA" &&
                                          true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="w-75"> Update LinkedIn</td>
                                <td>
                                  <div class="form-check form-check-success mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="update_linkedIn"
                                        onChange={inputEventFinance}
                                        value="YES"
                                        checked={
                                          inputData?.finance
                                            ?.update_linkedIn === "YES" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
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
                                        name="update_linkedIn"
                                        onChange={inputEventFinance}
                                        value="NO"
                                        checked={
                                          inputData?.finance
                                            ?.update_linkedIn === "NO" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NO <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-info mb-0 mt-0">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        name="update_linkedIn"
                                        onChange={inputEventFinance}
                                        value="NA"
                                        checked={
                                          inputData?.finance
                                            ?.update_linkedIn === "NA" && true
                                        }
                                        disabled={
                                          (LocalStorageData?.zoho_role ===
                                            "Finance" ||
                                            LocalStorageData?.zoho_role ===
                                              "Admin") &&
                                          !inputData?.finance
                                            ?.finance_on_boarding_status
                                            ? false
                                            : true
                                        }
                                      />
                                      NA <i class="input-helper"></i>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {/* <!==========  Update & Save Button ============> */}
                    </form>
                  </div>
                  <div className="text-center mb-4">
                    {/* {inputData?._id ? (
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
                          <>
                            <button
                              className="btn btn-sm btn-gradient-dark me-2 mt-4 mb-4"
                              onClick={onSaveNextButton}
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
                        )} */}
                    {!getUserDetailsById?.on_boarding_status && (
                      <>
                        {(active == "1"
                          ? inputData?.hr?.hr_on_boarding_status
                          : inputData?.finance?.finance_on_boarding_status) && (
                          <div className="text-success fw-bold">
                            {active == "1" ? "HR" : "Finance"} onboarding has
                            been completed
                          </div>
                        )}
                      </>
                    )}

                    <div
                      style={{
                        display:
                          LocalStorageData?.zoho_role === "Hr" &&
                          active == "1" &&
                          !inputData?.hr?.hr_on_boarding_status
                            ? "inline"
                            : LocalStorageData?.zoho_role === "Finance" &&
                              active == "2" &&
                              !inputData?.finance?.finance_on_boarding_status
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
                        className="btn btn-sm btn-primary me-2"
                        onClick={() =>
                          onFinalSubmit(
                            active == "1"
                              ? "hr_onboarding_complete"
                              : "finance_onboarding_complete"
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
          <footer class="footer">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default On_Boarding;
