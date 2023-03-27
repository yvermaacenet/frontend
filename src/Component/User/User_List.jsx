import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import * as XLSX from "xlsx";
import PureModal from "react-pure-modal";
import { useParams } from "react-router-dom";

const User_List = () => {
  const { status_code } = useParams();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [getUserList, setGetUserList] = useState([]);
  const [roless, setRoless] = useState([]);
  const [uploadData, setUploadData] = useState([]);
  const [duplcates, setDuplicates] = useState([]);
  const [show, setShow] = useState(false);
  const [addEventModal, setAddEventModal] = useState(false);
  const [getStatus_code, setStatus_code] = useState(status_code);
  function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);

      setUploadData(rows);
    };

    reader.readAsArrayBuffer(file);
  }
  console.log("upload data", uploadData);
  useEffect(() => {
    async function get_user_list_by_role_name() {
      const result = await axios.get(`/get_user_list_by_role_name`);
      const resp = result.data;
      setRoless(resp);
      get_user_list(resp);
    }
    get_user_list_by_role_name();
    async function get_user_list(resp) {
      // const result_user_list = await axios.get(
      //   resp?.finance?.includes(LocalStorageData?.user_id)
      //     ? `/get_user_list_by_on_boarding_counter/3/${getStatus_code}`
      //     : resp?.management?.includes(LocalStorageData?.user_id)
      //     ? `/get_user_list_by_on_boarding_counter/5/${getStatus_code}`
      //     : `/user_list/${getStatus_code}`
      // );
      const result_user_list = await axios.get(`/user_list/${getStatus_code}`);
      const resp_user_list = result_user_list.data;
      console.log("resp_user_list", resp_user_list);
      setGetUserList(resp_user_list);
    }
  }, [getStatus_code]);
  const dd = roless?.management?.includes(LocalStorageData.user_id);
  console.log(dd);
  return (
    <>
      <div class="container-scroller">
        <Navbar />
        <div class="container-fluid page-body-wrapper">
          <Sidebar />
          <div class="main-panel">
            <div class="content-wrapper">
              <Page_Header
                page_title="User"
                page_title_icon="mdi-account-multiple-outline"
                page_title_button="Add"
                page_title_button_link="/user_add"
              />

              <div class="row">
                <div class="card">
                  <div class="card-body">
                    <button
                      type="button"
                      class="btn btn-sm btn-inverse-info btn-fw ms-1"
                      onClick={() => setStatus_code("all_users")}
                    >
                      All
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-inverse-success btn-fw ms-1"
                      onClick={() => setStatus_code("active_users")}
                    >
                      Active
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-inverse-danger btn-fw ms-1"
                      onClick={() => setStatus_code("deactive_users")}
                    >
                      Deactivated
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-inverse-primary btn-fw ms-1"
                      onClick={() => setStatus_code("pending_onboarding_users")}
                    >
                      Pending Onboarding
                    </button>
                    {(roless?.admin?.includes(LocalStorageData?.user_id) ||
                      roless?.hr?.includes(LocalStorageData?.user_id)) && (
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-info btn-icon-text"
                        onClick={() => setAddEventModal(true)}
                        style={{ float: "right" }}
                      >
                        <i class="mdi mdi-upload btn-icon-prepend"></i> Upload
                        File
                      </button>
                    )}
                    {show
                      ? duplcates?.map((item) => {
                          return (
                            <>
                              <div
                                class="alert alert-danger alert-dismissible fade show"
                                role="alert"
                              >
                                <span className="text-dark">
                                  Duplicate Values:
                                </span>
                                <i class="mdi mdi-check-circle-outline me-1"></i>
                                {item.personal_email}
                                <button
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="alert"
                                  aria-label="Close"
                                ></button>
                              </div>
                            </>
                          );
                        })
                      : ""}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="card">
                  <div
                    class="card-body"
                    style={{
                      maxWidth: "100%",
                      overflow: "hidden",
                      overflowX: "scroll",
                    }}
                  >
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Username</th>
                          <th>Role</th>
                          <th>Personal Email</th>
                          <th>Phone No</th>
                          <th>Official Email</th>
                          <th>Designation</th>

                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getUserList.map((value, index) => {
                          return (
                            <tr>
                              <td class="py-1">{index + 1}</td>
                              <td>
                                {value.f_name} {value.m_name} {value.l_name}
                              </td>
                              <td> {value.username} </td>
                              <td>
                                {value.role.map((res, index) => {
                                  return (
                                    <label
                                      class="badge me-1"
                                      style={{
                                        background: `#${Math.random()
                                          .toString(16)
                                          .slice(2, 8)
                                          .padEnd(6, 0)}`,
                                      }}
                                    >
                                      {res.name}
                                    </label>
                                  );
                                })}
                              </td>
                              <td> {value.personal_email} </td>
                              <td> {value.phone} </td>
                              <td> {value.company_email} </td>
                              <td> {value.designation} </td>

                              <td>
                                {value?.status ? (
                                  <label class="badge badge-success">
                                    Active
                                  </label>
                                ) : (
                                  <label class="badge badge-danger">
                                    Deactive
                                  </label>
                                )}
                              </td>

                              <td>
                                {/* ================ Edit Button ============= */}
                                {roless?.admin?.includes(
                                  LocalStorageData?.user_id
                                ) ||
                                roless?.hr?.includes(
                                  LocalStorageData?.user_id
                                ) ? (
                                  <NavLink to={`/user_update/${value?._id}`}>
                                    <button
                                      type="button"
                                      class="btn btn-sm btn-inverse-dark btn-icon"
                                      title="Edit"
                                    >
                                      <i class="mdi mdi-table-edit"></i>
                                    </button>
                                  </NavLink>
                                ) : (
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-inverse-dark btn-icon"
                                    title="Edit"
                                    disabled
                                  >
                                    <i class="mdi mdi-table-edit"></i>
                                  </button>
                                )}
                                {/* ================ On Boarding Button ============= */}

                                {roless?.admin?.includes(
                                  LocalStorageData?.user_id
                                ) ||
                                roless?.hr?.includes(
                                  LocalStorageData?.user_id
                                ) ||
                                (roless?.finance?.includes(
                                  LocalStorageData?.user_id
                                ) &&
                                  value?.on_boarding_steper_counter >= 2) ||
                                (roless?.management?.includes(
                                  LocalStorageData?.user_id
                                ) &&
                                  value?.on_boarding_steper_counter >= 4) ? (
                                  <NavLink to={`/on_boarding/${value?._id}`}>
                                    <button
                                      type="button"
                                      class={`btn btn-sm ${
                                        value?.on_boarding_status
                                          ? "btn-inverse-success"
                                          : value?.on_boarding_steper_counter >
                                            0
                                          ? "btn-inverse-warning"
                                          : "btn-inverse-danger"
                                      } btn-icon ms-2`}
                                      title="Onboarding"
                                    >
                                      <i class="mdi mdi-airplane"></i>
                                    </button>
                                  </NavLink>
                                ) : (
                                  <button
                                    type="button"
                                    class={`btn btn-sm ${
                                      value?.on_boarding_status
                                        ? "btn-inverse-success"
                                        : value?.on_boarding_steper_counter > 0
                                        ? "btn-inverse-warning"
                                        : "btn-inverse-danger"
                                    } btn-icon ms-2`}
                                    title="Onboarding"
                                    disabled
                                  >
                                    <i class="mdi mdi-airplane"></i>
                                  </button>
                                )}
                                {/* ================ Off Boarding Button ============= */}

                                {value?.on_boarding_status === true &&
                                (roless?.admin?.includes(
                                  LocalStorageData?.user_id
                                ) ||
                                  (roless?.hr?.includes(
                                    LocalStorageData?.user_id
                                  ) &&
                                    value?.off_boarding_steper_counter >= 1) ||
                                  (roless?.management?.includes(
                                    LocalStorageData?.user_id
                                  ) &&
                                    value?.off_boarding_steper_counter >=
                                      2)) ? (
                                  <NavLink to={`/off_boarding/${value?._id}`}>
                                    <button
                                      type="button"
                                      class={`btn btn-sm ${
                                        value?.off_boarding_status
                                          ? "btn-inverse-success"
                                          : value?.off_boarding_steper_counter >
                                            0
                                          ? "btn-inverse-warning"
                                          : "btn-inverse-danger"
                                      } btn-icon ms-2`}
                                      title="Offboarding"
                                      // style={{
                                      //   display:
                                      //     roless?.finance?.includes(
                                      //       LocalStorageData?.user_id
                                      //     ) && "none",
                                      // }}
                                      // disabled
                                    >
                                      <i class="mdi mdi-airplane-off"></i>
                                    </button>
                                  </NavLink>
                                ) : (
                                  <button
                                    type="button"
                                    class={`btn btn-sm  btn-inverse-dark btn-icon ms-2`}
                                    title="Offboarding"
                                    // style={{
                                    //   display:
                                    //     roless?.finance?.includes(
                                    //       LocalStorageData?.user_id
                                    //     ) && "none",
                                    // }}
                                    disabled
                                  >
                                    <i class="mdi mdi-airplane-off"></i>
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* ============= Modal =================== */}

              <PureModal
                header="Upload Users Data"
                isOpen={addEventModal}
                onClose={() => {
                  setAddEventModal(false);
                  return true;
                }}
                width={"40%"}
              >
                <form action="">
                  <input
                    type="file"
                    accept=".xlsx"
                    onChange={handleFileUpload}
                  />
                  <h6 style={{ float: "right" }}>
                    <a
                      href="../assets/file/users_tbls.csv"
                      title="Download sample file"
                    >
                      <i
                        className="mdi mdi-download"
                        style={{ fontSize: "2rem" }}
                      ></i>
                    </a>
                  </h6>
                  <div class="modal-footer">
                    <button
                      onClick={async () => {
                        const res = await axios
                          .post("/users_upload_by_file", uploadData)
                          .then((res) => alert(res.data.message))
                          .catch((err) => {
                            console.log(err.response.data.duplicates);
                            setDuplicates(err.response.data.duplicates);
                            setShow(true);
                          });
                      }}
                      type="button"
                      class="btn btn-sm btn-success mt-4"
                    >
                      Upload File
                    </button>
                  </div>
                </form>
              </PureModal>
            </div>

            <footer class="footer">
              <Footer />
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default User_List;
