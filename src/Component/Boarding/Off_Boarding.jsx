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
    informed_client_on_exit: false,
    project_official_duties_handover: false,
    important_mails_transferred: false,
    official_document_handover: false,
    acenet_laptop: false,
    id_card: false,
    data_card_hotspot: false,
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
    ghi_initiated: false,
    ghi_e_card_issued: false,
    hr_off_boarding_status: false,
    finance_off_boarding_status: false,
    management_off_boarding_status: false,
  });
  const [renderComponent, setRenderComponent] = useState(false);
  const [active, setActive] = useState();
  const [getUserDetailsById, setGetUserDetailsById] = useState({});
  const [loading, setLoading] = useState(false);

  const inputEvent = (e) => {
    const { name, checked } = e.target;
    setInputData({ ...inputData, [name]: checked });
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

  const onSaveNextButton = async (event) => {
    event.preventDefault();
    setLoading(true);
    await axios
      .post(
        `/off_boarding/${_id}`,
        {
          ...inputData,
          hr_off_boarding_status:
            inputData?.informed_client_on_exit === true &&
            inputData?.project_official_duties_handover === true &&
            inputData?.important_mails_transferred === true &&
            inputData?.official_document_handover === true
              ? true
              : false,
          finance_off_boarding_status:
            inputData?.acenet_laptop === true &&
            inputData?.id_card === true &&
            inputData?.data_card_hotspot === true &&
            inputData?.client_asset === true &&
            inputData?.biometric_disabled === true &&
            inputData?.office_365_account_deletion === true &&
            inputData?.email_forwarded === true &&
            inputData?.zoho_account_deleted === true
              ? true
              : false,
          management_off_boarding_status:
            inputData?.relieving_letter_shared === true &&
            inputData?.fnf_statement_shared === true &&
            inputData?.fnf_cleared === true &&
            inputData?.employee_datasheet_updated === true &&
            inputData?.ghi_deletion === true &&
            inputData?.employee_folder_moved_to_past_employee_folder === true &&
            inputData?.ghi_initiated === true &&
            inputData?.ghi_e_card_issued === true
              ? true
              : false,
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
          await axios
            .put(
              `/user_update/${_id}`,
              {
                initiate_off_boarding_status: true,
                off_boarding_status:
                  inputData?.hr_off_boarding_status === true &&
                  inputData?.finance_off_boarding_status === true &&
                  inputData?.management_off_boarding_status === true
                    ? true
                    : false,
              },
              {
                headers: {
                  Access_Token: LocalStorageData?.generate_auth_token,
                },
              }
            )
            .then((res) => {
              return alert.show(res?.data.message);
            })
            .catch((err) => {
              if (err.response.status === 500) {
                navigate("/error_500");
              } else {
                navigate("/error_403");
              }
            });
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
          hr_off_boarding_status:
            inputData?.informed_client_on_exit === true &&
            inputData?.project_official_duties_handover === true &&
            inputData?.important_mails_transferred === true &&
            inputData?.official_document_handover === true
              ? true
              : false,
          finance_off_boarding_status:
            inputData?.acenet_laptop === true &&
            inputData?.id_card === true &&
            inputData?.data_card_hotspot === true &&
            inputData?.client_asset === true &&
            inputData?.biometric_disabled === true &&
            inputData?.office_365_account_deletion === true &&
            inputData?.email_forwarded === true &&
            inputData?.zoho_account_deleted === true
              ? true
              : false,
          management_off_boarding_status:
            inputData?.relieving_letter_shared === true &&
            inputData?.fnf_statement_shared === true &&
            inputData?.fnf_cleared === true &&
            inputData?.employee_datasheet_updated === true &&
            inputData?.ghi_deletion === true &&
            inputData?.employee_folder_moved_to_past_employee_folder === true &&
            inputData?.ghi_initiated === true &&
            inputData?.ghi_e_card_issued === true
              ? true
              : false,
        },

        {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        }
      )
      .then(async (res) => {
        if (res.data.message === "updated") {
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
    setLoading(false);
  };

  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <Page_Header
              page_title="Boarding"
              page_title_icon="mdi-view-dashboard"
              page_title_button="Back"
              page_title_button_link="/user_list/active_users"
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
                    <p className="card-description"> Off Boarding Process </p>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th> Employee Id </th>
                          <th> Name </th>
                          <th> Designation </th>
                          <th> Joining Date </th>
                          <th> Department </th>
                          <th> Designation </th>
                          <th> Status </th>
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
                          <td>{getUserDetailsById["Designation"]}</td>
                          <td>
                            {inputData?.hr_off_boarding_status === true &&
                            inputData?.finance_off_boarding_status === true &&
                            inputData?.management_off_boarding_status ===
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
                  <div className="card-body">
                    {/* <!==========  Previous Button ============> */}
                    <>
                      <button
                        className="btn btn-sm btn-gradient-primary"
                        onClick={(e) => {
                          return e.preventDefault(), setActive(active - 1);
                        }}
                        style={{
                          visibility: active !== 1 ? "visible" : "hidden",
                        }}
                        disabled={active !== 1 ? false : true}
                      >
                        Previous
                      </button>

                      {/* <!==========  Next Button ============> */}
                      {active !== 3 && (
                        <button
                          className="btn btn-sm btn-gradient-primary"
                          onClick={(e) => {
                            return e.preventDefault(), setActive(active + 1);
                          }}
                          style={{ float: "right" }}
                        >
                          Next
                        </button>
                      )}
                    </>
                    <div class="row">
                      <div class="col-lg-12 grid-margin ">
                        <div class="card">
                          <div class="card-body">
                            <form className="forms-sample">
                              <MultiStepForm activeStep={active}>
                                <Step label="Supervisor Clearance">
                                  <>
                                    <>
                                      {inputData?.hr_off_boarding_status ? (
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
                                      )}
                                    </>

                                    <table className="table table-hover">
                                      <thead>
                                        <tr>
                                          <th> Field Name </th>
                                          <th> Action </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td> Informed Client on Exit </td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label className="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="informed_client_on_exit"
                                                  className="form-control form-control-sm"
                                                  onChange={inputEvent}
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
                                                    inputData?.informed_client_on_exit
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
                                            Project/official duties handover
                                          </td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label className="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="project_official_duties_handover"
                                                  className="form-control form-control-sm"
                                                  onChange={inputEvent}
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
                                                    inputData?.project_official_duties_handover
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
                                                  onChange={inputEvent}
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
                                                    inputData?.important_mails_transferred
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
                                                  onChange={inputEvent}
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
                                                    inputData?.official_document_handover
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
                                </Step>
                                <Step label="Admin Clearance">
                                  <>
                                    <>
                                      {inputData?.finance_off_boarding_status ? (
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
                                      )}
                                    </>

                                    <table className="table table-hover">
                                      <thead>
                                        <tr>
                                          <th> Field Name </th>
                                          <th> Action </th>
                                        </tr>
                                      </thead>
                                      <tbody>
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
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.acenet_laptop
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
                                                  onChange={inputEvent}
                                                  disabled={
                                                    LocalStorageData?.zoho_role ===
                                                      "Finance" ||
                                                    LocalStorageData?.zoho_role ===
                                                      "Admin"
                                                      ? false
                                                      : true
                                                  }
                                                  style={{ opacity: "0" }}
                                                  checked={inputData?.id_card}
                                                />
                                                <span className="slider round"></span>
                                              </label>
                                              <span>Yes</span>
                                            </div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td> Data card/hotspot </td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label className="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="data_card_hotspot"
                                                  className="form-control form-control-sm"
                                                  onChange={inputEvent}
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
                                                    inputData?.data_card_hotspot
                                                  }
                                                />
                                                <span className="slider round"></span>
                                              </label>
                                              <span>Yes</span>
                                            </div>
                                          </td>
                                        </tr>
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
                                                  onChange={inputEvent}
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
                                                    inputData?.client_asset
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
                                                  onChange={inputEvent}
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
                                                    inputData?.biometric_disabled
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
                                                  onChange={inputEvent}
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
                                                    inputData?.office_365_account_deletion
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
                                                  onChange={inputEvent}
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
                                                    inputData?.email_forwarded
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
                                                  onChange={inputEvent}
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
                                                    inputData?.zoho_account_deleted
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
                                </Step>
                                <Step label="Other Formalities">
                                  <>
                                    <>
                                      {inputData?.management_off_boarding_status ? (
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
                                      )}
                                    </>

                                    <table className="table table-hover">
                                      <thead>
                                        <tr>
                                          <th> Field Name </th>
                                          <th> Action </th>
                                        </tr>
                                      </thead>
                                      <tbody>
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
                                                  onChange={inputEvent}
                                                  disabled={
                                                    LocalStorageData?.zoho_role ===
                                                      "Management" ||
                                                    LocalStorageData?.zoho_role ===
                                                      "Admin"
                                                      ? false
                                                      : true
                                                  }
                                                  style={{ opacity: "0" }}
                                                  checked={
                                                    inputData?.relieving_letter_shared
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
                                                  onChange={inputEvent}
                                                  disabled={
                                                    LocalStorageData?.zoho_role ===
                                                      "Management" ||
                                                    LocalStorageData?.zoho_role ===
                                                      "Admin"
                                                      ? false
                                                      : true
                                                  }
                                                  style={{ opacity: "0" }}
                                                  checked={
                                                    inputData?.fnf_statement_shared
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
                                                  onChange={inputEvent}
                                                  disabled={
                                                    LocalStorageData?.zoho_role ===
                                                      "Management" ||
                                                    LocalStorageData?.zoho_role ===
                                                      "Admin"
                                                      ? false
                                                      : true
                                                  }
                                                  style={{ opacity: "0" }}
                                                  checked={
                                                    inputData?.fnf_cleared
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
                                                  onChange={inputEvent}
                                                  disabled={
                                                    LocalStorageData?.zoho_role ===
                                                      "Management" ||
                                                    LocalStorageData?.zoho_role ===
                                                      "Admin"
                                                      ? false
                                                      : true
                                                  }
                                                  style={{ opacity: "0" }}
                                                  checked={
                                                    inputData?.employee_datasheet_updated
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
                                                  onChange={inputEvent}
                                                  disabled={
                                                    LocalStorageData?.zoho_role ===
                                                      "Management" ||
                                                    LocalStorageData?.zoho_role ===
                                                      "Admin"
                                                      ? false
                                                      : true
                                                  }
                                                  style={{ opacity: "0" }}
                                                  checked={
                                                    inputData?.ghi_deletion
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
                                            Employee folder moved to Past
                                            Employee Folder
                                          </td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label className="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="employee_folder_moved_to_past_employee_folder"
                                                  className="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.employee_folder_moved_to_past_employee_folder
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
                                          <td>GHI Initiated</td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label className="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="ghi_initiated"
                                                  className="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.ghi_initiated
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
                                          <td>GHI E-Card issued</td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label className="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="ghi_e_card_issued"
                                                  className="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.ghi_e_card_issued
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
                                </Step>
                              </MultiStepForm>
                              {/* <!==========  Previous Button ============> */}
                              {active !== 1 && (
                                <>
                                  <button
                                    className="btn btn-sm btn-gradient-primary me-2 mt-4 mb-4"
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
                              {active !== 3 && (
                                <button
                                  className="btn btn-sm btn-gradient-primary me-2 mt-4 mb-4"
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
          <footer className="footer">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Off_Boarding;
