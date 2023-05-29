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
    setIsManager(filtered);
    setIsManagememnt(filteredManagement);
  };
  useEffect(() => {
    const get_travel_request_by_id = async () => {
      setLoading(true);
      const res = await axios
        .get(`/get_travel_request_by_id/${_id}`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((res) => setGetData(res.data), setLoading(false))
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
  console.log("wewewewe", getData);
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
  console.log("ressdsdp", isManagememnt);

  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <Page_Header
              page_heading="View Travel Request"
              page_title_icon="mdi-home-modern"
              page_title_button="Back"
              page_title_button_link={`${
                isManager &&
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
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Project Id</th>
                          <th>Billable</th>
                          {isManager && <th>Status</th>}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{LocalStorageData?.name}</td>
                          <td>{LocalStorageData?.email}</td>
                          <td>{LocalStorageData?.phone}</td>
                          <td>{getData?.travel?.start_date?.split("T")[0]}</td>
                          <td>{getData?.travel?.end_date?.split("T")[0]}</td>
                          <td>{getData?.employee?.project_id}</td>
                          <td>{getData?.employee?.billable}</td>
                          {isManager && (
                            <td>
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
                            </td>
                          )}
                        </tr>
                        <tr>
                          <th>Reason for Travel</th>
                          <td colSpan={7}>
                            {getData?.travel?.reason_for_travel}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <>
                      <h6
                        className="card-title text-primary mt-2"
                        style={{ fontSize: "14px" }}
                      >
                        Travel Type
                      </h6>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th className="w-25">Flight</th>
                            <th className="w-25">Hotel</th>
                            <th className="w-25">Train</th>
                            <th className="w-25">Other</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <label className="form-check-label">
                                <input
                                  name="other_travel"
                                  type="checkbox"
                                  checked={getData?.flight?.flight_travel}
                                  disabled
                                />
                                <i className="input-helper"></i>
                              </label>
                            </td>
                            <td>
                              <label className="form-check-label">
                                <input
                                  name="other_travel"
                                  type="checkbox"
                                  checked={getData?.hotel?.hotel_travel}
                                  disabled
                                />
                                <i className="input-helper"></i>
                              </label>
                            </td>
                            <td>
                              <label className="form-check-label">
                                <input
                                  name="other_travel"
                                  type="checkbox"
                                  checked={getData?.train?.train_travel}
                                  disabled
                                />
                                <i className="input-helper"></i>
                              </label>
                            </td>
                            <td>
                              <label className="form-check-label">
                                <input
                                  name="other_travel"
                                  type="checkbox"
                                  checked={getData?.other?.other_travel}
                                  disabled
                                />
                                <i className="input-helper"></i>
                              </label>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                    {getData?.flight?.flight_travel && (
                      <>
                        <h6
                          className="card-title text-primary mt-2"
                          style={{ fontSize: "14px" }}
                        >
                          Flight Info
                        </h6>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th className="w-25">Form City</th>
                              <th className="w-25">To City</th>
                              <th className="w-25">Preferred Time</th>
                              <th className="w-25">Class of Travel</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{getData?.flight?.flight_from_city}</td>
                              <td>{getData?.flight?.flight_to_city}</td>
                              <td>{getData?.flight?.flight_preferred_time}</td>
                              <td>{getData?.flight?.flight_class_preferred}</td>
                            </tr>
                          </tbody>
                        </table>
                      </>
                    )}
                    {getData?.hotel?.hotel_travel && (
                      <>
                        <h6
                          className="card-title text-primary mt-2"
                          style={{ fontSize: "14px" }}
                        >
                          Hotel Info
                        </h6>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th className="w-25">City</th>
                              <th className="w-25">Check-in</th>
                              <th className="w-25">Check-out</th>
                              <th className="w-25">No. of Rooms</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{getData?.hotel?.hotel_city}</td>
                              <td>
                                {getData?.hotel?.hotel_checkin?.split("T")[0]}
                              </td>
                              <td>
                                {getData?.hotel?.hotel_checkout?.split("T")[0]}
                              </td>
                              <td>{getData?.hotel?.hotel_number_of_rooms}</td>
                            </tr>
                          </tbody>
                        </table>
                      </>
                    )}

                    {getData?.train?.train_travel && (
                      <>
                        <h6
                          className="card-title text-primary mt-2"
                          style={{ fontSize: "14px" }}
                        >
                          Train Info
                        </h6>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th className="w-25">Form City</th>
                              <th className="w-25">To City</th>
                              <th className="w-25">Preferred Time</th>
                              <th className="w-25">Class of Travel</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{getData?.train?.train_from_city}</td>
                              <td>{getData?.train?.train_to_city}</td>
                              <td>{getData?.train?.train_preferred_time}</td>
                              <td>{getData?.train?.train_class_preferred}</td>
                            </tr>
                          </tbody>
                        </table>
                      </>
                    )}

                    {getData?.other?.other_travel && (
                      <>
                        <h6
                          className="card-title text-primary mt-2"
                          style={{ fontSize: "14px" }}
                        >
                          Other Info
                        </h6>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th className="w-25">Type</th>
                              <th className="w-25">Form City</th>
                              <th>To City</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{getData?.other?.other_travel_type}</td>
                              <td>{getData?.other?.other_from_city}</td>
                              <td>{getData?.other?.other_to_city}</td>
                            </tr>
                          </tbody>
                        </table>
                      </>
                    )}
                    {/* {isManager &&
                      getData?.employee?.email !== LocalStorageData?.email && ( */}
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
                    {/* )} */}
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
