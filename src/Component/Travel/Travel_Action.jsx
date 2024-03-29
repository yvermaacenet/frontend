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
  // const getAllManagersList = async () => {
  //   const resp = await axios.get("/get_user_list_By_Role_Name");
  //   const allManagersId = resp.data.Reporting_Manager;
  //   const filtered = allManagersId.includes(LocalStorageData?.emp_id);
  //   const filteredManagement = resp?.data?.Management.includes(
  //     LocalStorageData?.user_id
  //   );
  //   // setIsManager(filtered);
  //   setIsManagememnt(filteredManagement);
  //   setLoading(false);
  // };
  function formatBirthdate(birthdate) {
    var parts = birthdate.split("-");
    var formattedDate =
      parts[2].split("T")[0] + "-" + parts[1] + "-" + parts[0];

    return formattedDate;
  }
  useEffect(() => {
    const get_travel_request_by_id = async () => {
      setLoading(true);
      const res = await axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/get_travel_request_by_id/${_id}`,
          {
            headers: { authorization: LocalStorageData?.generate_auth_token },
          }
        )
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
    setLoading(false);

    // getAllManagersList();
  }, []);
  console.log("get", getData);
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
    // if (LocalStorageData?.zoho_role === "Management") {

    const confirmation = window.confirm(
      `Do you really want ${
        handleButtonType ? "Approve" : "Decline"
      } this request`
    );
    if (confirmation === true) {
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
        await axios.post(`${process.env.REACT_APP_BASE_URL}/status_email`, {
          status: handleButtonType ? "Approved" : "Declined",
          user: getData?.travellersData?.map((val) => val?.data?.name),
          email: getData?.travellersData?.map((val) => val?.data?.email),
          basicDetails: getData?.basicDetails,
          rows: getData?.rows,
          travellersData: getData?.travellersData,
          accommodationData: getData?.accommodationData,
          roomsData: getData?.roomsData,
        });
        alert.show(
          `${handleButtonType ? "Approved" : "Declined"} Successfully`
        );
        navigate("/travelrequestreceived");
      }
    }

    // } else if (LocalStorageData?.zoho_role === "Management") {
    //   const res = await axios.put(`/update_travel_request/${_id}`, {
    //     remarks: getData.remarks,
    //     managers_approval:
    //       getData?.managers_approval === "Pending"
    //         ? handleButtonType
    //           ? "Approved"
    //           : "Declined"
    //         : getData?.managers_approval,
    //     management_approval: handleButtonType ? "Approved" : "Declined",
    //   });
    //   if (res.data === "Updated Sucessfully") {
    //     alert.show(
    //       `${handleButtonType ? "Approved" : "Declined"} Successfully`
    //     );
    //     navigate("/travelrequestreceived");
    //   }
    // } else {
    //   const res = await axios.put(`/update_travel_request/${_id}`, {
    //     remarks: getData.remarks,
    //     managers_approval: handleButtonType ? "Approved" : "Declined",
    //   });
    //   if (res.data === "Updated Sucessfully") {
    //     alert.show(
    //       `${handleButtonType ? "Approved" : "Declined"} Successfully`
    //     );
    //     navigate("/travelrequestreceived");
    //   }
    // }
  };

  function formatPhoneNumber(phoneNumber) {
    const cleanNumber = phoneNumber.replace(/\D/g, "");

    const numberWithout91 = cleanNumber.startsWith("91")
      ? cleanNumber.slice(2)
      : cleanNumber.startsWith("0")
      ? cleanNumber.slice(1)
      : cleanNumber;

    return "+91-" + numberWithout91;
  }

  // const phoneNumber1 = "08860681590";

  // const formattedNumber1 = formatPhoneNumber(phoneNumber1);

  console.log(
    "getData?.accommodationData?.length",
    getData?.accommodationData?.length
  );
  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            {/* <Page_Header
              page_heading="View Travel Request"
              page_title_icon="mdi-wallet-travel"
              page_title_button="Back"
              // page_title_button_link={`${
              //   // isManager &&
              //   getData?.employee?.email !== LocalStorageData?.email
              //     ? "/travelrequestreceived"
              //     : "/alltravelrequest"
              // }`}
              page_title_button_link="/alltravelrequest"
            /> */}
            {loading && (
              <div className="loader-container">
                <div class="loader"></div>
              </div>
            )}
            <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card" style={{ borderRadius: "20px" }}>
                  <div className="card-body">
                    <div
                      style={{
                        width: "100%",
                        border: "1px solid lightgrey",
                        padding: "1rem",
                        // marginTop: "1rem",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <span class="card-description">TRAVEL REQUEST</span>
                      </div>
                      <p class="box_title text-primary">Information</p>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            {" "}
                            <th>Request ID</th>
                            <th>Billable</th>
                            <th>Client Id</th>
                            <th>Project ID</th>
                            <th>Reason For Travel</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{getData?.request_id}</td>

                            <td className="py-3">
                              {getData?.basicDetails?.billable}
                            </td>
                            <td className="py-3">
                              {getData?.basicDetails?.client_id}
                            </td>
                            <td>{getData?.basicDetails?.project_id}</td>
                            <td>{getData?.basicDetails?.reason_for_travel}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <>
                      <div
                        style={{
                          width: "100%",
                          border: "1px solid lightgrey",
                          padding: "1rem",
                          marginTop: "1rem",
                          display: `${
                            getData?.travellersData?.length <= 0
                              ? "none"
                              : "block"
                          }`,
                        }}
                      >
                        {/* =================Travellers================================================ */}

                        {getData?.travellersData?.length > 0 && (
                          <>
                            <p class="box_title text-primary">Travellers</p>
                            <table className="table table-bordered my-4">
                              <thead>
                                <tr>
                                  <th className="w-25">Emp</th>
                                  <th className="w-25">Emp ID</th>
                                  <th className="w-25">Full Name</th>
                                  <th className="w-25">Gender</th>
                                  <th className="w-25">Phone</th>
                                  <th className="w-25">Email</th>
                                  <th className="w-25">DOB </th>
                                  <th className="w-25">Preferred Time </th>
                                </tr>
                              </thead>
                              <tbody>
                                {getData?.travellersData?.map((val) => {
                                  return (
                                    <tr>
                                      {" "}
                                      <td>{val?.data?.is_employee}</td>
                                      <td>{val?.data.emp_id?.value}</td>
                                      <td>{val?.data?.name}</td>
                                      <td>{val?.data?.gender}</td>
                                      <td>
                                        {formatPhoneNumber(val?.data?.phone)}
                                      </td>
                                      <td>{val?.data?.email}</td>
                                      <td>{formatBirthdate(val?.data?.dob)}</td>
                                      <td>
                                        {val?.data?.preferred_time === undefined
                                          ? "NA"
                                          : val?.data?.preferred_time}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </>
                        )}

                        {/* =================Travel================================================ */}
                        {getData?.rows?.map(
                          (val) =>
                            val?.data !== undefined && (
                              <>
                                <p className="box_title text-primary">Travel</p>
                                <table className="table table-bordered my-4">
                                  <thead>
                                    <tr>
                                      <th className="w-25">Travel Mode</th>
                                      <th className="w-25">From City</th>
                                      <th className="w-25">To City</th>
                                      <th className="w-25">Departure Date</th>
                                      <th className="w-25">Return</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {getData?.rows?.map((val) => {
                                      return (
                                        <tr>
                                          {" "}
                                          <td>{val?.data?.travel_mode}</td>
                                          <td>
                                            {val?.data?.travel_from_city?.value}
                                          </td>
                                          <td>
                                            {val?.data?.travel_to_city?.value}
                                          </td>
                                          <td>
                                            {formatBirthdate(
                                              val?.data?.departure
                                            )}
                                          </td>
                                          <td>
                                            {val?.data?.return === undefined
                                              ? "NA"
                                              : formatBirthdate(
                                                  val?.data?.return
                                                )}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </>
                            )
                        )}
                      </div>
                      {/* =================Accomodation================================================ */}
                      <div
                        style={{
                          width: "100%",
                          border: "1px solid lightgrey",
                          padding: "1rem",
                          marginTop: "1rem",
                          display: `${
                            getData?.accommodationData?.length <= 0
                              ? "none"
                              : "block"
                          }`,
                        }}
                      >
                        {getData?.accommodationData?.map(
                          (val) =>
                            val?.data !== undefined && (
                              <>
                                <p class="box_title text-primary">
                                  Accomodation
                                </p>
                                <table className="table table-bordered my-4">
                                  <thead>
                                    <tr>
                                      <th>City</th>
                                      <th>Check-in</th>
                                      <th>Check-out</th>
                                      <th>Breakfast Required</th>
                                      <th>Rooms Required</th>
                                      <th>No. Of Adults</th>
                                      <th>No. of Children</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {getData?.accommodationData?.map((val) => {
                                      return (
                                        <tr>
                                          {" "}
                                          <td>{val?.data?.city?.value}</td>
                                          <td>
                                            {formatBirthdate(
                                              val?.data?.checkIn
                                            )}
                                          </td>
                                          <td>
                                            {formatBirthdate(
                                              val?.data?.checkOut
                                            )}
                                          </td>
                                          <td>
                                            {val?.data?.breakfastRequired}
                                          </td>
                                          <td>{val?.data?.number_of_rooms}</td>
                                          <td>{val?.data?.number_of_adults}</td>
                                          <td>
                                            {val?.data?.number_of_children}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </>
                            )
                        )}

                        {/* =================Occupancy================================================ */}
                        {getData?.accommodationData?.map(
                          (val) =>
                            val?.data !== undefined && (
                              <>
                                <p class="box_title text-primary">Occupancy</p>
                                <table className="table table-bordered my-4">
                                  <thead>
                                    <tr>
                                      <th className="w-25">Emp</th>
                                      <th className="w-25">Emp ID</th>
                                      <th className="w-25">Full Name</th>
                                      <th className="w-25">Gender</th>
                                      <th className="w-25">Phone</th>
                                      <th className="w-25">Email</th>
                                      <th className="w-25">DOB </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {getData?.roomsData?.map((val) => {
                                      return (
                                        <tr>
                                          {" "}
                                          <td>{val?.data?.is_employee}</td>
                                          <td>{val?.data?.emp_id?.value}</td>
                                          <td>{val?.data?.name}</td>
                                          <td>{val?.data?.gender}</td>
                                          <td>
                                            {formatPhoneNumber(
                                              val?.data?.phone
                                            )}
                                          </td>
                                          <td>{val?.data?.email}</td>
                                          <td>
                                            {formatBirthdate(val?.data?.dob)}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </>
                            )
                        )}
                      </div>
                    </>
                    {getData?.basicDetails?.special_request !== "" && (
                      <div
                        style={{
                          width: "100%",
                          border: "1px solid lightgrey",
                          padding: "1rem",
                          marginTop: "1rem",
                        }}
                      >
                        <p class="box_title text-primary">Special Request</p>
                        <blockquote class="blockquote">
                          <p class="mb-0">
                            {getData?.basicDetails?.special_request}
                          </p>
                        </blockquote>
                      </div>
                    )}
                    {LocalStorageData?.zoho_role === "Management" &&
                    getData?.created_by !== LocalStorageData?.email &&
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
                        <p className="fw-bold">
                          {" "}
                          Status: {` ${getData?.management_approval} `}
                        </p>
                      </div>
                    )}
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
