import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import { NavLink, useNavigate } from "react-router-dom";
const GetTravelRequestForm_Data = () => {
  const navigate = useNavigate();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [getleaverequestdata, setGetleaverequestdata] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      await axios
        .get(`all_travel_request`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((result) => {
          const resp = result.data;
          return setGetleaverequestdata(resp), setLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 500) {
            navigate("/error_500");
          } else {
            navigate("/error_403");
          }
        });
    }
    getData();
  }, []);

  //   const clickbuttonalldata = async () => {
  //     setLoading(true);
  //     await axios
  //       .get(`form_flexi`, {
  //         headers: { Access_Token: LocalStorageData?.generate_auth_token },
  //       })
  //       .then((result) => {
  //         const resp = result.data;
  //         const ArrayData = [];
  //         resp.map((val) => {
  //           return ArrayData.push({
  //             Name: val?.name,
  //             Email: val?.email,
  //             "Employee ID": val?.emp_id,
  //             "Salary band": val?.salary_band,
  //             Stream: val?.stream,
  //             Position: val?.position,
  //             "Children allowance": val?.children_allowance,
  //             "Telephone Allowance": val?.telephone_allowance,
  //             Fuel: val?.fuel_allowance,
  //             Driver: val?.driver_allowance,
  //             "Meals Allowance": val?.meals_allowance,
  //             "Books and Periodicals": val?.books_and_periodicals_allowance,
  //           });
  //         });

  //         const worksheet = XLSX.utils.json_to_sheet(ArrayData);
  //         const workbook = XLSX.utils.book_new();
  //         XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
  //         const excelBuffer = XLSX.write(workbook, {
  //           bookType: "xlsx",
  //           type: "array",
  //         });
  //         // console.log(excelBuffer);
  //         const downloadExcel = async () => {
  //           const blob = await new Blob([excelBuffer], {
  //             type: "application/octet-stream",
  //           });
  //           const fileName = `All_Data_Of_Flexible_Benefit_Plan_Form.xlsx`;
  //           saveAs(blob, fileName);
  //         };
  //         downloadExcel();
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         if (err.response.status === 500) {
  //           navigate("/error_500");
  //         } else {
  //           navigate("/error_403");
  //         }
  //       });
  //   };
  //   const clickbuttondata = async (id) => {
  //     setLoading(true);
  //     const result = await axios
  //       .get(`get_form_flexible_by_id/${id}`, {
  //         headers: { Access_Token: LocalStorageData?.generate_auth_token },
  //       })
  //       .then((result) => {
  //         const resp = result.data[0];
  //         const ded = [
  //           ["Sr.No", "#", "Value"],
  //           ["1", "Name", resp.name],
  //           ["2", "Email", resp.email],
  //           ["3", "Employee ID", resp.emp_id],
  //           ["4", "Salary band", resp.salary_band],
  //           ["5", "Stream", resp.stream],
  //           ["6", "Position", resp.position],
  //           ["7", "Children allowance", resp.children_allowance],
  //           ["8", "Telephone Allowance", resp.telephone_allowance],
  //           ["9", "Fuel", resp.fuel_allowance],
  //           ["10", "Driver", resp.driver_allowance],
  //           ["11", "Meals Allowance", resp.meals_allowance],
  //           ["12", "Books and Periodicals", resp.books_and_periodicals_allowance],
  //         ];

  //         const worksheet = XLSX.utils.aoa_to_sheet(ded);
  //         worksheet["!cols"] = [{ width: 15 }, { width: 15 }];
  //         const workbook = XLSX.utils.book_new();
  //         // console.log("workbook", workbook);
  //         XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
  //         const excelBuffer = XLSX.write(workbook, {
  //           bookType: "xlsx",
  //           type: "array",
  //         });
  //         // console.log(excelBuffer);
  //         const downloadExcel = async () => {
  //           const blob = await new Blob([excelBuffer], {
  //             type: "application/octet-stream",
  //           });
  //           const fileName = `${resp.name}_Flexible_Benefit_Plan_Form.xlsx`;
  //           saveAs(blob, fileName);
  //         };
  //         downloadExcel();
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         if (err.response.status === 500) {
  //           navigate("/error_500");
  //         } else {
  //           navigate("/error_403");
  //         }
  //       });
  //   };

  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <Page_Header
              page_title="Travel Request Updates"
              page_title_icon="mdi-home-modern"
              page_title_button="Back"
              page_title_button_link="/dashboard"
            />
            <div className="d-flex justify-content-end mb-3">
              <NavLink to="/travelrequestform">
                <button className="btn btn-primary">Raise Request</button>
              </NavLink>
            </div>
            {loading && (
              <div className="loader-container">
                <div class="loader"></div>
              </div>
            )}
            <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    {/* <h4 class="card-title">Flexible Benefit Plan Form Data</h4> */}

                    {/* <button
                      className="btn btn-outline-primary btn-sm"
                      type="button"
                      //   onClick={() => clickbuttonalldata()}
                      style={{ float: "right" }}
                    >
                      Download All Data
                    </button> */}
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>From</th>
                          <th>To</th>
                          <th>amount</th>
                          <th>Type</th>
                          <th>Manager Approval</th>
                          <th>Management Approval</th>
                          {/* <th>Remarks</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {getleaverequestdata?.map((val, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{val?.from_location}</td>
                              <td>{val?.destination}</td>
                              <td>{val.estimated_amount}</td>
                              <td>{val.type_of_request}</td>
                              <td>
                                <td
                                  className="btn btn-outline-primary btn-sm"
                                  type="button"
                                >
                                  {val?.manager_status}
                                  {/* {val?.status ? "Approved" : "Pending"} */}
                                </td>
                              </td>
                              <td>
                                <td
                                  className="btn btn-outline-primary btn-sm"
                                  type="button"
                                >
                                  {val?.management_status}
                                  {/* {val?.status ? "Approved" : "Pending"} */}
                                </td>
                              </td>
                              {/* <td>{val.remarks}</td> */}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
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

export default GetTravelRequestForm_Data;
