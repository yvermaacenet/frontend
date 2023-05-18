import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format } from "date-fns"; // Import the format function from date-fns
import "react-pure-modal/dist/react-pure-modal.min.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
const DragAndDropCalendar = withDragAndDrop(Calendar);

const localizer = momentLocalizer(moment);
const Cabin_Slot_Booking = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [getCabinSlotBookingList, setGetCabinSlotBookingList] = useState([]);
  const [getCabinList, setGetCabinList] = useState([]);
  const [selectCabin_id, setSelectCabin_id] = useState("all");
  const [inputData, setInputData] = useState([]);
  const [addEventModal, setAddEventModal] = useState(false);
  const [editEventModal, setEditEventModal] = useState(false);
  const [allDay, setAllDay] = useState(false);
  const [renderComponent, setRenderComponent] = useState(false);
  const [location, setLocation] = useState([]);
  const [locationValue, setLocationValue] = useState("all_location");
  const [filteredCabinList, setFilteredCabinList] = useState([]);
  const [startDate, setStartdate] = useState("");
  const [timeValue, setTimeValue] = useState({
    manual_date: convertDateFormate(startDate),
    start_manual_time: "",
    end_manual_time: "",
  });
  const [endDate, setEndDate] = useState("");

  const handleTimeChange = (event) => {
    const { name, value } = event.target;
    setTimeValue((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const inputEvent = (event) => {
    const { name, value } = event.target;
    setInputData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const fetch_Location = async () => {
    const res = await axios
      .get("/get_location", {
        headers: { Access_Token: LocalStorageData?.generate_auth_token },
      })
      .then((rr) => setLocation(rr?.data))
      .catch((err) => {
        if (err.response.status === 500) {
          navigate("/error_500");
        } else {
          navigate("/error_403");
        }
      });
  };
  const fetch_cabin_slot_booking_by_location = async (loc) => {
    const res = await axios
      .get(`/cabin_slot_booking_by_location/${loc}`, {
        headers: { Access_Token: LocalStorageData?.generate_auth_token },
      })
      .then((resp) => {
        const resp__get_cabin_slot_booking_list = resp?.data;
        const getAllEvents = resp__get_cabin_slot_booking_list?.map((val) => ({
          ...val,
          start: new Date(val?.start),
          end: new Date(val?.end),
        }));
        return getAllEvents;
      })
      .then((rr) => setGetCabinSlotBookingList(rr))
      .catch((err) => {
        if (err.response.status === 500) {
          navigate("/error_500");
        } else {
          navigate("/error_403");
        }
      });
  };
  useEffect(() => {
    setLoading(true);
    async function get_cabin_list() {
      await axios
        .get("cabin_list", {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((resp) => {
          const filterdata = resp?.data?.filter((x) => x.status === true);
          return setGetCabinList(filterdata);
        })
        .catch((err) => {
          if (err.response.status === 500) {
            navigate("/error_500");
          } else {
            navigate("/error_403");
          }
        });
    }
    fetch_Location();
    get_cabin_list();
  }, []);
  useEffect(() => {
    async function get_cabin_slot_booking_list() {
      await axios
        .get(`cabin_slot_booking/${selectCabin_id}`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((resp) => {
          const resp__get_cabin_slot_booking_list = resp?.data;
          const getAllEvents = resp__get_cabin_slot_booking_list?.map(
            (val) => ({
              ...val,
              start: new Date(val?.start),
              end: new Date(val?.end),
              title: `Title : ${val?.title} 
               booked by  ${val?.owner}`,
            })
          );
          console.log("get", getAllEvents);
          return getAllEvents;
        })
        .then((rr) => setGetCabinSlotBookingList(rr), setRenderComponent(false))
        .catch((err) => {
          if (err.response.status === 500) {
            navigate("/error_500");
          } else {
            navigate("/error_403");
          }
        });
      setLoading(false);
    }
    get_cabin_slot_booking_list();
  }, [renderComponent === true, selectCabin_id]);

  function convertDateFormate(str) {
    // console.log("sssstr", str);
    const date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  function convertTimeFormate(str) {
    var date = new Date(str);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    return [hours, minutes].join(":");
  }

  const handleSelect = async ({ start, end }) => {
    setStartdate(start);
    // setTimeValue({
    //   ...timeValue,
    //   manual_date: convertDateFormate("Fri May 19 2023 11:15:00 GMT+0530"),
    // });
    setEndDate(end);
    const overlap = getCabinSlotBookingList.some((event) => {
      return (
        (start >= event.start && start < event.end) ||
        (end > event.start && end <= event.end) ||
        (start <= event.start && end >= event.end)
      );
    });
    const currentDate = new Date();
    if (start < currentDate) {
      alert?.show("please select a valid date");
    } else if (selectCabin_id === "all") {
      alert?.show("Please select cabin");
    } else if (overlap) {
      alert?.show("This time slot is already booked!");
    } else {
      setAddEventModal(true);
      const newEvent = {
        start,
        end,
        cabin_id: selectCabin_id,
        user_id: LocalStorageData?.user_id,
        convertStartDate: convertDateFormate(start),
        convertEndDate: convertDateFormate(end),
        convertStartTime: convertTimeFormate(start),
        convertEndTime: convertTimeFormate(end),
      };
      setInputData(newEvent);
    }
  };
  const convertDateTimeToDateObject = (date, time) => {
    const [year, month, day] = date.split("-");
    const [hours, minutes] = time.split(":");
    const dateObject = new Date(year, month - 1, day, hours, minutes);
    return dateObject.toString();
  };

  const [bookingEvent, setBookingEvent] = useState("");
  const onSelectEvent = (event) => {
    setTimeValue({
      manual_date: convertDateFormate(event?.start),
      start_manual_time: convertTimeFormate(event?.start),
      end_manual_time: convertTimeFormate(event?.end),
    });
    setStartdate(event?.start);
    if (event?.user_id !== LocalStorageData?.user_id) {
      alert?.show("you are not thr owener");
    } else {
      setEditEventModal(true);
    }
    setBookingEvent(event);
    setInputData({
      ...event,
      cabin_id: selectCabin_id,
      user_id: LocalStorageData?.user_id,
      convertStartDate: convertDateFormate(event?.start),
      convertEndDate: convertDateFormate(event?.end),
      convertStartTime: convertTimeFormate(event?.start),
      convertEndTime: convertTimeFormate(event?.end),
    });
    setAllDay(event?.allDay);
  };
  const onAddCabinSlotBookingButton = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(
        "cabin_slot_booking",
        {
          ...inputData,
          start:
            timeValue?.start_manual_time === ""
              ? startDate
              : convertDateTimeToDateObject(
                  convertDateFormate(startDate),
                  timeValue?.start_manual_time
                ),
          end:
            timeValue?.start_manual_time === ""
              ? endDate
              : convertDateTimeToDateObject(
                  convertDateFormate(endDate),
                  timeValue?.end_manual_time
                ),
          allDay,
          location: locationValue,
          owner: LocalStorageData?.name,
        },
        {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        }
      )
      .then((resp) => {
        return (
          alert?.show(resp.data.message),
          setAddEventModal(false),
          setAllDay(false),
          setTimeValue({
            start_manual_time: "",
            end_manual_time: "",
          }),
          setRenderComponent(true)
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

  const onRemoveCabinSlotBookingButton = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await axios
      .delete(`cabin_slot_booking/${inputData?._id}`, {
        headers: { Access_Token: LocalStorageData?.generate_auth_token },
      })
      .then((res) => {
        return (
          alert?.show(res.data.message),
          setEditEventModal(false),
          setAllDay(false),
          setRenderComponent(true)
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
  // ====Coloring====
  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColorCode = getCabinList?.filter(
      (val) => val._id === event.cabin_id
    );
    console.log("sdf", event);
    const dynamicValue = event?.owner; // Replace with the actual dynamic value you want to display

    const style = {
      backgroundColor: `rgba(${backgroundColorCode[0]?.color_code?.r},${backgroundColorCode[0]?.color_code?.g},${backgroundColorCode[0]?.color_code?.b},${backgroundColorCode[0]?.color_code?.a})`,
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      dynamicValue: dynamicValue,
    };

    return {
      style,
    };
  };
  const today = new Date();
  const minDate_time = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    9
  );
  const maxDate_time = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    19
  );

  const manually_update_booking = async (e) => {
    e.preventDefault();
    const res = await axios.put(`/cabin_slot_booking/${bookingEvent?._id}`, {
      start: convertDateTimeToDateObject(
        timeValue?.manual_date,
        timeValue?.start_manual_time
      ),
      end: convertDateTimeToDateObject(
        timeValue?.manual_date,
        timeValue?.end_manual_time
      ),
      // end: bookingEvent,
    });
    if (res.data.message === "updated") {
      setEditEventModal(false);
      setRenderComponent(true);
    }
  };

  const resizeEvent = useCallback(({ event, start, end }) => {
    setGetCabinSlotBookingList((prev) => {
      const existing = prev.find((ev) => ev._id === event._id) ?? {};
      const filtered = prev.filter((ev) => ev._id !== event._id);
      const updated = [...filtered, { ...existing, start, end }];
      const lastObject = updated[updated.length - 1];
      const overlappingBooking = getCabinSlotBookingList.find(
        (booking) =>
          (booking.start >= start && booking.start < end) ||
          (booking.end > start && booking.end <= end) ||
          (booking.start <= start && booking.end >= end)
      );

      if (selectCabin_id === "all") {
        alert?.show("Please select cabin");
      } else if (event.start === event.end) {
        alert?.show("Are you sure you want to delete this event?");
      } else if (overlappingBooking && event._id !== overlappingBooking._id) {
        alert?.show("already booked");
      } else {
        setLoading(true);
        async function dragndrop() {
          await axios
            .put(`cabin_slot_booking/${event?._id}`, lastObject, {
              headers: { Access_Token: LocalStorageData?.generate_auth_token },
            })
            .then((res) => {
              return alert?.show(res.data.message), setRenderComponent(true);
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
        dragndrop();
      }
    });
  });

  const moveEvent = useCallback(
    ({
      event,
      start,
      end,
      _id,
      resourceId,
      allDay: droppedOnAllDaySlot = false,
    }) => {
      const { allDay } = event;

      if (!allDay && droppedOnAllDaySlot) {
        // if the event is moved to an all-day slot, update the allDay property
        event.allDay = true;
      } else if (allDay && !droppedOnAllDaySlot) {
        // if the event is moved to a regular slot, update the allDay property
        event.allDay = false;
      }
      const overlappingBooking = getCabinSlotBookingList.find(
        (booking) =>
          (booking.start >= start && booking.start < end) ||
          (booking.end > start && booking.end <= end) ||
          (booking.start <= start && booking.end >= end)
      );
      if (selectCabin_id === "all") {
        alert?.show("Please select cabin");
      } else if (overlappingBooking && event._id !== overlappingBooking._id) {
        alert?.show("already booked");
      } else {
        setGetCabinSlotBookingList((prev) => {
          const existing = prev?.find((ev) => ev?._id === event?._id) ?? {};
          const filtered = prev?.filter((ev) => ev?._id !== event?._id);
          const result2 = [...filtered, { ...existing, start, end, allDay }];
          const lastObject = result2[result2.length - 1];
          setLoading(true);
          async function dragndrop() {
            await axios
              .put(`cabin_slot_booking/${event?._id}`, lastObject, {
                headers: {
                  Access_Token: LocalStorageData?.generate_auth_token,
                },
              })
              .then((res) => {
                return alert?.show(res.data.message), setRenderComponent(true);
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
          dragndrop();
        });
      }
    }
  );

  const handleLocationChange = (e) => {
    setLocationValue(e.target.value);
    setSelectCabin_id("all");
    let filteredCabinList = [];
    let filtered = getCabinList?.filter((x) => x.location === e.target.value);
    filteredCabinList.push(filtered);
    setFilteredCabinList(filteredCabinList);
    fetch_cabin_slot_booking_by_location(e.target.value);
  };

  // ===========To enter time manually=========
  // console.log("startdata", timeValue?.manual_date);

  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <Page_Header
              page_title="Cabin"
              page_title_icon="mdi-home-modern"
              page_title_button="Back"
              page_title_button_link="/dashboard"
            />
            {loading && (
              <div className="loader-container">
                <div class="loader"></div>
              </div>
            )}
            <div className="row">
              <div class="col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <form className="forms-sample">
                      <div className="row">
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Select Your Location</label>
                            <select
                              value={locationValue}
                              className="form-control form-control-sm"
                              onChange={handleLocationChange}
                            >
                              <option value="all_location" selected="selected">
                                All Booking
                              </option>
                              {location?.map((item) => {
                                return (
                                  <option value={item.name}>{item.name}</option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label> Cabin </label>
                            <select
                              name="_id"
                              className="form-control form-control-sm"
                              onChange={(e) =>
                                setSelectCabin_id(e.target.value)
                              }
                            >
                              <option value="all" selected="selected">
                                All Booking
                              </option>
                              {filteredCabinList[0]?.map((val, index) => {
                                return (
                                  <>
                                    <option value={val?._id}>
                                      {val?.name}
                                    </option>
                                  </>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                    </form>
                    <DragAndDropCalendar
                      events={getCabinSlotBookingList}
                      localizer={localizer}
                      onEventDrop={moveEvent}
                      onEventResize={resizeEvent}
                      resizable={true}
                      selectable
                      onSelectSlot={handleSelect}
                      resourceIdAccessor="resourceId"
                      onSelectEvent={onSelectEvent}
                      resourceTitleAccessor="resourceTitle"
                      startAccessor="start"
                      endAccessor="end"
                      defaultView={"week"}
                      // min={minDate_time}
                      // max={maxDate_time}
                      style={{
                        height: "100vh",
                      }}
                      showMultiDayTimes={true}
                      step={15}
                      eventPropGetter={eventStyleGetter}
                    />
                    <PureModal
                      header="Cabin Booking"
                      isOpen={addEventModal}
                      onClose={() => {
                        setAddEventModal(false);
                        setAllDay(false);
                        return true;
                      }}
                      width={"40%"}
                    >
                      <div className="card">
                        <div className="card-body">
                          <form className="forms-sample">
                            <div className="form-group">
                              <label>Title</label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                name="title"
                                placeholder="Username"
                                onChange={inputEvent}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Description</label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                name="description"
                                placeholder="Username"
                                onChange={inputEvent}
                              />
                            </div>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-6">
                                  <label>Start Date</label>
                                  <input
                                    type="date"
                                    className="form-control form-control-sm"
                                    placeholder="Username"
                                    value={inputData?.convertStartDate}
                                    disabled
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label>Start Time</label>
                                  <input
                                    type="time"
                                    className="form-control form-control-sm"
                                    placeholder="Username"
                                    onChange={handleTimeChange}
                                    // name="time"
                                    name="start_manual_time"
                                    value={timeValue?.start_manual_time}
                                    // disabled
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-6">
                                  <label>End Date</label>
                                  <input
                                    type="date"
                                    className="form-control form-control-sm"
                                    placeholder="Username"
                                    value={inputData?.convertEndDate}
                                    disabled
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label>End Time</label>

                                  <input
                                    type="time"
                                    className="form-control form-control-sm"
                                    placeholder="Username"
                                    onChange={handleTimeChange}
                                    // name="time"
                                    name="end_manual_time"
                                    // value={inputData?.convertEndTime}
                                    // disabled
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-check form-check-flat form-check-primary">
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  name="allDay"
                                  onChange={(e) => setAllDay(e.target.checked)}
                                  checked={allDay}
                                />
                                Booking all days{" "}
                                <i className="input-helper"></i>
                              </label>
                            </div>
                            <button
                              type="submit"
                              className="btn btn-sm btn-gradient-primary me-2"
                              onClick={onAddCabinSlotBookingButton}
                            >
                              Submit
                            </button>
                          </form>
                        </div>
                      </div>
                    </PureModal>

                    {/* =======edit========== */}
                    <PureModal
                      header="Cabin Booking"
                      isOpen={editEventModal}
                      onClose={() => {
                        setEditEventModal(false);
                        return true;
                      }}
                      width={"40%"}
                    >
                      <div className="card">
                        <div className="card-body">
                          <form className="forms-sample">
                            <div className="form-group">
                              <label>Title</label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                name="title"
                                placeholder="Username"
                                onChange={inputEvent}
                                value={inputData?.title}
                              />
                            </div>
                            <div className="form-group">
                              <label>Description</label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                name="description"
                                placeholder="Username"
                                onChange={inputEvent}
                                value={inputData?.description}
                              />
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                <label>Date</label>
                                <input
                                  type="date"
                                  className="form-control form-control-sm"
                                  placeholder="Username"
                                  onChange={handleTimeChange}
                                  name="manual_date"
                                  value={timeValue?.manual_date}
                                  // disabled
                                  // required
                                />
                              </div>
                              <div className="col-md-4">
                                <label>Start Time</label>
                                <input
                                  type="time"
                                  className="form-control form-control-sm"
                                  placeholder="Username"
                                  onChange={handleTimeChange}
                                  // name="time"
                                  name="start_manual_time"
                                  value={timeValue?.start_manual_time}
                                  // disabled
                                  required
                                />
                              </div>
                              <div className="col-md-4">
                                <label>End Time</label>
                                <input
                                  type="time"
                                  className="form-control form-control-sm"
                                  placeholder="Username"
                                  onChange={handleTimeChange}
                                  // name="time"
                                  name="end_manual_time"
                                  value={timeValue?.end_manual_time}
                                  // disabled
                                  required
                                />
                              </div>
                            </div>
                            {/* <button
                              type="submit"
                              className="btn btn-sm btn-gradient-primary me-2"
                              onClick={() => {
                                setEditEventModal(false);
                              }}
                            >
                              close
                            </button> */}
                            <button
                              type="submit"
                              className="btn btn-sm btn-gradient-primary me-2"
                              onClick={manually_update_booking}
                            >
                              Update
                            </button>
                            <button
                              type="submit"
                              className="btn btn-sm btn-gradient-danger me-2"
                              onClick={onRemoveCabinSlotBookingButton}
                            >
                              Remove
                            </button>
                          </form>
                        </div>
                      </div>
                    </PureModal>
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

export default Cabin_Slot_Booking;
