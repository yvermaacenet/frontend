import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
const Department_Add = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    status: false,
  });

  const inputEvent = (event) => {
    const { name, value } = event.target;
    setInputData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const onDepartmentAddButton = (e) => {
    e.preventDefault();
    async function add_cabin() {
      const result = await axios
        .post(`/department_add`, inputData)
        .then((res) => {
          return alert(res?.data.message), navigate("/department_list");
        })
        .catch((err) => console.log(err));
    }
    add_cabin();
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
                page_title="Department"
                page_title_icon="mdi-crosshairs-gps"
                page_title_button="Back"
                page_title_button_link="/department_list"
              />
              <div class="row">
                <div class="card">
                  <div class="card-body">
                    <form class="forms-sample">
                      <div className="row">
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Department </label>
                            <input
                              type="text"
                              name="name"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.name}
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div class="form-group row">
                            <label>Status </label>

                            <label class="switch ms-4 mt-2">
                              <input
                                type="checkbox"
                                name="status"
                                class="form-control form-control-sm"
                                onChange={() => {
                                  return setInputData({
                                    ...inputData,
                                    status: !inputData?.status,
                                  });
                                  // onStatusChange(!checkedStatus)
                                }}
                              />
                              <span class="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        class="btn btn-sm btn-gradient-primary me-2"
                        onClick={onDepartmentAddButton}
                      >
                        Submit
                      </button>
                    </form>
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

export default Department_Add;
