import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import { useParams } from "react-router-dom";

const User_List = () => {
  const specificDate = "2023-05-02";
  const navigate = useNavigate();
  const { status_code } = useParams();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [getUserList, setGetUserList] = useState([]);
  const [getStatus_code, setStatus_code] = useState(status_code);
  const [loading, setLoading] = useState(false);

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
              const resp = result?.data;
              const tt = await result_user_list?.data.map((a) => ({
                ...a,
                ...resp?.find((b) => b?.user_id === a?._id),
              }));
              return await axios
                .get(`/off_boarding`, {
                  headers: {
                    Access_Token: LocalStorageData?.generate_auth_token,
                  },
                })
                .then(async (result) => {
                  const resp = result?.data;
                  const pp = await tt?.map((aa) => ({
                    ...aa,
                    ...resp?.find((bb) => bb?.employee_id === aa?._id),
                  }));
                  return setGetUserList(pp);
                })
                .catch((err) => {
                  if (err?.response?.status === 500) {
                    navigate("/error_500");
                  } else {
                    navigate("/error_403");
                  }
                });
            })
            .catch((err) => {
              if (err?.response?.status === 500) {
                navigate("/error_500");
              } else {
                navigate("/error_403");
              }
            });
        })
        .catch((err) => {
          if (err?.response?.status === 500) {
            navigate("/error_500");
          } else {
            navigate("/error_403");
          }
        });
      setLoading(false);
    }
    get_user_list();
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
                <div class="col-lg-12 grid-margin stretch-card">
                  <button
                    type="button"
                    className="btn btn-sm btn-inverse-info btn-fw ms-1"
                    onClick={() => setStatus_code("active_users")}
                  >
                    All
                  </button>

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
                    onClick={() => setStatus_code("pending_offboarding_users")}
                  >
                    Pending Offboarding
                  </button>
                </div>
              </div>
              <div className="row">
                <div class="col-lg-12 grid-margin stretch-card">
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
                            <th>Name</th>

                            <th>Phone</th>
                            <th>Email</th>
                            <th>Onboarding </th>
                            <th>Offboarding</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getUserList?.map((value, index) => {
                            return (
                              <tr key={index}>
                                <td className="py-1">
                                  <img src={value?.Photo} alt="image" />
                                </td>
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

                                <td>
                                  {value["Personal Mobile Number"] === ""
                                    ? "NA"
                                    : value["Personal Mobile Number"]}
                                </td>
                                <td> {value["Email address"]} </td>
                                <td>
                                  {/* ================ On Boarding Button ============= */}
                                  {compareDates1(
                                    value?.creation_date?.split("T")[0],
                                    specificDate
                                  ) === true &&
                                    (LocalStorageData?.zoho_role === "Admin" ||
                                    LocalStorageData?.zoho_role ===
                                      "Management" ||
                                    LocalStorageData?.zoho_role === "Finance" ||
                                    LocalStorageData?.zoho_role === "Hr" ? (
                                      <button
                                        type="button"
                                        className={`btn btn-sm ${
                                          value?.hr_on_boarding_status ===
                                            true &&
                                          value?.finance_on_boarding_status ===
                                            true &&
                                          value?.management_on_boarding_status ===
                                            true
                                            ? "btn-inverse-success"
                                            : value?.initiate_on_boarding_status ===
                                              true
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
                                        {value?.hr_on_boarding_status ===
                                          true &&
                                        value?.finance_on_boarding_status ===
                                          true &&
                                        value?.management_on_boarding_status ===
                                          true
                                          ? "Completed"
                                          : value?.initiate_on_boarding_status ===
                                            true
                                          ? "Pending"
                                          : "Initiate"}
                                      </button>
                                    ) : (
                                      ""
                                    ))}
                                </td>
                                <td>
                                  {/* ================ Off Boarding Button ============= */}

                                  <button
                                    type="button"
                                    className={`btn btn-sm ${
                                      value?.hr_off_boarding_status === true &&
                                      value?.finance_off_boarding_status ===
                                        true &&
                                      value?.management_off_boarding_status ===
                                        true
                                        ? "btn-inverse-success"
                                        : value?.initiate_off_boarding_status ===
                                          true
                                        ? "btn-inverse-danger"
                                        : "btn-inverse-info"
                                    } ms-2`}
                                    title="Offboarding"
                                    onClick={() => {
                                      const confirmationButton = window.confirm(
                                        value?.hr_off_boarding_status ===
                                          true &&
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
                                    value?.finance_off_boarding_status ===
                                      true &&
                                    value?.management_off_boarding_status ===
                                      true
                                      ? "Completed"
                                      : value?.initiate_off_boarding_status ===
                                        true
                                      ? "Pending"
                                      : "Initiate"}
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
              </div>

              {/* ============= Modal =================== */}
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
