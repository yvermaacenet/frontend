import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MultiStepForm, Step } from "react-multi-form";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import axios from "axios";
const On_Boarding = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [inputData, setInputData] = useState({
    onboard_meet_and_greet_welcome_call: false,
    verify_acenet_email_id_zoho_id_laptop_provision_to_employee: false,
    introduction_meeting_with_buddy: false,
    introduction_meeting_with_line_manager_respective_senior_manager: false,
    handover_to_project_complete: false,
    introduction_call_with_ceo: false,
    // wifi_passwords: false,
    genrate_mail_id: false,
    one_drive_access: false,
    teams_access: false,
    add_to_official_dls: false,
    biometric: false,
    acenet_laptop: false,
    client_laptop: false,
    // notpad: false,
    t_shirt: false,
    welcome_kit: false,
    // intro_slide_shared: false,
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
    // zoho_people_account_activated: false,
    // zoho_payroll_integrated: false,
    bgv_initiated: false,
    bgv_invoice_Paid: false,
    bgv_report_Received: false,
    update_linkedIn: false,
    hr_on_boarding_status: false,
    finance_on_boarding_status: false,
  });
  const [renderComponent, setRenderComponent] = useState(false);
  const [active, setActive] = useState();
  // const [steperCounter, setSteperCounter] = useState(1);
  const [getUserDetailsById, setGetUserDetailsById] = useState({});
  const [roless, setRoless] = useState([]);
  const [updated_data, setUpdated_data] = useState([]);
  const [loading, setLoading] = useState(false);

  const inputEvent = (e) => {
    const { name, checked } = e.target;
    setInputData({ ...inputData, [name]: checked });
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

  const onSaveNextButton = async (event) => {
    event.preventDefault();
    await axios
      .post(
        `/on_boarding/${_id}`,
        {
          ...inputData,
          hr_on_boarding_status:
            inputData?.onboard_meet_and_greet_welcome_call === true &&
            inputData?.verify_acenet_email_id_zoho_id_laptop_provision_to_employee ===
              true &&
            inputData?.introduction_meeting_with_buddy === true &&
            inputData?.introduction_meeting_with_line_manager_respective_senior_manager ===
              true &&
            inputData?.handover_to_project_complete === true &&
            inputData?.introduction_call_with_ceo === true
              ? true
              : false,
          finance_on_boarding_status:
            // inputData?.wifi_passwords === true &&
            inputData?.genrate_mail_id === true &&
            inputData?.one_drive_access === true &&
            inputData?.teams_access === true &&
            inputData?.add_to_official_dls === true &&
            // inputData?.biometric === true &&
            inputData?.introduction_call_with_ceo === true &&
            inputData?.acenet_laptop === true &&
            // inputData?.client_laptop === true &&
            // inputData?.notpad === true &&
            inputData?.t_shirt === true &&
            inputData?.welcome_kit === true &&
            // inputData?.intro_slide_shared === true &&
            inputData?.aadhar_card === true &&
            inputData?.pan_card === true &&
            inputData?.passport === true &&
            inputData?.dl === true &&
            inputData?.ten_th === true &&
            inputData?.tweleve_th === true &&
            inputData?.graduation === true &&
            inputData?.post_graduation === true &&
            inputData?.pay_slips === true &&
            inputData?.experience_proof === true &&
            inputData?.forms_16 === true &&
            inputData?.passport_size_photo === true &&
            inputData?.signed_offer_latter === true &&
            inputData?.documents_verification === true &&
            inputData?.covid_certificate === true &&
            inputData?.employee_data_sheet_bank_details === true &&
            inputData?.other_official_documents === true &&
            inputData?.pf_form_recieved === true &&
            inputData?.pf_submitted_to_ca_team === true &&
            inputData?.PF_number_shared_with_the_employee === true &&
            inputData?.gratuity_Form_Received === true &&
            inputData?.gratuity_Form_submitteed_to_CA_Team === true &&
            inputData?.ghi_documents_received === true &&
            inputData?.ghi_initiated === true &&
            inputData?.ghi_eCard_issued === true &&
            inputData?.zoho_people_account_created === true &&
            // inputData?.zoho_people_account_activated === true &&
            // inputData?.zoho_payroll_integrated === true &&
            inputData?.bgv_initiated === true &&
            inputData?.bgv_invoice_Paid === true &&
            inputData?.bgv_report_Received === true &&
            inputData?.update_linkedIn === true
              ? true
              : false,

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
          navigate("/user_list/active_users");
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
          hr_on_boarding_status:
            inputData?.onboard_meet_and_greet_welcome_call === true &&
            inputData?.verify_acenet_email_id_zoho_id_laptop_provision_to_employee ===
              true &&
            inputData?.introduction_meeting_with_buddy === true &&
            inputData?.introduction_meeting_with_line_manager_respective_senior_manager ===
              true &&
            inputData?.handover_to_project_complete === true &&
            inputData?.introduction_call_with_ceo === true
              ? true
              : false,
          finance_on_boarding_status:
            // inputData?.wifi_passwords === true &&
            inputData?.genrate_mail_id === true &&
            inputData?.one_drive_access === true &&
            inputData?.teams_access === true &&
            inputData?.add_to_official_dls === true &&
            // inputData?.biometric === true &&
            inputData?.introduction_call_with_ceo === true &&
            inputData?.acenet_laptop === true &&
            // inputData?.client_laptop === true &&
            // inputData?.notpad === true &&
            inputData?.t_shirt === true &&
            inputData?.welcome_kit === true &&
            // inputData?.intro_slide_shared === true &&
            inputData?.aadhar_card === true &&
            inputData?.pan_card === true &&
            inputData?.passport === true &&
            inputData?.dl === true &&
            inputData?.ten_th === true &&
            inputData?.tweleve_th === true &&
            inputData?.graduation === true &&
            inputData?.post_graduation === true &&
            inputData?.pay_slips === true &&
            inputData?.experience_proof === true &&
            inputData?.forms_16 === true &&
            inputData?.passport_size_photo === true &&
            inputData?.signed_offer_latter === true &&
            inputData?.documents_verification === true &&
            inputData?.covid_certificate === true &&
            inputData?.employee_data_sheet_bank_details === true &&
            inputData?.other_official_documents === true &&
            inputData?.pf_form_recieved === true &&
            inputData?.pf_submitted_to_ca_team === true &&
            inputData?.PF_number_shared_with_the_employee === true &&
            inputData?.gratuity_Form_Received === true &&
            inputData?.gratuity_Form_submitteed_to_CA_Team === true &&
            inputData?.ghi_documents_received === true &&
            inputData?.ghi_initiated === true &&
            inputData?.ghi_eCard_issued === true &&
            inputData?.zoho_people_account_created === true &&
            // inputData?.zoho_people_account_activated === true &&
            // inputData?.zoho_payroll_integrated === true &&
            inputData?.bgv_initiated === true &&
            inputData?.bgv_invoice_Paid === true &&
            inputData?.bgv_report_Received === true &&
            inputData?.update_linkedIn === true
              ? true
              : false,

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
          // setSteperCounter(steperCounter + 1);
          setRenderComponent(true);
          setUpdated_data([]);
          navigate("/user_list/active_users");
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
              page_title_button_link="/user_list/active_users"
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
                    {/* <h4 class="card-title">Default form</h4> */}
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
                          <h6
                            className="mt-0 p-3"
                            // style={{position:"sticky", top:"0", backgroundColor:"white", margin:"0"}}
                          >
                            History
                          </h6>

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
                            {inputData?.hr_on_boarding_status === true &&
                            inputData?.finance_on_boarding_status === true ? (
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

                    <div></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div class="col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    {/* <!==========  Previous Button ============> */}

                    <button
                      class="btn btn-sm btn-gradient-primary me-4"
                      onClick={(e) => {
                        return (
                          e.preventDefault(), setActive(active - 1)
                          // setSteperCounter(steperCounter - 1)
                        );
                      }}
                      style={{
                        visibility: active !== 1 ? "visible" : "hidden",
                        marginleft: "-48px",
                      }}
                      disabled={active !== 1 ? false : true}
                    >
                      Previous
                    </button>

                    {/* <!==========  Next Button ============> */}
                    {active !== 2 && (
                      <button
                        class="btn btn-sm btn-gradient-primary"
                        onClick={(e) => {
                          return (
                            e.preventDefault(), setActive(active + 1)
                            // setSteperCounter(steperCounter + 1)
                          );
                        }}
                        style={{ float: "right", marginRight: "48px" }}
                      >
                        Next
                      </button>
                    )}

                    <div class="row">
                      <div class="col-lg-12 grid-margin ">
                        <div class="card">
                          <div class="card-body">
                            <form class="forms-sample">
                              <MultiStepForm
                                activeStep={active}
                                accentColor="#07cdae"
                              >
                                <Step label="HR">
                                  <>
                                    {getUserDetailsById?.initiate_on_boarding_status &&
                                      (inputData?.hr_on_boarding_status ? (
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

                                    <table class="table table-hover">
                                      <thead>
                                        <tr>
                                          <th> Field Name </th>
                                          <th> Action </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>
                                            Onboard Meet and Greet / Welcome
                                            call
                                          </td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="onboard_meet_and_greet_welcome_call"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.onboard_meet_and_greet_welcome_call
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
                                            Verify AceNet email id /zoho id/
                                            laptop provision to employee
                                          </td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="verify_acenet_email_id_zoho_id_laptop_provision_to_employee"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.verify_acenet_email_id_zoho_id_laptop_provision_to_employee
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
                                            Introduction meeting with buddy
                                          </td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="introduction_meeting_with_buddy"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.introduction_meeting_with_buddy
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
                                            Introduction meeting with line
                                            manager + respective senior manager
                                          </td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="introduction_meeting_with_line_manager_respective_senior_manager"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.introduction_meeting_with_line_manager_respective_senior_manager
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
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.handover_to_project_complete
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
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.introduction_call_with_ceo
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
                                  </>
                                </Step>

                                <Step label="Finance">
                                  <>
                                    <>
                                      {getUserDetailsById?.initiate_on_boarding_status &&
                                        (inputData?.finance_on_boarding_status ? (
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
                                    </>

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
                                        {/* <tr>
                                          <td> Wifi Passwords </td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="wifi_passwords"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.wifi_passwords
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
                                        </tr> */}
                                        <tr>
                                          <td> Generate Mail Id </td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="genrate_mail_id"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.genrate_mail_id
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
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.one_drive_access
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
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.add_to_official_dls
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
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.teams_access
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
                                                  onChange={inputEvent}
                                                  checked={inputData?.biometric}
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
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.acenet_laptop
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
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.client_laptop
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
                                        {/* <tr>
                                          <td> Notepad </td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="notpad"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  checked={inputData?.notpad}
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
                                        </tr> */}
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
                                                  onChange={inputEvent}
                                                  checked={inputData?.t_shirt}
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
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.welcome_kit
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
                                        {/* <tr>
                                          <td> Intro Slide Shared</td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="intro_slide_shared"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.intro_slide_shared
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
                                        </tr> */}
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
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.aadhar_card
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
                                                  onChange={inputEvent}
                                                  checked={inputData?.pan_card}
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
                                                  onChange={inputEvent}
                                                  checked={inputData?.passport}
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
                                                  onChange={inputEvent}
                                                  checked={inputData?.dl}
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
                                                  onChange={inputEvent}
                                                  checked={inputData?.ten_th}
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
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.tweleve_th
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
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.graduation
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
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.post_graduation
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
                                            Experience proof - Relieving letter
                                            from previous employers (if
                                            previously employed)
                                          </td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="experience_proof"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.experience_proof
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
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.passport_size_photo
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
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.signed_offer_latter
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
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.documents_verification
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
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.covid_certificate
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
                                            Employee Data Sheet (Bank Details)
                                          </td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="employee_data_sheet_bank_details"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.employee_data_sheet_bank_details
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
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.other_official_documents
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
                                                  onChange={inputEvent}
                                                  checked={inputData?.pay_slips}
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
                                            deductions and Taxable income with
                                            break up)
                                          </td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="forms_16"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  checked={inputData?.forms_16}
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
                                                  onChange={inputEvent}
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
                                                    inputData?.pf_form_recieved
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
                                                  onChange={inputEvent}
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
                                                    inputData?.pf_submitted_to_ca_team
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
                                          <td>
                                            PF Number shared with the employee
                                          </td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="PF_number_shared_with_the_employee"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
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
                                                    inputData?.PF_number_shared_with_the_employee
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
                                                  onChange={inputEvent}
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
                                                    inputData?.gratuity_Form_Received
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
                                            Gratuity Form submitteed to CA Team
                                          </td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="gratuity_Form_submitteed_to_CA_Team"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
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
                                                    inputData?.gratuity_Form_submitteed_to_CA_Team
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
                                                  onChange={inputEvent}
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
                                                    inputData?.ghi_documents_received
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
                                                  onChange={inputEvent}
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
                                                    inputData?.ghi_initiated
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
                                                  onChange={inputEvent}
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
                                                    inputData?.ghi_eCard_issued
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
                                                  onChange={inputEvent}
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
                                                    inputData?.zoho_people_account_created
                                                  }
                                                />
                                                <span class="slider round"></span>
                                              </label>
                                              <span>Yes</span>
                                            </div>
                                          </td>
                                        </tr>
                                        {/* <tr>
                                          <td>Zoho People Account Activated</td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="zoho_people_account_activated"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
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
                                                    inputData?.zoho_people_account_activated
                                                  }
                                                />
                                                <span class="slider round"></span>
                                              </label>
                                              <span>Yes</span>
                                            </div>
                                          </td>
                                        </tr> */}
                                        {/* <tr>
                                          <td>Zoho Payroll Integrated</td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="zoho_payroll_integrated"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
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
                                                    inputData?.zoho_payroll_integrated
                                                  }
                                                />
                                                <span class="slider round"></span>
                                              </label>
                                              <span>Yes</span>
                                            </div>
                                          </td>
                                        </tr> */}
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
                                                  onChange={inputEvent}
                                                  style={{ opacity: 0 }}
                                                  checked={
                                                    inputData?.bgv_initiated
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
                                                  onChange={inputEvent}
                                                  style={{ opacity: 0 }}
                                                  checked={
                                                    inputData?.bgv_invoice_Paid
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
                                                  onChange={inputEvent}
                                                  style={{ opacity: 0 }}
                                                  checked={
                                                    inputData?.bgv_report_Received
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
                                                  onChange={inputEvent}
                                                  style={{ opacity: 0 }}
                                                  checked={
                                                    inputData?.update_linkedIn
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
                                  </>
                                </Step>
                              </MultiStepForm>
                              {/* <!==========  Previous Button ============> */}

                              {active !== 1 && (
                                <>
                                  <button
                                    class="btn btn-sm btn-gradient-primary me-2 mt-4 mb-4"
                                    onClick={(e) => {
                                      return (
                                        e.preventDefault(),
                                        setActive(active - 1)
                                      );
                                    }}
                                  >
                                    Previous
                                  </button>
                                </>
                              )}
                              {/* <!==========  Next Button ============> */}
                              {active !== 2 && (
                                <button
                                  class="btn btn-sm btn-gradient-primary me-2 mt-4 mb-4"
                                  onClick={(e) => {
                                    return (
                                      e.preventDefault(), setActive(active + 1)
                                    );
                                  }}
                                  style={{ float: "right" }}
                                >
                                  Next
                                </button>
                              )}
                              {/* <!==========  Update & Save Button ============> */}
                              {inputData?._id ? (
                                <>
                                  <button
                                    className="btn btn-sm btn-gradient-success me-2 mt-4 mb-4"
                                    onClick={onUpdateNextButton}
                                    style={{
                                      float: "right",
                                      display:
                                        LocalStorageData?.zoho_role === "Hr" &&
                                        active === 1
                                          ? "block"
                                          : LocalStorageData?.zoho_role ===
                                              "Finance" && active === 2
                                          ? "block"
                                          : LocalStorageData?.zoho_role ===
                                              "Management" && active === 3
                                          ? "block"
                                          : LocalStorageData?.zoho_role ===
                                            "Admin"
                                          ? "block"
                                          : "none",
                                    }}
                                  >
                                    Submit
                                  </button>
                                </>
                              ) : (
                                <button
                                  className="btn btn-sm btn-gradient-success me-2 mt-4 mb-4"
                                  onClick={onSaveNextButton}
                                  style={{
                                    float: "right",
                                    display:
                                      LocalStorageData?.zoho_role === "Hr" &&
                                      active === 1
                                        ? "block"
                                        : LocalStorageData?.zoho_role ===
                                            "Finance" && active === 2
                                        ? "block"
                                        : LocalStorageData?.zoho_role ===
                                            "Management" && active === 3
                                        ? "block"
                                        : LocalStorageData?.zoho_role ===
                                          "Admin"
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
