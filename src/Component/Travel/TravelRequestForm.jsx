import React, { useState } from "react";
import Navbar from "../../Partials/Navbar";
import Sidebar from "../../Partials/Sidebar";
import Page_Header from "../../Partials/Page_Header";
import { useAlert } from "react-alert";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import countries from "i18n-iso-countries";
import Select from "react-select";
import { travel_request_form_validation } from "../../Utils/Validation_Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import classNames from "classnames";

const TravelRequestForm = () => {
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const alert = useAlert();
  let [loading, setLoading] = useState(false);
  let [countryData, setCountryData] = useState([]);
  let [countryName, setCountryName] = useState([]);
  const [employee, setEmployee] = useState({
    name: LocalStorageData?.name,
    email: LocalStorageData?.email,
    employee_id: LocalStorageData?.emp_id,
    billable: "",
    project_id: "",
    reason_for_travel: "",
  });
  const [travel, setTravel] = useState({
    start_date: "",
    end_date: "",
    destination: "",
    purpose: "",
    trip_type: "national",
    from_country: "India",
  });
  const [flight, setFlight] = useState({
    travel_flight: false,
    flight_from_city: "",
    flight_to_city: "",
    flight_preferred_time: "",
    flight_class_preferred: "",
  });
  const [train, setTrain] = useState({
    travel_train: false,
    train_from_city: "",
    train_to_city: "",
    train_preferred_time: "",
    train_class_preferred: "",
  });
  const [hotel, setHotel] = useState({
    travel_hotel: false,
    hotel_city: "",
    hotel_checkin: "",
    hotel_checkout: "",
    hotel_number_of_rooms: "",
  });
  const [other, setOther] = useState({
    travel_other: false,
    name_of_travel: "",
    from_location: "",
    to_location: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(travel_request_form_validation),
  });
  useEffect(() => {
    async function getCountry() {
      await axios.get("airport").then((res) => {
        return setCountryData(res.data);
      });
    }
    getCountry();
  }, []);

  const onSubmitButton = (event) => {
    event.preventDefault();
    // submit data to MongoDB
    console.log({
      employee,
      travel,
      train,
      hotel,
    });
  };
  const [options, setOptions] = useState([
    {
      value: "",
      label: "",
    },
  ]);
  const cities = countryData.map((item) => item.city_name);

  const newOptions = cities.map((city, index) => {
    const optionIndex = index % options.length;
    return {
      value: city,
      label: city,
    };
  });

  const inputEvent = (event) => {
    const { name, value } = event.target;
    setEmployee((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const post_request = async () => {
    const response = await axios.post("/raise_travel_request");
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
                              <input
                                className="form-control form-control-sm"
                                type="date"
                                name="start_date"
                                // value={start_date}
                                // onChange={handleChange}
                                // required
                              />
                            </div>
                          </div>
                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>Travel End Date</label>
                              <input
                                className="form-control form-control-sm"
                                type="date"
                                name="end_date"
                                // value={end_date}
                                // onChange={handleChange}
                                // required
                              />
                            </div>
                          </div>
                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>Project Id</label>
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
                                value={employee?.project_id}
                                onChange={inputEvent}
                              />
                              <small className="invalid-feedback">
                                {errors.project_id?.message}
                              </small>
                            </div>
                          </div>
                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>Billable</label>
                              <select
                                className={classNames(
                                  "form-control form-control-sm",
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
                                <option value="">Select</option>
                                <option value="yes">YES</option>
                                <option value="no">NO</option>
                              </select>
                              <small className="invalid-feedbackfsfsfff">
                                {errors?.billable?.message}
                              </small>
                            </div>
                          </div>
                        </div>

                        <div className="row my-2">
                          <div className="col-12 col-lg-6">
                            <div className="form-group">
                              <label>Reason for Travel</label>
                              <textarea
                                name="reason_for_travel"
                                className="form-control "
                              />
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
                                  name="travel_flight"
                                  type="checkbox"
                                  onChange={(event) =>
                                    setFlight((prev) => ({
                                      ...prev,
                                      travel_flight: event.target.checked,
                                      flight_from_city: event.target.checked
                                        ? "Delhi"
                                        : "",
                                      flight_to_city: event.target.checked
                                        ? "Pune"
                                        : "",
                                      flight_preferred_time: event.target
                                        .checked
                                        ? "AM"
                                        : "",
                                      flight_class_preferred: event.target
                                        .checked
                                        ? "economy"
                                        : "",
                                    }))
                                  }
                                  checked={flight?.travel_flight}
                                />
                                Flight <i class="input-helper"></i>
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-2">
                            <div className="form-check">
                              <label class="form-check-label">
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                  onChange={(event) =>
                                    setHotel((prev) => ({
                                      ...prev,
                                      travel_hotel: event.target.checked,
                                      hotel_city: event.target.checked
                                        ? "Delhi"
                                        : "",
                                      hotel_checkin: event.target.checked
                                        ? new Date().toLocaleDateString("en-CA")
                                        : "",
                                      hotel_checkout: event.target.checked
                                        ? new Date().toLocaleDateString("en-CA")
                                        : "",

                                      hotel_number_of_rooms: event.target
                                        .checked
                                        ? "2"
                                        : "",
                                    }))
                                  }
                                  checked={hotel?.travel_hotel}
                                />
                                Hotel <i class="input-helper"></i>
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-2">
                            <div className="form-check">
                              <label class="form-check-label">
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                  onChange={(event) =>
                                    setTrain((prev) => ({
                                      ...prev,
                                      travel_train: event.target.checked,
                                      train_from_city: event.target.checked
                                        ? "Delhi"
                                        : "",
                                      train_to_city: event.target.checked
                                        ? "Pune"
                                        : "",
                                      train_preferred_time: event.target.checked
                                        ? "AM"
                                        : "",
                                      train_class_preferred: event.target
                                        .checked
                                        ? "1A - 1st Class AC"
                                        : "",
                                    }))
                                  }
                                  checked={train?.travel_train}
                                />
                                Train <i class="input-helper"></i>
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-2">
                            <div className="form-check">
                              <label class="form-check-label">
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                  onChange={(event) =>
                                    setOther((prev) => ({
                                      ...prev,
                                      travel_other: event.target.checked,
                                      name_of_travel: event.target.checked
                                        ? "Cab"
                                        : "",
                                      to_location: event.target.checked
                                        ? "Delhi"
                                        : "",
                                      from_location: event.target.checked
                                        ? "Pune"
                                        : "",
                                    }))
                                  }
                                  checked={other?.type}
                                />
                                Other <i class="input-helper"></i>
                              </label>
                            </div>
                          </div>
                        </div>
                        {flight?.travel_flight && (
                          <div className="form-group row">
                            <div className="d-flex flex-row align-items-center mb-3">
                              <i className="mdi mdi-airplane icon-md text-secondary"></i>
                              <p className="mb-0 ms-1">Flight Informations</p>
                            </div>

                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>From(City)</label>
                                <Select
                                  escapeClearsValue={true}
                                  defaultInputValue={flight?.flight_from_city}
                                  name="flight_from_city"
                                  options={newOptions}
                                  onChange={(e) => {
                                    setFlight((prevCountry) => ({
                                      ...prevCountry, // Copying the previous state
                                      flight_from_city: e.value, // Updating the value of 'b'
                                    }));
                                  }}
                                />
                              </div>
                            </div>

                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>To(City)</label>
                                <Select
                                  escapeClearsValue={true}
                                  defaultInputValue={flight?.flight_to_city}
                                  name="flight_to_city"
                                  options={newOptions}
                                  onChange={(e) => {
                                    setFlight((prevCountry) => ({
                                      ...prevCountry, // Copying the previous state
                                      flight_to_city: e.value, // Updating the value of 'b'
                                    }));
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>Preferred Time</label>
                                <select
                                  value={flight?.flight_preferred_time}
                                  onChange={(e) => {
                                    setFlight((prevCountry) => ({
                                      ...prevCountry, // Copying the previous state
                                      flight_preferred_time: e.target.value, // Updating the value of 'b'
                                    }));
                                  }}
                                  name="flight_preferred_time"
                                  className="form-control form-control-sm"
                                >
                                  <option selected>Select</option>
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
                                  className="form-control form-control-sm"
                                  value={flight?.flight_class_preferred}
                                  onChange={(e) => {
                                    setFlight((prevCountry) => ({
                                      ...prevCountry, // Copying the previous state
                                      flight_class_preferred: e.target.value, // Updating the value of 'b'
                                    }));
                                  }}
                                >
                                  <option value="">Select Class</option>
                                  <option value="economy">Economy</option>
                                  <option value="business">Business</option>
                                  {/* <option value="first">First</option> */}
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                        {hotel?.travel_hotel && (
                          <div className="form-group row">
                            <div className="d-flex flex-row align-items-center mb-3">
                              <i className="mdi mdi-hotel icon-md text-secondary"></i>
                              <p className="mb-0 ms-1">Hotel Informations</p>
                            </div>

                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>City</label>
                                <Select
                                  escapeClearsValue={true}
                                  defaultInputValue={hotel?.hotel_city}
                                  name="hote_city"
                                  options={newOptions}
                                  onChange={(e) => {
                                    setFlight((prevCountry) => ({
                                      ...prevCountry, // Copying the previous state
                                      hote_city: e.value, // Updating the value of 'b'
                                    }));
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>Check-in</label>
                                <input
                                  name="hotel_checkin"
                                  value={hotel?.hotel_checkin}
                                  onChange={(e) => {
                                    setHotel((prevCountry) => ({
                                      ...prevCountry, // Copying the previous state
                                      hotel_checkin: e.target.value, // Updating the value of 'b'
                                    }));
                                  }}
                                  className="form-control form-control-sm"
                                  type="date"
                                />
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>Check-out</label>
                                <input
                                  name="hotel_checkout"
                                  value={hotel?.hotel_checkout}
                                  className="form-control form-control-sm"
                                  type="date"
                                  onChange={(e) => {
                                    setHotel((prevCountry) => ({
                                      ...prevCountry, // Copying the previous state
                                      hotel_checkout: e.target.value, // Updating the value of 'b'
                                    }));
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label htmlFor="arrival_time">Rooms </label>
                                <select
                                  name="hotel_number_of_rooms"
                                  value={hotel?.hotel_number_of_rooms}
                                  className="form-control form-control-sm"
                                  onChange={(e) => {
                                    setHotel((prevCountry) => ({
                                      ...prevCountry, // Copying the previous state
                                      hotel_number_of_rooms: e.target.value, // Updating the value of 'b'
                                    }));
                                  }}
                                >
                                  <option selected>Select</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                        {train?.travel_train && (
                          <div className="form-group row">
                            <div className="d-flex flex-row align-items-center mb-3">
                              <i className="mdi mdi-train icon-md text-secondary"></i>
                              <p className="mb-0 ms-1">Train Informations</p>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>From(City Name)</label>
                                <Select
                                  options={newOptions}
                                  name="train_from_city"
                                  value={train?.train_from_city}
                                  onChange={(e) => {
                                    setTrain((prevCountry) => ({
                                      ...prevCountry, // Copying the previous state
                                      train_from_city: e.value, // Updating the value of 'b'
                                    }));
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>To(City Name)</label>
                                <Select
                                  defaultInputValue={train?.train_to_city}
                                  options={newOptions}
                                  name="train_to_city"
                                  value={train?.train_to_city}
                                  onChange={(e) => {
                                    setTrain((prevCountry) => ({
                                      ...prevCountry, // Copying the previous state
                                      train_to_city: e.value, // Updating the value of 'b'
                                    }));
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>Preferred Time</label>
                                <select
                                  name="train_preferred_time"
                                  value={train?.train_preferred_time}
                                  className="form-control form-control-sm"
                                  onChange={(e) => {
                                    setTrain((prevCountry) => ({
                                      ...prevCountry, // Copying the previous state
                                      train_preferred_time: e.target.value, // Updating the value of 'b'
                                    }));
                                  }}
                                >
                                  <option selected>Select</option>
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
                                  className="form-control form-control-sm"
                                >
                                  <option value="">Select Class</option>
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
                        {other?.travel_other && (
                          <div className="form-group row">
                            <div className="d-flex flex-row align-items-center mb-3">
                              <i className="mdi mdi-car icon-md text-secondary"></i>
                              <p className="mb-0 ms-1">Others</p>
                            </div>

                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>Type</label>
                                <input
                                  name="name_of_travel"
                                  value={other?.name_of_travel}
                                  onChange={(e) => {
                                    setOther((prevCountry) => ({
                                      ...prevCountry, // Copying the previous state
                                      name_of_travel: e.target.value, // Updating the value of 'b'
                                    }));
                                  }}
                                  className="form-control form-control-sm"
                                  type="text"
                                />
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>From(City Name)</label>
                                <Select
                                  escapeClearsValue={true}
                                  defaultInputValue={other?.from_location}
                                  name="from_location"
                                  options={newOptions}
                                  onChange={(e) => {
                                    setOther((prevCountry) => ({
                                      ...prevCountry, // Copying the previous state
                                      from_location: e.value, // Updating the value of 'b'
                                    }));
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>To(City Name)</label>
                                <Select
                                  escapeClearsValue={true}
                                  defaultInputValue={other?.to_location}
                                  name="to_location"
                                  options={newOptions}
                                  onChange={(e) => {
                                    setOther((prevCountry) => ({
                                      ...prevCountry, // Copying the previous state
                                      to_location: e.value, // Updating the value of 'b'
                                    }));
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        <button
                          // variant="primary"
                          // type="submit"
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
