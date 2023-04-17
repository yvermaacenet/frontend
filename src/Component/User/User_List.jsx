import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import * as XLSX from "xlsx";
import PureModal from "react-pure-modal";
import { useParams } from "react-router-dom";

const User_List = () => {
  const navigate = useNavigate();
  const { status_code } = useParams();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [getUserList, setGetUserList] = useState([]);
  const [roless, setRoless] = useState([]);
  const [uploadData, setUploadData] = useState([]);
  const [duplcates, setDuplicates] = useState([]);
  const [show, setShow] = useState(false);
  const [addEventModal, setAddEventModal] = useState(false);
  const [getStatus_code, setStatus_code] = useState(status_code);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    async function get_user_list(resp) {
      await axios
        .get(`/user_list/${getStatus_code}`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((result_user_list) => {
          return setGetUserList(result_user_list?.data);
        })
        .catch((err) => {
          if (err.response.status === 500) {
            navigate("/error_500");
          } else {
            navigate("/error_403");
          }
        });
    }
    async function get_user_list_by_role_name() {
      await axios
        .get(`/get_user_list_by_role_name`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((result) => {
          return setRoless(result.data), get_user_list(result.data);
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
    get_user_list_by_role_name();
  }, [getStatus_code]);
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
                page_title_button="Back"
                page_title_button_link="/dashboard"
              />
              {loading && (
                <div className="loader-container">
                  <div class="loader"></div>
                </div>
              )}
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
                    {/* <button
                      type="button"
                      class="btn btn-sm btn-inverse-success btn-fw ms-1"
                      onClick={() => setStatus_code("active_users")}
                    >
                      Active
                    </button> */}
                    {/* <button
                      type="button"
                      class="btn btn-sm btn-inverse-danger btn-fw ms-1"
                      onClick={() => setStatus_code("deactive_users")}
                    >
                      Deactivated
                    </button> */}
                    <button
                      type="button"
                      class="btn btn-sm btn-inverse-primary btn-fw ms-1"
                      onClick={() => setStatus_code("pending_onboarding_users")}
                    >
                      Pending Onboarding
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-inverse-dark btn-fw ms-1"
                      onClick={() =>
                        setStatus_code("pending_offboarding_users")
                      }
                    >
                      Pending Offboarding
                    </button>
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
                          {/* <th>Employee ID</th> */}
                          <th>Name</th>
                          <th>Zoho Role</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Status</th>
                          <th>Boarding Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getUserList?.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td class="py-1">
                                <img src={value?.Photo} alt="image" />
                              </td>
                              {/* <td class="py-1">{value["Employee ID"]}</td> */}
                              <td>
                                {value["First Name"]} {value["Last Name"]}
                              </td>
                              <td>{value["Zoho Role"]}</td>
                              <td>
                                {value["Personal Mobile Number"] === ""
                                  ? "NA"
                                  : value["Personal Mobile Number"]}
                              </td>
                              <td> {value["Email address"]} </td>
                              <td>
                                {value["Employee Status"] === "Active" ? (
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
                                {/* ================ On Boarding Button ============= */}

                                {roless?.Admin?.includes(
                                  LocalStorageData?.user_id
                                ) ||
                                roless?.Hr?.includes(
                                  LocalStorageData?.user_id
                                ) ||
                                (roless?.Finance?.includes(
                                  LocalStorageData?.user_id
                                ) &&
                                  value?.on_boarding_steper_counter >= 1) ||
                                (roless?.Management?.includes(
                                  LocalStorageData?.user_id
                                ) &&
                                  value?.on_boarding_steper_counter >= 2) ? (
                                  <NavLink to={`/on_boarding/${value?._id}`}>
                                    <button
                                      type="button"
                                      class={`btn btn-sm ${
                                        value?.on_boarding_status
                                          ? "btn-inverse-success"
                                          : value?.on_boarding_steper_counter >=
                                            1
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
                                (roless?.Admin?.includes(
                                  LocalStorageData?.user_id
                                ) ||
                                  (roless?.Hr?.includes(
                                    LocalStorageData?.user_id
                                  ) &&
                                    value?.off_boarding_steper_counter >= 0) ||
                                  (roless?.Management?.includes(
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
                                            1
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
                          .post("/users_upload_by_file", uploadData, {
                            headers: {
                              Access_Token:
                                LocalStorageData?.generate_auth_token,
                            },
                          })
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
