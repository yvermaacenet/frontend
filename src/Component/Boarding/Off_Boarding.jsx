import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { MultiStepForm, Step } from "react-multi-form";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import Employee_Details from "./Employee_Details";
import axios from "axios";
import FirstDayFormalities from "./FirstDayFormalities";
import Document from "./Documents";
import Compliance_Documents from "./Compliance_Documents";
import Bank from "./Bank";
import Zoho_Account from "./Zoho_Account";
import Other_Formalities from "./Other_Formalities";
import Supervisor_Clearance from "./Supervisor_Clearance";
import Admin_Clearance from "./Admin_Clearance";
import Other_Formalities_Off_Boarding from "./Other_Formalities_Off_Boarding";
const Off_Boarding = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [inputData, setInputData] = useState([]);
  const [renderComponent, setRenderComponent] = useState(false);
  const [active, setActive] = useState();
  const [steperCounter, setSteperCounter] = useState(1);
  const [getUserDetailsById, setGetUserDetailsById] = useState({});
  const [roless, setRoless] = useState([]);
  const [state, setState] = useState(false);
  const inputEvent = (e) => {
    console.log("e", e);
    const { name, checked } = e.target;
    setInputData({ ...inputData, [name]: checked });
  };
  useEffect(() => {
    async function get_off_boarding_list() {
      const result = await axios.get(`/off_boarding/${_id}`);
      const resp = result.data[0];
      setInputData(resp);
      setSteperCounter(
        resp?.steper_counter === undefined
          ? 1
          : resp?.steper_counter === 3
          ? 3
          : resp?.steper_counter + 1
      );
      setActive(
        resp?.steper_counter === undefined
          ? 1
          : resp?.steper_counter === 3
          ? 3
          : resp?.steper_counter + 1
      );
      setRenderComponent(false);
    }
    get_off_boarding_list();
    async function get_user_list_by_role_name() {
      const result = await axios.get(`/get_user_list_by_role_name`);
      const resp = result.data;
      setRoless(resp);
      setRenderComponent(false);
    }
    get_user_list_by_role_name();
    async function get_user_details_by_id() {
      const result_user_list_by_id = await axios.get(
        `/get_user_details_By_Id/${_id}`
      );
      const resp_user_list_by_id = result_user_list_by_id.data[0];
      console.log("resp_user_list_by_id", resp_user_list_by_id);
      setGetUserDetailsById(resp_user_list_by_id);
    }
    get_user_details_by_id();
  }, [renderComponent === true]);

  const onSaveNextButton = async (event) => {
    event.preventDefault();
    await axios
      .post(`/off_boarding/${_id}`, {
        ...inputData,
        steper_counter: inputData?.status ? 3 : steperCounter,
      })
      .then(async (res) => {
        if (res.data.message === "created") {
          setActive(active + 1);
          setSteperCounter(steperCounter + 1);
          setRenderComponent(true);
          await axios
            .put(`/user_update/${_id}`, {
              off_boarding_steper_counter: steperCounter,
            })
            .then((res) => {
              return console.log(res?.data.message);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };
  const onUpdateNextButton = async (event) => {
    event.preventDefault();
    await axios
      .put(`/off_boarding/${inputData?._id}`, {
        ...inputData,
        steper_counter: inputData?.status ? 3 : steperCounter,
      })
      .then(async (res) => {
        if (res.data.message === "updated") {
          setActive(active + 1);
          setSteperCounter(steperCounter + 1);
          setRenderComponent(true);
          await axios
            .put(`/user_update/${_id}`, {
              off_boarding_steper_counter: steperCounter,
            })
            .then((res) => {
              return console.log(res?.data.message);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };
  const onSubmittedButton = async (event) => {
    event.preventDefault();
    await axios
      .put(`/off_boarding/${inputData?._id}`, {
        ...inputData,
        status: steperCounter === 3 ? true : false,
        steper_counter: inputData?.status ? 3 : steperCounter,
        off_boarding_status: true,
      })
      .then(async (res) => {
        if (res.data.message === "updated") {
          setActive(1);
          setRenderComponent(true);
          navigate("/user_list/all");
          await axios
            .put(`/user_update/${_id}`, {
              off_boarding_steper_counter: steperCounter,
              off_boarding_status: true,
            })
            .then((res) => {
              return console.log(res?.data.message);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };
  const stperArrayForEmployee = [
    {
      label: "Supervisor Clearance",
      component: Supervisor_Clearance,
      import_data: inputData,
      step_counter: 1,
      alert_warning_title:
        "This step is pending from HR Department !! Please contact to HR Department.",
      alert_success_title: "This step has been completed from HR Department !!",
    },
    {
      label: "Admin Clearance",
      component: Admin_Clearance,
      import_data: inputData,
      step_counter: 2,
      alert_warning_title:
        "This step is pending from Admin !! Please contact to Admin.",
      alert_success_title: "This step has been completed from Admin !!",
    },
    {
      label: "Other Formalities",
      component: Other_Formalities_Off_Boarding,
      import_data: inputData,
      step_counter: 3,
      alert_warning_title:
        "This step is pending from Management Department !! Please contact to Management Department.",
      alert_success_title:
        "This step has been completed from Management Department !!",
    },
  ];
  const dd = roless?.Admin?.includes(LocalStorageData.user_id);
  console.log(dd);
  return (
    <div class="container-scroller">
      <Navbar />
      <div class="container-fluid page-body-wrapper">
        <Sidebar />
        <div class="main-panel">
          <div class="content-wrapper">
            <Page_Header
              page_title="Boarding"
              page_title_icon="mdi-airplane"
              page_title_button="Back"
              page_title_button_link="/user_list/all"
            />
            <div class="row">
              <div class="card">
                <div class="card-body">
                  {/* <h3 class="card-title">Default form</h3> */}
                  <p class="card-description"> Off Boarding Process </p>
                  <table class="table table-bordered">
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
                          {getUserDetailsById?.off_boarding_status ? (
                            <label class="badge badge-success">Completed</label>
                          ) : (
                            <label class="badge badge-warning">Pending</label>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{ margin: "50px" }}>
                    <form class="forms-sample">
                      <>
                        <MultiStepForm activeStep={active}>
                          <Step label="Supervisor Clearance (HR)">
                            <>
                              {inputData?.steper_counter <= 3 &&
                              inputData?.steper_counter >= 1 ? (
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
                                  class="alert alert-warning alert-dismissible fade show"
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
                            <>
                              <div className="row">
                                <div class="card">
                                  <div class="card-body">
                                    <table class="table table-hover">
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
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="informed_client_on_exit"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  disabled={
                                                    roless?.Hr?.includes(
                                                      LocalStorageData?.user_id
                                                    ) && active > 1
                                                      ? true
                                                      : roless?.Management?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active < 3
                                                      ? true
                                                      : false
                                                  }
                                                  checked={
                                                    inputData?.informed_client_on_exit
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
                                            Project/official duties handover
                                          </td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="project_official_duties_handover"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  disabled={
                                                    roless?.Hr?.includes(
                                                      LocalStorageData?.user_id
                                                    ) && active > 1
                                                      ? true
                                                      : roless?.Management?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active < 3
                                                      ? true
                                                      : false
                                                  }
                                                  checked={
                                                    inputData?.project_official_duties_handover
                                                  }
                                                />
                                                <span class="slider round"></span>
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
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="important_mails_transferred"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  disabled={
                                                    roless?.Hr?.includes(
                                                      LocalStorageData?.user_id
                                                    ) && active > 1
                                                      ? true
                                                      : roless?.Management?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active < 3
                                                      ? true
                                                      : false
                                                  }
                                                  checked={
                                                    inputData?.important_mails_transferred
                                                  }
                                                />
                                                <span class="slider round"></span>
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
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="official_document_handover"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  disabled={
                                                    roless?.Hr?.includes(
                                                      LocalStorageData?.user_id
                                                    ) && active > 1
                                                      ? true
                                                      : roless?.Management?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active < 3
                                                      ? true
                                                      : false
                                                  }
                                                  checked={
                                                    inputData?.official_document_handover
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
                                  </div>
                                </div>
                              </div>
                            </>
                          </Step>
                          <Step label="Admin Clearance (Admin)">
                            <>
                              <>
                                {inputData?.steper_counter <= 3 &&
                                inputData?.steper_counter >= 2 ? (
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
                                    class="alert alert-warning alert-dismissible fade show"
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
                              <div className="row">
                                <div class="card">
                                  <div class="card-body">
                                    <table class="table table-hover">
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
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="acenet_laptop"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.acenet_laptop
                                                  }
                                                  disabled={
                                                    roless?.Hr?.includes(
                                                      LocalStorageData?.user_id
                                                    ) && active > 1
                                                      ? true
                                                      : roless?.Management?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active < 3
                                                      ? true
                                                      : false
                                                  }
                                                />
                                                <span class="slider round"></span>
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
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="id_card"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  disabled={
                                                    roless?.Hr?.includes(
                                                      LocalStorageData?.user_id
                                                    ) && active > 1
                                                      ? true
                                                      : roless?.Management?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active < 3
                                                      ? true
                                                      : false
                                                  }
                                                  checked={inputData?.id_card}
                                                />
                                                <span class="slider round"></span>
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
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="data_card_hotspot"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  disabled={
                                                    roless?.Hr?.includes(
                                                      LocalStorageData?.user_id
                                                    ) && active > 1
                                                      ? true
                                                      : roless?.Management?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active < 3
                                                      ? true
                                                      : false
                                                  }
                                                  checked={
                                                    inputData?.data_card_hotspot
                                                  }
                                                />
                                                <span class="slider round"></span>
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
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="client_asset"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  disabled={
                                                    roless?.Hr?.includes(
                                                      LocalStorageData?.user_id
                                                    ) && active > 1
                                                      ? true
                                                      : roless?.Management?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active < 3
                                                      ? true
                                                      : false
                                                  }
                                                  checked={
                                                    inputData?.client_asset
                                                  }
                                                />
                                                <span class="slider round"></span>
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
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="biometric_disabled"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  disabled={
                                                    roless?.Hr?.includes(
                                                      LocalStorageData?.user_id
                                                    ) && active > 1
                                                      ? true
                                                      : roless?.Management?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active < 3
                                                      ? true
                                                      : false
                                                  }
                                                  checked={
                                                    inputData?.biometric_disabled
                                                  }
                                                />
                                                <span class="slider round"></span>
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
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="office_365_account_deletion"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  disabled={
                                                    roless?.Hr?.includes(
                                                      LocalStorageData?.user_id
                                                    ) && active > 1
                                                      ? true
                                                      : roless?.Management?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active < 3
                                                      ? true
                                                      : false
                                                  }
                                                  checked={
                                                    inputData?.office_365_account_deletion
                                                  }
                                                />
                                                <span class="slider round"></span>
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
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="email_forwarded"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  disabled={
                                                    roless?.Hr?.includes(
                                                      LocalStorageData?.user_id
                                                    ) && active > 1
                                                      ? true
                                                      : roless?.Management?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active < 3
                                                      ? true
                                                      : false
                                                  }
                                                  checked={
                                                    inputData?.email_forwarded
                                                  }
                                                />
                                                <span class="slider round"></span>
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
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="zoho_account_deleted"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  disabled={
                                                    roless?.Hr?.includes(
                                                      LocalStorageData?.user_id
                                                    ) && active > 1
                                                      ? true
                                                      : roless?.Management?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active < 3
                                                      ? true
                                                      : false
                                                  }
                                                  checked={
                                                    inputData?.zoho_account_deleted
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
                                  </div>
                                </div>
                              </div>
                            </>
                          </Step>
                          <Step label="Other Formalities (Management)">
                            <>
                              <>
                                {inputData?.steper_counter === 3 ? (
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
                                    class="alert alert-warning alert-dismissible fade show"
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
                              <div className="row">
                                <div class="card">
                                  <div class="card-body">
                                    <table class="table table-hover">
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
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="relieving_letter_shared"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  disabled={
                                                    roless?.Hr?.includes(
                                                      LocalStorageData?.user_id
                                                    ) && active > 1
                                                      ? true
                                                      : roless?.Management?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active < 3
                                                      ? true
                                                      : false
                                                  }
                                                  checked={
                                                    inputData?.relieving_letter_shared
                                                  }
                                                />
                                                <span class="slider round"></span>
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
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="fnf_statement_shared"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  disabled={
                                                    roless?.Hr?.includes(
                                                      LocalStorageData?.user_id
                                                    ) && active > 1
                                                      ? true
                                                      : roless?.Management?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active < 3
                                                      ? true
                                                      : false
                                                  }
                                                  checked={
                                                    inputData?.fnf_statement_shared
                                                  }
                                                />
                                                <span class="slider round"></span>
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
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="fnf_cleared"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  disabled={
                                                    roless?.Hr?.includes(
                                                      LocalStorageData?.user_id
                                                    ) && active > 1
                                                      ? true
                                                      : roless?.Management?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active < 3
                                                      ? true
                                                      : false
                                                  }
                                                  checked={
                                                    inputData?.fnf_cleared
                                                  }
                                                />
                                                <span class="slider round"></span>
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
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="employee_datasheet_updated"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  disabled={
                                                    roless?.Hr?.includes(
                                                      LocalStorageData?.user_id
                                                    ) && active > 1
                                                      ? true
                                                      : roless?.Management?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active < 3
                                                      ? true
                                                      : false
                                                  }
                                                  checked={
                                                    inputData?.employee_datasheet_updated
                                                  }
                                                />
                                                <span class="slider round"></span>
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
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="ghi_deletion"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  disabled={
                                                    roless?.Hr?.includes(
                                                      LocalStorageData?.user_id
                                                    ) && active > 1
                                                      ? true
                                                      : roless?.Management?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active < 3
                                                      ? true
                                                      : false
                                                  }
                                                  checked={
                                                    inputData?.ghi_deletion
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
                                            Employee folder moved to Past
                                            Employee Folder
                                          </td>
                                          <td>
                                            <div className="board">
                                              <span>No</span>
                                              <label class="switch ms-1 me-1 mt-1 ">
                                                <input
                                                  type="checkbox"
                                                  name="employee_folder_moved_to_past_employee_folder"
                                                  class="form-control form-control-sm"
                                                  onChange={inputEvent}
                                                  checked={
                                                    inputData?.employee_folder_moved_to_past_employee_folder
                                                  }
                                                  disabled={
                                                    roless?.Hr?.includes(
                                                      LocalStorageData?.user_id
                                                    ) && active > 1
                                                      ? true
                                                      : roless?.Management?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active < 3
                                                      ? true
                                                      : false
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
                                                  checked={
                                                    inputData?.ghi_initiated
                                                  }
                                                  disabled={
                                                    roless?.Hr?.includes(
                                                      LocalStorageData?.user_id
                                                    ) && active > 1
                                                      ? true
                                                      : roless?.Management?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active < 3
                                                      ? true
                                                      : false
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
                                                  checked={
                                                    inputData?.ghi_eCard_issued
                                                  }
                                                  disabled={
                                                    roless?.Hr?.includes(
                                                      LocalStorageData?.user_id
                                                    ) && active > 1
                                                      ? true
                                                      : roless?.Management?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active < 3
                                                      ? true
                                                      : false
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
                                  </div>
                                </div>
                              </div>
                            </>
                          </Step>
                        </MultiStepForm>
                        {/* <!==========  Previous Button ============> */}
                        {active !== 1 && (
                          <>
                            <button
                              class="btn btn-sm btn-gradient-primary me-2"
                              onClick={(e) => {
                                return (
                                  e.preventDefault(),
                                  setActive(active - 1),
                                  setSteperCounter(steperCounter - 1)
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
                            class="btn btn-sm btn-gradient-primary me-2"
                            onClick={(e) => {
                              return (
                                e.preventDefault(),
                                setActive(active + 1),
                                setSteperCounter(steperCounter + 1)
                              );
                            }}
                            style={{ float: "right" }}
                          >
                            Next
                          </button>
                        )}
                        {/* <!==========  Update & Save Button ============> */}
                        {active >= 1 && active < 3 && (
                          <>
                            {inputData?._id ? (
                              <>
                                <button
                                  class="btn btn-sm btn-gradient-success me-2"
                                  onClick={onUpdateNextButton}
                                  style={{
                                    float: "right",
                                    display:
                                      roless?.Hr?.includes(
                                        LocalStorageData?.user_id
                                      ) && active > 1
                                        ? "none"
                                        : roless?.finance?.includes(
                                            LocalStorageData?.user_id
                                          ) && active === 2
                                        ? "none"
                                        : roless?.Management?.includes(
                                            LocalStorageData?.user_id
                                          ) && active < 3
                                        ? "none"
                                        : "block",
                                  }}
                                >
                                  Submit
                                </button>
                              </>
                            ) : (
                              <button
                                class="btn btn-sm btn-gradient-success me-2"
                                onClick={onSaveNextButton}
                                style={{
                                  float: "right",
                                  display:
                                    roless?.Hr?.includes(
                                      LocalStorageData?.user_id
                                    ) && active > 1
                                      ? "none"
                                      : roless?.finance?.includes(
                                          LocalStorageData?.user_id
                                        ) && active === 2
                                      ? "none"
                                      : roless?.Management?.includes(
                                          LocalStorageData?.user_id
                                        ) && active < 3
                                      ? "none"
                                      : "block",
                                }}
                              >
                                Submit
                              </button>
                            )}
                          </>
                        )}
                        {/* <!========== onSubmittedButton ============> */}
                        {active === 3 && (
                          <button
                            class="btn btn-sm btn-gradient-success me-2"
                            onClick={onSubmittedButton}
                            style={{
                              float: "right",
                              display:
                                roless?.Management?.includes(
                                  LocalStorageData?.user_id
                                ) && active > 2
                                  ? "block"
                                  : roless?.Admin?.includes(
                                      LocalStorageData?.user_id
                                    ) && active > 2
                                  ? "block"
                                  : "none",
                            }}
                          >
                            Submit
                          </button>
                        )}
                      </>
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

export default Off_Boarding;

// <Switch
//   onChange={(e) => {
//     setInputData({
//       ...inputData,
//       abc: e,
//     });
//   }}
//   checked={inputData?.abc}
//   // disabled={inputData?.abc ? true : false}
//   onColor="#83d9d2"
//   onHandleColor="#1bcfb3"
//   offColor="#ffbf96"
//   offHandleColor="#fe3c96"
//   className="react-switch"
// />;
