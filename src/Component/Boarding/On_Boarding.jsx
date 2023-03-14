import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { MultiStepForm, Step } from "react-multi-form";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import First_Day_Formalities from "./First_Day_Formalities";
import axios from "axios";
const On_Boarding = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [inputData, setInputData] = useState([]);
  const [renderComponent, setRenderComponent] = useState(false);
  const [active, setActive] = useState(1);
  const [getUserListByID, setGetUserListByID] = useState({});

  const inputEvent = (e) => {
    const { name, checked } = e.target;
    setInputData({ ...inputData, [name]: checked });
  };
  useEffect(() => {
    async function get_on_boarding_list() {
      const result = await axios.get(`/on_boarding/${_id}`);
      const resp = result.data[0];
      setInputData(resp);
      setRenderComponent(false);
    }
    get_on_boarding_list();
    async function get_user_list_by_id() {
      const result_user_list_by_id = await axios.get(
        `/get_user_list_By_Id/${_id}`
      );
      const resp_user_list_by_id = result_user_list_by_id.data[0];
      console.log("resp_user_list_by_id", resp_user_list_by_id);
      setGetUserListByID(resp_user_list_by_id);
    }
    get_user_list_by_id();
  }, [renderComponent === true]);

  const onSaveNextButton = async (event) => {
    event.preventDefault();
    await axios
      .post(`/on_boarding/${_id}`, inputData)
      .then((res) => {
        if (res.data.message === "created") {
          setActive(active + 1);
          setRenderComponent(true);
        }
      })
      .catch((err) => console.log(err));
  };
  const onUpdateNextButton = async (event) => {
    event.preventDefault();
    await axios
      .put(`/on_boarding/${inputData?._id}`, inputData)
      .then((res) => {
        if (res.data.message === "updated") {
          setActive(active + 1);
          setRenderComponent(true);
        }
      })
      .catch((err) => console.log(err));
  };
  const onSubmittedButton = async (event) => {
    event.preventDefault();
    await axios
      .put(`/on_boarding/${inputData?._id}`, {
        ...inputData,
        status: active === 7 ? true : false,
      })
      .then((res) => {
        if (res.data.message === "updated") {
          setActive(1);
          setRenderComponent(true);
          navigate("/user_list");
        }
      })
      .catch((err) => console.log(err));
  };
  var date = new Date(getUserListByID?.joining_date);
  console.log(date);
  return (
    <div class="container-scroller">
      <Navbar />
      <div class="container-fluid page-body-wrapper">
        <Sidebar />
        <div class="main-panel">
          <div class="content-wrapper">
            <Page_Header
              page_title="Boarding"
              page_title_icon="mdi-airplane"
              page_title_button="Back"
              page_title_button_link="/user_list"
            />
            <div class="row">
              <div class="card">
                <div class="card-body">
                  {/* <h4 class="card-title">Default form</h4> */}
                  <p class="card-description"> On Boarding Process </p>
                  <div style={{ margin: "40px" }}>
                    <form class="forms-sample">
                      <MultiStepForm activeStep={active}>
                        <Step label="Employee Details">
                          <div className="row">
                            <div class="card">
                              <div class="card-body">
                                <table class="table table-hover">
                                  <thead>
                                    <tr>
                                      <th> # </th>
                                      <th>#</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td> Name</td>
                                      <td>
                                        {`${getUserListByID?.f_name}
                                        ${getUserListByID?.m_name}
                                        ${getUserListByID?.l_name}`}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td> Designation</td>
                                      <td>{getUserListByID?.designation}</td>
                                    </tr>
                                    <tr>
                                      <td> Date of Joining</td>
                                      <td>
                                        {
                                          getUserListByID?.joining_date?.split(
                                            "T"
                                          )[0]
                                        }
                                      </td>
                                    </tr>
                                    <tr>
                                      <td> Phone No.</td>
                                      <td>{getUserListByID?.phone}</td>
                                    </tr>
                                    <tr>
                                      <td> Current Address</td>
                                      <td>
                                        {getUserListByID?.communication_address}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td> Permanent Address</td>
                                      <td>
                                        {getUserListByID?.permanent_address}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </Step>
                        <Step label="First Day Formalities">
                          <>
                            <div className="row">
                              <div class="card">
                                <div class="card-body">
                                  <table class="table table-hover">
                                    <thead>
                                      <tr>
                                        <th> Field Name </th>
                                        <th> Action </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td> Wifi Passwords </td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="wifi_passwords"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.wifi_passwords
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> Generate Mail Id </td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="genrate_mail_id"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.genrate_mail_id
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> One Drive Access </td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="one_drive_access"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.one_drive_access
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> Add To Official DLs</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="add_to_official_dls"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.add_to_official_dls
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> Teams Access</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="teams_access"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.teams_access
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> Biometric </td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="biometric"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={inputData?.biometric}
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> Induction Call</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="induction_call"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.induction_call
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      {inputData?.induction_call === true ? (
                                        <tr>
                                          <td> Induction Call With</td>
                                          <td>
                                            <select
                                              name="induction_call_with"
                                              onChange={inputEvent}
                                              value={
                                                inputData?.induction_call_with
                                              }
                                              className="form-control mt-2 "
                                              type="text"
                                            >
                                              <option>Please Select</option>
                                              <option value="sunil">
                                                Sunil
                                              </option>
                                              <option value="amit">Amit</option>
                                            </select>
                                          </td>
                                        </tr>
                                      ) : (
                                        ""
                                      )}
                                      <tr>
                                        <td> Acenet Laptop</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="acenet_laptop"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.acenet_laptop
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> Client Laptop</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="client_laptop"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.client_laptop
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> Notepad </td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="notpad"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={inputData?.notpad}
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> T-Shirt</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="t_shirt"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={inputData?.t_shirt}
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> Welcome Kit</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="welcome_kit"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={inputData?.welcome_kit}
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> Intro Slide Shared</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="intro_slide_shared"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.intro_slide_shared
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </>
                        </Step>
                        <Step label="Documents">
                          <>
                            <div className="row">
                              <div class="card">
                                <div class="card-body">
                                  <table class="table table-hover">
                                    <thead>
                                      <tr>
                                        <th> Field Name </th>
                                        <th> Action </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>Aadhar Card</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="aadhar_card"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={inputData?.aadhar_card}
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> PAN Card</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="pan_card"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={inputData?.pan_card}
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> Passport </td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="passport"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={inputData?.passport}
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> DL </td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="dl"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={inputData?.dl}
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> 10th </td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="ten_th"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={inputData?.ten_th}
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> 12th </td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="tweleve_th"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={inputData?.tweleve_th}
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> Graduation </td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="graduation"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={inputData?.graduation}
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> Post Graduation</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="post_graduation"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.post_graduation
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          Experience proof - Relieving letter
                                          from previous employers (if previously
                                          employed)
                                        </td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="experience_proof"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.experience_proof
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> Passport size photograph</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="passport_size_photo"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.passport_size_photo
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> Signed Offer Letter</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="signed_offer_latter"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.signed_offer_latter
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> Document Verification</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="documents_verification"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.documents_verification
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> Covid Certificate</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="covid_certificate"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.covid_certificate
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          Employee Data Sheet (Bank Details)
                                        </td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="employee_data_sheet_bank_details"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.employee_data_sheet_bank_details
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> Other official document</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="other_official_documents"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.other_official_documents
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> Pay slips - Last 3 months</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="pay_slips"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={inputData?.pay_slips}
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          Form 16 or Taxable income statement
                                          duly certified by previous
                                          employer(Statement showing deductions
                                          and Taxable income with break up)
                                        </td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="forms_16"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={inputData?.forms_16}
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </>
                        </Step>
                        <Step label="Compliance Documents">
                          <>
                            <div className="row">
                              <div class="card">
                                <div class="card-body">
                                  <table class="table table-hover">
                                    <thead>
                                      <tr>
                                        <th> Field Name </th>
                                        <th> Action </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td> PF Form Received</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="pf_form_recieved"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.pf_form_recieved
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> PF Form submitted to CA Team</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="pf_submitted_to_ca_team"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.pf_submitted_to_ca_team
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          PF Number shared with the employee
                                        </td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="PF_number_shared_with_the_employee"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.PF_number_shared_with_the_employee
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> Gratuity Form Received</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="gratuity_Form_Received"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.gratuity_Form_Received
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          Gratuity Form submitteed to CA Team
                                        </td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="gratuity_Form_submitteed_to_CA_Team"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.gratuity_Form_submitteed_to_CA_Team
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> GHI Documents Received</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="ghi_documents_received"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.ghi_documents_received
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>GHI Initiated</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="ghi_initiated"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.ghi_initiated
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>GHI E-Card issued</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="ghi_eCard_issued"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.ghi_eCard_issued
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </>
                        </Step>
                        <Step label="HDFC Bank Details">
                          <>
                            <div className="row">
                              <div class="card">
                                <div class="card-body">
                                  <table class="table table-hover">
                                    <thead>
                                      <tr>
                                        <th> Field Name </th>
                                        <th> Action </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td> HDFC Account Mapped</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="hdfc_account_mapped"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.hdfc_account_mapped
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> HDFC Account Initiated</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="hdfc_account_initiated"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.hdfc_account_initiated
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> HDFC Account Opened</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="hdfc_account_opened"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.hdfc_account_opened
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>HDFC Account Benefeciary added</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="hdfc_account_benefeciary_added"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.hdfc_account_benefeciary_added
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div class="form-group">
                                  <label>HDFC Account Mapped</label>
                                  <div className="board">
                                    <span>No</span>
                                    <label class="switch ms-1 me-1 mt-1">
                                      <input
                                        type="checkbox"
                                        name="hdfc_account_mapped"
                                        class="form-control form-control-sm"
                                        onChange={inputEvent}
                                        checked={inputData?.hdfc_account_mapped}
                                      />
                                      <span class="slider round"></span>
                                    </label>
                                    <span>Yes</span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div class="form-group">
                                  <label>HDFC Account Initiated</label>
                                  <div className="board">
                                    <span>No</span>
                                    <label class="switch ms-1 me-1 mt-1">
                                      <input
                                        type="checkbox"
                                        name="hdfc_account_initiated"
                                        class="form-control form-control-sm"
                                        onChange={inputEvent}
                                        checked={
                                          inputData?.hdfc_account_initiated
                                        }
                                      />
                                      <span class="slider round"></span>
                                    </label>
                                    <span>Yes</span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div class="form-group">
                                  <label>HDFC Account Opened</label>
                                  <div className="board">
                                    <span>No</span>
                                    <label class="switch ms-1 me-1 mt-1">
                                      <input
                                        type="checkbox"
                                        name="hdfc_account_opened"
                                        class="form-control form-control-sm"
                                        onChange={inputEvent}
                                        checked={inputData?.hdfc_account_opened}
                                      />
                                      <span class="slider round"></span>
                                    </label>
                                    <span>Yes</span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div class="form-group">
                                  <label>HDFC Account Benefeciary added</label>

                                  <div className="board">
                                    <span>No</span>
                                    <label class="switch ms-1 me-1 mt-1">
                                      <input
                                        type="checkbox"
                                        name="hdfc_account_benefeciary_added"
                                        class="form-control form-control-sm"
                                        onChange={inputEvent}
                                        checked={
                                          inputData?.hdfc_account_benefeciary_added
                                        }
                                      />
                                      <span class="slider round"></span>
                                    </label>
                                    <span>Yes</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        </Step>
                        <Step label="ZOHO Account">
                          <>
                            <div className="row">
                              <div class="card">
                                <div class="card-body">
                                  <table class="table table-hover">
                                    <thead>
                                      <tr>
                                        <th> Field Name </th>
                                        <th> Action </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td> ZOHO People Account Created</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="zoho_people_account_created"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.zoho_people_account_created
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> Zoho People Account Activated</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="zoho_people_account_activated"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.zoho_people_account_activated
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> Zoho Payroll Integrated</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="zoho_payroll_integrated"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.zoho_payroll_integrated
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </>
                        </Step>
                        <Step label="Other Formalities">
                          <>
                            <div className="row">
                              <div class="card">
                                <div class="card-body">
                                  <table class="table table-hover">
                                    <thead>
                                      <tr>
                                        <th> Field Name </th>
                                        <th> Action </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td> BGV Initiated</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="bgv_initiated"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.bgv_initiated
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> BGV Invoice Paid</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="bgv_invoice_Paid"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.bgv_invoice_Paid
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> BGV Report Received</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="bgv_report_Received"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.bgv_report_Received
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td> Update LinkedIn</td>
                                        <td>
                                          <div className="board">
                                            <span>No</span>
                                            <label class="switch ms-1 me-1 mt-1 ">
                                              <input
                                                type="checkbox"
                                                name="update_linkedIn"
                                                class="form-control form-control-sm"
                                                onChange={inputEvent}
                                                checked={
                                                  inputData?.update_linkedIn
                                                }
                                              />
                                              <span class="slider round"></span>
                                            </label>
                                            <span>Yes</span>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </>
                        </Step>
                      </MultiStepForm>

                      {active !== 1 && (
                        <button
                          class="btn btn-sm btn-gradient-primary me-2"
                          onClick={(e) => {
                            return e.preventDefault(), setActive(active - 1);
                          }}
                        >
                          Previous
                        </button>
                      )}
                      {(active !== 7 || active !== 1) && (
                        <>
                          {inputData?._id ? (
                            <button
                              class="btn btn-sm btn-gradient-primary me-2"
                              onClick={onUpdateNextButton}
                              style={{ float: "right" }}
                            >
                              Update & Next
                            </button>
                          ) : (
                            <button
                              class="btn btn-sm btn-gradient-primary me-2"
                              onClick={onSaveNextButton}
                              style={{ float: "right" }}
                            >
                              Save & Next
                            </button>
                          )}
                        </>
                      )}
                      {active === 7 && (
                        <button
                          class="btn btn-sm btn-gradient-primary me-2"
                          onClick={onSubmittedButton}
                          style={{ float: "right" }}
                        >
                          Submitted
                        </button>
                      )}
                    </form>
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
  );
};

export default On_Boarding;
