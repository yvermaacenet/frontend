import React, { useState, forwardRef } from "react";
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
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
// testint

// =====================Data=============
const projectId = [
  "ACENET-12345",
  "ACENET-67890",
  "ACENET-24680",
  "ACENET-13579",
  "WADHWANI9876",
  "WADHWANI5432",
  "MASTER2468",
  "MASTER1357",
];
const clientId = ["ACENET", "WADHWANI", "MASTER MARINE"];

const travelMode = ["Flight", "Train", "Intercity Cab"];

// =====================Data End=============
const TravelRequestForm = () => {
  const navigate = useNavigate();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const alert = useAlert();
  let [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(travel_request_form_validation),
  });
  let [allData, setAllData] = useState([]);
  let [cityData, setCityData] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [getEmployeeDataById, setEmployeeDataById] = useState([]);
  const [error, setError] = useState(false);
  const [checkError, setCheckError] = useState(false);
  const [travellersData, setTravellersData] = useState([]);
  const [validateForBadicDetailsDataRow, setValidateForBadicDetailsDataRow] =
    useState({});
  const [validateForTravellersDataRow, setValidateForTravellersDataRow] =
    useState([]);
  const [validateForTravelDataRow, setValidateForTravelDataRow] = useState([]);
  const [validateForAccommodationDataRow, setValidateForAccommodationDataRow] =
    useState([]);
  const [validateForOccupancyDataRow, setValidateForOccupancyDataRow] =
    useState([]);
  const [travellerRowId, setTravellerRowId] = useState("");
  const [numberValue, setNumberValue] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [filteredProjectIds, setFilteredProjectIds] = useState([]);
  const [treavellerRadioButton, setTreavellerRadioButton] = useState(true);
  const [accommodationRadioButton, setAccommodationRadioButton] =
    useState(false);
  const [roomsData, setRoomsData] = useState([
    {
      id: 1,
      data: { is_employee: "Yes", dob: new Date() },
    },
  ]);
  const handleClientChange = (e) => {
    const selectedClient = e.target.value;
    setSelectedClientId(selectedClient);
    setBasicDetails({ ...basicDetails, client_id: selectedClient });
    const filteredProjects = projectId.filter((project) =>
      project.startsWith(selectedClient.slice(0, 3))
    );
    setFilteredProjectIds(filteredProjects);
  };
  // ================================================================================================================
  // ==========For Top Level Details==============
  const [basicDetails, setBasicDetails] = useState({
    billable: "",
    client_id: selectedClientId,
    project_id: "",
    reason_for_travel: "",
    special_request: "",
    booking_for: "self",
  });
  function formatBirthdate(birthdate) {
    var parts = birthdate.split("/");
    var formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];

    return formattedDate;
  }

  useEffect(() => {
    const fetchEmployeeData = async () => {
      const res = await axios
        .get(
          `/get_employee_details_for_travel/${
            basicDetails?.booking_for === "others"
              ? 0
              : LocalStorageData?.emp_id
          }`
        )
        .then((res) => {
          const resObj = {
            data: {
              is_employee: "Yes",
              emp_id: res.data.length > 0 ? res?.data[0]?.["Employee ID"] : "",
              name: res.data.length > 0 ? res?.data[0]?.ownerName : "",
              gender: res.data.length > 0 ? res?.data[0]?.Tags : "",
              phone:
                res.data.length > 0
                  ? res?.data[0]?.["Personal Mobile Number"]
                  : "",
              email: res.data.length > 0 ? res?.data[0]?.["Email address"] : "",
              dob:
                res.data.length > 0
                  ? formatBirthdate(res?.data[0]?.["Date of Birth"])
                  : "1990-01-01",
            },
          };
          return setTravellersData([resObj]), setRoomsData([resObj]);
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
  }, [employeeId, basicDetails?.booking_for, treavellerRadioButton]);
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

  // ================For Travel Details===========
  // const [travel, setTravel] = useState({
  //   travel_mode: "",
  //   travel_from_city: "",
  //   travel_to_city: "",
  //   departure: "",
  //   return: "",
  // });

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
  const [rows, setRows] = useState([{ id: 1, data: { trip_type: "OneWay" } }]);

  const handleAddRow = () => {
    const newRow = { id: rows.length + 1, data: { trip_type: "OneWay" } };
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

  const handleAddTraveller = (e) => {
    e.preventDefault();
    const newRow = {
      id: travellersData.length + 1,
      data: { is_employee: "Yes", dob: new Date() },
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
    // if(newData.is_employee)
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
    {
      id: 1,
      data: {
        number_of_rooms: 1,
        number_of_adults: 1,
        number_of_children: 0,
        // checkIn: "",
        // checkOut: "",
      },
    },
  ]);

  const handleAddAccommodation = () => {
    const newRow = {
      id: accommodationData.length + 1,
      data: { number_of_rooms: 1, number_of_adults: 1, number_of_children: 0 },
    };
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

  // roomsData.push({ id: 1, data: { is_employee: "Yes" } });

  // const handleAddRoom = () => {
  //   const newRow = {
  //     id: roomsData.length + 1,
  //     data: { is_employee: "Yes" },
  //   };
  //   setRoomsData([...roomsData, newRow]);
  // };

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
      setRoomsData(updatedRooms);
    }
  };

  // const handleRoomDeleteRow = (id) => {
  //   const updatedRows = roomsData.filter((row) => row.id !== id);
  //   setRoomsData(updatedRows);
  // };

  const inputEvent = (event) => {
    const { name, value } = event.target;
    setBasicDetails((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const validateError = (event) => {
    console.log("Event", event);
    let basicDetailsDataObj = {
      billable: basicDetails?.billable !== "" ? true : false,
      client_id: basicDetails?.client_id !== "" ? true : false,
      project_id: basicDetails?.project_id !== "" ? true : false,
      reason_for_travel: basicDetails?.reason_for_travel !== "" ? true : false,
    };

    setValidateForBadicDetailsDataRow(basicDetailsDataObj);
    let travellerDatalist = [];
    travellersData.map((item, index) => {
      travellerDatalist = [
        ...travellerDatalist,
        {
          data: {
            ...item.data,
            emp_id:
              (item.data.emp_id === undefined || item.data.emp_id === "") &&
              item.data?.is_employee === "Yes" &&
              treavellerRadioButton
                ? true
                : false,
            empIdPattern:
              basicDetails?.booking_for === "others"
                ? (item.data.emp_id === LocalStorageData?.emp_id) === true
                  ? true
                  : false
                : false,
            name:
              (item.data.name === undefined || item.data.name === "") &&
              item.data?.is_employee === "No" &&
              treavellerRadioButton
                ? true
                : false,
            namePattern:
              item.data?.is_employee === "No"
                ? /^[A-Za-z]+$/.test(item.data.name) === true
                  ? false
                  : true
                : false,
            gender:
              (item.data.gender === undefined || item.data.gender === "") &&
              item.data?.is_employee === "No" &&
              treavellerRadioButton
                ? true
                : false,
            phone:
              (item.data.phone === undefined || item.data.phone === "") &&
              item.data?.is_employee === "No"
                ? true
                : false,
            phonePattern:
              item.data?.is_employee === "No"
                ? /^[0-9]{10,10}$/.test(item.data.phone) === true
                  ? false
                  : true
                : false,
            email:
              (item.data.email === undefined || item.data.email === "") &&
              item.data?.is_employee === "No" &&
              treavellerRadioButton
                ? true
                : false,
            emailPattern:
              item.data?.is_employee === "No"
                ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                    item.data.email
                  ) === true
                  ? false
                  : true
                : false,
            dob:
              (item.data.dob === undefined || item.data.dob === "") &&
              item.data?.is_employee === "No" &&
              treavellerRadioButton
                ? true
                : false,
          },
        },
      ];

      return item;
    });
    console.log("travellerDatalist", travellerDatalist);
    setValidateForTravellersDataRow(travellerDatalist);
    let travelDatalist = [];
    rows.map((item, index) => {
      travelDatalist = [
        ...travelDatalist,
        {
          data: {
            ...item.data,
            travel_mode:
              (item.data.travel_mode === undefined ||
                item.data.travel_mode === "") &&
              treavellerRadioButton
                ? true
                : false,
            travel_from_city:
              (item.data.travel_from_city === undefined ||
                item.data.travel_from_city === null) &&
              treavellerRadioButton
                ? true
                : false,
            travel_to_city:
              (item.data.travel_to_city === undefined ||
                item.data.travel_to_city === null) &&
              treavellerRadioButton
                ? true
                : false,
            departure:
              (item.data.departure === undefined ||
                item.data.departure === "") &&
              treavellerRadioButton
                ? true
                : false,
            return:
              (item.data.return === undefined || item.data.return === "") &&
              item?.data?.trip_type === "Return" &&
              treavellerRadioButton
                ? true
                : false,
          },
        },
      ];

      return item;
    });
    setValidateForTravelDataRow(travelDatalist);
    let accommodationDatalist = [];
    accommodationData?.map((item, index) => {
      accommodationDatalist = [
        ...accommodationDatalist,
        {
          data: {
            ...item.data,
            city:
              (item.data.city === undefined || item.data.city === null) &&
              accommodationRadioButton
                ? true
                : false,
            checkIn:
              (item.data.checkIn === undefined || item.data.checkIn === "") &&
              accommodationRadioButton
                ? true
                : false,
            checkOut:
              (item.data.checkOut === undefined || item.data.checkOut === "") &&
              accommodationRadioButton
                ? true
                : false,
            breakfastRequired:
              (item.data.breakfastRequired === undefined ||
                item.data.breakfastRequired === "") &&
              accommodationRadioButton
                ? true
                : false,
          },
        },
      ];

      return item;
    });
    setValidateForAccommodationDataRow(accommodationDatalist);
    let occupancyDatalist = [];
    roomsData?.map((item, index) => {
      occupancyDatalist = [
        ...occupancyDatalist,
        {
          data: {
            ...item.data,
            emp_id:
              (item.data.emp_id === undefined || item.data.emp_id === "") &&
              item.data?.is_employee === "Yes" &&
              accommodationRadioButton
                ? true
                : false,
            empIdPattern:
              basicDetails?.booking_for === "others"
                ? (item.data.emp_id === LocalStorageData?.emp_id) === true
                  ? true
                  : false
                : false,
            name:
              (item.data.name === undefined || item.data.name === "") &&
              item.data?.is_employee === "No" &&
              accommodationRadioButton
                ? true
                : false,
            namePattern:
              item.data?.is_employee === "No"
                ? /^[A-Za-z]+$/.test(item.data.name) === true
                  ? false
                  : true
                : false,
            gender:
              (item.data.gender === undefined || item.data.gender === "") &&
              item.data?.is_employee === "No" &&
              accommodationRadioButton
                ? true
                : false,
            phone:
              (item.data.phone === undefined || item.data.phone === "") &&
              item.data?.is_employee === "No" &&
              accommodationRadioButton
                ? true
                : false,
            phonePattern:
              item.data?.is_employee === "No"
                ? /^[0-9]{10,10}$/.test(item.data.phone) === true
                  ? false
                  : true
                : false,

            email:
              (item.data.email === undefined || item.data.email === "") &&
              item.data?.is_employee === "No" &&
              accommodationRadioButton
                ? true
                : false,
            emailPattern:
              item.data?.is_employee === "No"
                ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                    item.data.email
                  ) === true
                  ? false
                  : true
                : false,

            dob:
              (item.data.dob === undefined || item.data.dob === "") &&
              item.data?.is_employee === "No" &&
              accommodationRadioButton
                ? true
                : false,
          },
        },
      ];

      return item;
    });

    setValidateForOccupancyDataRow(occupancyDatalist);

    const basicDetailsData = Object?.keys(basicDetailsDataObj).every(
      (property) => {
        return (
          basicDetailsDataObj.hasOwnProperty(property) &&
          basicDetailsDataObj[property] === true
        );
      }
    );
    // console.log(
    //   "validateForAccommodationDataRow",
    //   validateForAccommodationDataRow
    // );
    // console.log(
    //   "validateForBadicDetailsDataRow",
    //   validateForBadicDetailsDataRow
    // );
    // console.log("validateForOccupancyDataRow", validateForOccupancyDataRow);
    // console.log("validateForTravelDataRow", validateForTravelDataRow);
    const valdateBookingForMySelf_Other =
      basicDetails?.booking_for === "myself_others"
        ? eval(treavellerRadioButton ? travellersData?.length : 0) +
            eval(accommodationRadioButton ? roomsData?.length : 0) <
          2
          ? true
          : false
        : false;
    console.log("valdateBookingForMySelf_Other", valdateBookingForMySelf_Other);
    console.log(
      "travellersData.length",
      treavellerRadioButton ? travellersData?.length : 0
    );
    console.log(
      "rooms.length",
      accommodationRadioButton ? roomsData?.length : 0
    );
    let travellersDataRow = travellerDatalist.filter(
      (y) =>
        y.data.emp_id == true ||
        y.data.empIdPattern == true ||
        y.data.name == true ||
        y.data.namePattern == true ||
        y.data.gender == true ||
        y.data.phone == true ||
        y.data.phonePattern == true ||
        y.data.email == true ||
        y.data.emailPattern == true ||
        y.data.dob == true
    );
    let travelDataRow = travelDatalist.filter(
      (y) =>
        y.data.travel_mode == true ||
        y.data.travel_from_city == true ||
        y.data.travel_to_city == true ||
        y.data.departure == true ||
        y.data.return == true
    );
    let accommodationDataRow = accommodationDatalist.filter(
      (y) =>
        y.data.city == true ||
        y.data.checkIn == true ||
        y.data.checkOut == true ||
        y.data.breakfastRequired == true
    );
    let occpancyDataRow = occupancyDatalist.filter(
      (y) =>
        y.data.emp_id == true ||
        y.data.empIdPattern == true ||
        y.data.name == true ||
        y.data.namePattern == true ||
        y.data.gender == true ||
        y.data.phone == true ||
        y.data.email == true ||
        y.data.phonePattern == true ||
        y.data.emailPattern == true ||
        y.data.dob == true
    );
    console.log("travellersDataRoweweweww", travellersDataRow);

    if (
      travellersDataRow.length > 0 ||
      travelDataRow.length > 0 ||
      accommodationDataRow.length > 0 ||
      occpancyDataRow.length > 0 ||
      !basicDetailsData
      // || valdateBookingForMySelf_Other
    ) {
      setError(true);
      event && alert.error("Error in some fields");
    } else {
      if (!treavellerRadioButton && !accommodationRadioButton) {
        event && alert.error("Atleast one booking request is required");
      } else if (valdateBookingForMySelf_Other) {
        event && alert.error("Please add more employees");
      } else {
        setError(false);
        event && handleFormSubmit();
      }
      // alert.success("Sent");
      // handleFormSubmit(false);
    }
  };
  useEffect(() => {
    if (error) {
      validateError(false);
    }
  }, [
    //validateForBadicDetailsDataRow,
    basicDetails?.billable,
    basicDetails?.project_id,
    basicDetails?.client_id,
    basicDetails?.reason_for_travel,
    travellersData,
    rows,
    accommodationData,
    roomsData,
  ]);
  // ================================================================================================================
  // useEffect(() => {
  //   async function fetchData() {
  //     if (error) {
  //       setCheckError(true);
  //       // console.log("error", error);
  //     }
  //   }
  //   fetchData();
  // }, [error]);
  const handleFormSubmit = async (value) => {
    // if (value) {
    //   alert.error("Some fields are required");
    // } else {
    //   alert.success("Done");
    // }
    // alert.success("Done");
    const res = await axios.post("all_travel_request_data", {
      basicDetails,
      rows: treavellerRadioButton ? rows : [],
      travellersData: treavellerRadioButton ? travellersData : [],
      accommodationData: accommodationRadioButton ? accommodationData : [],
      roomsData: accommodationRadioButton ? roomsData : [],
      management_approval: "Pending",
      created_by: LocalStorageData?.email,
    });
    if (res?.data === "Created") {
      alert.success("Request Sent");
      navigate("/alltravelrequest");
    }
  };

  // const data = accommodationData?.data?.number_of_rooms;
  const renderOptions = (numberOfRooms) => {
    const options = [
      // <option value="" selected disabled>
      //   Select
      // </option>,
    ];
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

  function filterObjectByLabel(cityData, data) {
    return cityData.filter((item) => item.value !== data);
  }
  // =================Format date For Inputs===============

  // let d1 = new Date().toISOString().split("T")[0];
  // console.log("validateForBadicDetailsDataRow", validateForBadicDetailsDataRow);
  // const [startDate, setStartDate] = useState(new Date());

  const ExampleCustomInput = forwardRef(
    ({ value, onClick, disabled, validate }, ref) => (
      <button
        type="button"
        // className="form-control btn btn-sm form-control-sm"
        className={classNames("form-control btn btn-sm form-control-sm", {
          "is-invalid": validate,
        })}
        onClick={onClick}
        ref={ref}
        disabled={disabled}
      >
        {value === "" ? "dd/mm/yyyy" : value}
      </button>
      // console.log("value",value === "" ?"Yes":"No")
    )
  );

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
              {/* <input
                type="date"
                max={new Date().toLocaleDateString("fr-ca")}
                min="1990-12-12"
              ></input> */}
              {/* <button type="button" onClick={validateError}>
                click me
              </button> */}
              <div className="row">
                <div class="col-lg-12 grid-margin stretch-card">
                  <div class="card">
                    <div class="card-body">
                      <form
                        action=""
                        // onClick={validateError}
                        // onSubmit={handleSubmit(handleFormSubmit)}
                      >
                        <div className="row">
                          <div className="col-12 col-lg-2">
                            <div className="form-group">
                              <label>Booking For</label>

                              <select
                                className="form-select form-select-md"
                                value={basicDetails?.booking_for}
                                onChange={inputEvent}
                                name="booking_for"
                              >
                                <option value="" selected disabled>
                                  Select...
                                </option>
                                <option value="self">Self</option>
                                <option value="others">Others</option>
                                <option value="myself_others">
                                  Myself + Others
                                </option>
                              </select>
                            </div>
                          </div>
                          <div className="col-12 col-lg-2">
                            <div className="form-group">
                              <label>Billable</label>
                              <span className="astik"> *</span>
                              <select
                                // required
                                // className={classNames(
                                //   "form-select form-select-md",
                                //   {
                                //     "is-invalid": !validateForBadicDetailsDataRow?.billable,
                                //   }
                                // )}
                                className={classNames(
                                  "form-select form-select-md",
                                  {
                                    "is-invalid":
                                      !validateForBadicDetailsDataRow?.billable &&
                                      validateForBadicDetailsDataRow?.billable !==
                                        undefined
                                        ? true
                                        : false,
                                  }
                                )}
                                // {...register("billable", {
                                //   value: basicDetails?.billable,
                                // })}
                                value={basicDetails?.billable}
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
                              <small className="isValidate">
                                {!validateForBadicDetailsDataRow?.billable &&
                                  validateForBadicDetailsDataRow?.billable !==
                                    undefined &&
                                  "This field is required"}
                              </small>
                            </div>
                          </div>

                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>Client Id</label>
                              <span className="astik"> *</span>
                              <select
                                className={classNames(
                                  "form-select form-select-md",
                                  {
                                    "is-invalid":
                                      !validateForBadicDetailsDataRow?.client_id &&
                                      validateForBadicDetailsDataRow?.client_id !==
                                        undefined
                                        ? true
                                        : false,
                                  }
                                )}
                                value={selectedClientId}
                                name="client_id"
                                onChange={handleClientChange}
                              >
                                <option value="">Select Client</option>
                                {clientId.map((client) => (
                                  <option key={client} value={client}>
                                    {client}
                                  </option>
                                ))}
                              </select>
                              <small className="isValidate">
                                {!validateForBadicDetailsDataRow?.client_id &&
                                  validateForBadicDetailsDataRow?.client_id !==
                                    undefined &&
                                  "This field is required"}
                              </small>
                            </div>
                          </div>
                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>Project Id</label>
                              <span className="astik"> *</span>
                              <select
                                className={classNames(
                                  "form-select form-select-md",
                                  {
                                    "is-invalid":
                                      !validateForBadicDetailsDataRow?.project_id &&
                                      validateForBadicDetailsDataRow?.project_id !==
                                        undefined
                                        ? true
                                        : false,
                                  }
                                )}
                                value={setBasicDetails?.project_id}
                                onChange={inputEvent}
                                name="project_id"
                              >
                                <option value="">Select Project</option>
                                {filteredProjectIds.map((project) => (
                                  <option key={project} value={project}>
                                    {project}
                                  </option>
                                ))}
                              </select>
                              <small className="isValidate">
                                {!validateForBadicDetailsDataRow?.project_id &&
                                  validateForBadicDetailsDataRow?.project_id !==
                                    undefined &&
                                  "This field is required"}
                              </small>
                            </div>
                          </div>

                          <div className="col-12 col-lg-2">
                            <div className="form-group">
                              <label>Travel Reason</label>
                              <span className="astik"> *</span>
                              <select
                                // required
                                name="reason_for_travel"
                                className={classNames(
                                  "form-select form-select-md",
                                  {
                                    "is-invalid":
                                      !validateForBadicDetailsDataRow?.reason_for_travel &&
                                      validateForBadicDetailsDataRow?.reason_for_travel !==
                                        undefined
                                        ? true
                                        : false,
                                  }
                                )}
                                onChange={inputEvent}
                                placeholder="Enter Reason for Travel"
                              >
                                <option value="" selected disabled>
                                  Select...
                                </option>
                                <option value="Sales">Sales</option>
                                <option value="Client Visit">
                                  Client Visit
                                </option>
                                <option value="Consulting">Consulting</option>
                                <option value="Off-Site">Off-Site</option>
                              </select>
                              <small className="isValidate">
                                {!validateForBadicDetailsDataRow?.reason_for_travel &&
                                  validateForBadicDetailsDataRow?.reason_for_travel !==
                                    undefined &&
                                  "This field is required"}
                              </small>
                            </div>
                          </div>
                        </div>
                        {/* ===============================Travellers==================== */}
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">
                            Travel Required
                          </label>

                          <div className="col-sm-3">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-control form-control-md"
                                  value={treavellerRadioButton}
                                  checked={
                                    treavellerRadioButton === true
                                      ? true
                                      : false
                                  }
                                  onChange={(e) => {
                                    return setTreavellerRadioButton(
                                      !treavellerRadioButton
                                    );
                                  }}
                                  name="travellers_required"
                                />
                                Yes <i className="input-helper"></i>
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-control form-control-md"
                                  value={treavellerRadioButton}
                                  checked={
                                    treavellerRadioButton === false
                                      ? true
                                      : false
                                  }
                                  onChange={(e) => {
                                    return setTreavellerRadioButton(
                                      !treavellerRadioButton
                                    );
                                  }}
                                  name="travellers_required"
                                />
                                No <i className="input-helper"></i>
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* <div className="row mt-4">
                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>Travellers Required</label>
                              <span className="astik"> *</span>
                              <select
                                className={classNames(
                                  "form-select form-select-md",
                                  {
                                    "is-invalid": errors.travellers_required,
                                  }
                                )}
                                {...register("travellers_required", {
                                  value: basicDetails?.travellers_required,
                                })}
                                value={basicDetails?.travellers_required}
                                onChange={inputEvent}
                                name="travellers_required"
                              >
                                <option value="" selected disabled>
                                  Select...
                                </option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                              <small className="invalid-feedback">
                                {errors.travellers_required?.message}
                              </small>
                            </div>
                          </div>
                        </div> */}
                        {treavellerRadioButton && (
                          <div
                            style={{
                              border: "1px solid lightgrey",
                              padding: "1rem",
                            }}
                          >
                            <div className="d-flex justify-content-between ">
                              <h3 className="" style={{ color: "#d03e20" }}>
                                Travellers
                              </h3>
                              {/* <p
                              className="mx-2 btn btn-xs "
                              type="btn"
                              onClick={handleAddTraveller}
                            >
                              <RiAddFill />
                            </p> */}
                              {basicDetails?.booking_for === "self" ? (
                                ""
                              ) : (
                                <div
                                  id="add_traveller"
                                  class="Btn my-2"
                                  onClick={handleAddTraveller}
                                >
                                  <div class="sign">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      width="24px"
                                      height="24px"
                                      fill-rule="evenodd"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              )}
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
                                  <th colSpan={2}>DOB</th>
                                  {/* <th>Action</th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {travellersData?.map((traveller, index) => (
                                  <tr key={traveller.id}>
                                    <td>
                                      <select
                                        type="text"
                                        name="is_employee"
                                        className="form-select form-select-md"
                                        value={traveller?.data?.is_employee}
                                        onChange={(e) =>
                                          handleTravellerChange(traveller.id, {
                                            // ...traveller?.data,
                                            name: "",
                                            emp_id: "",
                                            email: "",
                                            phone: "",
                                            dob: new Date(),
                                            gender: "",
                                            is_employee: e.target.value,
                                          })
                                        }
                                        disabled={
                                          basicDetails?.booking_for === "self"
                                            ? true
                                            : false
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
                                        disabled={
                                          traveller?.data?.is_employee ===
                                            "Yes" &&
                                          basicDetails?.booking_for !== "self"
                                            ? false
                                            : true
                                        }
                                        name="emp_id"
                                        className={classNames(
                                          "form-control form-control-sm",
                                          {
                                            "is-invalid":
                                              validateForTravellersDataRow[
                                                index
                                              ]?.data?.emp_id ||
                                              (traveller?.data?.is_employee ===
                                                "Yes" &&
                                                !validateForTravellersDataRow[
                                                  index
                                                ]?.data?.emp_id &&
                                                validateForTravellersDataRow[
                                                  index
                                                ]?.data?.empIdPattern),
                                          }
                                        )}
                                        value={
                                          traveller?.data?.is_employee
                                            ? traveller?.data?.emp_id
                                            : ""
                                        }
                                        onChange={(e) =>
                                          handleTravellerChange(traveller.id, {
                                            ...traveller?.data,
                                            emp_id: e.target.value,
                                          })
                                        }
                                        placeholder="Enter Employee ID"
                                      />

                                      <small className="isValidate">
                                        {validateForTravellersDataRow[index]
                                          ?.data?.emp_id &&
                                          "This field is required"}
                                        {traveller?.data?.is_employee ===
                                          "Yes" &&
                                          !validateForTravellersDataRow[index]
                                            ?.data?.emp_id &&
                                          validateForTravellersDataRow[index]
                                            ?.data?.empIdPattern &&
                                          "Please select others"}
                                      </small>
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
                                        // required
                                        type="text"
                                        value={traveller?.data?.name}
                                        name="name"
                                        className={classNames(
                                          "form-control form-control-sm",
                                          {
                                            "is-invalid":
                                              validateForTravellersDataRow[
                                                index
                                              ]?.data?.name,
                                          }
                                        )}
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
                                        placeholder="Enter Full Name"
                                      />
                                      <small className="isValidate">
                                        {validateForTravellersDataRow[index]
                                          ?.data?.name &&
                                          "This field is required"}
                                        {traveller?.data?.is_employee ===
                                          "No" &&
                                          !validateForTravellersDataRow[index]
                                            ?.data?.name &&
                                          validateForTravellersDataRow[index]
                                            ?.data?.namePattern &&
                                          "Fullname is not valid"}
                                      </small>
                                    </td>
                                    <td style={{ width: "15%" }}>
                                      {/* {traveller?.data?.is_employee ===
                                      "Yes" ? (
                                        <input
                                          // required
                                          type="text"
                                          disabled={
                                            traveller?.data?.is_employee ===
                                            "Yes"
                                              ? true
                                              : false
                                          }
                                          value={traveller?.data?.gender}
                                          name="gender"
                                          className="form-control form-control-sm"
                                          placeholder="Select"
                                          onChange={(e) =>
                                            handleTravellerChange(
                                              traveller.id,
                                              {
                                                ...traveller?.data,
                                                gender: e.target.value,
                                              }
                                            )
                                          }
                                        />
                                      )  */}
                                      {/* : ( */}
                                      <select
                                        className={classNames(
                                          "form-select form-select-md",
                                          {
                                            "is-invalid":
                                              validateForTravellersDataRow[
                                                index
                                              ]?.data?.gender,
                                          }
                                        )}
                                        disabled={
                                          traveller?.data?.is_employee === "Yes"
                                            ? true
                                            : false
                                        }
                                        value={traveller?.data?.gender}
                                        placeholder="Select"
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
                                      {/* )} */}
                                      <small className="isValidate">
                                        {validateForTravellersDataRow[index]
                                          ?.data?.gender &&
                                          "This field is required"}
                                      </small>
                                    </td>
                                    <td>
                                      <input
                                        type={
                                          "text"
                                          // traveller?.data?.is_employee === "Yes"
                                          //   ? "text"
                                          //   : "number"
                                        }
                                        // pattern="\d*"
                                        // maxlength="10"
                                        disabled={
                                          traveller?.data?.is_employee === "Yes"
                                            ? true
                                            : false
                                        }
                                        value={traveller?.data?.phone}
                                        name="phone"
                                        className={classNames(
                                          "form-control form-control-sm",
                                          {
                                            "is-invalid":
                                              validateForTravellersDataRow[
                                                index
                                              ]?.data?.phone,
                                          }
                                        )}
                                        placeholder="Enter Phone"
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
                                      <small className="isValidate">
                                        {validateForTravellersDataRow[index]
                                          ?.data?.phone &&
                                          "This field is required"}
                                        {traveller?.data?.is_employee ===
                                          "No" &&
                                          !validateForTravellersDataRow[index]
                                            ?.data?.phone &&
                                          validateForTravellersDataRow[index]
                                            ?.data?.phonePattern &&
                                          "Phone no is not valid"}
                                      </small>
                                    </td>
                                    <td>
                                      <input
                                        // required
                                        type="email"
                                        disabled={
                                          traveller?.data?.is_employee === "Yes"
                                            ? true
                                            : false
                                        }
                                        value={traveller?.data?.email}
                                        name="email"
                                        className={classNames(
                                          "form-control form-control-sm",
                                          {
                                            "is-invalid":
                                              validateForTravellersDataRow[
                                                index
                                              ]?.data?.email,
                                          }
                                        )}
                                        placeholder="Enter Email"
                                        onChange={(e) =>
                                          handleTravellerChange(traveller.id, {
                                            ...traveller?.data,

                                            email: e.target.value,
                                          })
                                        }
                                      />
                                      <small className="isValidate">
                                        {validateForTravellersDataRow[index]
                                          ?.data?.email &&
                                          "This field is required"}
                                        {traveller?.data?.is_employee ===
                                          "No" &&
                                          !validateForTravellersDataRow[index]
                                            ?.data?.email &&
                                          validateForTravellersDataRow[index]
                                            ?.data?.emailPattern &&
                                          "Email ID is not valid"}
                                      </small>
                                    </td>
                                    <td>
                                      <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        maxDate={new Date()}
                                        // withPortal
                                        // locale="en-US"

                                        showWeekNumbers
                                        selected={
                                          new Date(traveller?.data?.dob)
                                        }
                                        onChange={(e) =>
                                          handleTravellerChange(traveller.id, {
                                            ...traveller?.data,
                                            dob: e,
                                          })
                                        }
                                        disabled={
                                          traveller?.data?.is_employee === "Yes"
                                            ? true
                                            : false
                                        }
                                        customInput={
                                          <ExampleCustomInput
                                            disabled={
                                              traveller?.data?.is_employee ===
                                              "Yes"
                                                ? true
                                                : false
                                            }
                                            validate={
                                              validateForTravellersDataRow[
                                                index
                                              ]?.data?.dob
                                            }
                                          />
                                        }
                                      />
                                      {/* <input
                                        // required
                                        type="date"
                                        placeholder="Select DOB"
                                        disabled={
                                          traveller?.data?.is_employee === "Yes"
                                            ? true
                                            : false
                                        }
                                        value={traveller?.data?.dob}
                                        name="dob"
                                        className={classNames(
                                          "form-control form-control-sm",
                                          {
                                            "is-invalid":
                                              validateForTravellersDataRow[
                                                index
                                              ]?.data?.dob,
                                          }
                                        )}
                                        onChange={(e) =>
                                          handleTravellerChange(traveller.id, {
                                            ...traveller?.data,

                                            dob: e.target.value,
                                          })
                                        }
                                      /> */}
                                      <br />
                                      <small className="isValidate">
                                        {validateForTravellersDataRow[index]
                                          ?.data?.dob &&
                                          "This field is required"}
                                      </small>
                                    </td>
                                    {basicDetails?.booking_for !== "self" && (
                                      <td>
                                        <div
                                          id="Delete_Traveller"
                                          class="Btn my-2"
                                          onClick={() =>
                                            handleTravellerDeleteRow(
                                              traveller.id
                                            )
                                          }
                                        >
                                          <div class="sign">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 30 30"
                                              width="30px"
                                              height="30px"
                                            >
                                              <path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z" />
                                            </svg>
                                          </div>
                                        </div>
                                      </td>
                                    )}
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                            {/* ===================================Travel============================ */}
                            <div className="mt-4">
                              <div className="d-flex justify-content-between  ">
                                <h5 className="text-primary">Travel</h5>
                                {/* <p
                                className="btn-sm btn  mx-2 btn-primary "
                                type="btn"
                                onClick={handleAddRow}
                              >
                                <RiAddFill />
                              </p> */}
                                <div
                                  id="add_travel"
                                  class="Btn my-2"
                                  onClick={handleAddRow}
                                >
                                  <div class="sign" title="Add Travel">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      width="24px"
                                      height="24px"
                                      fill-rule="evenodd"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                              {/* ===========Radio Box======= */}
                              {/* <div className="row my-2">
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
                              </div> 
                                </div>
                              </div>
                            </div> */}
                            </div>

                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th>Mode</th>
                                  <th>Trip</th>
                                  <th>From (City)</th>
                                  <th>To (City)</th>
                                  <th>Departure</th>

                                  <th colSpan={2}>Return</th>
                                  {/* <th>Action</th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {rows.map((row, index) => (
                                  <tr key={row.id}>
                                    <td className="w-25">
                                      <select
                                        // required
                                        className={classNames(
                                          "form-select form-select-md",
                                          {
                                            "is-invalid":
                                              validateForTravelDataRow[index]
                                                ?.data?.travel_mode,
                                          }
                                        )}
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
                                      <small className="isValidate">
                                        {validateForTravelDataRow[index]?.data
                                          ?.travel_mode &&
                                          "This field is required"}
                                      </small>
                                    </td>
                                    <td className="w-25">
                                      <select
                                        // required
                                        name="trip_type"
                                        className="form-select form-select-md"
                                        value={row?.data?.trip_type}
                                        onChange={(e) =>
                                          handleDataChange(row.id, {
                                            ...row.data,
                                            trip_type: e.target.value,
                                          })
                                        }
                                      >
                                        <option value="" selected disabled>
                                          Select
                                        </option>
                                        <option value="OneWay">One-Way</option>
                                        <option value="Return">Return</option>
                                      </select>
                                    </td>
                                    <td className="w-25">
                                      <Select
                                        className={classNames(
                                          "form-select-select",
                                          {
                                            "is-invalid":
                                              validateForTravelDataRow[index]
                                                ?.data?.travel_from_city,
                                          }
                                        )}
                                        isClearable={true}
                                        name="travel_from_city"
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
                                      <small className="isValidate">
                                        {validateForTravelDataRow[index]?.data
                                          ?.travel_from_city &&
                                          "This field is required"}
                                      </small>
                                    </td>
                                    <td className="w-25">
                                      <Select
                                        // className="form-select-select"
                                        className={classNames(
                                          "form-select-select",
                                          {
                                            "is-invalid":
                                              validateForTravelDataRow[index]
                                                ?.data?.travel_to_city,
                                          }
                                        )}
                                        isClearable={true}
                                        name="travel_to_city"
                                        // required
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
                                      <small className="isValidate">
                                        {validateForTravelDataRow[index]?.data
                                          ?.travel_to_city &&
                                          "This field is required"}
                                      </small>
                                    </td>
                                    <td>
                                      <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        minDate={new Date()}
                                        // isClearable={true}
                                        // withPortal
                                        // locale="en-US"
                                        showWeekNumbers
                                        selected={row?.data?.departure}
                                        onChange={(e) =>
                                          handleDataChange(row.id, {
                                            ...row.data,
                                            departure: e,
                                          })
                                        }
                                        customInput={
                                          <ExampleCustomInput
                                            validate={
                                              validateForTravelDataRow[index]
                                                ?.data?.departure
                                            }
                                          />
                                        }
                                      />
                                      {/* <input
                                        type="date"
                                        min={getCurrentDate()}
                                        name="departure"
                                        className="form-control form-control-sm"
                                        onChange={(e) =>
                                          handleDataChange(row.id, {
                                            ...row.data,
                                            departure: e.target.value,
                                          })
                                        }
                                        max={new Date().toLocaleDateString(
                                          "fr-ca"
                                        )}
                                      /> */}
                                      <br />
                                      <small className="isValidate">
                                        {validateForTravelDataRow[index]?.data
                                          ?.departure &&
                                          "This field is required"}
                                      </small>
                                    </td>

                                    <td>
                                      <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        minDate={new Date(row?.data?.departure)}
                                        // isClearable={true}
                                        // withPortal
                                        // locale="en-US"
                                        showWeekNumbers
                                        selected={
                                          row?.data?.departure === undefined ||
                                          row?.data?.trip_type === "OneWay"
                                            ? ""
                                            : row?.data?.return
                                        }
                                        onChange={(e) =>
                                          handleDataChange(row.id, {
                                            ...row.data,
                                            return:
                                              row?.data?.departure ===
                                                undefined ||
                                              row?.data?.trip_type === "OneWay"
                                                ? ""
                                                : e,
                                          })
                                        }
                                        disabled={
                                          row?.data?.departure === undefined ||
                                          row?.data?.trip_type === "OneWay"
                                            ? true
                                            : false
                                        }
                                        customInput={
                                          <ExampleCustomInput
                                            disabled={
                                              row.data.trip_type === "OneWay"
                                                ? true
                                                : false
                                            }
                                            validate={
                                              validateForTravelDataRow[index]
                                                ?.data?.return
                                            }
                                          />
                                        }
                                      />
                                      {/* <input
                                        type="date"
                                        // required
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
                                          row.data.trip_type === "OneWay"
                                            ? true
                                            : false
                                        }
                                      /> */}
                                      <br />
                                      <small className="isValidate">
                                        {validateForTravelDataRow[index]?.data
                                          ?.return && "This field is required"}
                                      </small>
                                    </td>

                                    <td>
                                      <div
                                        id="Delete_Travel"
                                        class="Btn my-2"
                                        onClick={() => handleDeleteRow(row.id)}
                                      >
                                        <div class="sign">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 30 30"
                                            width="30px"
                                            height="30px"
                                          >
                                            <path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z" />
                                          </svg>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* ===============================Accomendation====================== */}
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">
                            Accommodation Required
                          </label>

                          <div className="col-sm-3">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-control form-control-md"
                                  value={accommodationRadioButton}
                                  checked={
                                    accommodationRadioButton === true
                                      ? true
                                      : false
                                  }
                                  onChange={(e) => {
                                    setAccommodationRadioButton(
                                      !accommodationRadioButton
                                    );
                                  }}
                                />
                                Yes <i className="input-helper"></i>
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-control form-control-md"
                                  value={accommodationRadioButton}
                                  checked={
                                    accommodationRadioButton === false
                                      ? true
                                      : false
                                  }
                                  onChange={(e) => {
                                    setAccommodationRadioButton(
                                      !accommodationRadioButton
                                    );
                                  }}
                                />
                                No <i className="input-helper"></i>
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* <div className="row mt-4">
                          <div className="col-12 col-lg-3">
                            <div className="form-group">
                              <label>Accommodation Required</label>
                              <span className="astik"> *</span>
                              <select
                                className={classNames(
                                  "form-select form-select-md",
                                  {
                                    "is-invalid": errors.accommodation_required,
                                  }
                                )}
                                {...register("accommodation_required", {
                                  value: basicDetails?.accommodation_required,
                                })}
                                value={basicDetails?.accommodation_required}
                                onChange={inputEvent}
                                name="accommodation_required"
                              >
                                <option value="" selected disabled>
                                  Select...
                                </option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                              <small className="invalid-feedback">
                                {errors.accommodation_required?.message}
                              </small>
                            </div>
                          </div>
                        </div> */}
                        {accommodationRadioButton && (
                          <div
                            className="mt-2"
                            style={{
                              border: "1px solid lightgrey",
                              padding: "1rem",
                            }}
                          >
                            <div className="d-flex justify-content-between">
                              <h3 className="" style={{ color: "#d03e20" }}>
                                Accommodation
                              </h3>
                              {/* <p
                              className="btn-sm btn mx-2 btn-primary "
                              type="btn"
                              onClick={handleAddAccommodation}
                            >
                              <RiAddFill />
                            </p> */}
                              {basicDetails?.booking_for !== "self" && (
                                <div
                                  id="add_accommodation"
                                  class="Btn my-2"
                                  onClick={handleAddAccommodation}
                                >
                                  <div class="sign">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      width="24px"
                                      height="24px"
                                      fill-rule="evenodd"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              )}
                            </div>

                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th>City</th>
                                  <th>Check-in</th>
                                  <th>Check-out</th>
                                  <th>Breakfast Required</th>
                                  <th colSpan={2}>Rooms Required</th>
                                </tr>
                              </thead>
                              <tbody>
                                {accommodationData?.map(
                                  (accommodation, index) => (
                                    <tr key={accommodation.id}>
                                      <td>
                                        <Select
                                          className={classNames(
                                            "form-select-select",
                                            {
                                              "is-invalid":
                                                validateForAccommodationDataRow[
                                                  index
                                                ]?.data?.city,
                                            }
                                          )}
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
                                        <small className="isValidate">
                                          {validateForAccommodationDataRow[
                                            index
                                          ]?.data?.city &&
                                            "This field is required"}
                                        </small>
                                      </td>
                                      <td>
                                        <DatePicker
                                          dateFormat="dd/MM/yyyy"
                                          minDate={new Date()}
                                          selected={
                                            accommodation?.data?.checkIn ===
                                            undefined
                                              ? ""
                                              : accommodation?.data?.checkIn
                                          }
                                          onChange={(e) =>
                                            handleAccommodationChange(
                                              accommodation.id,
                                              {
                                                checkIn: e,
                                              }
                                            )
                                          }
                                          customInput={
                                            <ExampleCustomInput
                                              validate={
                                                validateForAccommodationDataRow[
                                                  index
                                                ]?.data?.checkIn
                                              }
                                            />
                                          }
                                        />

                                        {/* <input
                                          type="date"
                                          // required
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
                                        /> */}
                                        <br />
                                        <small className="isValidate">
                                          {validateForAccommodationDataRow[
                                            index
                                          ]?.data?.checkIn &&
                                            "This field is required"}
                                        </small>
                                      </td>
                                      <td>
                                        <DatePicker
                                          dateFormat="dd/MM/yyyy"
                                          minDate={accommodation?.data?.checkIn}
                                          // locale="en-US"
                                          showWeekNumbers
                                          // selected={
                                          //   new Date(
                                          //     accommodation.data.checkOut
                                          //   )
                                          // }
                                          selected={
                                            accommodation?.data?.checkOut ===
                                            undefined
                                              ? ""
                                              : accommodation?.data?.checkOut
                                          }
                                          onChange={(e) =>
                                            handleAccommodationChange(
                                              accommodation.id,
                                              {
                                                checkOut: e,
                                              }
                                            )
                                          }
                                          customInput={
                                            <ExampleCustomInput
                                              validate={
                                                validateForAccommodationDataRow[
                                                  index
                                                ]?.data?.checkOut
                                              }
                                            />
                                          }
                                        />
                                        {/* <input
                                          type="date"
                                          // required
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
                                        /> */}
                                        <br />
                                        <small className="isValidate">
                                          {validateForAccommodationDataRow[
                                            index
                                          ]?.data?.checkOut &&
                                            "This field is required"}
                                        </small>
                                      </td>
                                      <td>
                                        <select
                                          name="breakfastRequired"
                                          // className="form-select form-select-md"
                                          className={classNames(
                                            "form-select form-select-md",
                                            {
                                              "is-invalid":
                                                validateForAccommodationDataRow[
                                                  index
                                                ]?.data?.breakfastRequired,
                                            }
                                          )}
                                          value={
                                            accommodation.data.breakfastRequired
                                          }
                                          onChange={(e) =>
                                            handleAccommodationChange(
                                              accommodation.id,
                                              {
                                                breakfastRequired:
                                                  e.target.value,
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
                                        <small className="isValidate">
                                          {validateForAccommodationDataRow[
                                            index
                                          ]?.data?.breakfastRequired &&
                                            "This field is required"}
                                        </small>
                                      </td>
                                      <td>
                                        <button
                                          class="btn btn-primary btn-sm dropdown-toggle"
                                          type="button"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                          disabled={
                                            basicDetails?.booking_for === "self"
                                              ? true
                                              : false
                                          }
                                        >
                                          Rooms:
                                          {accommodation.data.number_of_rooms} |
                                          Adults :
                                          {accommodation.data.number_of_adults}|
                                          Children:
                                          {
                                            accommodation.data
                                              .number_of_children
                                          }
                                        </button>

                                        <div class="dropdown-menu form-floating">
                                          <div class="form-floating">
                                            <input
                                              type="number"
                                              max={
                                                9
                                                // accommodation?.data
                                                //   ?.number_of_adults
                                              }
                                              min={1}
                                              class="form-control form-control-sm h-25"
                                              id="floatingInput"
                                              name="number_of_rooms"
                                              value={
                                                accommodation?.data
                                                  ?.number_of_rooms
                                              }
                                              placeholder="name@example.com"
                                              onChange={(e) => {
                                                let { value } = e.target;

                                                // Remove leading zeros
                                                value = value.replace(
                                                  /^0+/,
                                                  ""
                                                );

                                                // Limit the number of digits to 2
                                                if (value.length > 2) {
                                                  value = value.slice(0, 2);
                                                }

                                                // Validate the value to be less than 99

                                                handleAccommodationChange(
                                                  accommodation.id,
                                                  {
                                                    number_of_rooms:
                                                      e.target.value,
                                                    number_of_adults:
                                                      e.target.value <
                                                      accommodation.data
                                                        .number_of_adults
                                                        ? accommodation.data
                                                            .number_of_adults
                                                        : e.target.value,
                                                  }
                                                );
                                                if (
                                                  e.target.value >
                                                  accommodation.data
                                                    .number_of_adults
                                                ) {
                                                  const dd = [];
                                                  for (
                                                    let i = 0;
                                                    i <=
                                                    eval(
                                                      accommodation?.data
                                                        ?.number_of_adults
                                                    ) +
                                                      eval(
                                                        accommodation?.data
                                                          ?.number_of_children
                                                      );
                                                    i++
                                                  ) {
                                                    dd.push({
                                                      id: i,
                                                      data: {
                                                        is_employee: "Yes",
                                                        dob: new Date(),
                                                      },
                                                    });
                                                  }
                                                  setRoomsData(dd);
                                                }
                                              }}
                                            />

                                            <label for="floatingInput">
                                              Rooms
                                            </label>
                                          </div>
                                          <div class="form-floating">
                                            <input
                                              type="number"
                                              max={99}
                                              min={
                                                accommodation?.data
                                                  ?.number_of_rooms
                                              }
                                              name="number_of_adults"
                                              class="form-control  form-control-sm h-25"
                                              id="floatingInput"
                                              placeholder="Password"
                                              value={
                                                accommodation?.data
                                                  ?.number_of_adults
                                              }
                                              onChange={(e) => {
                                                let { value } = e.target;

                                                // Remove leading zeros
                                                value = value.replace(
                                                  /^0+/,
                                                  ""
                                                );

                                                // Limit the number of digits to 2
                                                if (value.length > 2) {
                                                  value = value.slice(0, 2);
                                                }
                                                handleAccommodationChange(
                                                  accommodation.id,
                                                  {
                                                    number_of_adults:
                                                      e.target.value,
                                                  }
                                                );

                                                const dd = [];
                                                for (
                                                  let i = 1;
                                                  i <=
                                                  eval(e.target.value) +
                                                    eval(
                                                      accommodation?.data
                                                        ?.number_of_children
                                                    );
                                                  i++
                                                ) {
                                                  dd.push({
                                                    id: i,
                                                    data: {
                                                      is_employee: "Yes",
                                                      dob: new Date(),
                                                    },
                                                  });
                                                }
                                                setRoomsData(dd);
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
                                              min={0}
                                              value={
                                                accommodation?.data
                                                  ?.number_of_children
                                              }
                                              placeholder="No. of Children"
                                              onChange={(e) => {
                                                let { value } = e.target;

                                                // Remove leading zeros
                                                value = value.replace(
                                                  /^0+/,
                                                  ""
                                                );

                                                // Limit the number of digits to 2
                                                if (value?.length > 2) {
                                                  value = value.slice(0, 2);
                                                }
                                                handleAccommodationChange(
                                                  accommodation.id,
                                                  {
                                                    number_of_children:
                                                      e.target.value,
                                                  }
                                                );
                                                const dd = [];
                                                for (
                                                  let i = 1;
                                                  i <=
                                                  eval(e.target.value) +
                                                    eval(
                                                      accommodation?.data
                                                        ?.number_of_adults
                                                    );
                                                  i++
                                                ) {
                                                  dd.push({
                                                    id: i,
                                                    data: {
                                                      is_employee: "Yes",
                                                      dob: new Date(),
                                                    },
                                                  });
                                                }

                                                setRoomsData(dd);
                                                // const dd = [];
                                                // for (let i = 1; i <= value; i++) {
                                                //   dd.push({
                                                //     id: 1,
                                                //     data: { is_employee: "Yes" },
                                                //   });
                                                // }
                                                // const hh = {
                                                //   id: 3,
                                                //   data: { is_employee: "Yes" },
                                                // };
                                                // setRoomsData([...roomsData, hh]);
                                                // //                                         const newRow = { id: 3, data: { is_employee: "Yes" } };
                                                // // setRoomsData([...roomsData, newRow]);
                                              }}
                                            />
                                            <label for="floatingPassword">
                                              Children
                                            </label>
                                          </div>
                                        </div>
                                      </td>
                                      {basicDetails?.booking_for !== "self" && (
                                        <td>
                                          {/* <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() =>
                                        handleAccommodationDeleteRow(
                                          accommodation.id
                                        )
                                      }
                                    >
                                      <RiDeleteBin6Line />
                                    </button> */}
                                          {index === 0 ? (
                                            ""
                                          ) : (
                                            <div
                                              id="Delete_Accommodation"
                                              class="Btn my-2"
                                              onClick={() =>
                                                handleAccommodationDeleteRow(
                                                  accommodation.id
                                                )
                                              }
                                            >
                                              <div class="sign">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  viewBox="0 0 30 30"
                                                  width="30px"
                                                  height="30px"
                                                >
                                                  <path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z" />
                                                </svg>
                                              </div>
                                            </div>
                                          )}
                                          ,
                                        </td>
                                      )}
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                            {/* <button
                          className="btn btn-primary btn-sm"
                          onClick={handleAddAccommodation}
                        >
                          <RiAddFill />
                        </button> */}
                            <div className="mt-4">
                              <div className="d-flex justify-content-between  ">
                                <h5 className="text-primary">Occupancy</h5>
                              </div>
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
                                  {/* <th>Action</th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {roomsData?.map((room, index) => (
                                  <tr key={room.id}>
                                    <td>
                                      <select
                                        required
                                        type="text"
                                        value={room?.data?.is_employee}
                                        name="is_employee"
                                        className="form-select form-select-md"
                                        onChange={(e) =>
                                          handleRoomChange(room.id, {
                                            name: "",
                                            emp_id: "",
                                            email: "",
                                            phone: "",
                                            dob: new Date(),
                                            gender: "",
                                            is_employee: e.target.value,
                                          })
                                        }
                                        disabled={
                                          basicDetails?.booking_for === "self"
                                            ? true
                                            : false
                                        }
                                      >
                                        <option value="" selected disabled>
                                          Select
                                        </option>
                                        <option value="Yes" selected>
                                          Yes
                                        </option>
                                        <option value="No">No</option>
                                      </select>
                                    </td>
                                    <td style={{ width: "9%" }}>
                                      <select
                                        className="form-select form-select-md"
                                        name="room"
                                        onChange={(e) =>
                                          handleRoomChange(room.id, {
                                            ...room.data,
                                            room: e.target.value,
                                          })
                                        }
                                        disabled={
                                          basicDetails?.booking_for === "self"
                                            ? true
                                            : false
                                        }
                                        // value={
                                        //   accommodationData[0]?.data
                                        //     ?.number_of_rooms
                                        // }
                                      >
                                        {renderOptions(
                                          accommodationData[0]?.data
                                            ?.number_of_rooms
                                        )}
                                      </select>
                                      {/* Room - {index + 1} */}
                                      {/* {
                                      accommodationData[0]?.data
                                        ?.number_of_rooms
                                    } */}
                                    </td>
                                    <td style={{ width: "5%" }}>
                                      <input
                                        // required
                                        type="text"
                                        disabled={
                                          room?.data?.is_employee === "Yes" &&
                                          basicDetails?.booking_for !== "self"
                                            ? false
                                            : true
                                        }
                                        placeholder="Enter Employee ID"
                                        value={room.data.emp_id}
                                        name="emp_id"
                                        // className="form-control form-control-sm"
                                        className={classNames(
                                          "form-control form-control-sm",
                                          {
                                            "is-invalid":
                                              validateForOccupancyDataRow[index]
                                                ?.data?.emp_id ||
                                              (room?.data?.is_employee ===
                                                "Yes" &&
                                                !validateForOccupancyDataRow[
                                                  index
                                                ]?.data?.emp_id &&
                                                validateForOccupancyDataRow[
                                                  index
                                                ]?.data?.empIdPattern),
                                          }
                                        )}
                                        onChange={(e) =>
                                          handleRoomChange(room.id, {
                                            ...room.data,
                                            emp_id: e.target.value,
                                          })
                                        }
                                      />
                                      <small className="isValidate">
                                        {validateForOccupancyDataRow[index]
                                          ?.data?.emp_id &&
                                          "This field is required"}
                                        {room?.data?.is_employee === "Yes" &&
                                          !validateForOccupancyDataRow[index]
                                            ?.data?.emp_id &&
                                          validateForOccupancyDataRow[index]
                                            ?.data?.empIdPattern &&
                                          "Please select others"}
                                      </small>
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        // required
                                        disabled={
                                          room?.data?.is_employee === "Yes"
                                            ? true
                                            : false
                                        }
                                        placeholder="Enter Full Name"
                                        value={room?.data?.name}
                                        name="name"
                                        className={classNames(
                                          "form-control form-control-sm",
                                          {
                                            "is-invalid":
                                              validateForOccupancyDataRow[index]
                                                ?.data?.name,
                                          }
                                        )}
                                        onChange={(e) =>
                                          handleRoomChange(room.id, {
                                            ...room.data,
                                            name: e.target.value,
                                          })
                                        }
                                      />
                                      <small className="isValidate">
                                        {validateForOccupancyDataRow[index]
                                          ?.data?.name &&
                                          "This field is required"}
                                        {room?.data?.is_employee === "No" &&
                                          !validateForOccupancyDataRow[index]
                                            ?.data?.name &&
                                          validateForOccupancyDataRow[index]
                                            ?.data?.namePattern &&
                                          "Fullname is not valid"}
                                      </small>
                                    </td>
                                    <td style={{ width: "15%" }}>
                                      {/* {room?.data?.is_employee === "Yes" ? (
                                        <input
                                          type="text"
                                          // required
                                          disabled={
                                            room?.data?.is_employee === "Yes"
                                              ? true
                                              : false
                                          }
                                          value={room?.data?.gender}
                                          name="gender"
                                          placeholder="Select.."
                                          className="form-control form-control-sm"
                                          onChange={(e) =>
                                            handleRoomChange(room.id, {
                                              ...room.data,
                                              gender: e.target.value,
                                            })
                                          }
                                        />
                                      ) : ( */}
                                      <select
                                        className={classNames(
                                          "form-select form-control-sm",
                                          {
                                            "is-invalid":
                                              validateForOccupancyDataRow[index]
                                                ?.data?.gender,
                                          }
                                        )}
                                        disabled={
                                          room?.data?.is_employee === "Yes"
                                            ? true
                                            : false
                                        }
                                        placeholder="Enter Employee ID"
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
                                      {/* )} */}
                                      <small className="isValidate">
                                        {validateForOccupancyDataRow[index]
                                          ?.data?.gender &&
                                          "This field is required"}
                                      </small>
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        // required
                                        disabled={
                                          room?.data?.is_employee === "Yes"
                                            ? true
                                            : false
                                        }
                                        value={room?.data?.phone}
                                        name="phone"
                                        className={classNames(
                                          "form-control form-control-sm",
                                          {
                                            "is-invalid":
                                              validateForOccupancyDataRow[index]
                                                ?.data?.phone,
                                          }
                                        )}
                                        placeholder="Enter Phone"
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
                                      <small className="isValidate">
                                        {validateForOccupancyDataRow[index]
                                          ?.data?.phone &&
                                          "This field is required"}
                                        {room?.data?.is_employee === "No" &&
                                          !validateForOccupancyDataRow[index]
                                            ?.data?.phone &&
                                          validateForOccupancyDataRow[index]
                                            ?.data?.phonePattern &&
                                          "Phone no is not valid"}
                                      </small>
                                    </td>
                                    <td>
                                      <input
                                        type="email"
                                        // required
                                        disabled={
                                          room?.data?.is_employee === "Yes"
                                            ? true
                                            : false
                                        }
                                        value={room?.data?.email}
                                        name="email"
                                        placeholder="Enter Email ID"
                                        className={classNames(
                                          "form-control form-control-sm",
                                          {
                                            "is-invalid":
                                              validateForOccupancyDataRow[index]
                                                ?.data?.email,
                                          }
                                        )}
                                        onChange={(e) =>
                                          handleRoomChange(room.id, {
                                            ...room?.data,
                                            email: e.target.value,
                                          })
                                        }
                                      />
                                      <small className="isValidate">
                                        {validateForOccupancyDataRow[index]
                                          ?.data?.email &&
                                          "This field is required"}
                                        {room?.data?.is_employee === "No" &&
                                          !validateForOccupancyDataRow[index]
                                            ?.data?.email &&
                                          validateForOccupancyDataRow[index]
                                            ?.data?.emailPattern &&
                                          "Email Id is not valid"}
                                      </small>
                                    </td>
                                    <td>
                                      <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        maxDate={new Date()}
                                        // isClearable={true}
                                        // withPortal
                                        // locale="en-US"
                                        showWeekNumbers
                                        selected={new Date(room?.data?.dob)}
                                        onChange={(e) =>
                                          handleRoomChange(room.id, {
                                            ...room.data,
                                            dob: e,
                                          })
                                        }
                                        disabled={
                                          room?.data?.is_employee === "Yes"
                                            ? true
                                            : false
                                        }
                                        customInput={
                                          <ExampleCustomInput
                                            disabled={
                                              room?.data?.is_employee === "Yes"
                                                ? true
                                                : false
                                            }
                                            validate={
                                              validateForOccupancyDataRow[index]
                                                ?.data?.dob
                                            }
                                          />
                                        }
                                      />
                                      {/* <input
                                        type="date"
                                        // required
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
                                      /> */}
                                      <br />
                                      <small className="isValidate">
                                        {validateForOccupancyDataRow[index]
                                          ?.data?.dob &&
                                          "This field is required"}
                                      </small>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                        <div className="row mt-2">
                          <div className="col-12 col-lg-12">
                            <div className="form-group">
                              <label>Special Request:</label>
                              <textarea
                                name="special_request"
                                className="form-control form-control-sm"
                                placeholder="Seat preference, Food Preference...... "
                                onChange={inputEvent}
                              />
                            </div>
                          </div>
                        </div>
                        {/* <div className="d-flex flex-column justify-content-start my-3">
                          <label>Special Request:</label>
                          <textarea
                            name="special_request"
                            className="form-control form-control-sm"
                            placeholder="Seat preference, Food Preference...... "
                            onChange={inputEvent}
                          />
                        </div> */}
                        <div className="row my-4 text-center">
                          <div className="col-12">
                            <button
                              id="res"
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={() => validateError(true)}
                            >
                              Submit
                            </button>
                            {/* <button
                              id="res"
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={validateError}
                            >
                              Check validation
                            </button> */}
                          </div>
                        </div>
                      </form>
                      {/* <ReactTooltip
                        anchorId="add_traveller"
                        place="top"
                        content="Add More Travellers"
                      />
                      <ReactTooltip
                        anchorId="add_travel"
                        place="top"
                        content="Add More Travel"
                      />
                      <ReactTooltip
                        anchorId="add_accommodation"
                        place="top"
                        content="Add More Accommodation"
                      />
                      <ReactTooltip
                        anchorId="add_occupancy"
                        place="top"
                        content="Add More Occupancy"
                      />
                      <ReactTooltip
                        anchorId="Delete_Traveller"
                        place="right"
                        content="Delete"
                      />
                      <ReactTooltip
                        anchorId="Delete_Travel"
                        place="right"
                        content="Delete"
                      />
                      <ReactTooltip
                        anchorId="Delete_Accommodation"
                        place="right"
                        content="Delete"
                      />
                      <ReactTooltip
                        anchorId="Delete_Occupancy"
                        place="right"
                        content="Delete"
                      /> */}
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
