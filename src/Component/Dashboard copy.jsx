import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Footer from "../Partials/Footer";
import Navbar from "../Partials/Navbar";
import Page_Header from "../Partials/Page_Header";
import Sidebar from "../Partials/Sidebar";
import ReactApexChart from "react-apexcharts";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
// import {ReactApexChart} from "react-apexcharts";
const Dashboard = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  console.log("eqew", code);
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [userCreationDate, setUserCreationDate] = useState();
  const [cabinSlotBookingCreationDate, setCabinSlotBookingCreationDate] =
    useState();
  const [counterList, setCounterList] = useState([]);
  const [state, setState] = useState({
    series: [7, 3],
    options: {
      chart: {
        // width: 280,
        type: "pie",
        // background: "#fff",
      },
      // labels: ["Active", "Deactivated"],
      fill: {
        colors: ["rgb(0, 227, 150)", "rgb(255, 69, 96)"],
      },
      legend: {
        show: true,
        position: "bottom",
        customLegendItems: ["Active", "Deactivated"],
        markers: {
          width: 12,
          height: 12,
          fillColors: ["rgb(0, 227, 150)", "rgb(255, 69, 96)"],
        },
      },
      dataLabels: {
        style: {
          colors: ["#f8f8f8", "#f8f8f8"],
        },
        enabled: true,
        // textAnchor: "middle",
        // background: {
        //   enabled: true,
        //   opacity: 1,
        //   dropShadow: {
        //     enabled: true,
        //     top: 1,
        //     left: 1,
        //     blur: 1,
        //     color: "red",
        //     opacity: 0.45,
        //   },
        // },
      },
      tooltip: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              // width: 10,
              // background: "#fff",
            },
          },
        },
      ],
    },
  });
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
  const cardArray = [
    // {
    //   card_background: "bg-gradient-info",
    //   path: "/user_list/all_users",
    //   card_title: "Total Users",
    //   card_icon: "mdi-account-multiple-plus",
    //   card_counter_data: counterList?.Total_Users,
    //   card_last_update: userCreationDate,
    //   card_allowed_access: ["Admin", "HR", "Finance", "Management"],
    // },

    // {
    //   card_background: "bg-gradient-success",
    //   path: "/user_list/active_users",
    //   card_title: "Acrive Users",
    //   card_icon: "mdi-account-check",
    //   card_counter_data: counterList?.Active_Users,
    //   card_last_update: userCreationDate,
    //   card_allowed_access: ["Admin", "HR", "Finance", "Management"],
    // },
    // {
    //   card_background: "bg-gradient-danger",
    //   path: "/user_list/deactive_users",
    //   card_title: "Deacrive Users",
    //   card_icon: "mdi-account-remove",
    //   card_counter_data: counterList?.Deactive_Users,
    //   card_allowed_access: ["Admin", "HR", "Finance", "Management"],
    // },
    {
      card_background: "bg-gradient-primary",
      path: "/user_list/pending_onboarding_users",
      card_title: "Pending Onboarding Users",
      card_icon: "mdi-airplane",
      card_counter_data: counterList?.Pending_Onboarding,
      card_allowed_access: ["Admin", "HR", "Finance", "Management"],
    },
    {
      card_background: "bg-gradient-secondary",
      path: "/",
      card_title: "Pending Offboarding Users",
      card_icon: "mdi-airplane-off",
      card_counter_data: counterList?.Pending_Offboarding,
      card_allowed_access: ["Admin", "HR", "Finance", "Management"],
    },
    {
      card_background: "bg-gradient-warning",
      path: "/cabin_slot_booking",
      card_title: "Cabin Booking",
      card_icon: "mdi-home-modern",
      card_counter_data: counterList?.Total_Cabin_Booking,
      card_allowed_access: ["Employee"],
    },
  ];
  const data = {
    labels: ["Active", "Deactivated"],
    datasets: [
      {
        label: "# of Votes",
        data: [3, 7],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };
  // ==================
  const CLIENT_ID = "1000.5T8DM01JDTNRYUPXI0I96CA5WD7YTY";
  const CLIENT_SECRET = "9a85b7eca3f270d6427e4e72005bb3eb2ee6076d06";
  const AUTH_URL = "http://localhost:3000/dashboard";
  const TOKEN_URL = "https://accounts.zoho.in/oauth/v2/token";
  const SCOPE = "ZohoPeople.profile.ALL,ZohoPeople.forms.ALL";
  const REDIRECT_URL = "http://localhost:3000/dashboard"; // your redirect URL
  const GRANT_TYPE = "authorization_code";

  const [accessToken, setAccessToken] = useState("");
  const getAccountDetails = async (abc) => {
    try {
      const response = await fetch(
        "https://people.zoho.com/people/api/forms/P_EmployeeView/records",
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${abc}`,
          },
        }
      );
      const data = await response.json();
      console.log(data); // Log the account details to the console
    } catch (error) {
      console.error(error);
    }
  };

  // Step 2: Get the access token
  const getToken = async () => {
    const tokenUrl = `${TOKEN_URL}?grant_type=${GRANT_TYPE}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URL}&code=${code}`;
    const response = await fetch(tokenUrl, {
      method: "POST",
      redirect: "follow",
    });
    const res = await response.json();
    getAccountDetails(res?.access_token);
    console.log("res", res.access_token);
  };
  getToken();
  // ==================
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
                  <Pie data={data} />

                  {/* <div class="card card-img-holder text-white">
                    <div class="card-body">
                      <NavLink to="/user_list/active_users">
                        <div>
                          <h4 class="font-weight-normal mb-3 mt-2">
                            <span className="me-4">
                              Total Users - {counterList?.Total_Users}
                            </span>
                            <i
                              class="mdi mdi-account-multiple-plus mdi-24px float-right"
                              style={{ float: "right" }}
                            ></i>
                          </h4>
                          <h1 class="mb-4 text-center"></h1>
                        </div>
                      </NavLink>
                      <Pie data={data} />
                    </div>
                  </div> */}
                </div>
                <div class="col-md-3 stretch-card grid-margin">
                  <div class="card bg-gradient-info card-img-holder text-white">
                    <div class="card-body">
                      <NavLink
                        to="/user_list/active_users"
                        style={{
                          color: "#f8f8f8",
                          textDecoration: "none",
                        }}
                      >
                        <div>
                          <img
                            src="assets/images/dashboard/circle.svg"
                            class="card-img-absolute"
                            alt="circle-image"
                          />
                          <h4 class="font-weight-normal mb-3 mt-2">
                            <span className="me-4">
                              Total Users - {counterList?.Total_Users}
                            </span>
                            <i
                              class="mdi mdi-account-multiple-plus mdi-24px float-right"
                              style={{ float: "right" }}
                            ></i>
                          </h4>
                          <h1 class="mb-4 text-center">
                            <ReactApexChart
                              options={state.options}
                              series={state.series}
                              type="pie"
                              // width={380}
                            />
                          </h1>
                        </div>
                      </NavLink>
                    </div>
                  </div>
                </div>
                {LocalStorageData?.role?.map((val) =>
                  cardArray?.map(
                    (result) =>
                      result?.card_allowed_access.includes(val?.name) && (
                        <div class="col-md-3 stretch-card grid-margin">
                          <div
                            class={`card ${result?.card_background} card-img-holder text-white`}
                          >
                            <NavLink
                              to={result?.path}
                              style={{
                                color: "#f8f8f8",
                                textDecoration: "none",
                              }}
                            >
                              <div class="card-body">
                                <div>
                                  <img
                                    src="assets/images/dashboard/circle.svg"
                                    class="card-img-absolute"
                                    alt="circle-image"
                                  />
                                  <h4 class="font-weight-normal mb-3 mt-2">
                                    <span className="me-4">
                                      {result?.card_title}
                                    </span>
                                    <i
                                      class={`mdi ${result?.card_icon} mdi-24px float-right`}
                                      style={{ float: "right" }}
                                    ></i>
                                  </h4>
                                  <h1 class="mb-4 text-center">
                                    {result?.card_counter_data}
                                  </h1>
                                  {result?.card_last_update !== undefined && (
                                    <h6 class="card-text">
                                      Last Updated : {result?.card_last_update}
                                    </h6>
                                  )}
                                </div>
                              </div>
                            </NavLink>
                          </div>
                        </div>
                      )
                  )
                )}
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
