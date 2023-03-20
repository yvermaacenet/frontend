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
