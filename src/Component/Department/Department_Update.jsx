import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";

const Department_Update = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState([]);

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
    async function get_depatment_data() {
      const result_get_deparment_data_by_id = await axios(
        `/department_list_by_id/${_id}`
      );
      const resp_get_deparment_data_by_id =
        result_get_deparment_data_by_id?.data;
      setInputData(resp_get_deparment_data_by_id);
    }
    get_depatment_data();
  }, []);

  const onDepartmentUpdateButton = (e) => {
    e.preventDefault();
    async function add_cabin() {
      const result = await axios
        .put(`/department_update/${_id}`, inputData)
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
                page_title_icon="mdi-home-modern"
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
                            <label>Department Name </label>
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
                                checked={inputData.status}
                              />
                              <span class="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        class="btn btn-sm btn-gradient-primary me-2"
                        onClick={onDepartmentUpdateButton}
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

export default Department_Update;
