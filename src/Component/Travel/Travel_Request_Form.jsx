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

// testing
const TravelRequestForm = () => {
  const navigate = useNavigate();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const alert = useAlert();
  let [loading, setLoading] = useState(false);
  let [cityData, setCityData] = useState([]);
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
  });
  const [travel, setTravel] = useState([]);
  const [flight, setFlight] = useState({
    flight_travel: false,
  });
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

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(travel_request_form_validation),
  });
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

  const onSubmitButton = async (event) => {
    setLoading(true);
    const res = await axios
      .post("/raise_travel_request", {
        employee: {
          ...employee,
          project_id: employee?.billable === "Yes" ? employee?.project_id : "",
        },
        travel,
        flight,
        train,
        hotel,
        other,
        managers_approval: "Pending",
        reporting_manager: LocalStorageData?.reporting_manager,
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
                page_title_button="Back"
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
                      <form onSubmit={handleSubmit(onSubmitButton)}>
                        <div className="row my-2">
                          <div className="col-12 col-lg-4">
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
                          <div className="col-12 col-lg-4">
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
                          <div className="col-12 col-lg-4">
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

                        <div className="row my-2">
                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>Travel Start Date</label>
                              <span className="astik"> *</span>
                              <input
                                className={classNames(
                                  "form-control form-control-sm",
                                  {
                                    "is-invalid": errors?.start_date,
                                  }
                                )}
                                {...register("start_date", {
                                  value: travel?.start_date,
                                })}
                                type="date"
                                name="start_date"
                                value={travel?.start_date}
                                min={new Date()?.toISOString()?.split("T")[0]}
                                onChange={handleTravelChange}
                              />
                              <small className="invalid-feedback">
                                {errors.start_date?.message}
                              </small>
                            </div>
                          </div>
                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>Travel End Date</label>
                              <span className="astik"> *</span>
                              <input
                                className={classNames(
                                  "form-control form-control-sm",
                                  {
                                    "is-invalid": errors?.end_date,
                                  }
                                )}
                                {...register("end_date", {
                                  value: travel?.end_date,
                                })}
                                type="date"
                                name="end_date"
                                value={travel?.end_date}
                                min={new Date()?.toISOString()?.split("T")[0]}
                                onChange={handleTravelChange}
                              />
                              <small className="invalid-feedback">
                                {errors.end_date?.message}
                              </small>
                            </div>
                          </div>

                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>Billable</label>
                              <span className="astik"> *</span>
                              <select
                                className={classNames(
                                  "form-select form-control-sm",
                                  {
                                    "is-invalid": errors?.billable,
                                  }
                                )}
                                {...register("billable", {
                                  value: employee?.billable,
                                })}
                                value={employee?.billable}
                                onChange={inputEvent}
                                name="billable"
                              >
                                <option value="">Select...</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                              <small className="invalid-feedback">
                                {errors.billable?.message}
                              </small>
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
                                    "form-control form-control-sm",
                                    {
                                      "is-invalid": errors?.project_id,
                                    }
                                  )}
                                  {...register("project_id", {
                                    value: employee?.project_id,
                                  })}
                                  placeholder="Enter Project Id"
                                  value={employee?.project_id}
                                  onChange={inputEvent}
                                />
                                <small className="invalid-feedback">
                                  {errors.project_id?.message}
                                </small>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="row my-2">
                          <div className="col-12">
                            <div className="form-group">
                              <label>Reason for Travel</label>
                              <span className="astik"> *</span>
                              <textarea
                                name="reason_for_travel"
                                className={classNames(
                                  "form-control form-control-sm",
                                  {
                                    "is-invalid": errors?.reason_for_travel,
                                  }
                                )}
                                {...register("reason_for_travel", {
                                  value: travel?.reason_for_travel,
                                })}
                                onChange={handleTravelChange}
                                placeholder="Enter Reason for Travel"
                                rows={4}
                              />
                              <small className="invalid-feedback">
                                {errors.reason_for_travel?.message}
                              </small>
                            </div>
                          </div>
                        </div>

                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">
                            Travel Type
                          </label>

                          <div className="col-sm-2">
                            <div className="form-check">
                              <label class="form-check-label">
                                <input
                                  name="flight_travel"
                                  type="checkbox"
                                  className={classNames(
                                    "form-control form-control-sm",
                                    {
                                      "is-invalid": errors?.flight_travel,
                                    }
                                  )}
                                  {...register("flight_travel", {
                                    value: flight?.flight_travel,
                                  })}
                                  onChange={(event) =>
                                    setFlight({
                                      ...flight,
                                      flight_travel: event.target.checked,
                                    })
                                  }
                                  checked={flight?.flight_travel}
                                />
                                Flight <i class="input-helper"></i>
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-2">
                            <div className="form-check">
                              <label class="form-check-label">
                                <input
                                  name="hotel_travel"
                                  type="checkbox"
                                  class="form-check-input"
                                  className={classNames(
                                    "form-control form-control-sm",
                                    {
                                      "is-invalid": errors?.hotel_travel,
                                    }
                                  )}
                                  {...register("hotel_travel", {
                                    value: hotel?.hotel_travel,
                                  })}
                                  onChange={(event) =>
                                    setHotel({
                                      ...hotel,
                                      hotel_travel: event.target.checked,
                                    })
                                  }
                                  checked={hotel?.hotel_travel}
                                />
                                Hotel <i class="input-helper"></i>
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-2">
                            <div className="form-check">
                              <label class="form-check-label">
                                <input
                                  name="train_travel"
                                  type="checkbox"
                                  class="form-check-input"
                                  className={classNames(
                                    "form-control form-control-sm",
                                    {
                                      "is-invalid": errors?.train_travel,
                                    }
                                  )}
                                  {...register("train_travel", {
                                    value: train?.train_travel,
                                  })}
                                  onChange={(event) =>
                                    setTrain({
                                      ...train,
                                      train_travel: event.target.checked,
                                    })
                                  }
                                  checked={train?.train_travel}
                                />
                                Train <i class="input-helper"></i>
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-2">
                            <div className="form-check">
                              <label class="form-check-label">
                                <input
                                  name="other_travel"
                                  type="checkbox"
                                  class="form-check-input"
                                  className={classNames(
                                    "form-control form-control-sm",
                                    {
                                      "is-invalid": errors?.other_travel,
                                    }
                                  )}
                                  {...register("other_travel", {
                                    value: other?.other_travel,
                                  })}
                                  onChange={(event) =>
                                    setOther({
                                      ...other,
                                      other_travel: event.target.checked,
                                    })
                                  }
                                  checked={other?.type}
                                />
                                Other <i class="input-helper"></i>
                              </label>
                            </div>
                          </div>
                        </div>
                        {flight?.flight_travel && (
                          <div className="form-group row">
                            <div className="d-flex flex-row align-items-center mb-3">
                              <i className="mdi mdi-airplane icon-md text-secondary"></i>
                              <p className="mb-0 ms-1">Flight Informations</p>
                            </div>

                            <div className="col-12 col-lg-3">
                              <div className="">
                                <label>From(City)</label>
                                <span className="astik"> *</span>
                                <Select
                                  className={classNames("form-select-select", {
                                    "is-invalid": errors?.flight_from_city,
                                  })}
                                  styles={CustomStyles}
                                  isClearable={true}
                                  name="flight_from_city"
                                  options={cityData}
                                  onChange={(e) => {
                                    return (
                                      setFlight({
                                        ...flight,
                                        flight_from_city: e ? e.value : "",
                                      }),
                                      setValue(
                                        "flight_from_city",
                                        e ? e.value : ""
                                      )
                                    );
                                  }}
                                />
                                <small className="invalid-feedback">
                                  {errors.flight_from_city?.message}
                                </small>
                              </div>
                            </div>

                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>To(City)</label>
                                <span className="astik"> *</span>
                                <Select
                                  className={classNames("form-select-select", {
                                    "is-invalid": errors?.flight_to_city,
                                  })}
                                  styles={CustomStyles}
                                  isClearable={true}
                                  name="flight_to_city"
                                  options={cityData}
                                  onChange={(e) => {
                                    return (
                                      setFlight({
                                        ...flight,
                                        flight_to_city: e ? e.value : "",
                                      }),
                                      setValue(
                                        "flight_to_city",
                                        e ? e.value : ""
                                      )
                                    );
                                  }}
                                />
                                <small className="invalid-feedback">
                                  {errors.flight_to_city?.message}
                                </small>
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>Preferred Time</label>
                                <select
                                  name="flight_preferred_time"
                                  className="form-select form-control-sm"
                                  onChange={(e) => {
                                    setFlight({
                                      ...flight,
                                      flight_preferred_time: e.target.value,
                                    });
                                  }}
                                  value={flight?.flight_preferred_time}
                                >
                                  <option value="">Select...</option>
                                  <option value="AM">AM</option>
                                  <option value="PM">PM</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label htmlFor="arrival_time">
                                  Class of Travel
                                </label>
                                <select
                                  name="flight_class_preferred"
                                  className="form-select form-control-sm"
                                  onChange={(e) => {
                                    setFlight({
                                      ...flight,
                                      flight_class_preferred: e.target.value,
                                    });
                                  }}
                                  value={flight?.flight_class_preferred}
                                >
                                  <option value="">Select...</option>
                                  <option value="economy">Economy</option>
                                  <option value="business">Business</option>
                                  {/* <option value="first">First</option> */}
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                        {hotel?.hotel_travel && (
                          <div className="form-group row">
                            <div className="d-flex flex-row align-items-center mb-3">
                              <i className="mdi mdi-hotel icon-md text-secondary"></i>
                              <p className="mb-0 ms-1">Hotel Informations</p>
                            </div>

                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>City</label>
                                <span className="astik"> *</span>
                                <Select
                                  className={classNames("form-select-select", {
                                    "is-invalid": errors?.hotel_city,
                                  })}
                                  styles={CustomStyles}
                                  isClearable={true}
                                  name="hotel_city"
                                  options={cityData}
                                  onChange={(e) => {
                                    return (
                                      setHotel({
                                        ...hotel,
                                        hotel_city: e ? e.value : "",
                                      }),
                                      setValue("hotel_city", e ? e.value : "")
                                    );
                                  }}
                                />
                                <small className="invalid-feedback">
                                  {errors.hotel_city?.message}
                                </small>
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>Check-in</label>
                                <span className="astik"> *</span>
                                <input
                                  name="hotel_checkin"
                                  value={hotel?.hotel_checkin}
                                  className={classNames(
                                    "form-control form-control-sm",
                                    {
                                      "is-invalid": errors?.hotel_checkin,
                                    }
                                  )}
                                  {...register("hotel_checkin", {
                                    value: hotel?.hotel_checkin,
                                  })}
                                  type="date"
                                  onChange={(e) => {
                                    setHotel({
                                      ...hotel,
                                      hotel_checkin: e.target.value,
                                    });
                                  }}
                                  min={new Date()?.toISOString()?.split("T")[0]}
                                />
                                <small className="invalid-feedback">
                                  {errors.hotel_checkin?.message}
                                </small>
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>Check-out</label>
                                <span className="astik"> *</span>
                                <input
                                  name="hotel_checkout"
                                  value={hotel?.hotel_checkout}
                                  className={classNames(
                                    "form-control form-control-sm",
                                    {
                                      "is-invalid": errors?.hotel_checkout,
                                    }
                                  )}
                                  {...register("hotel_checkout", {
                                    value: hotel?.hotel_checkout,
                                  })}
                                  type="date"
                                  onChange={(e) => {
                                    setHotel({
                                      ...hotel,
                                      hotel_checkout: e.target.value,
                                    });
                                  }}
                                  min={new Date()?.toISOString()?.split("T")[0]}
                                />
                                <small className="invalid-feedback">
                                  {errors.hotel_checkout?.message}
                                </small>
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label htmlFor="arrival_time">Rooms </label>
                                <select
                                  name="hotel_number_of_rooms"
                                  value={hotel?.hotel_number_of_rooms}
                                  className="form-select form-control-sm"
                                  onChange={(e) => {
                                    setHotel((prevCountry) => ({
                                      ...prevCountry, // Copying the previous state
                                      hotel_number_of_rooms: e.target.value, // Updating the value of 'b'
                                    }));
                                  }}
                                >
                                  <option value="">Select</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                        {train?.train_travel && (
                          <div className="form-group row">
                            <div className="d-flex flex-row align-items-center mb-3">
                              <i className="mdi mdi-train icon-md text-secondary"></i>
                              <p className="mb-0 ms-1">Train Informations</p>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>From(City Name)</label>
                                <span className="astik"> *</span>
                                <Select
                                  className={classNames("form-select-select", {
                                    "is-invalid": errors?.train_from_city,
                                  })}
                                  styles={CustomStyles}
                                  isClearable={true}
                                  name="train_from_city"
                                  options={cityData}
                                  onChange={(e) => {
                                    return (
                                      setTrain({
                                        ...train,
                                        train_from_city: e ? e.value : "",
                                      }),
                                      setValue(
                                        "train_from_city",
                                        e ? e.value : ""
                                      )
                                    );
                                  }}
                                />
                                <small className="invalid-feedback">
                                  {errors.train_from_city?.message}
                                </small>
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>To(City Name)</label>
                                <span className="astik"> *</span>
                                <Select
                                  className={classNames("form-select-select", {
                                    "is-invalid": errors?.train_to_city,
                                  })}
                                  styles={CustomStyles}
                                  isClearable={true}
                                  name="train_to_city"
                                  options={cityData}
                                  onChange={(e) => {
                                    return (
                                      setTrain({
                                        ...train,
                                        train_to_city: e ? e.value : "",
                                      }),
                                      setValue(
                                        "train_to_city",
                                        e ? e.value : ""
                                      )
                                    );
                                  }}
                                />
                                <small className="invalid-feedback">
                                  {errors.train_to_city?.message}
                                </small>
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>Preferred Time</label>
                                <select
                                  name="train_preferred_time"
                                  value={train?.train_preferred_time}
                                  className="form-select form-control-sm"
                                  onChange={(e) => {
                                    setTrain((prevCountry) => ({
                                      ...prevCountry, // Copying the previous state
                                      train_preferred_time: e.target.value, // Updating the value of 'b'
                                    }));
                                  }}
                                >
                                  <option value="">Select...</option>
                                  <option value="AM">AM</option>
                                  <option value="PM">PM</option>
                                </select>
                              </div>
                            </div>

                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label htmlFor="arrival_time">
                                  Class of Travel
                                </label>
                                <select
                                  name="train_class_preferred"
                                  onChange={(e) => {
                                    setTrain((prevCountry) => ({
                                      ...prevCountry, // Copying the previous state
                                      train_class_preferred: e.target.value, // Updating the value of 'b'
                                    }));
                                  }}
                                  className="form-select form-control-sm"
                                >
                                  <option value="">Select...</option>
                                  <option value="1A - 1st Class AC">
                                    1A - 1st Class AC
                                  </option>
                                  <option value="2A - 2 Tier AC">
                                    2A - 2 Tier AC
                                  </option>
                                  <option value="3A - 3 Tier AC">
                                    3A - 3 Tier AC
                                  </option>
                                  <option value="SL - Sleeper">
                                    SL - Sleeper
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                        {other?.other_travel && (
                          <div className="form-group row">
                            <div className="d-flex flex-row align-items-center mb-3">
                              <i className="mdi mdi-car icon-md text-secondary"></i>
                              <p className="mb-0 ms-1">Others</p>
                            </div>

                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>Type</label>
                                <span className="astik"> *</span>
                                <input
                                  type="text"
                                  name="other_travel_type"
                                  className={classNames(
                                    "form-control form-control-sm",
                                    {
                                      "is-invalid": errors?.other_travel_type,
                                    }
                                  )}
                                  {...register("other_travel_type", {
                                    value: other?.other_travel_type,
                                  })}
                                  placeholder="Enter Travel type"
                                  value={other?.other_travel_type}
                                  onChange={(e) => {
                                    setOther({
                                      ...other,
                                      other_travel_type: e.target.value,
                                    });
                                  }}
                                />
                                <small className="invalid-feedback">
                                  {errors.other_travel_type?.message}
                                </small>
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>From(City Name)</label>
                                <span className="astik"> *</span>
                                <Select
                                  className={classNames("form-select-select", {
                                    "is-invalid": errors?.other_from_city,
                                  })}
                                  styles={CustomStyles}
                                  isClearable={true}
                                  name="other_from_city"
                                  options={cityData}
                                  onChange={(e) => {
                                    return (
                                      setOther({
                                        ...other,
                                        other_from_city: e ? e.value : "",
                                      }),
                                      setValue(
                                        "other_from_city",
                                        e ? e.value : ""
                                      )
                                    );
                                  }}
                                />
                                <small className="invalid-feedback">
                                  {errors.other_from_city?.message}
                                </small>
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>To(City Name)</label>
                                <span className="astik"> *</span>
                                <Select
                                  className={classNames("form-select-select", {
                                    "is-invalid": errors?.other_to_city,
                                  })}
                                  styles={CustomStyles}
                                  isClearable={true}
                                  name="other_to_city"
                                  options={cityData}
                                  onChange={(e) => {
                                    return (
                                      setOther({
                                        ...other,
                                        other_to_city: e ? e.value : "",
                                      }),
                                      setValue(
                                        "other_to_city",
                                        e ? e.value : ""
                                      )
                                    );
                                  }}
                                />
                                <small className="invalid-feedback">
                                  {errors.other_to_city?.message}
                                </small>
                              </div>
                            </div>
                          </div>
                        )}
                        <button
                          type="submit"
                          className="btn btn-sm btn-gradient-success me-2"
                        >
                          Submit
                        </button>
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
