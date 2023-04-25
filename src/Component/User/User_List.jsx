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
  const specificDate = "2023-04-20";
  const navigate = useNavigate();
  const { status_code } = useParams();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [getUserList, setGetUserList] = useState([]);
  const [roless, setRoless] = useState([]);
  const [uploadData, setUploadData] = useState([]);
  // const [offbordingdata, setOffBoardingData] = useState([]);
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
  useEffect(() => {
    setLoading(true);
    async function get_user_list() {
      await axios
        .get(`/user_list/${getStatus_code}`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then(async (result_user_list) => {
          return await axios
            .get(`/on_boarding`, {
              headers: {
                Access_Token: LocalStorageData?.generate_auth_token,
              },
            })
            .then(async (result) => {
              const resp = result.data;
              const tt = await result_user_list?.data.map((a) => ({
                ...a,
                ...resp.find((b) => b.user_id === a._id),
              }));
              return await axios
                .get(`/off_boarding`, {
                  headers: {
                    Access_Token: LocalStorageData?.generate_auth_token,
                  },
                })
                .then(async (result) => {
                  const resp = result.data;
                  const pp = await tt.map((aa) => ({
                    ...aa,
                    ...resp.find((bb) => bb.employee_id === aa._id),
                  }));
                  console.log("resp", pp);
                  return setGetUserList(pp);
                })
                .catch((err) => {
                  if (err.response.status === 500) {
                    navigate("/error_500");
                  } else {
                    navigate("/error_403");
                  }
                });
            })
            .catch((err) => {
              if (err.response.status === 500) {
                navigate("/error_500");
              } else {
                navigate("/error_403");
              }
            });
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
          return (
            console.log(result.data),
            setRoless(result.data),
            get_user_list(result.data)
          );
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
  const compareDates = (d1, d2) => {
    let date1 = new Date(d1);
    let date2 = new Date(d2);

    if (date1 < date2) {
      return false;
    } else if (date1 >= date2) {
      const s1 = new Date(date1.getTime() + 10 * 24 * 60 * 60 * 1000);
      const s2 = new Date(Date.now());
      if (s1 > s2) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const compareDates1 = (d1, d2) => {
    let date1 = new Date(d1);
    let date2 = new Date(d2);

    if (date1 < date2) {
      return false;
    } else {
      return true;
    }
  };
  // const result = getUserList.map((a) => ({
  //   ...a,
  //   ...offbordingdata.find((b) => b.employee_id === a._id),
  // }));

  // console.log(result);
  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <Page_Header
                page_title="User"
                page_title_icon="mdi-account-multiple-outline"
                page_title_button="Back"
                page_title_button_link="/dashboard"
              />
              {loading && (
                <div className="loader-container">
                  <div className="loader"></div>
                </div>
              )}
              <div className="row">
                <div className="card">
                  <div className="card-body">
                    <button
                      type="button"
                      className="btn btn-sm btn-inverse-info btn-fw ms-1"
                      onClick={() => setStatus_code("all_users")}
                    >
                      All
                    </button>
                    {/* <button
                      type="button"
                      className="btn btn-sm btn-inverse-success btn-fw ms-1"
                      onClick={() => setStatus_code("active_users")}
                    >
                      Active
                    </button> */}
                    {/* <button
                      type="button"
                      className="btn btn-sm btn-inverse-danger btn-fw ms-1"
                      onClick={() => setStatus_code("deactive_users")}
                    >
                      Deactivated
                    </button> */}
                    <button
                      type="button"
                      className="btn btn-sm btn-inverse-primary btn-fw ms-1"
                      onClick={() => setStatus_code("pending_onboarding_users")}
                    >
                      Pending Onboarding
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-inverse-dark btn-fw ms-1"
                      onClick={() =>
                        setStatus_code("pending_offboarding_users")
                      }
                    >
                      Pending Offboarding
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="card">
                  <div
                    className="card-body"
                    style={{
                      maxWidth: "100%",
                      overflow: "hidden",
                      overflowX: "scroll",
                    }}
                  >
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Employee ID</th>
                          <th>Name</th>
                          <th>Acenet Role</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Onboarding/Offboarding </th>
                        </tr>
                      </thead>
                      <tbody>
                        {getUserList?.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td className="py-1">
                                <img src={value?.Photo} alt="image" />{" "}
                                {index + 1}
                              </td>
                              <td className="py-1">{value["Employee ID"]}</td>
                              <td>
                                {value["First Name"]} {value["Last Name"]}
                                <span
                                  className="badge badge-success"
                                  style={{
                                    borderRadius: "20px",
                                    display:
                                      compareDates(
                                        value?.creation_date?.split("T")[0],
                                        specificDate
                                      ) === true
                                        ? "inline-block"
                                        : "none",
                                  }}
                                >
                                  New Joining
                                </span>
                              </td>
                              <td>{value["Acenet Role"]}</td>
                              <td>
                                {value["Personal Mobile Number"] === ""
                                  ? "NA"
                                  : value["Personal Mobile Number"]}
                              </td>
                              <td> {value["Email address"]} </td>
                              {/* <td>{value?.creation_date}</td> */}
                              <td>
                                {/* ================ On Boarding Button ============= */}
                                {compareDates1(
                                  value?.creation_date?.split("T")[0],
                                  specificDate
                                ) === true &&
                                  (roless?.Admin?.includes(
                                    LocalStorageData?.user_id
                                  ) ||
                                  roless?.Hr?.includes(
                                    LocalStorageData?.user_id
                                  ) ||
                                  roless?.Finance?.includes(
                                    LocalStorageData?.user_id
                                  ) ||
                                  roless?.Management?.includes(
                                    LocalStorageData?.user_id
                                  ) ? (
                                    <button
                                      type="button"
                                      className={`btn btn-sm ${
                                        value?.hr_on_boarding_status === true &&
                                        value?.finance_on_boarding_status ===
                                          true &&
                                        value?.management_on_boarding_status ===
                                          true
                                          ? "btn-inverse-success"
                                          : value?.off_boarding_steper_counter >=
                                            1
                                          ? "btn-inverse-danger"
                                          : "btn-inverse-info"
                                      } ms-2`}
                                      title="Onboarding"
                                      onClick={() => {
                                        const confirmationButton =
                                          window.confirm(
                                            value?.hr_on_boarding_status ===
                                              true &&
                                              value?.finance_on_boarding_status ===
                                                true &&
                                              value?.management_on_boarding_status ===
                                                true
                                              ? "Do you really want to check onboarding?"
                                              : "Do you really want to initiate onboarding?"
                                          );
                                        if (confirmationButton === true) {
                                          navigate(
                                            `/on_boarding/${value?._id}`
                                          );
                                        }
                                      }}
                                    >
                                      {value?.hr_on_boarding_status === true &&
                                      value?.finance_on_boarding_status ===
                                        true &&
                                      value?.management_on_boarding_status ===
                                        true
                                        ? "Onboarding is completed"
                                        : value?.on_boarding_steper_counter >= 1
                                        ? "Onboarding is pending"
                                        : "Initiate Onboarding"}
                                    </button>
                                  ) : (
                                    ""
                                  ))}

                                {/* ================ Off Boarding Button ============= */}

                                {/* {roless?.Admin?.includes(
                                  LocalStorageData?.user_id
                                ) ||
                                roless?.Hr?.includes(
                                  LocalStorageData?.user_id
                                ) ||
                                roless?.Management?.includes(
                                  LocalStorageData?.user_id
                                ) ? (
                                  <button
                                    type="button"
                                    className={`btn btn-sm ${
                                      value?.off_boarding_status
                                        ? "btn-inverse-success"
                                        : value?.off_boarding_steper_counter >=
                                          1
                                        ? "btn-inverse-danger"
                                        : "btn-inverse-info"
                                    } ms-2`}
                                    title="Offboarding"
                                    onClick={() => {
                                      const confirmationButton = window.confirm(
                                        "Do you really want to Initiate Resignation?"
                                      );
                                      if (confirmationButton === true) {
                                        navigate(`/off_boarding/${value?._id}`);
                                      }
                                    }}
                                  >
                                    {value?.off_boarding_status
                                      ? "Resignation is completedddddd"
                                      : value?.off_boarding_steper_counter >= 1
                                      ? "Resignation is pending"
                                      : "Initiate Resignation"}
                                  </button>
                                ) : (
                                  ""
                                )} */}

                                <button
                                  type="button"
                                  className={`btn btn-sm ${
                                    value?.hr_off_boarding_status === true &&
                                    value?.finance_off_boarding_status ===
                                      true &&
                                    value?.management_off_boarding_status ===
                                      true
                                      ? "btn-inverse-success"
                                      : value?.off_boarding_steper_counter >= 1
                                      ? "btn-inverse-danger"
                                      : "btn-inverse-info"
                                  } ms-2`}
                                  title="Offboarding"
                                  onClick={() => {
                                    const confirmationButton = window.confirm(
                                      value?.hr_off_boarding_status === true &&
                                        value?.finance_off_boarding_status ===
                                          true &&
                                        value?.management_off_boarding_status ===
                                          true
                                        ? "Do you really want to check resignation?"
                                        : "Do you really want to initiate resignation?"
                                    );
                                    if (confirmationButton === true) {
                                      navigate(`/off_boarding/${value?._id}`);
                                    }
                                  }}
                                >
                                  {value?.hr_off_boarding_status === true &&
                                  value?.finance_off_boarding_status === true &&
                                  value?.management_off_boarding_status === true
                                    ? "Resignation is completed"
                                    : value?.off_boarding_steper_counter >= 1
                                    ? "Resignation is pending"
                                    : "Initiate Resignation"}
                                </button>
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

              {/* <PureModal
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
                  <div className="modal-footer">
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
                      className="btn btn-sm btn-success mt-4"
                    >
                      Upload File
                    </button>
                  </div>
                </form>
              </PureModal> */}
            </div>

            <footer className="footer">
              <Footer />
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default User_List;
