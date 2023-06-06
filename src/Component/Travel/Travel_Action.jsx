import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { form_travel_request_action_validation } from "../../Utils/Validation_Form";
import classNames from "classnames";
import { useForm } from "react-hook-form";
const Travel_Action = (props) => {
  const alert = useAlert();
  const navigate = useNavigate();
  const { _id } = useParams();
  const [loading, setLoading] = useState(false);
  const [getData, setGetData] = useState({});
  const [isManager, setIsManager] = useState(false);
  const [isManagememnt, setIsManagememnt] = useState(false);
  const [handleButtonType, setHandleButtonType] = useState();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(form_travel_request_action_validation),
  });
  const getAllManagersList = async () => {
    const resp = await axios.get("/get_user_list_By_Role_Name");
    const allManagersId = resp.data.Reporting_Manager;
    const filtered = allManagersId.includes(LocalStorageData?.emp_id);
    const filteredManagement = resp?.data?.Management.includes(
      LocalStorageData?.user_id
    );
    // setIsManager(filtered);
    setIsManagememnt(filteredManagement);
    setLoading(false);
  };
  useEffect(() => {
    const get_travel_request_by_id = async () => {
      setLoading(true);
      const res = await axios
        .get(`/get_travel_request_by_id/${_id}`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((res) => setGetData(res.data))
        .catch((err) => {
          if (err.response.status === 500) {
            navigate("/error_500");
          } else {
            navigate("/error_403");
          }
        });
    };
    get_travel_request_by_id();
    getAllManagersList();
  }, []);

  console.log("getData", getData);
  //   ====Handle Remarks
  // console.log("status", getData?.management_status);
  // const handleRemarksChange = (e) => {
  //   e.preventDefault();
  //   setRemarks({ ...remarks, [e.target.name]: e.target.value });
  // };
  //   ====handle Approve
  // const handleApprove = async (e) => {
  //   e.preventDefault();
  //   if (LocalStorageData?.zoho_role === "Management" && isManager === true) {
  //     const res = await axios.put(`/update_travel_request/${_id}`, {
  //       ...remarks,
  //       managers_approval: "Approved",
  //       management_approval: "Approved",
  //     });
  //     if (res.data === "Updated Sucessfully") {
  //       alert.show("Approved Successfully");
  //       navigate("/travelrequestreceived");
  //     }
  //   } else if (LocalStorageData?.zoho_role === "Management") {
  //     const res = await axios.put(`/update_travel_request/${_id}`, {
  //       ...remarks,
  //       management_approval: "Approved",
  //     });
  //     if (res.data === "Updated Sucessfully") {
  //       alert.show("Approved Successfully");
  //       navigate("/travelrequestreceived");
  //     }
  //   } else {
  //     const res = await axios.put(`/update_travel_request/${_id}`, {
  //       ...remarks,
  //       managers_approval: "Approved",
  //     });
  //     if (res.data === "Updated Sucessfully") {
  //       alert.show("Approved Successfully");
  //       navigate("/travelrequestreceived");
  //     }
  //   }
  // };
  // // =====handle Decline
  // const handleDecline = async (e) => {
  //   e.preventDefault();
  //   if (LocalStorageData?.zoho_role === "Management" && isManager === true) {
  //     const res = await axios.put(`/update_travel_request/${_id}`, {
  //       ...remarks,
  //       managers_approval: "Declined",
  //       management_approval: "Declined",
  //     });
  //     if (res.data === "Updated Sucessfully") {
  //       alert.show("Declined Successfully");
  //       navigate("/travelrequestreceived");
  //     }
  //   } else if (LocalStorageData?.zoho_role === "Management") {
  //     const res = await axios.put(`/update_travel_request/${_id}`, {
  //       ...remarks,
  //       management_approval: "Declined",
  //     });
  //     if (res.data === "Updated Sucessfully") {
  //       alert.show("Declined Successfully");
  //       navigate("/travelrequestreceived");
  //     }
  //   } else {
  //     const res = await axios.put(`/update_travel_request/${_id}`, {
  //       ...remarks,
  //       managers_approval: "Declined",
  //     });
  //     if (res.data === "Updated Sucessfully") {
  //       alert.show("Declined Successfully");
  //       navigate("/travelrequestreceived");
  //     }
  //   }
  // };

  const onSubmitButton = async (e) => {
    if (LocalStorageData?.zoho_role === "Management" && isManager === true) {
      const res = await axios.put(`/update_travel_request/${_id}`, {
        remarks: getData.remarks,
        managers_approval:
          getData?.managers_approval === "Pending"
            ? handleButtonType
              ? "Approved"
              : "Declined"
            : getData?.managers_approval,
        management_approval: handleButtonType ? "Approved" : "Declined",
      });
      if (res.data === "Updated Sucessfully") {
        alert.show(
          `${handleButtonType ? "Approved" : "Declined"} Successfully`
        );
        navigate("/travelrequestreceived");
      }
    } else if (LocalStorageData?.zoho_role === "Management") {
      const res = await axios.put(`/update_travel_request/${_id}`, {
        remarks: getData.remarks,
        management_approval: handleButtonType ? "Approved" : "Declined",
      });
      if (res.data === "Updated Sucessfully") {
        alert.show(
          `${handleButtonType ? "Approved" : "Declined"} Successfully`
        );
        navigate("/travelrequestreceived");
      }
    } else {
      const res = await axios.put(`/update_travel_request/${_id}`, {
        remarks: getData.remarks,
        managers_approval: handleButtonType ? "Approved" : "Declined",
      });
      if (res.data === "Updated Sucessfully") {
        alert.show(
          `${handleButtonType ? "Approved" : "Declined"} Successfully`
        );
        navigate("/travelrequestreceived");
      }
    }
  };

  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <Page_Header
              page_heading="View Travel Request"
              page_title_icon="mdi-wallet-travel"
              page_title_button="Back"
              page_title_button_link={`${
                // isManager &&
                getData?.employee?.email !== LocalStorageData?.email
                  ? "/travelrequestreceived"
                  : "/alltravelrequest"
              }`}
            />
            {loading && (
              <div className="loader-container">
                <div class="loader"></div>
              </div>
            )}
            <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h6
                      className="card-title text-primary mt-2"
                      style={{ fontSize: "14px" }}
                    >
                      Information
                    </h6>

                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Billable</th>
                          <th>Project Id</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-3">
                            {getData?.employee?.employee_id}
                          </td>
                          <td>{getData?.employee?.email}</td>
                          <td>{getData?.employee?.phone}</td>
                          <td>{getData?.employee?.billable}</td>
                          <td>
                            {getData?.employee?.project_id === ""
                              ? "N/A"
                              : getData?.employee?.project_id}
                          </td>
                          {/* {isManager && ( */}
                          {/* <td>
                            <label
                              class={`${
                                getData?.managers_approval === "Approved"
                                  ? "badge badge-success"
                                  : getData?.managers_approval === "Declined"
                                  ? "badge badge-danger"
                                  : "badge badge-warning"
                              }`}
                            >
                              {getData?.managers_approval}
                            </label>
                          </td> */}
                          {/* )} */}
                        </tr>
                        <tr>
                          <th className="py-4">Reason for Travel</th>
                          <td colSpan={7}>
                            {getData?.employee?.reason_for_travel}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <>
                      <h6
                        className="card-title text-primary mt-4"
                        style={{ fontSize: "14px" }}
                      >
                        Travel Information
                      </h6>
                      <table className="table table-bordered my-4">
                        <thead>
                          <tr>
                            <th className="w-25">Travel Date</th>
                            <th className="w-25">Name(s)</th>
                            <th className="w-25">Travel Type(s)</th>
                            <th className="w-25">From City</th>
                            <th className="w-25">To City</th>
                            <th className="w-25">Preferred Time</th>
                            <th className="w-25">Accomendation</th>
                            <th className="w-25">Checkin Date</th>
                            <th className="w-25">Checkout Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getData?.travel_request?.map((val) => {
                            return (
                              <tr>
                                {" "}
                                <td>{val?.travel_date}</td>
                                <td>
                                  {(val?.booking_for).map((val) => {
                                    return (
                                      <small className="d-block m-1">
                                        {`${val},`}
                                      </small>
                                    );
                                  })}
                                </td>
                                <td>{val?.travel_type}</td>
                                <td>{val?.flight_from_city}</td>
                                <td>{val?.flight_to_city}</td>
                                <td>{val?.flight_preferred_time}</td>
                                <td>{val?.accomendation_type}</td>
                                <td>{val?.hotel_checkin_date}</td>
                                <td>{val?.hotel_checkout_date}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <div>
                        <span className="fw-bold"> Special Request</span> :{" "}
                        <small>{getData?.employee?.special_request}</small>
                      </div>
                    </>

                    {
                      // isManager &&
                      LocalStorageData?.zoho_role === "Management" &&
                      getData?.employee?.email !== LocalStorageData?.email &&
                      getData?.management_approval === "Pending" ? (
                        <form
                          className="forms-sample"
                          onSubmit={handleSubmit(onSubmitButton)}
                        >
                          <div class="col-12 mt-2">
                            <div class="form-group">
                              <label>Remarks</label>
                              <textarea
                                name="remarks"
                                className={classNames(
                                  "form-control form-control-sm font-bold",
                                  {
                                    "is-invalid": errors.remarks,
                                  }
                                )}
                                {...register("remarks", {
                                  value: getData?.remarks,
                                })}
                                onChange={(e) =>
                                  setGetData({
                                    ...getData,
                                    remarks: e.target.value,
                                  })
                                }
                                value={getData?.remarks}
                                placeholder="Enter Remarks"
                                rows={4}
                              ></textarea>
                            </div>
                          </div>

                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-sm btn-gradient-success me-2"
                              onClick={() => setHandleButtonType(true)}
                            >
                              Approve
                            </button>
                            <button
                              type="submit"
                              className="btn btn-sm btn-gradient-danger me-2"
                              onClick={() => setHandleButtonType(false)}
                            >
                              Decline
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div
                          className={
                            getData?.management_approval === "Approved"
                              ? "text-success text-center fs-4"
                              : "text-danger text-center fs-4"
                          }
                        >
                          <small>
                            {" "}
                            {`You have already ${getData?.management_approval} this request`}
                          </small>
                        </div>
                      )
                    }
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

export default Travel_Action;
