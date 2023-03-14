import axios from "axios";
import React, { useState, useEffect } from "react";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";

const User_Update = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [selectedRoleValues, setSelectedRoleValues] = useState([]);
  const [inputData, setInputData] = useState([]);
  const [checkedStatus, setCheckedStatus] = useState();
  const [getDepartmentList, setGetDepartmentList] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function get_user_data() {
      const result_get_user_data = await axios(`/get_user_list_By_Id/${_id}`);
      const resp_get_user_data = result_get_user_data?.data[0];
      console.log("resp_get_user_data", resp_get_user_data[0]);
      setInputData(resp_get_user_data);
      setCheckedStatus(resp_get_user_data.status);
    }
    get_user_data();
    async function get_department_list() {
      const result_get_department_list = await axios(`/department_list`);
      const resp_get_department_list = result_get_department_list?.data;
      const getSelecterRole = await resp_get_department_list.filter(
        (val) => val.name !== "Admin" && val.name !== "Employee"
      );

      setSelectedRoleValues(getSelecterRole);
      console.log("getSelecterRole", getSelecterRole);
      setGetDepartmentList(getSelecterRole);
    }
    get_department_list();
  }, []);
  const inputEvent = (event) => {
    const { name, value } = event.target;
    setInputData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const onSelect = (selectedList, selectedItem) => {
    setInputData({
      ...inputData,
      role: selectedList,
    });
  };

  const onRemove = (selectedList, removedItem) => {
    setInputData({
      ...inputData,
      role: selectedList,
    });
  };
  const onStatusChange = (status) => {
    async function postStatus() {
      const result = await axios
        .put(`/user_activation/${_id}/${status}`)
        .then((res) =>
          res?.data
            ? alert("Acoount has been activated !!")
            : alert("Acoount has been deactivated !!")
        );
    }
    postStatus();
  };
  const onUpdateButton = (e) => {
    e.preventDefault();
    async function updateData() {
      const result = await axios
        .put(`/user_update/${_id}`, inputData)
        .then((res) => {
          return alert(res?.data.message), navigate("/user_list");
        })
        .catch((err) => console.log(err));
    }
    updateData();
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
                page_title="User"
                page_title_icon="mdi-account-multiple-outline"
                page_title_button="Back"
                page_title_button_link="/user_list"
              />
              <div class="row">
                <div class="card">
                  <div class="card-body">
                    <form class="forms-sample">
                      <div className="row">
                        <div className="col-md-2">
                          <div class="form-group">
                            <label>Username</label>
                            <input
                              type="text"
                              class="form-control form-control-sm"
                              value={inputData?.username}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="form-group">
                            <label>Role</label>
                            <Multiselect
                              options={getDepartmentList} // Options to display in the dropdown
                              selectedValues={inputData?.role} // Preselected value to persist in dropdown
                              onSelect={onSelect} // Function will trigger on select event
                              onRemove={onRemove} // Function will trigger on remove event
                              displayValue="name" // Property name to display in the dropdown options
                              showCheckbox={true}
                              // disablePreSelectedValues={
                              //   inputData?.user_emp_id === 0 ? true : false
                              // }
                              // closeIcon
                              disable={
                                inputData?.user_emp_id === 0 ? true : false
                              }
                              caseSensitiveSearch={false}
                              avoidHighlightFirstOption={true}
                              style={{
                                chips: {
                                  // To change css chips(Selected options)
                                  background: "gray",
                                },
                                option: {
                                  // To change css for dropdown options
                                  color: "gray",
                                },
                              }}
                              // selectionLimit={1}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Official Email</label>
                            <input
                              type="text"
                              class="form-control form-control-sm"
                              value={inputData?.company_email}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="row">
                            <div className="col-md-6">
                              <div class="form-group row">
                                <label>Status</label>
                                <label class="switch ms-4 mt-2">
                                  <input
                                    type="checkbox"
                                    name="status"
                                    class="form-control form-control-sm"
                                    // onChange={inputEvent}
                                    // onChange={(e) => onStatusChange(e, value?._id)}
                                    checked={checkedStatus}
                                    onChange={() => {
                                      return (
                                        setCheckedStatus(!checkedStatus),
                                        onStatusChange(!checkedStatus)
                                      );
                                    }}
                                  />
                                  <span class="slider round"></span>
                                </label>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div class="form-group row">
                                <label>Employee Id</label>
                                <input
                                  type="text"
                                  class="form-control form-control-sm"
                                  value={inputData?.user_emp_id}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> First Name </label>
                            <input
                              type="text"
                              name="f_name"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.f_name}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> Middle Name </label>
                            <input
                              type="text"
                              name="m_name"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.m_name}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Last Name </label>
                            <input
                              type="text"
                              name="last_name"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.last_name}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> Father Name </label>
                            <input
                              type="text"
                              name="father_name"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.father_name}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> dob </label>
                            <input
                              type="date"
                              name="dob"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.dob}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> joining_date </label>
                            <input
                              type="date"
                              name="joining_date"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.joining_date}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> designation </label>
                            <input
                              type="text"
                              name="designation"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.designation}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> base_location </label>
                            <input
                              type="text"
                              name="base_location"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.base_location}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> base_location_oth </label>
                            <input
                              type="text"
                              name="base_location_oth"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.base_location_oth}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> permanent_address </label>
                            <textarea
                              type="text"
                              name="permanent_address"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.permanent_address}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> communication_address </label>
                            <textarea
                              type="text"
                              name="communication_address"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.communication_address}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> personal_email </label>
                            <input
                              type="text"
                              name="personal_email"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.personal_email}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> emergency_contact_person_name </label>
                            <input
                              type="text"
                              name="emergency_contact_person_name"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.emergency_contact_person_name}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>
                              {" "}
                              emergency_contact_person_relationship{" "}
                            </label>
                            <input
                              type="text"
                              name="emergency_contact_person_relationship"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={
                                inputData?.emergency_contact_person_relationship
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> emergency_contact_person_phone </label>
                            <input
                              type="text"
                              name="emergency_contact_person_phone"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.emergency_contact_person_phone}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> medical_history </label>
                            <select
                              name="medical_history"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.medical_history}
                            >
                              <option value="">--Select--</option>
                              <option value={1}>Yes</option>
                              <option value={0}>No</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> group_health_insurance </label>
                            <select
                              name="group_health_insurance"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.group_health_insurance}
                            >
                              <option value="">--Select--</option>
                              <option value={1}>Yes</option>
                              <option value={0}>No</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> v_p_f </label>
                            <select
                              name="v_p_f"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.v_p_f}
                            >
                              <option value="">--Select--</option>
                              <option value={1}>Yes</option>
                              <option value={0}>No</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> legal_history </label>
                            <input
                              type="text"
                              name="legal_history"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.legal_history}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> passport_number </label>
                            <input
                              type="number"
                              name="passport_number"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.passport_number}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> passport_validity </label>
                            <input
                              type="date"
                              name="passport_validity"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.passport_validity}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> aadhar_number </label>
                            <input
                              type="number"
                              name="aadhar_number"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.aadhar_number}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> pan_number </label>
                            <input
                              type="text"
                              name="pan_number"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.pan_number}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> highest_education </label>
                            <select
                              name="highest_education"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.highest_education}
                            >
                              <option
                                value=""
                                selected="selected"
                                disabled="disabled"
                              >
                                -- select one --
                              </option>
                              <option value={1}>No formal education</option>
                              <option value={2}>Primary education</option>
                              <option value={3}>
                                Secondary education or high school
                              </option>
                              <option value={4}>GED</option>
                              <option value={5}>
                                Vocational qualification
                              </option>
                              <option value={6}>Bachelor's degree</option>
                              <option value={7}>Master's degree</option>
                              <option value={8}>Doctorate or higher</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> bank_name </label>
                            <input
                              type="text"
                              name="bank_name"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.bank_name}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> name_in_bank_account </label>
                            <input
                              type="text"
                              name="name_in_bank_account"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.name_in_bank_account}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> bank_account_number </label>
                            <input
                              type="text"
                              name="bank_account_number"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.bank_account_number}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> bank_ifsc_code </label>
                            <input
                              type="text"
                              name="bank_ifsc_code"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.bank_ifsc_code}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> bank_branch_name </label>
                            <input
                              type="text"
                              name="bank_branch_name"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.bank_branch_name}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> covid_vaccination </label>
                            <select
                              name="covid_vaccination"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.covid_vaccination}
                            >
                              <option value="">--Select--</option>
                              <option value={1}>Yes</option>
                              <option value={0}>No</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> vaccination_certificate_provided </label>
                            <select
                              name="vaccination_certificate_provided"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={
                                inputData?.vaccination_certificate_provided
                              }
                            >
                              <option value="">--Select--</option>
                              <option value={1}>Yes</option>
                              <option value={0}>No</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> t_shirt_size </label>
                            <select
                              name="t_shirt_size"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.t_shirt_size}
                            >
                              <option value="">--Select--</option>
                              <option value="s">S</option>
                              <option value="m">M</option>
                              <option value="l">L</option>
                              <option value="xl">XL</option>
                              <option value="xxl">XXl</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> add_company_linkedIn </label>
                            <select
                              name="add_company_linkedIn"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.add_company_linkedIn}
                            >
                              <option value="">--Select--</option>
                              <option value={1}>Yes</option>
                              <option value={0}>No</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> about </label>
                            <input
                              type="text"
                              name="about"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.about}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> phone </label>
                            <input
                              type="text"
                              name="phone"
                              class="form-control form-control-sm"
                              onChange={inputEvent}
                              value={inputData?.phone}
                              disabled
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        class="btn btn-sm btn-gradient-primary me-2"
                        onClick={onUpdateButton}
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

export default User_Update;
