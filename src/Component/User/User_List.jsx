import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";

const User_List = () => {
  const [getUserList, setGetUserList] = useState([]);
  useEffect(() => {
    async function get_user_list() {
      const result_user_list = await axios.get("user_list");
      const resp_user_list = result_user_list.data;
      console.log("resp_user_list", resp_user_list);
      setGetUserList(resp_user_list);
    }
    get_user_list();
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
                page_title="User"
                page_title_icon="mdi-account-multiple-outline"
                page_title_button="Add"
                page_title_button_link="/user_add"
              />
              <div class="row">
                <div class="card">
                  <div class="card-body">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Name</th>
                          <th>Username</th>
                          <th>Personal Email</th>
                          <th>Phone No</th>
                          <th>Official Email</th>
                          <th>Designation</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getUserList.map((value, index) => {
                          return (
                            <tr>
                              <td class="py-1">
                                <img
                                  src={`../../assets/images/faces-clipart/pic-${
                                    index <= 3 ? index + 1 : 2
                                  }.png`}
                                  alt="image"
                                />
                              </td>
                              <td>
                                {value.f_name} {value.m_name} {value.l_name}
                              </td>
                              <td> {value.username} </td>
                              <td> {value.personal_email} </td>
                              <td> {value.phone} </td>
                              <td> {value.company_email} </td>
                              <td> {value.designation} </td>
                              <td>
                                {value.role.map((res, index) => {
                                  return (
                                    <label
                                      class="badge me-1"
                                      style={{
                                        background: `#${Math.random()
                                          .toString(16)
                                          .slice(2, 8)
                                          .padEnd(6, 0)}`,
                                      }}
                                    >
                                      {res.name}
                                    </label>
                                  );
                                })}
                              </td>
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
                                <NavLink to={`/user_update/${value?._id}`}>
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-inverse-dark btn-icon"
                                    title="Edit"
                                  >
                                    <i class="mdi mdi-table-edit"></i>
                                  </button>
                                </NavLink>
                              </td>
                              <td>
                                <NavLink to={`/on_boarding/${value?._id}`}>
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-inverse-dark btn-icon"
                                    title="On Boarding"
                                  >
                                    <i class="mdi mdi-airplane-takeoff"></i>
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

export default User_List;
