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
import { RiDeleteBin6Line, RiAddFill } from "react-icons/ri";
// testing

// =====================Data=============
const projectId = [
  "ACE12345",
  "ACE67890",
  "ACE24680",
  "ACE13579",
  "WWNI9876",
  "WWNI5432",
  "MAMR2468",
  "MAMR1357",
];
const clientId = ["ACENET", "WADHWANI", "MASTER MARINE"];
const travelMode = ["Flight", "Train", "Intercity Cab"];

// =====================Data End=============
const TravelRequestForm = () => {
  const navigate = useNavigate();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const alert = useAlert();
  let [loading, setLoading] = useState(false);
  let [allData, setAllData] = useState([]);
  let [cityData, setCityData] = useState([]);
  const [employeeId, setEmployeeId] = useState(LocalStorageData?.emp_id);
  const [getEmployeeDataById, setEmployeeDataById] = useState([]);
  const [error, setError] = useState(false);
  const [travellersData, setTravellersData] = useState([]);
  const [travellerRowId, setTravellerRowId] = useState("");
  const [numberValue, setNumberValue] = useState("");

  // ================================================================================================================

  function formatBirthdate(birthdate) {
    var parts = birthdate.split("/");
    var formattedDate = new Date(parts[2], parts[1] - 1, parts[0])
      .toISOString()
      .split("T")[0];

    return formattedDate;
  }

  useEffect(() => {
    const fetchEmployeeData = async () => {
      const res = await axios
        .get(`/get_employee_details_for_travel/${employeeId}`)
        .then((res) => {
          return (
            console.log("cwew", res?.data.length),
            setTravellersData([
              ...travellersData,
              {
                // id: 4,
                data: {
                  is_employee: "Yes",
                  emp_id: res?.data[0]?.["Employee ID"],
                  name: res?.data[0]?.ownerName,
                  gender: res?.data[0]?.Tags,
                  phone: res?.data[0]?.["Personal Mobile Number"],
                  email: res?.data[0]?.["Email address"],
                  dob: formatBirthdate(res?.data[0]?.["Date of Birth"]),
                },
              },
            ])
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
    };
    fetchEmployeeData();
  }, [employeeId]);
  console.log("travellersDatatravellersData", travellersData);
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

  // ==========For Top Level Details==============
  const [basicDetails, setBasicDetails] = useState({
    billable: "",
    client_id: "",
    project_id: "",
    reason_for_travel: "",
    special_request: "",
  });
  // ================For Travel Details===========
  const [travel, setTravel] = useState({
    travel_mode: "",
    travel_from_city: "",
    travel_to_city: "",
    departure: "",
    return: "",
  });

  const [travelType, setTravelType] = useState({
    one_way: true,
    round_trip: false,
    // multi_city: false,
  });

  const handleTravelTypeChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;

    // Set the selected radio button to true and others to false
    setTravelType({
      ...travelType,
      [name]: checked,
      one_way: name === "one_way" ? checked : false,
      round_trip: name === "round_trip" ? checked : false,
      // multi_city: name === "multi_city" ? checked : false,
    });
  };

  //
  //
  //
  //
  // ========For Travel Request========
  console.log("dataraatatatat", allData);
  const [rows, setRows] = useState([{ data: "" }]);

  const handleAddRow = () => {
    const newRow = { id: rows.length + 1, data: {} };
    setRows([...rows, newRow]);
  };

  const handleDataChange = (id, newData) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, data: newData } : row
    );
    setRows(updatedRows);
  };
  //
  //
  //
  //
  //
  // ==========For Travellers======

  const handleAddTraveller = () => {
    const newRow = {
      id: travellersData.length + 1,
      data: { is_employee: "Yes" },
    };
    setTravellersData([...travellersData, newRow]);
    setTravellerRowId(travellersData.length);
  };
  // { ...row.data, is_employee: "Yes", newData }

  const handleTravellerChange = async (id, newData) => {
    const updatedTraveller = travellersData.map((row) =>
      row.id === id ? { ...row, data: newData } : row
    );
    setTravellersData(updatedTraveller);
    // Fetch data from the API based on emp_id
    if (newData.emp_id) {
      try {
        const response = await axios.get(
          `/get_employee_details_for_travel/${newData.emp_id}`
        );

        const apiData = response.data;
        // Update the corresponding row with the retrieved data
        const updatedRow = {
          id: id,
          data: {
            ...newData,
            is_employee: "Yes",
            name: apiData[0]["ownerName"],
            gender: apiData[0].Tags,
            phone: apiData[0]["Personal Mobile Number"],
            email: apiData[0]["Email address"],
            dob: formatBirthdate(apiData[0]["Date of Birth"]),
          },
        };

        const updatedRows = travellersData.map((row) =>
          row.id === id ? updatedRow : row
        );
        setTravellersData(updatedRows);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    } else {
      const updatedTraveller = travellersData.map((row) =>
        row.id === id ? { ...row, data: newData } : row
      );
      setTravellersData(updatedTraveller);
      // Fetch data from the API based on emp_
    }
  };

  const handleTravellerDeleteRow = (id) => {
    const updatedRows = travellersData.filter((row) => row.id !== id);
    setTravellersData(updatedRows);
  };

  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };
  //
  //
  //
  //
  //
  //
  // ================For Accomendation================
  const [accommodationData, setAccommodationData] = useState([
    { id: 1, data: {} },
  ]);

  const handleAddAccommodation = () => {
    const newRow = { id: accommodationData.length + 1, data: {} };
    setAccommodationData([...accommodationData, newRow]);
  };

  const handleAccommodationChange = (id, newData) => {
    const updatedAccommodation = accommodationData.map((row) =>
      row.id === id ? { ...row, data: { ...row.data, ...newData } } : row
    );
    setAccommodationData(updatedAccommodation);
  };

  const handleAccommodationDeleteRow = (id) => {
    const updatedRows = accommodationData.filter((row) => row.id !== id);
    setAccommodationData(updatedRows);
  };
  //
  //
  //
  //
  //
  //

  // ==================For Rooms=====================
  const [roomsData, setRoomsData] = useState([
    { id: 1, data: { is_employee: "Yes" } },
  ]);

  const handleAddRoom = () => {
    const newRow = { id: roomsData.length + 1, data: { is_employee: "Yes" } };
    setRoomsData([...roomsData, newRow]);
  };

  const handleRoomChange = async (id, newData) => {
    const updatedRooms = roomsData.map((row) =>
      row.id === id ? { ...row, data: newData } : row
    );
    setRoomsData(updatedRooms);

    // Fetch data from the API based on emp_id
    if (newData.emp_id.length > 0) {
      try {
        const response = await axios.get(
          `/get_employee_details_for_travel/${newData.emp_id}`
        );

        const apiData = response.data;
        // Update the corresponding row with the retrieved data
        const updatedRow = {
          id: id,
          data: {
            ...newData,
            is_employee: "Yes",

            name: apiData[0]["ownerName"],
            gender: apiData[0]["Tags"],
            phone: apiData[0]["Personal Mobile Number"],
            email: apiData[0]["Email address"],
            dob: formatBirthdate(apiData[0]["Date of Birth"]),
          },
        };

        const updatedRows = roomsData.map((row) =>
          row.id === id ? updatedRow : row
        );
        setRoomsData(updatedRows);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    } else {
      const updatedRooms = roomsData.map((row) =>
        row.id === id ? { ...row, data: newData } : row
      );
      setTravellersData(updatedRooms);
    }
  };

  const handleRoomDeleteRow = (id) => {
    const updatedRows = roomsData.filter((row) => row.id !== id);
    setRoomsData(updatedRows);
  };

  const inputEvent = (event) => {
    const { name, value } = event.target;
    setBasicDetails((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  // ================================================================================================================
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("all_travel_request_data", {
      basicDetails,
      rows,
      travellersData,
      accommodationData,
      roomsData,
      management_approval: "Pending",
      created_by: LocalStorageData?.email,
    });
    if (res?.data === "Created") {
      alert.success("Request Sent");
      navigate("/alltravelrequest");
    }
  };

  const data = accommodationData?.data?.number_of_rooms;
  const renderOptions = (numberOfRooms) => {
    const options = [];
    for (let i = 1; i <= numberOfRooms; i++) {
      options.push(
        <option key={i} value={`Room ${i}`}>
          R-{i}
        </option>
      );
    }
    return options;
  };

  // =========Current Date==========
  function getCurrentDate() {
    const today = new Date();
    let month = String(today.getMonth() + 1);
    let day = String(today.getDate());
    const year = String(today.getFullYear());

    // Add leading zeros if month or day is a single digit
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }

    return `${year}-${month}-${day}`;
  }

  // =====================filtering city data =============

  console.log("citydata", cityData);
  function filterObjectByLabel(cityData, data) {
    return cityData.filter((item) => item.value !== data);
  }

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
                      <form action="" onSubmit={handleFormSubmit}>
                        <div className="row">
                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>Billable</label>
                              <span className="astik"> *</span>
                              <select
                                required
                                class="form-select form-select-sm"
                                id="exampleFormControlSelect2"
                                value={basicDetails?.billable}
                                onChange={inputEvent}
                                name="billable"
                              >
                                <option value="">Select...</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>Client Id</label>
                              <span className="astik"> *</span>
                              <select
                                required
                                class="form-select form-select-sm"
                                value={basicDetails?.client_id}
                                onChange={inputEvent}
                                name="client_id"
                              >
                                <option value="" disabled>
                                  Select
                                </option>
                                {clientId.map((pid) => {
                                  return <option value={pid}>{pid}</option>;
                                })}{" "}
                              </select>
                              {/* <small className="invalid-feedback">
                                  {errors.project_id?.message}
                                </small> */}
                            </div>
                          </div>
                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>Project Id</label>
                              <span className="astik"> *</span>
                              <select
                                required
                                class="form-select form-select-sm"
                                // className={classNames(
                                //   "form-select "
                                //   // {
                                //   //   "is-invalid": errors?.billable,
                                //   // }
                                // )}
                                // {...register("billable", {
                                //   value: employee?.billable,
                                // })}
                                value={setBasicDetails?.project_id}
                                onChange={inputEvent}
                                name="project_id"
                              >
                                <option value="" selected disabled>
                                  Select
                                </option>
                                {projectId.map((pid) => {
                                  return <option value={pid}>{pid}</option>;
                                })}{" "}
                              </select>
                              {/* <small className="invalid-feedback">
                                  {errors.project_id?.message}
                                </small> */}
                            </div>
                          </div>
                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>Reason for Travel</label>
                              <span className="astik"> *</span>
                              <select
                                required
                                name="reason_for_travel"
                                class="form-select form-select-sm"
                                onChange={inputEvent}
                                placeholder="Enter Reason for Travel"
                              >
                                <option value="Reason 1">Reason1</option>
                                <option value="Reason 2">Reason2</option>
                                <option value="Reason 3">Reason3</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* ===================================Travel============================ */}
                        <hr />
                        <div className="">
                          <div className="d-flex justify-content-between  ">
                            <h5 className="text-primary">Travel</h5>{" "}
                            <p
                              className="btn-sm btn  mx-2 btn-primary "
                              type="btn"
                              onClick={handleAddRow}
                            >
                              <RiAddFill />
                            </p>
                          </div>
                          {/* ===========Radio Box======= */}
                          <div className="row my-2">
                            <div className="col-12 col-lg-6">
                              <div className="row">
                                <div className="col-12 col-lg-4">
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      <input
                                        type="radio"
                                        className="form-check-input form-control-sm"
                                        name="one_way"
                                        checked={travelType.one_way}
                                        onChange={handleTravelTypeChange}
                                      />
                                      One-Way <i className="input-helper"></i>
                                    </label>
                                  </div>
                                </div>
                                <div className="col-12 col-lg-4">
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      <input
                                        type="radio"
                                        className="form-check-input form-control-sm"
                                        name="round_trip"
                                        checked={travelType.round_trip}
                                        onChange={handleTravelTypeChange}
                                      />
                                      Round <i className="input-helper"></i>
                                    </label>
                                  </div>
                                </div>
                                {/* <div className="col-12 col-lg-4">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input
                                      type="radio"
                                      className="form-check-input form-control-sm"
                                      name="multi_city"
                                      checked={travelType.multi_city}
                                      onChange={handleTravelTypeChange}
                                    />
                                    Multi-Way <i className="input-helper"></i>
                                  </label>
                                </div>
                              </div> */}
                              </div>
                            </div>
                          </div>
                        </div>

                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Mode</th>
                              <th>From (City)</th>
                              <th>To (City)</th>
                              <th>Departure</th>
                              <th>Return</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((row) => (
                              <tr key={row.id}>
                                <td>
                                  <select
                                    required
                                    className="form-control form-control-sm"
                                    value={row.data.travel_mode}
                                    onChange={(e) =>
                                      handleDataChange(row.id, {
                                        ...row.data,
                                        travel_mode: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="" selected disabled>
                                      Select
                                    </option>
                                    {travelMode.map((mode) => (
                                      <option value={mode} key={mode}>
                                        {mode}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                                <td>
                                  <Select
                                    required
                                    isClearable={true}
                                    name="flight_from_city"
                                    options={cityData}
                                    // defaultValue={[cityData[0]]}
                                    value={row.data.travel_from_city}
                                    onChange={(selectedOption) =>
                                      handleDataChange(row.id, {
                                        ...row.data,
                                        travel_from_city: selectedOption,
                                      })
                                    }
                                  />
                                </td>
                                <td>
                                  <Select
                                    className="form-select-select"
                                    isClearable={true}
                                    name="flight_to_city"
                                    required
                                    options={filterObjectByLabel(
                                      cityData,
                                      row.data.travel_from_city?.label
                                    )}
                                    // defaultValue={[cityData[0]]}
                                    value={row?.data?.travel_to_city}
                                    onChange={(selectedOption) =>
                                      handleDataChange(row.id, {
                                        ...row.data,
                                        travel_to_city: selectedOption,
                                      })
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="date"
                                    required
                                    min={getCurrentDate()}
                                    name="departure"
                                    className="form-control form-control-sm"
                                    onChange={(e) =>
                                      handleDataChange(row.id, {
                                        ...row.data,
                                        departure: e.target.value,
                                      })
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="date"
                                    required
                                    min={row?.data?.departure}
                                    value={row.data.return}
                                    name="return"
                                    className="form-control form-control-sm"
                                    onChange={(e) =>
                                      handleDataChange(row.id, {
                                        ...row.data,
                                        return: e.target.value,
                                      })
                                    }
                                    disabled={
                                      travelType.round_trip ? false : true
                                    }
                                  />
                                </td>
                                <td>
                                  <button
                                    className="btn btn-danger btn-sm "
                                    onClick={() => handleDeleteRow(row.id)}
                                  >
                                    <RiDeleteBin6Line />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {/* <button
                          className="btn btn-primary btn-sm"
                          onClick={handleAddRow}
                        >
                          <RiAddFill />
                        </button> */}
                        {/* ===============================Travellers==================== */}
                        <hr />
                        <div className="d-flex justify-content-between ">
                          <h5 className="text-primary">Travellers</h5>{" "}
                          <p
                            className="btn-sm btn mx-2 btn-primary "
                            type="btn"
                            onClick={handleAddTraveller}
                          >
                            <RiAddFill />
                          </p>
                        </div>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Employee</th>
                              <th>Emp ID</th>
                              <th>Full Name</th>
                              <th>Gender</th>
                              <th>Phone</th>
                              <th>Email</th>
                              <th>DOB</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {travellersData.map((traveller) => (
                              <tr key={traveller.id}>
                                <td>
                                  <select
                                    required
                                    type="text"
                                    name="is_employee"
                                    className="form-control form-control-sm"
                                    value={traveller?.data?.is_employee}
                                    onChange={(e) =>
                                      handleTravellerChange(traveller.id, {
                                        ...traveller?.data,
                                        is_employee: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="" selected disabled>
                                      Select
                                    </option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                  </select>
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    required
                                    disabled={
                                      traveller?.data?.is_employee === "Yes"
                                        ? false
                                        : true
                                    }
                                    name="emp_id"
                                    className="form-control form-control-sm"
                                    value={traveller?.data?.emp_id}
                                    onChange={(e) =>
                                      handleTravellerChange(traveller.id, {
                                        ...traveller?.data,
                                        emp_id: e.target.value,
                                      })
                                    }
                                  />
                                </td>
                                <td>
                                  {/* <select
                                  name="name"
                                  id=""
                                  onChange={(e) =>
                                    handleTravellerChange(traveller.id, {
                                      name: e.target.value,
                                    })
                                  }
                                  className="form-control form-control-sm"
                                >
                                  {employeeId.map((item) => {
                                    return (
                                      <option val={item.value}>
                                        {item.value}
                                      </option>
                                    );
                                  })}
                                </select> */}

                                  <input
                                    required
                                    type="text"
                                    value={traveller?.data?.name}
                                    name="name"
                                    className="form-control form-control-sm"
                                    disabled={
                                      traveller?.data?.is_employee === "Yes"
                                        ? true
                                        : false
                                    }
                                    onChange={(e) =>
                                      handleTravellerChange(traveller.id, {
                                        ...traveller.data,

                                        name: e.target.value,
                                      })
                                    }
                                  />
                                </td>
                                <td>
                                  {traveller?.data?.is_employee === "Yes" ? (
                                    <input
                                      // required
                                      type="text"
                                      disabled={
                                        traveller?.data?.is_employee === "Yes"
                                          ? true
                                          : false
                                      }
                                      value={traveller?.data?.gender}
                                      name="gender"
                                      className="form-control form-control-sm"
                                      onChange={(e) =>
                                        handleTravellerChange(traveller.id, {
                                          ...traveller?.data,
                                          gender: e.target.value,
                                        })
                                      }
                                    />
                                  ) : (
                                    <select
                                      className="form-select form-control-sm"
                                      onChange={(e) =>
                                        handleTravellerChange(traveller.id, {
                                          ...traveller?.data,
                                          gender: e.target.value,
                                        })
                                      }
                                    >
                                      <option value="" selected disabled>
                                        Select...
                                      </option>
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                    </select>
                                  )}
                                </td>
                                <td>
                                  <input
                                    required
                                    type="number"
                                    pattern="\d*"
                                    // maxlength="10"
                                    disabled={
                                      traveller?.data?.is_employee === "Yes"
                                        ? true
                                        : false
                                    }
                                    value={traveller?.data?.phone}
                                    name="phone"
                                    className="form-control form-control-sm"
                                    onChange={(e) => {
                                      let { value } = e.target;

                                      // Limit the number of digits to 6
                                      if (value.length > 10) {
                                        value = value.slice(0, 10);
                                      }

                                      handleTravellerChange(traveller.id, {
                                        ...traveller?.data,

                                        phone: value,
                                      });
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    required
                                    type="email"
                                    disabled={
                                      traveller?.data?.is_employee === "Yes"
                                        ? true
                                        : false
                                    }
                                    value={traveller?.data?.email}
                                    name="email"
                                    className="form-control form-control-sm"
                                    onChange={(e) =>
                                      handleTravellerChange(traveller.id, {
                                        ...traveller?.data,

                                        email: e.target.value,
                                      })
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    required
                                    type="date"
                                    disabled={
                                      traveller?.data?.is_employee === "Yes"
                                        ? true
                                        : false
                                    }
                                    value={traveller?.data?.dob}
                                    name="dob"
                                    className="form-control form-control-sm"
                                    onChange={(e) =>
                                      handleTravellerChange(traveller.id, {
                                        ...traveller?.data,

                                        dob: e.target.value,
                                      })
                                    }
                                  />
                                </td>
                                <td>
                                  <button
                                    disabled={
                                      travellersData?.length > 1 ? false : true
                                    }
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                      handleTravellerDeleteRow(traveller.id)
                                    }
                                  >
                                    <RiDeleteBin6Line />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {/* <button
                          className="btn btn-primary btn-sm"
                          onClick={handleAddTraveller}
                        >
                          <RiAddFill />
                        </button> */}

                        {/* ===============================Accomendation====================== */}
                        <hr />
                        <div className="d-flex justify-content-between  ">
                          <h5 className="text-primary">Accommodation </h5>{" "}
                          <p
                            className="btn-sm btn mx-2 btn-primary "
                            type="btn"
                            onClick={handleAddAccommodation}
                          >
                            <RiAddFill />
                          </p>
                        </div>

                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>City</th>
                              <th>Check-in</th>
                              <th>Check-out</th>
                              <th>Breakfast Required</th>
                              <th>Rooms Required</th>
                            </tr>
                          </thead>
                          <tbody>
                            {accommodationData.map((accommodation) => (
                              <tr key={accommodation.id}>
                                <td>
                                  <Select
                                    required
                                    isClearable={true}
                                    name="city"
                                    options={cityData}
                                    value={accommodationData?.data?.city}
                                    onChange={(selectedOption) =>
                                      handleAccommodationChange(
                                        accommodation.id,
                                        {
                                          ...accommodation.data,
                                          city: selectedOption,
                                        }
                                      )
                                    }
                                  />
                                  {/* <input
                                  type="text"
                                  value={accommodation.data.city}
                                  name="city"
                                  className="form-control form-control-sm"
                                  onChange={(e) =>
                                    // handleAccommodationChange(
                                    //   accommodation.id,
                                    //   {
                                    //     city: e.target.value,
                                      }
                                    )
                                  }
                                /> */}
                                </td>
                                <td>
                                  <input
                                    type="date"
                                    required
                                    min={getCurrentDate()}
                                    value={accommodation.data.checkIn}
                                    name="checkIn"
                                    className="form-control form-control-sm"
                                    onChange={(e) =>
                                      handleAccommodationChange(
                                        accommodation.id,
                                        {
                                          checkIn: e.target.value,
                                        }
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="date"
                                    required
                                    value={accommodation.data.checkOut}
                                    name="checkOut"
                                    min={accommodation.data.checkIn}
                                    className="form-control form-control-sm"
                                    onChange={(e) =>
                                      handleAccommodationChange(
                                        accommodation.id,
                                        {
                                          checkOut: e.target.value,
                                        }
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  <select
                                    name="breakfastRequired"
                                    className="form-control form-control-sm"
                                    value={accommodation.data.breakfastRequired}
                                    onChange={(e) =>
                                      handleAccommodationChange(
                                        accommodation.id,
                                        {
                                          breakfastRequired: e.target.value,
                                        }
                                      )
                                    }
                                  >
                                    <option value="" selected disabled>
                                      Select
                                    </option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                  </select>
                                </td>
                                <td>
                                  <button
                                    class="btn btn-primary btn-sm dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    Rooms:
                                    {accommodation.data.number_of_rooms} |
                                    Adults :{" "}
                                    {accommodation.data.number_of_adults}|
                                    Children:{" "}
                                    {accommodation.data.number_of_children}
                                  </button>

                                  <div class="dropdown-menu form-floating">
                                    <div class="form-floating">
                                      <input
                                        type="number"
                                        max="99"
                                        class="form-control form-control-sm h-25"
                                        id="floatingInput"
                                        name="number_of_rooms"
                                        value={
                                          accommodation?.data?.number_of_rooms
                                        }
                                        placeholder="name@example.com"
                                        onChange={(e) => {
                                          let { value } = e.target;

                                          // Remove leading zeros
                                          value = value.replace(/^0+/, "");

                                          // Limit the number of digits to 2
                                          if (value.length > 2) {
                                            value = value.slice(0, 2);
                                          }

                                          // Validate the value to be less than 99

                                          handleAccommodationChange(
                                            accommodation.id,
                                            {
                                              number_of_rooms: value,
                                            }
                                          );
                                        }}
                                      />

                                      <label for="floatingInput">Rooms</label>
                                    </div>
                                    <div class="form-floating">
                                      <input
                                        type="number"
                                        max={99}
                                        name="number_of_adults"
                                        class="form-control  form-control-sm h-25"
                                        id="floatingInput"
                                        placeholder="Password"
                                        value={
                                          accommodation?.data?.number_of_adults
                                        }
                                        onChange={(e) => {
                                          let { value } = e.target;

                                          // Remove leading zeros
                                          value = value.replace(/^0+/, "");

                                          // Limit the number of digits to 2
                                          if (value.length > 2) {
                                            value = value.slice(0, 2);
                                          }
                                          handleAccommodationChange(
                                            accommodation.id,
                                            {
                                              number_of_adults: value,
                                            }
                                          );
                                        }}
                                      />
                                      <label for="floatingPassword">
                                        Adults
                                      </label>
                                    </div>
                                    <div class="form-floating">
                                      <input
                                        type="number"
                                        class="form-control  form-control-sm h-25"
                                        id="floatingInput"
                                        name="number_of_children"
                                        value={
                                          accommodation?.data
                                            ?.number_of_children
                                        }
                                        placeholder="No. of Children"
                                        onChange={(e) => {
                                          let { value } = e.target;

                                          // Remove leading zeros
                                          value = value.replace(/^0+/, "");

                                          // Limit the number of digits to 2
                                          if (value.length > 2) {
                                            value = value.slice(0, 2);
                                          }
                                          handleAccommodationChange(
                                            accommodation.id,
                                            {
                                              number_of_children: value,
                                            }
                                          );
                                        }}
                                      />
                                      <label for="floatingPassword">
                                        Children
                                      </label>
                                    </div>
                                  </div>
                                </td>

                                <td>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                      handleAccommodationDeleteRow(
                                        accommodation.id
                                      )
                                    }
                                  >
                                    <RiDeleteBin6Line />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {/* <button
                          className="btn btn-primary btn-sm"
                          onClick={handleAddAccommodation}
                        >
                          <RiAddFill />
                        </button> */}

                        {/* ===============================Occupancy=================================== */}
                        <hr />
                        <div className="d-flex justify-content-between">
                          <h5 className="text-primary">Occupancy</h5>{" "}
                          <p
                            className="btn-sm btn mx-2 btn-primary "
                            type="btn"
                            onClick={handleAddRoom}
                          >
                            <RiAddFill />
                          </p>
                        </div>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Employee</th>
                              <th>Room</th>
                              <th>Emp ID</th>
                              <th>Name</th>
                              <th>Gender</th>
                              <th>Phone</th>
                              <th>Email</th>
                              <th>DOB</th>
                            </tr>
                          </thead>
                          <tbody>
                            {roomsData.map((room) => (
                              <tr key={room.id}>
                                <td>
                                  <select
                                    required
                                    type="text"
                                    value={room?.data?.is_employee}
                                    name="is_employee"
                                    className="form-control form-control-sm"
                                    onChange={(e) =>
                                      handleRoomChange(room.id, {
                                        is_employee: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="Yes" selected>
                                      Yes
                                    </option>
                                    <option value="No">No</option>
                                  </select>
                                </td>
                                <td>
                                  <select
                                    className="form-control form-control-sm"
                                    name="room"
                                    id=""
                                    onChange={(e) =>
                                      handleRoomChange(room.id, {
                                        ...room.data,
                                        room: e.target.value,
                                      })
                                    }
                                  >
                                    {renderOptions(
                                      accommodationData[0]?.data
                                        ?.number_of_rooms
                                    )}
                                  </select>
                                </td>
                                <td>
                                  <input
                                    required
                                    type="text"
                                    disabled={
                                      room?.data?.is_employee === "Yes"
                                        ? false
                                        : true
                                    }
                                    value={room.data.emp_id}
                                    name="emp_id"
                                    className="form-control form-control-sm"
                                    onChange={(e) =>
                                      handleRoomChange(room.id, {
                                        ...room.data,
                                        emp_id: e.target.value,
                                      })
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    required
                                    disabled={
                                      room?.data?.is_employee === "Yes"
                                        ? true
                                        : false
                                    }
                                    value={room?.data?.name}
                                    name="name"
                                    className="form-control form-control-sm"
                                    onChange={(e) =>
                                      handleRoomChange(room.id, {
                                        ...room.data,
                                        name: e.target.value,
                                      })
                                    }
                                  />
                                </td>
                                <td>
                                  {room?.data?.is_employee === "Yes" ? (
                                    <input
                                      type="text"
                                      required
                                      disabled={
                                        room?.data?.is_employee === "Yes"
                                          ? true
                                          : false
                                      }
                                      value={room?.data?.gender}
                                      name="gender"
                                      className="form-control form-control-sm"
                                      onChange={(e) =>
                                        handleRoomChange(room.id, {
                                          ...room.data,
                                          gender: e.target.value,
                                        })
                                      }
                                    />
                                  ) : (
                                    <select
                                      className="form-select form-control-sm"
                                      onChange={(e) =>
                                        handleRoomChange(room.id, {
                                          ...room.data,
                                          gender: e.target.value,
                                        })
                                      }
                                      value={room?.data?.gender}
                                    >
                                      <option value="" selected disabled>
                                        Select...
                                      </option>
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                    </select>
                                  )}
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    required
                                    disabled={
                                      room?.data?.is_employee === "Yes"
                                        ? true
                                        : false
                                    }
                                    value={room?.data?.phone}
                                    name="phone"
                                    className="form-control form-control-sm"
                                    onChange={(e) => {
                                      let { value } = e.target;

                                      // Limit the number of digits to 6
                                      if (value.length > 10) {
                                        value = value.slice(0, 10);
                                      }
                                      handleRoomChange(room.id, {
                                        ...room.data,
                                        phone: value,
                                      });
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="email"
                                    required
                                    disabled={
                                      room?.data?.is_employee === "Yes"
                                        ? true
                                        : false
                                    }
                                    value={room?.data?.email}
                                    name="email"
                                    className="form-control form-control-sm"
                                    onChange={(e) =>
                                      handleRoomChange(room.id, {
                                        ...room?.data,
                                        email: e.target.value,
                                      })
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="date"
                                    required
                                    disabled={
                                      room?.data?.is_employee === "Yes"
                                        ? true
                                        : false
                                    }
                                    value={room?.data?.dob}
                                    name="dob"
                                    className="form-control form-control-sm"
                                    onChange={(e) =>
                                      handleRoomChange(room.id, {
                                        ...room.data,
                                        dob: e.target.value,
                                      })
                                    }
                                  />
                                </td>
                                <td>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleRoomDeleteRow(room.id)}
                                  >
                                    <RiDeleteBin6Line />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {/* <button
                          className="btn btn-primary btn-sm"
                          onClick={handleAddRoom}
                        >
                          <RiAddFill />
                        </button> */}
                        <div className="d-flex flex-column justify-content-start my-3">
                          <label>Special Request:</label>
                          <textarea
                            name="special_request"
                            className="form-control form-control-sm"
                            placeholder="Seat preferenc, Food Preference...... "
                            onChange={inputEvent}
                          />
                        </div>
                        <div className="row my-4 text-center">
                          <div className="col-12">
                            <button
                              type="submit"
                              className="btn btn-primary btn-sm"
                            >
                              Submit
                            </button>
                          </div>
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
