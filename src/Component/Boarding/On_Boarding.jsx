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

const On_Boarding = () => {
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
  const [updated_data, setUpdated_data] = useState([]);
  const inputEvent = (e) => {
    console.log("e", e);
    const { name, checked } = e.target;
    setInputData({ ...inputData, [name]: checked });
    setUpdated_data({ ...updated_data, [name]: checked });
  };
  useEffect(() => {
    async function get_on_boarding_list() {
      const result = await axios.get(`/on_boarding/${_id}`);
      const resp = result.data[0];
      setInputData(resp);
      setSteperCounter(
        resp?.steper_counter === undefined
          ? 1
          : resp?.steper_counter === 6
          ? 6
          : resp?.steper_counter + 1
      );
      setActive(
        resp?.steper_counter === undefined
          ? 1
          : resp?.steper_counter === 6
          ? 6
          : resp?.steper_counter + 1
      );
      setRenderComponent(false);
    }
    get_on_boarding_list();
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
      .post(`/on_boarding/${_id}`, {
        ...inputData,
        steper_counter: inputData?.on_boarding_status ? 6 : steperCounter,
        updated_by: [
          {
            user_id: LocalStorageData?.user_id,
            user_name: LocalStorageData?.name,
            updated_data,
          },
        ],
      })
      .then(async (res) => {
        if (res.data.message === "created") {
          setActive(active + 1);
          setSteperCounter(steperCounter + 1);
          setRenderComponent(true);
          await axios
            .put(`/user_update/${_id}`, {
              on_boarding_steper_counter: steperCounter,
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
      .put(`/on_boarding/${inputData?._id}`, {
        ...inputData,
        steper_counter: inputData?.on_boarding_status ? 6 : steperCounter,
        updated_by: [
          ...inputData?.updated_by,
          {
            user_id: LocalStorageData?.user_id,
            user_name: LocalStorageData?.name,
            updated_data,
          },
        ],
      })
      .then(async (res) => {
        if (res.data.message === "updated") {
          setActive(active + 1);
          setSteperCounter(steperCounter + 1);
          setRenderComponent(true);
          setUpdated_data([]);
          await axios
            .put(`/user_update/${_id}`, {
              on_boarding_steper_counter: steperCounter,
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
      .put(`/on_boarding/${inputData?._id}`, {
        ...inputData,
        status: steperCounter === 6 ? true : false,
        steper_counter: inputData?.on_boarding_status ? 6 : steperCounter,
        updated_by: [
          ...inputData?.updated_by,
          {
            user_id: LocalStorageData?.user_id,
            user_name: LocalStorageData?.name,
            updated_data,
          },
        ],
      })
      .then(async (res) => {
        if (res.data.message === "updated") {
          setActive(1);
          setRenderComponent(true);
          navigate("/user_list/all");
          await axios
            .put(`/user_update/${_id}`, {
              on_boarding_steper_counter: steperCounter,
              on_boarding_status: true,
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
      label: "First Day Formalities",
      component: FirstDayFormalities,
      import_data: inputData,
      step_counter: 1,
      alert_warning_title:
        "This step is pending from HR Department !! Please contact to HR Department.",
      alert_success_title: "This step has been completed from HR Department !!",
    },
    {
      label: "Documents",
      component: Document,
      import_data: inputData,
      step_counter: 2,
      alert_warning_title:
        "This step is pending from HR Department !! Please contact to HR Department.",
      alert_success_title: "This step has been completed from HR Department !!",
    },
    {
      label: "Compliance Documents",
      component: Compliance_Documents,
      import_data: inputData,
      step_counter: 3,
      alert_warning_title:
        "This step is pending from Finance Department !! Please contact to Finance Department.",
      alert_success_title:
        "This step has been completed from Finance Department !!",
    },
    {
      label: "HDFC Bank ",
      component: Bank,
      import_data: inputData,
      step_counter: 4,
      alert_warning_title:
        "This step is pending from Finance Department !! Please contact to Finance Department.",
      alert_success_title:
        "This step has been completed from Finance Department !!",
    },
    {
      label: "Zoho Account ",
      component: Zoho_Account,
      import_data: inputData,
      step_counter: 5,
      alert_warning_title:
        "This step is pending from Managment Department !! Please contact to Managment Department.",
      alert_success_title:
        "This step has been completed from Managment Department !!",
    },
    {
      label: " Other Formalities",
      component: Other_Formalities,
      import_data: inputData,
      step_counter: 6,
      alert_warning_title:
        "This step is pending from Managment Department !! Please contact to Managment Department.",
      alert_success_title:
        "This step has been completed from Managment Department !!",
    },
  ];
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
              page_title="Boarding"
              page_title_icon="mdi-airplane"
              page_title_button="Back"
              page_title_button_link="/user_list/all"
            />
            <div class="row">
              <div class="card">
                <div class="card-body">
                  {/* <h4 class="card-title">Default form</h4> */}
                  <div className=" d-flex justify-content-between align-items-center">
                    <span class="card-description">On Boarding Process </span>
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
                        <th> Full Name </th>
                        <th> Designation </th>
                        <th> Joining Date </th>
                        <th> Phone </th>
                        <th> Current Address </th>
                        <th> Permamnent Address </th>
                        <th> Status </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {`${
                            getUserDetailsById?.f_name !== undefined
                              ? getUserDetailsById?.f_name
                              : "NA"
                          }
                          ${
                            getUserDetailsById?.m_name !== undefined
                              ? getUserDetailsById?.m_name
                              : ""
                          }
                          ${
                            getUserDetailsById?.l_name !== undefined
                              ? getUserDetailsById?.l_name
                              : ""
                          }`}
                        </td>
                        <td>
                          {getUserDetailsById?.designation !== undefined
                            ? getUserDetailsById?.designation
                            : "NA"}
                        </td>
                        <td>
                          {getUserDetailsById?.joining_date !== undefined
                            ? getUserDetailsById?.joining_date?.split("T")[0]
                            : "NA"}
                        </td>
                        <td>
                          {getUserDetailsById?.phone !== undefined
                            ? getUserDetailsById?.phone
                            : "NA"}
                        </td>
                        <td>
                          {getUserDetailsById?.communication_address !==
                          undefined
                            ? getUserDetailsById?.communication_address
                            : "NA"}
                        </td>
                        <td>
                          {getUserDetailsById?.permanent_address !== undefined
                            ? getUserDetailsById?.permanent_address
                            : "NA"}
                        </td>
                        <td>
                          {getUserDetailsById?.on_boarding_status ? (
                            <label class="badge badge-success">Completed</label>
                          ) : (
                            <label class="badge badge-warning">Pending</label>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div style={{ margin: "40px" }}>
                    <form class="forms-sample">
                      {!roless?.admin?.includes(LocalStorageData.user_id) &&
                      !roless?.hr?.includes(LocalStorageData.user_id) &&
                      !roless?.finance?.includes(LocalStorageData.user_id) &&
                      !roless?.management?.includes(
                        LocalStorageData.user_id
                      ) ? (
                        <>
                          <MultiStepForm activeStep={active}>
                            {stperArrayForEmployee.map((val) => {
                              return (
                                <Step label={val.label}>
                                  {inputData?.steper_counter <
                                    val?.step_counter &&
                                  inputData?.step_counter === undefined ? (
                                    <div
                                      class="alert alert-warning alert-dismissible fade show"
                                      role="alert"
                                      // style={{
                                      //   display:
                                      //     val?.step_counter === 1
                                      //       ? "none"
                                      //       : "block",
                                      // }}
                                    >
                                      <i class="mdi mdi-alert-octagon me-1"></i>
                                      {val?.alert_warning_title}
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="alert"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                  ) : (
                                    <div
                                      class="alert alert-success alert-dismissible fade show"
                                      role="alert"
                                      // style={{
                                      //   display:
                                      //     val?.step_counter === 1
                                      //       ? "none"
                                      //       : "block",
                                      // }}
                                    >
                                      <i class="mdi mdi-check-circle-outline me-1"></i>
                                      {val?.alert_success_title}
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="alert"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                  )}
                                  <val.component inputData={val?.import_data} />
                                </Step>
                              );
                            })}
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
                          {/* {active !== 7 && active <= steperCounter && ( */}
                          {active !== 6 && (
                            <>
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
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <MultiStepForm activeStep={active}>
                            <Step label="First Day Formalities (HR)">
                              <>
                                {inputData?.steper_counter <= 6 &&
                                  (inputData?.steper_counter >= 1 ? (
                                    roless?.hr?.includes(
                                      LocalStorageData?.user_id
                                    ) && inputData?.steper_counter >= 1 ? (
                                      <div
                                        class="alert alert-success alert-dismissible fade show"
                                        role="alert"
                                      >
                                        <i class="mdi mdi-check-circle-outline me-1"></i>
                                        This step has been completed by You.
                                        <button
                                          type="button"
                                          class="btn-close"
                                          data-bs-dismiss="alert"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                    ) : (
                                      <div
                                        class="alert alert-success alert-dismissible fade show"
                                        role="alert"
                                      >
                                        <i class="mdi mdi-check-circle-outline me-1"></i>
                                        This step has been completed by HR
                                        Department.
                                        <button
                                          type="button"
                                          class="btn-close"
                                          data-bs-dismiss="alert"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                    )
                                  ) : roless?.hr?.includes(
                                      LocalStorageData?.user_id
                                    ) ? (
                                    <div
                                      class="alert alert-danger alert-dismissible fade show"
                                      role="alert"
                                    >
                                      <i class="mdi mdi-alert-octagon me-1"></i>
                                      "This step is not completed by you !!"
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
                                      "This step is pending from Admin or HR
                                      Department !!"
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="alert"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                  ))}
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.wifi_passwords
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.genrate_mail_id
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.one_drive_access
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.add_to_official_dls
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.teams_access
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.biometric
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                            <td> Induction Call</td>
                                            <td>
                                              <div className="board">
                                                <span>No</span>
                                                <label class="switch ms-1 me-1 mt-1 ">
                                                  <input
                                                    type="checkbox"
                                                    name="induction_call"
                                                    class="form-control form-control-sm"
                                                    onChange={inputEvent}
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.induction_call
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                          {inputData?.induction_call ===
                                          true ? (
                                            <tr>
                                              <td> Induction Call With</td>
                                              <td>
                                                <select
                                                  name="induction_call_with"
                                                  onChange={inputEvent}
                                                  style={{ opacity: 0 }}
                                                  value={
                                                    inputData?.induction_call_with
                                                  }
                                                  className="form-control mt-2 "
                                                  type="text"
                                                >
                                                  <option>Please Select</option>
                                                  <option value="sunil">
                                                    Sunil
                                                  </option>
                                                  <option value="amit">
                                                    Amit
                                                  </option>
                                                </select>
                                              </td>
                                            </tr>
                                          ) : (
                                            ""
                                          )}
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.acenet_laptop
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.client_laptop
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={inputData?.notpad}
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={inputData?.t_shirt}
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.welcome_kit
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.intro_slide_shared
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                            <Step label="Documents (HR)">
                              <>
                                {/* <>
                                {inputData?.steper_counter === 3 ? (
                                  roless?.hr?.includes(
                                    LocalStorageData?.user_id
                                  ) && inputData?.steper_counter === 3 ? (
                                    <div
                                      class="alert alert-success alert-dismissible fade show"
                                      role="alert"
                                    >
                                      <i class="mdi mdi-check-circle-outline me-1"></i>
                                      This step has been completed by You.
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="alert"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                  ) : (
                                    <div
                                      class="alert alert-success alert-dismissible fade show"
                                      role="alert"
                                    >
                                      <i class="mdi mdi-check-circle-outline me-1"></i>
                                      This step has been completed by HR
                                      Department.
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="alert"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                  )
                                ) : roless?.hr?.includes(
                                    LocalStorageData?.user_id
                                  ) ? (
                                  <div
                                    class="alert alert-danger alert-dismissible fade show"
                                    role="alert"
                                  >
                                    <i class="mdi mdi-alert-octagon me-1"></i>
                                    "This step is not completed by you !!"
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
                                    "This step is pending from Admin or HR
                                    Department !!"
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="alert"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                )}
                              </> */}
                                <>
                                  {inputData?.steper_counter <= 6 &&
                                    (inputData?.steper_counter >= 2 ? (
                                      roless?.hr?.includes(
                                        LocalStorageData?.user_id
                                      ) && inputData?.steper_counter >= 2 ? (
                                        <div
                                          class="alert alert-success alert-dismissible fade show"
                                          role="alert"
                                        >
                                          <i class="mdi mdi-check-circle-outline me-1"></i>
                                          This step has been completed by You.
                                          <button
                                            type="button"
                                            class="btn-close"
                                            data-bs-dismiss="alert"
                                            aria-label="Close"
                                          ></button>
                                        </div>
                                      ) : (
                                        <div
                                          class="alert alert-success alert-dismissible fade show"
                                          role="alert"
                                        >
                                          <i class="mdi mdi-check-circle-outline me-1"></i>
                                          This step has been completed by HR
                                          Department.
                                          <button
                                            type="button"
                                            class="btn-close"
                                            data-bs-dismiss="alert"
                                            aria-label="Close"
                                          ></button>
                                        </div>
                                      )
                                    ) : roless?.hr?.includes(
                                        LocalStorageData?.user_id
                                      ) ? (
                                      <div
                                        class="alert alert-danger alert-dismissible fade show"
                                        role="alert"
                                      >
                                        <i class="mdi mdi-alert-octagon me-1"></i>
                                        "This step is not completed by you !!"
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
                                        "This step is pending from Admin or HR
                                        Department !!"
                                        <button
                                          type="button"
                                          class="btn-close"
                                          data-bs-dismiss="alert"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                    ))}
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.aadhar_card
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.pan_card
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.passport
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={inputData?.dl}
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={inputData?.ten_th}
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.tweleve_th
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.graduation
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.post_graduation
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                            <td>
                                              Experience proof - Relieving
                                              letter from previous employers (if
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.experience_proof
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.passport_size_photo
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.signed_offer_latter
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.documents_verification
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.covid_certificate
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.employee_data_sheet_bank_details
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.other_official_documents
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.pay_slips
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                            <td>
                                              Form 16 or Taxable income
                                              statement duly certified by
                                              previous employer(Statement
                                              showing deductions and Taxable
                                              income with break up)
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
                                                    style={{ opacity: 0 }}
                                                    checked={
                                                      inputData?.forms_16
                                                    }
                                                    disabled={
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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

                            <Step label="Compliance Documents (Finance)">
                              <>
                                {/* <>
                                {inputData?.steper_counter === 4 ? (
                                  roless?.finance?.includes(
                                    LocalStorageData?.user_id
                                  ) && inputData?.steper_counter === 4 ? (
                                    <div
                                      class="alert alert-success alert-dismissible fade show"
                                      role="alert"
                                    >
                                      <i class="mdi mdi-check-circle-outline me-1"></i>
                                      This step has been completed by You.
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="alert"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                  ) : (
                                    <div
                                      class="alert alert-success alert-dismissible fade show"
                                      role="alert"
                                    >
                                      <i class="mdi mdi-check-circle-outline me-1"></i>
                                      This step has been completed by Finance
                                      Department.
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="alert"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                  )
                                ) : roless?.finance?.includes(
                                    LocalStorageData?.user_id
                                  ) ? (
                                  <div
                                    class="alert alert-danger alert-dismissible fade show"
                                    role="alert"
                                  >
                                    <i class="mdi mdi-alert-octagon me-1"></i>
                                    "This step is not completed by you !!"
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
                                    "This step is pending from Admin or
                                    Finance Department !!"
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="alert"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                )}
                              </> */}
                                <>
                                  {inputData?.steper_counter <= 6 &&
                                    (inputData?.steper_counter >= 3 ? (
                                      roless?.finance?.includes(
                                        LocalStorageData?.user_id
                                      ) && inputData?.steper_counter >= 3 ? (
                                        <div
                                          class="alert alert-success alert-dismissible fade show"
                                          role="alert"
                                        >
                                          <i class="mdi mdi-check-circle-outline me-1"></i>
                                          This step has been completed by You.
                                          <button
                                            type="button"
                                            class="btn-close"
                                            data-bs-dismiss="alert"
                                            aria-label="Close"
                                          ></button>
                                        </div>
                                      ) : (
                                        <div
                                          class="alert alert-success alert-dismissible fade show"
                                          role="alert"
                                        >
                                          <i class="mdi mdi-check-circle-outline me-1"></i>
                                          This step has been completed by
                                          Finance Department.
                                          <button
                                            type="button"
                                            class="btn-close"
                                            data-bs-dismiss="alert"
                                            aria-label="Close"
                                          ></button>
                                        </div>
                                      )
                                    ) : roless?.finance?.includes(
                                        LocalStorageData?.user_id
                                      ) ? (
                                      <div
                                        class="alert alert-danger alert-dismissible fade show"
                                        role="alert"
                                      >
                                        <i class="mdi mdi-alert-octagon me-1"></i>
                                        "This step is not completed by you !!"
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
                                        "This step is pending from Admin or
                                        finance Department !!"
                                        <button
                                          type="button"
                                          class="btn-close"
                                          data-bs-dismiss="alert"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                    ))}
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
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 6
                                                        ? true
                                                        : false
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
                                            <td>
                                              PF Form submitted to CA Team
                                            </td>
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
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 6
                                                        ? true
                                                        : false
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
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 6
                                                        ? true
                                                        : false
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
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 6
                                                        ? true
                                                        : false
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
                                              Gratuity Form submitteed to CA
                                              Team
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
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 6
                                                        ? true
                                                        : false
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
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 6
                                                        ? true
                                                        : false
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
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 6
                                                        ? true
                                                        : false
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
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 6
                                                        ? true
                                                        : false
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
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </>
                            </Step>
                            <Step label="HDFC Bank Details (Finance)">
                              <>
                                {/* <>
                                {inputData?.steper_counter === 5 ? (
                                  roless?.finance?.includes(
                                    LocalStorageData?.user_id
                                  ) && inputData?.steper_counter === 5 ? (
                                    <div
                                      class="alert alert-success alert-dismissible fade show"
                                      role="alert"
                                    >
                                      <i class="mdi mdi-check-circle-outline me-1"></i>
                                      This step has been completed by You.
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="alert"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                  ) : (
                                    <div
                                      class="alert alert-success alert-dismissible fade show"
                                      role="alert"
                                    >
                                      <i class="mdi mdi-check-circle-outline me-1"></i>
                                      This step has been completed by Finance
                                      Department.
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="alert"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                  )
                                ) : roless?.finance?.includes(
                                    LocalStorageData?.user_id
                                  ) ? (
                                  <div
                                    class="alert alert-danger alert-dismissible fade show"
                                    role="alert"
                                  >
                                    <i class="mdi mdi-alert-octagon me-1"></i>
                                    "This step is not completed by you !!"
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
                                    "This step is pending from Admin or
                                    Finance Department !!"
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="alert"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                )}
                              </> */}
                                <>
                                  {inputData?.steper_counter <= 6 &&
                                    (inputData?.steper_counter >= 4 ? (
                                      roless?.finance?.includes(
                                        LocalStorageData?.user_id
                                      ) && inputData?.steper_counter >= 4 ? (
                                        <div
                                          class="alert alert-success alert-dismissible fade show"
                                          role="alert"
                                        >
                                          <i class="mdi mdi-check-circle-outline me-1"></i>
                                          This step has been completed by You.
                                          <button
                                            type="button"
                                            class="btn-close"
                                            data-bs-dismiss="alert"
                                            aria-label="Close"
                                          ></button>
                                        </div>
                                      ) : (
                                        <div
                                          class="alert alert-success alert-dismissible fade show"
                                          role="alert"
                                        >
                                          <i class="mdi mdi-check-circle-outline me-1"></i>
                                          This step has been completed by
                                          Finance Department.
                                          <button
                                            type="button"
                                            class="btn-close"
                                            data-bs-dismiss="alert"
                                            aria-label="Close"
                                          ></button>
                                        </div>
                                      )
                                    ) : roless?.finance?.includes(
                                        LocalStorageData?.user_id
                                      ) ? (
                                      <div
                                        class="alert alert-danger alert-dismissible fade show"
                                        role="alert"
                                      >
                                        <i class="mdi mdi-alert-octagon me-1"></i>
                                        "This step is not completed by you !!"
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
                                        "This step is pending from Admin or
                                        finance Department !!"
                                        <button
                                          type="button"
                                          class="btn-close"
                                          data-bs-dismiss="alert"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                    ))}
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
                                              <td> HDFC Account Mapped</td>
                                              <td>
                                                <div className="board">
                                                  <span>No</span>
                                                  <label class="switch ms-1 me-1 mt-1 ">
                                                    <input
                                                      type="checkbox"
                                                      name="hdfc_account_mapped"
                                                      class="form-control form-control-sm"
                                                      onChange={inputEvent}
                                                      style={{ opacity: 0 }}
                                                      disabled={
                                                        roless?.hr?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active > 3
                                                          ? true
                                                          : roless?.management?.includes(
                                                              LocalStorageData?.user_id
                                                            ) && active < 6
                                                          ? true
                                                          : false
                                                      }
                                                      checked={
                                                        inputData?.hdfc_account_mapped
                                                      }
                                                    />
                                                    <span class="slider round"></span>
                                                  </label>
                                                  <span>Yes</span>
                                                </div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td> HDFC Account Initiated</td>
                                              <td>
                                                <div className="board">
                                                  <span>No</span>
                                                  <label class="switch ms-1 me-1 mt-1 ">
                                                    <input
                                                      type="checkbox"
                                                      name="hdfc_account_initiated"
                                                      class="form-control form-control-sm"
                                                      onChange={inputEvent}
                                                      style={{ opacity: 0 }}
                                                      disabled={
                                                        roless?.hr?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active > 3
                                                          ? true
                                                          : roless?.management?.includes(
                                                              LocalStorageData?.user_id
                                                            ) && active < 6
                                                          ? true
                                                          : false
                                                      }
                                                      checked={
                                                        inputData?.hdfc_account_initiated
                                                      }
                                                    />
                                                    <span class="slider round"></span>
                                                  </label>
                                                  <span>Yes</span>
                                                </div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td> HDFC Account Opened</td>
                                              <td>
                                                <div className="board">
                                                  <span>No</span>
                                                  <label class="switch ms-1 me-1 mt-1 ">
                                                    <input
                                                      type="checkbox"
                                                      name="hdfc_account_opened"
                                                      class="form-control form-control-sm"
                                                      onChange={inputEvent}
                                                      style={{ opacity: 0 }}
                                                      disabled={
                                                        roless?.hr?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active > 3
                                                          ? true
                                                          : roless?.management?.includes(
                                                              LocalStorageData?.user_id
                                                            ) && active < 6
                                                          ? true
                                                          : false
                                                      }
                                                      checked={
                                                        inputData?.hdfc_account_opened
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
                                                HDFC Account Benefeciary added
                                              </td>
                                              <td>
                                                <div className="board">
                                                  <span>No</span>
                                                  <label class="switch ms-1 me-1 mt-1 ">
                                                    <input
                                                      type="checkbox"
                                                      name="hdfc_account_benefeciary_added"
                                                      class="form-control form-control-sm"
                                                      onChange={inputEvent}
                                                      style={{ opacity: 0 }}
                                                      disabled={
                                                        roless?.hr?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active > 3
                                                          ? true
                                                          : roless?.management?.includes(
                                                              LocalStorageData?.user_id
                                                            ) && active < 6
                                                          ? true
                                                          : false
                                                      }
                                                      checked={
                                                        inputData?.hdfc_account_benefeciary_added
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
                              </>
                            </Step>
                            <Step label="ZOHO Account (Management)">
                              <>
                                <>
                                  {inputData?.steper_counter <= 6 &&
                                    (inputData?.steper_counter >= 5 ? (
                                      roless?.management?.includes(
                                        LocalStorageData?.user_id
                                      ) && inputData?.steper_counter >= 5 ? (
                                        <div
                                          class="alert alert-success alert-dismissible fade show"
                                          role="alert"
                                        >
                                          <i class="mdi mdi-check-circle-outline me-1"></i>
                                          This step has been completed by You.
                                          <button
                                            type="button"
                                            class="btn-close"
                                            data-bs-dismiss="alert"
                                            aria-label="Close"
                                          ></button>
                                        </div>
                                      ) : (
                                        <div
                                          class="alert alert-success alert-dismissible fade show"
                                          role="alert"
                                        >
                                          <i class="mdi mdi-check-circle-outline me-1"></i>
                                          This step has been completed by
                                          Management Department.
                                          <button
                                            type="button"
                                            class="btn-close"
                                            data-bs-dismiss="alert"
                                            aria-label="Close"
                                          ></button>
                                        </div>
                                      )
                                    ) : roless?.management?.includes(
                                        LocalStorageData?.user_id
                                      ) ? (
                                      <div
                                        class="alert alert-danger alert-dismissible fade show"
                                        role="alert"
                                      >
                                        <i class="mdi mdi-alert-octagon me-1"></i>
                                        "This step is not completed by you !!"
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
                                        "This step is pending from Admin or
                                        Management Department !!"
                                        <button
                                          type="button"
                                          class="btn-close"
                                          data-bs-dismiss="alert"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                    ))}
                                </>
                                {/* <>
                                {inputData?.steper_counter === 6 ? (
                                  roless?.management?.includes(
                                    LocalStorageData?.user_id
                                  ) && inputData?.steper_counter === 6 ? (
                                    <div
                                      class="alert alert-success alert-dismissible fade show"
                                      role="alert"
                                    >
                                      <i class="mdi mdi-check-circle-outline me-1"></i>
                                      This step has been completed by You.
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="alert"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                  ) : (
                                    <div
                                      class="alert alert-success alert-dismissible fade show"
                                      role="alert"
                                    >
                                      <i class="mdi mdi-check-circle-outline me-1"></i>
                                      This step has been completed by
                                      Management Department.
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="alert"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                  )
                                ) : roless?.management?.includes(
                                    LocalStorageData?.user_id
                                  ) ? (
                                  <div
                                    class="alert alert-danger alert-dismissible fade show"
                                    role="alert"
                                  >
                                    <i class="mdi mdi-alert-octagon me-1"></i>
                                    "This step is not completed by you !!"
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
                                    "This step is pending from Admin or
                                    Management Department !!"
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="alert"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                )}
                              </> */}
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
                                              <td>
                                                ZOHO People Account Created
                                              </td>
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
                                                        roless?.hr?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active > 2
                                                          ? true
                                                          : roless?.finance?.includes(
                                                              LocalStorageData?.user_id
                                                            ) && active > 4
                                                          ? true
                                                          : roless?.management?.includes(
                                                              LocalStorageData?.user_id
                                                            ) && active < 6
                                                          ? true
                                                          : false
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
                                            <tr>
                                              <td>
                                                Zoho People Account Activated
                                              </td>
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
                                                        roless?.hr?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active > 2
                                                          ? true
                                                          : roless?.finance?.includes(
                                                              LocalStorageData?.user_id
                                                            ) && active > 4
                                                          ? true
                                                          : roless?.management?.includes(
                                                              LocalStorageData?.user_id
                                                            ) && active < 6
                                                          ? true
                                                          : false
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
                                            </tr>
                                            <tr>
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
                                                        roless?.hr?.includes(
                                                          LocalStorageData?.user_id
                                                        ) && active > 2
                                                          ? true
                                                          : roless?.finance?.includes(
                                                              LocalStorageData?.user_id
                                                            ) && active > 4
                                                          ? true
                                                          : roless?.management?.includes(
                                                              LocalStorageData?.user_id
                                                            ) && active < 6
                                                          ? true
                                                          : false
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
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              </>
                            </Step>

                            <Step label="Other Formalities (Management)">
                              <>
                                <>
                                  {inputData?.steper_counter <= 6 &&
                                    (inputData?.steper_counter >= 6 ? (
                                      roless?.management?.includes(
                                        LocalStorageData?.user_id
                                      ) && inputData?.steper_counter >= 6 ? (
                                        <div
                                          class="alert alert-success alert-dismissible fade show"
                                          role="alert"
                                        >
                                          <i class="mdi mdi-check-circle-outline me-1"></i>
                                          This step has been completed by You.
                                          <button
                                            type="button"
                                            class="btn-close"
                                            data-bs-dismiss="alert"
                                            aria-label="Close"
                                          ></button>
                                        </div>
                                      ) : (
                                        <div
                                          class="alert alert-success alert-dismissible fade show"
                                          role="alert"
                                        >
                                          <i class="mdi mdi-check-circle-outline me-1"></i>
                                          This step has been completed by
                                          Management Department.
                                          <button
                                            type="button"
                                            class="btn-close"
                                            data-bs-dismiss="alert"
                                            aria-label="Close"
                                          ></button>
                                        </div>
                                      )
                                    ) : roless?.management?.includes(
                                        LocalStorageData?.user_id
                                      ) ? (
                                      <div
                                        class="alert alert-danger alert-dismissible fade show"
                                        role="alert"
                                      >
                                        <i class="mdi mdi-alert-octagon me-1"></i>
                                        "This step is not completed by you !!"
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
                                        "This step is pending from Admin or
                                        Management Department !!"
                                        <button
                                          type="button"
                                          class="btn-close"
                                          data-bs-dismiss="alert"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                    ))}
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
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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
                                                      roless?.hr?.includes(
                                                        LocalStorageData?.user_id
                                                      ) && active > 2
                                                        ? true
                                                        : roless?.finance?.includes(
                                                            LocalStorageData?.user_id
                                                          ) &&
                                                          (active < 3 ||
                                                            active > 4)
                                                        ? true
                                                        : roless?.management?.includes(
                                                            LocalStorageData?.user_id
                                                          ) && active < 5
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

                          {active !== 6 && (
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

                          {active >= 1 && active < 6 && (
                            <>
                              {inputData?._id ? (
                                <>
                                  <button
                                    class="btn btn-sm btn-gradient-success me-2"
                                    onClick={onUpdateNextButton}
                                    style={{
                                      float: "right",
                                      display:
                                        roless?.hr?.includes(
                                          LocalStorageData?.user_id
                                        ) && active > 2
                                          ? "none"
                                          : roless?.finance?.includes(
                                              LocalStorageData?.user_id
                                            ) &&
                                            (active < 3 || active > 4)
                                          ? "none"
                                          : roless?.management?.includes(
                                              LocalStorageData?.user_id
                                            ) && active < 5
                                          ? "none"
                                          : "block",
                                    }}
                                    // disabled={
                                    //   roless?.hr?.includes(
                                    //     LocalStorageData?.user_id
                                    //   ) && active > 3
                                    //     ? true
                                    //     : roless?.finance?.includes(
                                    //         LocalStorageData?.user_id
                                    //       ) &&
                                    //       (active < 4 || active > 5)
                                    //     ? true
                                    //     : roless?.management?.includes(
                                    //         LocalStorageData?.user_id
                                    //       ) && active < 6
                                    //     ? true
                                    //     : false
                                    // }
                                  >
                                    Update & Next
                                  </button>
                                </>
                              ) : (
                                <button
                                  class="btn btn-sm btn-gradient-success me-2"
                                  onClick={onSaveNextButton}
                                  style={{
                                    float: "right",
                                    display:
                                      roless?.hr?.includes(
                                        LocalStorageData?.user_id
                                      ) && active > 2
                                        ? "none"
                                        : roless?.finance?.includes(
                                            LocalStorageData?.user_id
                                          ) &&
                                          active < 2 &&
                                          active > 4
                                        ? "none"
                                        : roless?.management?.includes(
                                            LocalStorageData?.user_id
                                          ) && active < 5
                                        ? "none"
                                        : "block",
                                  }}
                                  // disabled={
                                  //   roless?.hr?.includes(
                                  //     LocalStorageData?.user_id
                                  //   ) && active > 3
                                  //     ? true
                                  //     : roless?.finance?.includes(
                                  //         LocalStorageData?.user_id
                                  //       ) &&
                                  //       active < 3 &&
                                  //       active > 5
                                  //     ? true
                                  //     : roless?.management?.includes(
                                  //         LocalStorageData?.user_id
                                  //       ) && active < 6
                                  //     ? true
                                  //     : false
                                  // }
                                >
                                  Save & Next
                                </button>
                              )}
                            </>
                          )}
                          {/* <!========== onSubmittedButton ============> */}
                          {active === 6 && (
                            <button
                              class="btn btn-sm btn-gradient-success me-2"
                              onClick={onSubmittedButton}
                              style={{
                                float: "right",
                                display:
                                  roless?.management?.includes(
                                    LocalStorageData?.user_id
                                  ) && active > 5
                                    ? "block"
                                    : roless?.admin?.includes(
                                        LocalStorageData?.user_id
                                      ) && active > 5
                                    ? "block"
                                    : "none",
                              }}
                            >
                              Submitte
                            </button>
                          )}
                        </>
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

// <Switch
//   onChange={(e) => {
//     setInputData({
//       ...inputData,
//       abc: e,
//     });
//   }}
//   checked={inputData?.abc}
//   // disabled={inputData?.abc ? true : false}
//   onColor="#84d9d2"
//   onHandleColor="#1bcfb4"
//   offColor="#ffbf96"
//   offHandleColor="#fe7c96"
//   className="react-switch"
// />;
