import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import CustomTooltipForCalender from "../../Utils/CustomTooltipForCalender";
const localizer = momentLocalizer(moment);
const Cabin_Slot_Booking = () => {
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [getCabinSlotBookingList, setGetCabinSlotBookingList] = useState([]);
  const [getCabinList, setGetCabinList] = useState([]);
  const [selectCabin_id, setSelectCabin_id] = useState("all");
  const [inputData, setInputData] = useState([]);
  const [addEventModal, setAddEventModal] = useState(false);
  const [editEventModal, setEditEventModal] = useState(false);
  const [allDay, setAllDay] = useState(false);
  const [renderComponent, setRenderComponent] = useState(false);
  const inputEvent = (event) => {
    const { name, value } = event.target;
    setInputData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    async function get_cabin_list() {
      const result_get_cabin_list = await axios("cabin_list");
      const resp__get_cabin_list = result_get_cabin_list?.data;
      setGetCabinList(resp__get_cabin_list);
    }
    get_cabin_list();
  }, []);
  useEffect(() => {
    async function get_cabin_slot_booking_list() {
      const result_get_cabin_slot_booking_list = await axios(
        `cabin_slot_booking/${selectCabin_id}`
      );
      const resp__get_cabin_slot_booking_list =
        result_get_cabin_slot_booking_list?.data;
      const getAllEvents = await resp__get_cabin_slot_booking_list?.map(
        (val) => ({
          ...val,
          start: new Date(val.start),
          end: new Date(val.end),
        })
      );
      setGetCabinSlotBookingList(getAllEvents);
      setRenderComponent(false);
    }
    get_cabin_slot_booking_list();
  }, [renderComponent === true, selectCabin_id]);

  function convertDateFormate(str) {
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
    const overlap = getCabinSlotBookingList.some((event) => {
      return (
        (start >= event.start && start < event.end) ||
        (end > event.start && end <= event.end) ||
        (start <= event.start && end >= event.end)
      );
    });
    if (selectCabin_id === "all") {
      alert("Please select cabin");
    } else if (overlap) {
      alert("This time slot is already booked!");
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

  const onSelectEvent = (event) => {
    setEditEventModal(true);
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
    const result = await axios
      .post("cabin_slot_booking", {
        ...inputData,
        allDay,
      })
      .then((res) => {
        return (
          alert(res.data.message),
          setAddEventModal(false),
          setAllDay(false),
          setRenderComponent(true)
        );
      })
      .catch((err) => console.log(err));
  };
  const onEditCabinSlotBookingButton = async (e) => {
    e.preventDefault();
    const result = await axios
      .put(`cabin_slot_booking/${inputData?._id}`, {
        ...inputData,
        allDay,
      })
      .then((res) => {
        return (
          alert(res.data.message),
          setEditEventModal(false),
          setAllDay(false),
          setRenderComponent(true)
        );
      })
      .catch((err) => console.log(err));
  };
  const onRemoveCabinSlotBookingButton = async (e) => {
    e.preventDefault();
    const result = await axios
      .delete(`cabin_slot_booking/${inputData?._id}`)
      .then((res) => {
        return (
          alert(res.data.message),
          setEditEventModal(false),
          setAllDay(false),
          setRenderComponent(true)
        );
      })
      .catch((err) => console.log(err));
  };
  // ====Coloring====
  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColorCode = getCabinList.filter(
      (val) => val._id === event.cabin_id
    );
    const style = {
      backgroundColor: `rgba(${backgroundColorCode[0].color_code.r},${backgroundColorCode[0].color_code.g},${backgroundColorCode[0].color_code.b},${backgroundColorCode[0].color_code.a})`,
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      border: "0px",
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
  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <Page_Header page_title="Cabin" page_title_icon="mdi-home-modern" />
            <div className="row">
              <div className="card">
                <div className="card-body">
                  <form className="forms-sample">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label> Cabin </label>
                          <select
                            name="_id"
                            className="form-control form-control-sm"
                            onChange={(e) => setSelectCabin_id(e.target.value)}
                          >
                            <option
                              value="all"
                              selected="selected"
                              // disabled="disabled"
                            >
                              All Booking
                            </option>
                            {getCabinList?.map((val, index) => {
                              return (
                                <>
                                  <option value={val?._id}>{val?.name}</option>
                                </>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>
                  <Calendar
                    localizer={localizer}
                    events={getCabinSlotBookingList}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView={"week"}
                    min={minDate_time}
                    max={maxDate_time}
                    style={{ height: "100vh" }}
                    step={15}
                    timeslots={4}
                    selectable
                    onSelectSlot={handleSelect}
                    onSelectEvent={onSelectEvent}
                    eventPropGetter={eventStyleGetter}
                  />
                  <PureModal
                    header="Cabin Booking"
                    isOpen={addEventModal}
                    // closeButtonPosition="bottom"
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
                                  // onChange={inputEvent}
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
                                  onChange={inputEvent}
                                  name="time"
                                  value={inputData?.convertStartTime}
                                  disabled
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
                                  // onChange={inputEvent}
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
                                  onChange={inputEvent}
                                  name="time"
                                  value={inputData?.convertEndTime}
                                  disabled
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
                              Booking all days <i className="input-helper"></i>
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
                  <PureModal
                    header="Cabin Booking"
                    isOpen={editEventModal}
                    // closeButtonPosition="bottom"
                    onClose={() => {
                      setEditEventModal(false);
                      // setAllDay(false);
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
                          <div className="form-group">
                            <div className="row">
                              <div className="col-md-6">
                                <label>Start Date</label>
                                <input
                                  type="date"
                                  className="form-control form-control-sm"
                                  placeholder="Username"
                                  // onChange={inputEvent}
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
                                  onChange={inputEvent}
                                  name="time"
                                  value={inputData?.convertStartTime}
                                  disabled
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
                                  // onChange={inputEvent}
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
                                  onChange={inputEvent}
                                  name="time"
                                  value={inputData?.convertEndTime}
                                  disabled
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
                              Booking all days <i className="input-helper"></i>
                            </label>
                          </div>
                          <button
                            type="submit"
                            className="btn btn-sm btn-gradient-primary me-2"
                            onClick={onEditCabinSlotBookingButton}
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
          <footer className="footer">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Cabin_Slot_Booking;
