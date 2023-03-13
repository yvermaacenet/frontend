import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
const Department_List = () => {
  const [getDepartmentList, setGetDepartmentList] = useState([]);

  console.log("getDepartmentList", getDepartmentList);
  useEffect(() => {
    async function get_department_list() {
      const result_department_list = await axios.get("department_list");
      const resp_department_list = result_department_list.data;
      console.log("resp_department_list", resp_department_list);
      setGetDepartmentList(resp_department_list);
    }
    get_department_list();
  }, []);

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
                page_title_button="Add"
                page_title_button_link="/department_add"
              />
              <div class="row">
                <div class="card">
                  <div class="card-body">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Department</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getDepartmentList.map((value, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{value.name}</td>

                              <td>
                                {value?.status ? (
                                  <label class="badge badge-success">
                                    Active
                                  </label>
                                ) : (
                                  <label class="badge badge-danger">
                                    Deactive
                                  </label>
                                )}
                              </td>

                              <td>
                                <NavLink
                                  to={`/department_update/${value?._id}`}
                                >
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-inverse-dark btn-icon"
                                    title="Edit"
                                  >
                                    <i class="mdi mdi-table-edit"></i>
                                  </button>
                                </NavLink>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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

export default Department_List;
