import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, urlParams } from "react-router-dom";
import Footer from "../Partials/Footer";
import Navbar from "../Partials/Navbar";
import Page_Header from "../Partials/Page_Header";
import Sidebar from "../Partials/Sidebar";
import ReactApexChart from "react-apexcharts";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Pie, Doughnut } from "react-chartjs-2";
// import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

// ChartJS.register(ArcElement, Tooltip, Legend);
// import {ReactApexChart} from "react-apexcharts";
const Dashboard = () => {
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
  const [states, setStates] = useState({ activeIndex: 0 });
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
    sendCode();
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
      card_title: "Pending Onboarding",
      card_icon: "mdi-airplane",
      card_counter_data: counterList?.Pending_Onboarding,
      card_allowed_access: ["Admin", "Hr", "Finance", "Management"],
    },
    {
      card_background: "bg-gradient-secondary",
      path: "/",
      card_title: "Pending Offboarding",
      card_icon: "mdi-airplane-off",
      card_counter_data: counterList?.Pending_Offboarding,
      card_allowed_access: ["Admin", "Hr", "Finance", "Management"],
    },
    {
      card_background: "bg-gradient-warning",
      path: "/cabin_slot_booking",
      card_title: "Cabin Booking",
      card_icon: "mdi-home-modern",
      card_counter_data: counterList?.Total_Cabin_Booking,
      card_allowed_access: [
        "Admin",
        "Hr",
        "Finance",
        "Management",
        "Team member",
      ],
    },
  ];
  // const data = {
  //   labels: ["Active", "Deactivated"],
  //   datasets: [
  //     {
  //       label: "# of Votes",
  //       data: [3, 7],
  //       backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
  //       borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
  //       borderWidth: 1,
  //     },
  //   ],
  // };
  async function sendCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      const result = await axios.post(`sign_in_zoho_get_access_token/${code}`);
      localStorage.setItem("loggedin", JSON.stringify(result.data));
    }
  }
  const data01 = [
    { name: "Active", value: counterList?.Active_Users },
    { name: "Deactive", value: counterList?.Deactive_Users },
  ];

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`Total ${value}`}</text>
        {/* <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text> */}
      </g>
    );
  };
  const onPieEnter = (_, index) => {
    setStates({
      activeIndex: index,
    });
  };
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
                {!LocalStorageData?.zoho_role === "Team member" && (
                  <div class="col-md-4 grid-margin">
                    <PieChart width={400} height={220}>
                      <Pie
                        activeIndex={states?.activeIndex}
                        activeShape={renderActiveShape}
                        data={data01}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#82ca9d"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                      />
                    </PieChart>
                  </div>
                )}

                {/* <div class="col-md-3 stretch-card grid-margin">
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
                </div> */}
                <div class="col-md-6 grid-margin">
                  <div className="row">
                    {cardArray?.map(
                      (result) =>
                        result?.card_allowed_access.includes(
                          LocalStorageData?.zoho_role
                        ) && (
                          <div class="col-md-4 stretch-card grid-margin">
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
                                  </div>
                                </div>
                              </NavLink>
                            </div>
                          </div>
                        )
                    )}
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
