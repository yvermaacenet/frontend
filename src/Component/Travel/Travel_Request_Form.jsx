import React, { useState } from "react";
import Navbar from "../../Partials/Navbar";
import Sidebar from "../../Partials/Sidebar";
import Page_Header from "../../Partials/Page_Header";
import { useAlert } from "react-alert";
import axios from "axios";
import Select from "react-select";
import { useNavigate, NavLink } from "react-router-dom";
import { useEffect } from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { travel_request_form_validation } from "../../Utils/Validation_Form";
import { border } from "@mui/system";

// testing
const TravelRequestForm = () => {
  const navigate = useNavigate();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const alert = useAlert();
  let [loading, setLoading] = useState(false);
  let [cityData, setCityData] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const [error, setError] = useState(false);
  const [employee, setEmployee] = useState({
    name: LocalStorageData?.name,
    email: LocalStorageData?.email,
    user_id: LocalStorageData?.user_id,
    employee_id: LocalStorageData?.emp_id,
    phone: LocalStorageData?.phone,
    reporting_manager: LocalStorageData?.reporting_manager,
    reporting_manager_emp_id: LocalStorageData?.reporting_manager.slice(-2),
    billable: "",
    project_id: "",
    reason_for_travel: "",
    special_request: "",
  });
  const [travel, setTravel] = useState([]);

  const [train, setTrain] = useState({
    train_travel: false,
  });
  const [hotel, setHotel] = useState({
    hotel_travel: false,
  });
  const [other, setOther] = useState({
    other_travel: false,
    other_travel_type: "",
  });
  const [selectedEmployeesValues, setSelectedEmployeesValues] = useState([]);

  const [getFlightTabledata, setGetFlightTabledata] = useState([]);
  const [flightData, setFlightData] = useState({
    booking_for: selectedEmployeesValues,
    accomendation_type: "",
    hotel_checkin_date: "",
    hotel_checkout_date: "",
    travel_type: "",
    travel_date: "",
    flight_from_city: "",
    flight_to_city: "",
    flight_preferred_time: "",
  });
  const handleFlightDataChange = (event) => {
    const { name, value } = event.target;
    setFlightData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios
        .get("/get_user_names")
        .then((res) => {
          const user = res.data.map((val) => ({
            value: val.ownerName,
            label: val.ownerName,
          }));
          return setUserNames(user);
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

    fetchData();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();

    // Create a new object with the form data
    const BookingForArray = selectedEmployeesValues.map((val) => val.value);
    const newData = {
      booking_for: BookingForArray,
      travel_type: flightData.travel_type,
      travel_date: flightData.travel_date,
      flight_from_city: flightData.flight_from_city,
      flight_to_city: flightData.flight_to_city,
      flight_preferred_time: flightData.flight_preferred_time,
      accomendation_type: flightData.accomendation_type,
      hotel_checkin_date: flightData.hotel_checkin_date,
      hotel_checkout_date: flightData.hotel_checkout_date,
    };
    // Update the getFlightTabledata state with the new data
    setGetFlightTabledata((prevData) => [...prevData, newData]);

    // Clear the form fields
    setSelectedEmployeesValues([]);
    setFlightData({
      travel_date: "",
      accomendation_type: "",
      hotel_checkin_date: "",
      hotel_checkout_date: "",
      flight_from_city: "",
      flight_to_city: "",
      flight_preferred_time: "",
      travel_type: "",
    });
  };

  const CustomStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "0",
    }),
  };
  useEffect(() => {
    async function getCountry() {
      setLoading(true);
      await axios
        .get("airport")
        .then((res) => {
          const citys = res.data.map((val) => ({
            value: val.city_name,
            label: val.city_name,
          }));
          return setCityData(citys);
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
    getCountry();
  }, []);

  const handleTravelChange = (event) => {
    const { name, value } = event.target;
    setTravel((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const inputEvent = (event) => {
    const { name, value } = event.target;
    setEmployee((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const test1 = [];
  const test2 = userNames.map((val) => test1.push(val.value));
  const defaultFlightUser = test1.indexOf("Akshay Thakur");

  function removeData(index) {
    setGetFlightTabledata((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  }

  const onSubmitButton = async (event) => {
    event.preventDefault();
    setLoading(true);
    const res = await axios
      .post("/raise_travel_request", {
        employee: {
          ...employee,
          project_id: employee?.billable === "Yes" ? employee?.project_id : "",
        },
        travel_request: getFlightTabledata,
        management_approval: "Pending",
      })
      .then(async (res) => {
        if (res.data.message === "Request Raised Successfully") {
          alert.success(res.data.message);
          setLoading(false);
          navigate("/alltravelrequest");
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          setLoading(false);
          navigate("/error_500");
        } else {
          setLoading(false);
          navigate("/error_403");
        }
      });
  };

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <Page_Header
                page_title="Travel Request Form"
                page_title_icon="mdi-book-plus"
                page_title_button=""
                page_title_button_link="/alltravelrequest"
              />

              {loading && (
                <div className="loader-container">
                  <div class="loader"></div>
                </div>
              )}

              <div className="row">
                <div class="col-lg-12 grid-margin stretch-card">
                  <div class="card">
                    <div class="card-body">
                      <form onSubmit={onSubmitButton} className="my-4">
                        <div className="row my-2">
                          <div className="col-12 col-lg-2">
                            <div className="form-group">
                              <label>Employee ID</label>
                              <input
                                className="form-control form-control-sm"
                                type="text"
                                name="emp_id"
                                value={LocalStorageData?.emp_id}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>Name</label>
                              <input
                                className="form-control form-control-sm"
                                type="text"
                                name="fullName"
                                value={LocalStorageData?.name}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>Email address</label>
                              <input
                                className="form-control form-control-sm"
                                type="email"
                                value={LocalStorageData?.email}
                                name="email"
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>Phone No</label>
                              <input
                                className="form-control form-control-sm"
                                type="phone"
                                value={LocalStorageData?.phone}
                                name="phone"
                                disabled
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row ">
                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>Billable</label>
                              <span className="astik"> *</span>
                              <select
                                className={classNames(
                                  "form-select form-control-sm"
                                  // {
                                  //   "is-invalid": errors?.billable,
                                  // }
                                )}
                                // {...register("billable", {
                                //   value: employee?.billable,
                                // })}
                                value={employee?.billable}
                                onChange={inputEvent}
                                name="billable"
                              >
                                <option value="">Select...</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                              {/* <small className="invalid-feedback">
                                {errors.billable?.message}
                              </small> */}
                            </div>
                          </div>
                          {employee?.billable === "Yes" && (
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>Project Id</label>
                                <span className="astik"> *</span>
                                <input
                                  type="text"
                                  name="project_id"
                                  className={classNames(
                                    "form-control form-control-sm"
                                    // {
                                    //   "is-invalid": errors?.project_id,
                                    // }
                                  )}
                                  // {...register("project_id", {
                                  //   value: employee?.project_id,
                                  // })}
                                  placeholder="Enter Project Id"
                                  value={employee?.project_id}
                                  onChange={inputEvent}
                                />
                                {/* <small className="invalid-feedback">
                                  {errors.project_id?.message}
                                </small> */}
                              </div>
                            </div>
                          )}
                          <div className="col-12 col-lg-6">
                            <div className="form-group">
                              <label>Reason for Travel</label>
                              <span className="astik"> *</span>
                              <textarea
                                name="reason_for_travel"
                                className={classNames(
                                  "form-control form-control-sm"
                                )}
                                onChange={inputEvent}
                                placeholder="Enter Reason for Travel"
                              />
                            </div>
                          </div>
                        </div>

                        <table className="table my-4 overflow-auto fs-6 table-bordered">
                          <thead>
                            <tr>
                              <th>Travel Date</th>
                              <th>Name(s)</th>
                              <th>Travel Type(s)</th>
                              <th>From City</th>
                              <th>To City</th>
                              <th>Preferred Time</th>
                              <th>Accomendation</th>
                              <th>Checkin Date</th>
                              <th>Checkout Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getFlightTabledata?.map((val, index) => {
                              return (
                                <tr>
                                  {/* <td>{index + 1}</td> */}
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
                                  <td>
                                    <td
                                      className="btn btn-outline-primary  btn-sm"
                                      type="button"
                                      onClick={() => {
                                        removeData(index);
                                      }}

                                      // onClick={() => {
                                      //   return (
                                      //     setViewRequestModal(true),
                                      //     setViewRequestData(val)
                                      //   );
                                      // }}
                                      // onClick={() => {
                                      //   return (
                                      //     // setModalData(val),
                                      //     setId(val._id),
                                      //     navigate(
                                      //       `/travelactionpage/${val._id}`
                                      //     )
                                      //   );
                                      // }}
                                    >
                                      Remove
                                    </td>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>

                        <div className="row ">
                          <div className="col-12">
                            <div className="col-12 col-lg-12">
                              <div className="form-group">
                                <label>Any Special Request?</label>
                                <textarea
                                  name="special_request"
                                  row={10}
                                  value={employee?.special_request}
                                  className="form-select form-control-sm"
                                  onChange={inputEvent}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                          <button
                            type="submit"
                            className="btn  btn-gradient-success me-2"
                          >
                            Submit
                          </button>
                        </div>
                      </form>

                      <h4 className="text-secondary">Add Requests:</h4>

                      <form
                        // type="submit"
                        onSubmit={handleAdd}
                        className="p-4 border"
                      >
                        <div className="row g-3 m-auto">
                          <div className="col-12 col-lg-3">
                            <div className="">
                              <label>Booking For:</label>
                              <span className="astik"> *</span>

                              <Select
                                defaultValue={[userNames[defaultFlightUser]]}
                                className={classNames(
                                  "form-select-select"
                                  // {

                                  //   "is-invalid": errors?.flight_from_city,
                                  // }
                                )}
                                // styles={CustomSty  les}
                                required
                                isMulti
                                isClearable={true}
                                name="booking_for"
                                options={userNames}
                                // value={selectedEmployeesValues}
                                classNamePrefix="select"
                                // onChange={handleFlightDataChange}
                                onChange={(selectedOptions) => {
                                  // const values = selectedOptions.map(
                                  //   (option) => option.value
                                  // );
                                  setSelectedEmployeesValues(selectedOptions);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 col-12">
                            <div className="">
                              <label>Travel Type:</label>
                              <span className="astik"> *</span>
                              <select
                                // required
                                name="travel_type"
                                id=""
                                value={flightData?.travel_type}
                                className="form-control form-control-sm"
                                onChange={handleFlightDataChange}
                              >
                                <option value="" selected>
                                  Select
                                </option>
                                <option value="Flight">Flight</option>
                                <option value="Train">Train</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-12 col-lg-3">
                            <div className="">
                              <label>Date</label>
                              <span className="astik"> *</span>
                              <input
                                // required
                                type="date"
                                value={flightData?.travel_date}
                                name="travel_date"
                                className="form-control form-control-sm"
                                onChange={handleFlightDataChange}
                              />

                              {/* <small className="invalid-feedback">
                                      {errors.flight_from_city?.message}
                                    </small> */}
                            </div>
                          </div>
                          <div className="col-12 col-lg-3">
                            <div className="">
                              <label>From(City)</label>
                              <span className="astik"> *</span>
                              <Select
                                className={classNames(
                                  "form-select-select"
                                  // {

                                  //   "is-invalid": errors?.flight_from_city,
                                  // }
                                )}
                                // required
                                styles={CustomStyles}
                                isClearable={true}
                                name="flight_from_city"
                                options={cityData}
                                defaultValue={[cityData[0]]}
                                // value={flightData?.flight_from_city}
                                // onChange={handleFlightDataChange}
                                onChange={(e) => {
                                  return setFlightData({
                                    ...flightData,
                                    flight_from_city: e ? e.value : "",
                                  });
                                }}
                              />
                              {/* <small className="invalid-feedback">
                                      {errors.flight_from_city?.message}
                                    </small> */}
                            </div>
                          </div>

                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>To(City)</label>
                              <span className="astik"> *</span>
                              <Select
                                className={classNames(
                                  "form-select-select"
                                  // {
                                  //   "is-invalid": errors?.flight_to_city,
                                  // }
                                )}
                                // required
                                styles={CustomStyles}
                                // value={flightData?.flight_to_city}
                                isClearable={true}
                                name="flight_to_city"
                                options={cityData}
                                // onChange={handleFlightDataChange}
                                defaultValue={[cityData[0]]}
                                onChange={(e) => {
                                  return setFlightData({
                                    ...flightData,
                                    flight_to_city: e ? e.value : "",
                                  });
                                }}
                              />
                              {/* <small className="invalid-feedback">
                                      {errors.flight_to_city?.message}
                                    </small> */}
                            </div>
                          </div>
                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>Preferred Time</label>
                              <select
                                value={flightData?.flight_preferred_time}
                                name="flight_preferred_time"
                                className="form-select form-control-sm"
                                onChange={handleFlightDataChange}

                                // onChange={(e) => {
                                //   setFlight({
                                //     ...flight,
                                //     flight_preferred_time: e.target.value,
                                //   });
                                // }}
                                // value={flight?.flight_preferred_time}
                              >
                                <option value="">Select...</option>
                                <option value="00:00 : 06:00">
                                  00:00 : 06:00
                                </option>
                                <option value="06:00 : 12:00">
                                  06:00 : 12:00
                                </option>
                                <option value="12:00 : 18:00">
                                  12:00 : 18:00
                                </option>
                                <option value="18:00 : 24:00">
                                  18:00 : 24:00
                                </option>
                              </select>
                            </div>
                          </div>

                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>Accomendation Type</label>
                              <select
                                // required
                                value={flightData?.accomendation_type}
                                name="accomendation_type"
                                className="form-select form-control-sm"
                                onChange={handleFlightDataChange}
                              >
                                <option value="">Select...</option>
                                <option value="AM" selected>
                                  Not Required
                                </option>
                                <option value="Hotel">Hotel</option>
                              </select>
                            </div>
                          </div>
                          {flightData?.accomendation_type === "Hotel" && (
                            <>
                              <div className="col-12 col-lg-3">
                                <div className="">
                                  <label>Checkin Date</label>
                                  <span className="astik"> *</span>
                                  <input
                                    type="date"
                                    value={flightData?.hotel_checkin_date}
                                    name="hotel_checkin_date"
                                    className="form-control form-control-sm"
                                    onChange={handleFlightDataChange}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-lg-3">
                                <div className="">
                                  <label>Checkout Date</label>
                                  <span className="astik"> *</span>
                                  <input
                                    type="date"
                                    value={flightData?.hotel_checkout_date}
                                    name="hotel_checkout_date"
                                    className="form-control form-control-sm"
                                    onChange={handleFlightDataChange}
                                  />
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                          <button
                            className="btn btn-sm btn-primary"
                            // onClick={handleAdd}
                            type="submit"
                          >
                            Add
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelRequestForm;
