import React from "react";
import Footer from "../Partials/Footer";
import Navbar from "../Partials/Navbar";
import Page_Header from "../Partials/Page_Header";
import Sidebar from "../Partials/Sidebar";

const Dashboard = () => {
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
                <div class="col-md-4 stretch-card grid-margin">
                  <div class="card bg-gradient-danger card-img-holder text-white">
                    <div class="card-body">
                      <img
                        src="assets/images/dashboard/circle.svg"
                        class="card-img-absolute"
                        alt="circle-image"
                      />
                      <h4 class="font-weight-normal mb-3">
                        Weekly Sales
                        <i class="mdi mdi-chart-line mdi-24px float-right"></i>
                      </h4>
                      <h2 class="mb-5">$ 15,0000</h2>
                      <h6 class="card-text">Increased by 60%</h6>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 stretch-card grid-margin">
                  <div class="card bg-gradient-info card-img-holder text-white">
                    <div class="card-body">
                      <img
                        src="assets/images/dashboard/circle.svg"
                        class="card-img-absolute"
                        alt="circle-image"
                      />
                      <h4 class="font-weight-normal mb-3">
                        Weekly Orders
                        <i class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                      </h4>
                      <h2 class="mb-5">45,6334</h2>
                      <h6 class="card-text">Decreased by 10%</h6>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 stretch-card grid-margin">
                  <div class="card bg-gradient-success card-img-holder text-white">
                    <div class="card-body">
                      <img
                        src="assets/images/dashboard/circle.svg"
                        class="card-img-absolute"
                        alt="circle-image"
                      />
                      <h4 class="font-weight-normal mb-3">
                        Visitors Online
                        <i class="mdi mdi-diamond mdi-24px float-right"></i>
                      </h4>
                      <h2 class="mb-5">95,5741</h2>
                      <h6 class="card-text">Increased by 5%</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-7 grid-margin stretch-card">
                  <div class="card">
                    <div class="card-body">
                      <div class="clearfix">
                        <h4 class="card-title float-left">
                          Visit And Sales Statistics
                        </h4>
                        <div
                          id="visit-sale-chart-legend"
                          class="rounded-legend legend-horizontal legend-top-right float-right"
                        ></div>
                      </div>
                      <canvas id="visit-sale-chart" class="mt-4"></canvas>
                    </div>
                  </div>
                </div>
                <div class="col-md-5 grid-margin stretch-card">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">Traffic Sources</h4>
                      <canvas id="traffic-chart"></canvas>
                      <div
                        id="traffic-chart-legend"
                        class="rounded-legend legend-vertical legend-bottom-left pt-4"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 grid-margin">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">Recent Tickets</h4>
                      <div class="table-responsive">
                        <table class="table">
                          <thead>
                            <tr>
                              <th> Assignee </th>
                              <th> Subject </th>
                              <th> Status </th>
                              <th> Last Update </th>
                              <th> Tracking ID </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <img
                                  src="assets/images/faces/face1.jpg"
                                  class="me-2"
                                  alt="image"
                                />
                                David Grey
                              </td>
                              <td> Fund is not recieved </td>
                              <td>
                                <label class="badge badge-gradient-success">
                                  DONE
                                </label>
                              </td>
                              <td> Dec 5, 2017 </td>
                              <td> WD-12345 </td>
                            </tr>
                            <tr>
                              <td>
                                <img
                                  src="assets/images/faces/face2.jpg"
                                  class="me-2"
                                  alt="image"
                                />
                                Stella Johnson
                              </td>
                              <td> High loading time </td>
                              <td>
                                <label class="badge badge-gradient-warning">
                                  PROGRESS
                                </label>
                              </td>
                              <td> Dec 12, 2017 </td>
                              <td> WD-12346 </td>
                            </tr>
                            <tr>
                              <td>
                                <img
                                  src="assets/images/faces/face3.jpg"
                                  class="me-2"
                                  alt="image"
                                />
                                Marina Michel
                              </td>
                              <td> Website down for one week </td>
                              <td>
                                <label class="badge badge-gradient-info">
                                  ON HOLD
                                </label>
                              </td>
                              <td> Dec 16, 2017 </td>
                              <td> WD-12347 </td>
                            </tr>
                            <tr>
                              <td>
                                <img
                                  src="assets/images/faces/face4.jpg"
                                  class="me-2"
                                  alt="image"
                                />
                                John Doe
                              </td>
                              <td> Loosing control on server </td>
                              <td>
                                <label class="badge badge-gradient-danger">
                                  REJECTED
                                </label>
                              </td>
                              <td> Dec 3, 2017 </td>
                              <td> WD-12348 </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 grid-margin stretch-card">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">Recent Updates</h4>
                      <div class="d-flex">
                        <div class="d-flex align-items-center me-4 text-muted font-weight-light">
                          <i class="mdi mdi-account-outline icon-sm me-2"></i>
                          <span>jack Menqu</span>
                        </div>
                        <div class="d-flex align-items-center text-muted font-weight-light">
                          <i class="mdi mdi-clock icon-sm me-2"></i>
                          <span>October 3rd, 2018</span>
                        </div>
                      </div>
                      <div class="row mt-3">
                        <div class="col-6 pe-1">
                          <img
                            src="assets/images/dashboard/img_1.jpg"
                            class="mb-2 mw-100 w-100 rounded"
                            alt="image"
                          />
                          <img
                            src="assets/images/dashboard/img_4.jpg"
                            class="mw-100 w-100 rounded"
                            alt="image"
                          />
                        </div>
                        <div class="col-6 ps-1">
                          <img
                            src="assets/images/dashboard/img_2.jpg"
                            class="mb-2 mw-100 w-100 rounded"
                            alt="image"
                          />
                          <img
                            src="assets/images/dashboard/img_3.jpg"
                            class="mw-100 w-100 rounded"
                            alt="image"
                          />
                        </div>
                      </div>
                      <div class="d-flex mt-5 align-items-top">
                        <img
                          src="assets/images/faces/face3.jpg"
                          class="img-sm rounded-circle me-3"
                          alt="image"
                        />
                        <div class="mb-0 flex-grow">
                          <h5 class="me-2 mb-2">
                            School Website - Authentication Module.
                          </h5>
                          <p class="mb-0 font-weight-light">
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page.
                          </p>
                        </div>
                        <div class="ms-auto">
                          <i class="mdi mdi-heart-outline text-muted"></i>
                        </div>
                      </div>
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
