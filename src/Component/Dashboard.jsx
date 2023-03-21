import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Partials/Footer";
import Navbar from "../Partials/Navbar";
import Page_Header from "../Partials/Page_Header";
import Sidebar from "../Partials/Sidebar";

const Dashboard = () => {
  const [userCreationDate, setUserCreationDate] = useState();
  const [cabinSlotBookingCreationDate, setCabinSlotBookingCreationDate] =
    useState();
  const [counterList, setCounterList] = useState([]);
  function convertDateFormate(str) {
    const date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }
  useEffect(() => {
    async function get_counterList() {
      const result = await axios
        .get("/documents_counter")
        .then((res) => {
          return (
            setCounterList(res?.data),
            setUserCreationDate(
              convertDateFormate(
                res?.data?.Active_User_Creation_Date?.creation_date
              )
            ),
            setCabinSlotBookingCreationDate(
              convertDateFormate(
                res?.data?.Cabin_Booking_Creation_Date?.creation_date
              )
            )
          );
        })
        .catch((err) => console.log(err));
    }
    get_counterList();
  }, []);
  console.log(counterList);
  return (
    <>
      <div class="container-scroller">
        <Navbar />
        <div class="container-fluid page-body-wrapper">
          <Sidebar />
          <div class="main-panel">
            <div class="content-wrapper">
              <Page_Header
                page_title="Dashboard"
                page_title_button="Overview"
                page_title_icon="mdi-home"
              />
              <div class="row">
                <div class="col-md-3 stretch-card grid-margin">
                  <div class="card bg-gradient-success card-img-holder text-white">
                    <div class="card-body">
                      <img
                        src="assets/images/dashboard/circle.svg"
                        class="card-img-absolute"
                        alt="circle-image"
                      />
                      <h4 class="font-weight-normal mb-3 mt-2">
                        Acrive Users
                        <i
                          class="mdi mdi-account-multiple-plus mdi-24px float-right"
                          style={{ float: "right" }}
                        ></i>
                      </h4>
                      <h1 class="mb-4 text-center">
                        {counterList.Active_Users}
                      </h1>
                      <h6 class="card-text">
                        Last Updated : {userCreationDate}
                      </h6>
                    </div>
                  </div>
                </div>
                <div class="col-md-3 stretch-card grid-margin">
                  <div class="card bg-gradient-danger card-img-holder text-white">
                    <div class="card-body">
                      <img
                        src="assets/images/dashboard/circle.svg"
                        class="card-img-absolute"
                        alt="circle-image"
                      />
                      <h4 class="font-weight-normal mb-3 mt-2">
                        Deactive Users
                        <i
                          class="mdi mdi-account-remove mdi-24px float-right"
                          style={{ float: "right" }}
                        ></i>
                      </h4>
                      <h1 class="mb-4 text-center">
                        {counterList.Deactive_Users}
                      </h1>
                    </div>
                  </div>
                </div>

                <div class="col-md-3 stretch-card grid-margin">
                  <div class="card bg-gradient-primary card-img-holder text-white">
                    <div class="card-body">
                      <img
                        src="assets/images/dashboard/circle.svg"
                        class="card-img-absolute"
                        alt="circle-image"
                      />
                      <h4 class="font-weight-normal mb-3 mt-2">
                        Pending Onboarding Users
                        <i
                          class="mdi mdi mdi-airplane
                          e mdi-24px float-right"
                          style={{ float: "right" }}
                        ></i>
                      </h4>
                      <h1 class="mb-4 text-center">
                        {counterList.Pending_Onboarding}
                      </h1>
                    </div>
                  </div>
                </div>
                <div class="col-md-3 stretch-card grid-margin">
                  <div class="card bg-gradient-secondary card-img-holder text-white">
                    <div class="card-body">
                      <img
                        src="assets/images/dashboard/circle.svg"
                        class="card-img-absolute"
                        alt="circle-image"
                      />
                      <h4 class="font-weight-normal mb-3 mt-2">
                        Pending Offboarding Users
                        <i
                          class="mdi mdi mdi-airplane-off
                          e mdi-24px float-right"
                          style={{ float: "right" }}
                        ></i>
                      </h4>
                      <h1 class="mb-4 text-center">
                        {counterList.Pending_Offboarding}
                      </h1>
                    </div>
                  </div>
                </div>
                <div class="col-md-3 stretch-card grid-margin">
                  <div class="card bg-gradient-warning card-img-holder text-white">
                    <div class="card-body">
                      <img
                        src="assets/images/dashboard/circle.svg"
                        class="card-img-absolute"
                        alt="circle-image"
                      />
                      <h4 class="font-weight-normal mb-3 mt-2">
                        Cabin Booking
                        <i
                          class="mdi mdi-home-modern
                          mdi-24px float-right"
                          style={{ float: "right" }}
                        ></i>
                      </h4>
                      <h1 class="mb-4 text-center">
                        {counterList.Total_Cabin_Booking}
                      </h1>
                      <h6 class="card-text">
                        Last Updated : {cabinSlotBookingCreationDate}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer class="footer">
              <Footer />
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
