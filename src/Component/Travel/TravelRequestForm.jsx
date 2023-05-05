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
    type: false,
  });
  const [train, setTrain] = useState({
    type: false,
    train_name: "",
    train_number: "",
    departure_time: "",
    arrival_time: "",
    class: "",
  });
  const [hotel, setHotel] = useState({
    type: false,
    hotel_name: "",
    check_in_date: "",
    check_out_date: "",
    room_type: "",
    special_requirements: "",
  });
  const [other, setOther] = useState({
    type: false,
  });
  useEffect(() => {
    async function getCountry() {
      await axios.get("airport").then((res) => {
        const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
          type: "region",
        });
        return (
          setCountryData(res.data),
          res.data?.map((item) => {
            return (
              !countryName.includes(
                regionNamesInEnglish.of(`${item.country_code}`)
              ) &&
              countryName.push(regionNamesInEnglish.of(`${item.country_code}`))
            );
          })
        );
      });
    }
    getCountry();
  }, []);
  const handleSubmit = (event) => {
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

  console.log(newOptions);

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
              {/* <div className="d-flex my-3 align-items-center justify-content-center justify-content-lg-end">
                {/* <NavLink to="/alltravelrequest">
                  <button className="btn btn-primary align-center">
                    Your Travel Requests
                  </button>
                </NavLink> 

                <NavLink to="/travelrequestreceived">
                  <button className="btn btn-primary align-center">
                    Received Requests for Approvals
                  </button>
                </NavLink>
              </div> */}

              {loading && (
                <div className="loader-container">
                  <div class="loader"></div>
                </div>
              )}

              <div className="row">
                <div class="col-lg-12 grid-margin stretch-card">
                  <div class="card">
                    <div class="card-body">
                      <form onSubmit={handleSubmit}>
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
                                required
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
                                required
                              />
                            </div>
                          </div>
                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>Project Id</label>
                              <input
                                className="form-control form-control-sm"
                                type="project_id"
                                value={LocalStorageData?.project_id}
                                name="project_id"
                              />
                            </div>
                          </div>
                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>Billable</label>
                              <select
                                className="form-control form-control-sm"
                                // value={formData?.billable}
                                // onChange={handleChange}
                                name="billable"
                              >
                                <option selected>Select</option>
                                <option value="yes">YES</option>
                                <option value="no">NO</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="row my-2">
                          <div className="col-12 col-lg-6">
                            <div className="form-group">
                              <label>Reason for Travel</label>
                              <textarea className="form-control " />
                            </div>
                          </div>
                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>Trip Type</label>
                              <select
                                className="form-control form-control-sm"
                                name="trip_type"
                                onChange={(e) => {
                                  setTravel({
                                    ...travel,
                                    trip_type: e.target.value,
                                  });
                                }}
                              >
                                <option selected>Select</option>
                                <option value="international">
                                  International
                                </option>
                                <option value="national" selected>
                                  National
                                </option>
                              </select>
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
                                  type="checkbox"
                                  class="form-check-input"
                                  onChange={(event) =>
                                    setFlight((prev) => ({
                                      ...prev,
                                      type: event.target.checked,
                                    }))
                                  }
                                  checked={flight?.type}
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
                                      type: event.target.checked,
                                    }))
                                  }
                                  checked={hotel?.type}
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
                                      type: event.target.checked,
                                    }))
                                  }
                                  checked={train?.type}
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
                                      type: event.target.checked,
                                    }))
                                  }
                                  checked={other?.type}
                                />
                                Other Transports <i class="input-helper"></i>
                              </label>
                            </div>
                          </div>
                        </div>
                        {flight?.type && (
                          <div className="form-group row">
                            <div className="d-flex flex-row align-items-center mb-3">
                              <i className="mdi mdi-airplane icon-md text-secondary"></i>
                              <p className="mb-0 ms-1">Flight Informations</p>
                            </div>
                            {/* {travel?.trip_type === "international" && (
                              <div className="col-12 col-lg-3">
                                <div className="form-group">
                                  <label>From(Country)</label>
                                  <select
                                    className="form-control form-control-sm"
                                    value={travel?.from_country}
                                  >
                                    <option selected>Select</option>
                                    {countryName
                                      .sort()
                                      ?.map((country, index) => {
                                        return (
                                          <option value={country} key={index}>
                                            {country}
                                          </option>
                                        );
                                      })}
                                  </select>
                                </div>
                              </div>
                            )} */}

                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>From(City)</label>
                                <Select options={newOptions} />

                                {/* <select className="form-control form-control-sm">
                                  <option selected>Select</option>
                                  {countryData.sort()?.map((country, index) => {
                                    return (
                                      <option
                                        value={country?.city_name}
                                        key={index}
                                      >
                                        {country?.city_name}
                                      </option>
                                    );
                                  })}
                                </select> */}
                              </div>
                            </div>
                            {/* {travel?.trip_type === "international" && (
                              <div className="col-12 col-lg-3">
                                <div className="form-group">
                                  <label>To(Country)</label>
                                  <select className="form-control form-control-sm">
                                    <option selected>Select</option>
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                  </select>
                                </div>
                              </div>
                            )} */}
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>To(City)</label>
                                <Select options={newOptions} />

                                {/* <select className="form-control form-control-sm">
                                  <option selected>Select</option>
                                  <option value="AM">AM</option>
                                  <option value="PM">PM</option>
                                </select> */}
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>Preferred Time</label>
                                <select className="form-control form-control-sm">
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
                                <select className="form-control form-control-sm">
                                  <option value="">Select Class</option>
                                  <option value="economy">Economy</option>
                                  <option value="business">Business</option>
                                  <option value="first">First</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                        {hotel?.type && (
                          <div className="form-group row">
                            <div className="d-flex flex-row align-items-center mb-3">
                              <i className="mdi mdi-hotel icon-md text-secondary"></i>
                              <p className="mb-0 ms-1">Hotel Informations</p>
                            </div>

                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>City</label>
                                <Select
                                  className="from-control"
                                  options={newOptions}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>Check-in</label>
                                <input
                                  className="form-control form-control-sm"
                                  type="date"
                                />
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>Check-out</label>
                                <input
                                  className="form-control form-control-sm"
                                  type="date"
                                />
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label htmlFor="arrival_time">Rooms </label>
                                <select className="form-control form-control-sm">
                                  <option selected>Select</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                        {train?.type && (
                          <div className="form-group row">
                            <div className="d-flex flex-row align-items-center mb-3">
                              <i className="mdi mdi-train icon-md text-secondary"></i>
                              <p className="mb-0 ms-1">Train Informations</p>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>From(City Name)</label>
                                <Select options={newOptions} />
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>To(City Name)</label>
                                <Select options={newOptions} />
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>Preferred Time</label>
                                <select className="form-control form-control-sm">
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
                                <select className="form-control form-control-sm">
                                  <option value="">Select Class</option>
                                  <option value="1">1A - 1st Class AC</option>
                                  <option value="2">2A - 2 Tier AC</option>
                                  <option value="3">3A - 3 Tier AC</option>
                                  <option value="4">
                                    3E - AC three tier(economy)
                                  </option>
                                  <option value="5">Executive Chair Car</option>
                                  <option value="6">AC Chair Car</option>
                                  <option value="7">SL - Sleeper</option>
                                  <option value="8">2S - Second Sitting</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                        {other?.type && (
                          <div className="form-group row">
                            <div className="d-flex flex-row align-items-center mb-3">
                              <i className="mdi mdi-car icon-md text-secondary"></i>
                              <p className="mb-0 ms-1">
                                Other Transport Informations
                              </p>
                            </div>

                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>From(City Name)</label>
                                <input
                                  className="form-control form-control-sm"
                                  type="text"
                                />
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>To(City Name)</label>
                                <input
                                  className="form-control form-control-sm"
                                  type="text"
                                />
                              </div>
                            </div>
                            <div className="col-12 col-lg-3">
                              <div className="form-group">
                                <label>Preferred Time</label>
                                <select className="form-control form-control-sm">
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
                                <select className="form-control form-control-sm">
                                  <option value="">Select Class</option>
                                  <option value="bus">Bus(Volvo)</option>
                                  <option value="personal_vehical">
                                    Personal Vehical
                                  </option>
                                  <option value="rental_vehical">
                                    Rental Vehical(cab)
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                        <button
                          variant="primary"
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
