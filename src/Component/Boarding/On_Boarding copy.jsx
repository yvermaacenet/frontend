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
  const inputEvent = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };
  const [active, setActive] = useState(2);
  useEffect(() => {
    async function get_on_boarding_list() {
      const result = await axios.get(`/on_boarding/${_id}`);
      const resp = result.data[0];
      setInputData(resp);
      setRenderComponent(false);
    }
    get_on_boarding_list();
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

    // setActive(active + 1);
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
                          {/* <Shipping /> */}
                        </Step>
                        <Step label="First Day Formalities">
                          <>
                            <div className="row">
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Wifi Passwords</label>
                                  <select
                                    name="wifi_passwords"
                                    onChange={inputEvent}
                                    value={inputData?.wifi_passwords}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Generate Mail Id</label>
                                  <select
                                    name="genrate_mail_id"
                                    onChange={inputEvent}
                                    value={inputData?.genrate_mail_id}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>One Drive Access</label>
                                  <select
                                    name="one_drive_access"
                                    onChange={inputEvent}
                                    value={inputData?.one_drive_access}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Add To Official DLs</label>
                                  <select
                                    name="add_to_official_dls"
                                    onChange={inputEvent}
                                    value={inputData?.add_to_official_dls}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Teams Access</label>
                                  <select
                                    name="teams_access"
                                    onChange={inputEvent}
                                    value={inputData?.teams_access}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Biometric</label>
                                  <select
                                    name="biometric"
                                    onChange={inputEvent}
                                    value={inputData?.biometric}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Induction Call</label>
                                  <select
                                    name="induction_call"
                                    onChange={inputEvent}
                                    value={inputData?.induction_call}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Induction Call With</label>
                                  <select
                                    name="induction_call_with"
                                    onChange={inputEvent}
                                    value={inputData?.induction_call_with}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="sunil">Sunil</option>
                                    <option value="amit">Amit</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Acenet Laptop</label>
                                  <select
                                    name="acenet_laptop"
                                    onChange={inputEvent}
                                    value={inputData?.acenet_laptop}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Client Laptop</label>
                                  <select
                                    name="client_laptop"
                                    onChange={inputEvent}
                                    value={inputData?.client_laptop}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Notepad</label>
                                  <select
                                    name="notepad"
                                    onChange={inputEvent}
                                    value={inputData?.notepad}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Welcome Kit</label>
                                  <select
                                    name="welcome_kit"
                                    onChange={inputEvent}
                                    value={inputData?.welcome_kit}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Intro Slide Shared</label>
                                  <select
                                    name="intro_slide_shared"
                                    onChange={inputEvent}
                                    value={inputData?.intro_slide_shared}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>T-shirt</label>
                                  <select
                                    name="t_shirt"
                                    onChange={inputEvent}
                                    value={inputData?.t_shirt}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </>
                        </Step>
                        <Step label="Documents">
                          <>
                            <div className="row">
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Aadhar Card</label>
                                  <select
                                    name="aadhar_card"
                                    onChange={inputEvent}
                                    value={inputData?.aadhar_card}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>PAN Card</label>
                                  <select
                                    name="pan_card"
                                    onChange={inputEvent}
                                    value={inputData?.pan_card}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Passport</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Passport</label>
                                  <select
                                    name="passport"
                                    onChange={inputEvent}
                                    value={inputData?.passport}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>DL</label>
                                  <select
                                    name="dl"
                                    onChange={inputEvent}
                                    value={inputData?.dl}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>10th</label>
                                  <select
                                    name="ten_th"
                                    onChange={inputEvent}
                                    value={inputData?.ten_th}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>12th</label>
                                  <select
                                    name="tweleve_th"
                                    onChange={inputEvent}
                                    value={inputData?.tweleve_th}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option></option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Graduation</label>
                                  <select
                                    name="graduation"
                                    onChange={inputEvent}
                                    value={inputData?.graduation}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Post Graduation</label>
                                  <select
                                    name="post_graduation"
                                    onChange={inputEvent}
                                    value={inputData?.post_graduation}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>
                                    Experience proof - Relieving letter from
                                    previous employers (if previously employed)
                                  </label>
                                  <select
                                    name="experience_proof"
                                    onChange={inputEvent}
                                    value={inputData?.experience_proof}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Passport size photograph</label>
                                  <select
                                    name="passport_size_photo"
                                    onChange={inputEvent}
                                    value={inputData?.passport_size_photo}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Signed Offer Letter</label>
                                  <select
                                    name="signed_offer_latter"
                                    onChange={inputEvent}
                                    value={inputData?.signed_offer_latter}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Document Verification</label>
                                  <select
                                    name="documents_verification"
                                    onChange={inputEvent}
                                    value={inputData?.documents_verification}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Covid Certificate</label>
                                  <select
                                    name="covid_certificate"
                                    onChange={inputEvent}
                                    value={inputData?.covid_certificate}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>
                                    Employee Data Sheet (Bank Details)
                                  </label>
                                  <select
                                    name="employee_data_sheet_bank_details"
                                    onChange={inputEvent}
                                    value={
                                      inputData?.employee_data_sheet_bank_details
                                    }
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Passport</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Other official document</label>
                                  <select
                                    name="other_official_documents"
                                    onChange={inputEvent}
                                    value={inputData?.other_official_documents}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Pay slips - Last 3 months</label>
                                  <select
                                    name="pay_slips"
                                    onChange={inputEvent}
                                    value={inputData?.pay_slips}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-3">
                                  <div class="form-group">
                                    <label>
                                      Form 16 or Taxable income statement duly
                                      certified by previous employer(Statement
                                      showing deductions and Taxable income with
                                      break up)
                                    </label>
                                    <select
                                      name="forms_16"
                                      onChange={inputEvent}
                                      value={inputData?.forms_16}
                                      className="form-control mt-2 "
                                      type="text"
                                    >
                                      <option>Please Select</option>
                                      <option value="No">No</option>
                                      <option value="Yes">Yes</option>
                                      <option value="NA">NA</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        </Step>
                        <Step label="Compliance Documents">
                          <>
                            <div className="row">
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>PF Form Received</label>
                                  <select
                                    name="pf_form_recieved"
                                    onChange={inputEvent}
                                    value={inputData?.pf_form_recieved}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>PF Form submitted to CA Team</label>
                                  <select
                                    name="pf_submitted_to_ca_team"
                                    onChange={inputEvent}
                                    value={inputData?.pf_submitted_to_ca_team}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>
                                    PF Number shared with the employee
                                  </label>
                                  <select
                                    name="PF_number_shared_with_the_employee"
                                    onChange={inputEvent}
                                    value={
                                      inputData?.PF_number_shared_with_the_employee
                                    }
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Gratuity Form Received</label>
                                  <select
                                    name="gratuity_Form_Received"
                                    onChange={inputEvent}
                                    value={inputData?.gratuity_Form_Received}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>
                                    Gratuity Form submitteed to CA Team
                                  </label>
                                  <select
                                    name="gratuity_Form_submitteed_to_CA_Team"
                                    onChange={inputEvent}
                                    value={
                                      inputData?.gratuity_Form_submitteed_to_CA_Team
                                    }
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>GHI Documents Received</label>
                                  <select
                                    name="ghi_documents_received"
                                    onChange={inputEvent}
                                    value={inputData?.ghi_documents_received}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>GHI Initiated</label>
                                  <select
                                    name="ghi_initiated"
                                    onChange={inputEvent}
                                    value={inputData?.ghi_initiated}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>GHI E-Card issued</label>
                                  <select
                                    name="ghi_eCard_issued"
                                    onChange={inputEvent}
                                    value={inputData?.ghi_eCard_issued}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="sunil">Sunil</option>
                                    <option value="amit">Amit</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </>
                        </Step>
                        <Step label="HDFC Bank Details">
                          <>
                            <div className="row">
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>HDFC Account Mapped</label>
                                  <select
                                    name="hdfc_account_mapped"
                                    onChange={inputEvent}
                                    value={inputData?.hdfc_account_mapped}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>HDFC Account Initiated</label>
                                  <select
                                    name="hdfc_account_initiated"
                                    onChange={inputEvent}
                                    value={inputData?.hdfc_account_initiated}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>HDFC Account Opened</label>
                                  <select
                                    name="hdfc_account_opened"
                                    onChange={inputEvent}
                                    value={inputData?.hdfc_account_opened}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>HDFC Account Benefeciary added</label>
                                  <select
                                    name="hdfc_account_benefeciary_added"
                                    onChange={inputEvent}
                                    value={
                                      inputData?.hdfc_account_benefeciary_added
                                    }
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </>
                        </Step>
                        <Step label="ZOHO Account">
                          <>
                            <div className="row">
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>ZOHO People Account Created</label>
                                  <select
                                    name="zoho_people_account_created"
                                    onChange={inputEvent}
                                    value={
                                      inputData?.zoho_people_account_created
                                    }
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Zoho People Account Activated</label>
                                  <select
                                    name="zoho_people_account_activated"
                                    onChange={inputEvent}
                                    value={
                                      inputData?.zoho_people_account_activated
                                    }
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Zoho Payroll Integrated</label>
                                  <select
                                    name="zoho_payroll_integrated"
                                    onChange={inputEvent}
                                    value={inputData?.zoho_payroll_integrated}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </>
                        </Step>
                        <Step label="Other Formalities">
                          <>
                            <div className="row">
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>BGV Initiated</label>
                                  <select
                                    name="bgv_initiated"
                                    onChange={inputEvent}
                                    value={inputData?.bgv_initiated}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>BGV Invoice Paid</label>
                                  <select
                                    name="bgv_invoice_Paid"
                                    onChange={inputEvent}
                                    value={inputData?.bgv_invoice_Paid}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>BGV Report Received</label>
                                  <select
                                    name="bgv_report_Received"
                                    onChange={inputEvent}
                                    value={inputData?.bgv_report_Received}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="form-group">
                                  <label>Update LinkedIn</label>
                                  <select
                                    name="update_linkedIn"
                                    onChange={inputEvent}
                                    value={inputData?.update_linkedIn}
                                    className="form-control mt-2 "
                                    type="text"
                                  >
                                    <option>Please Select</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="NA">NA</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </>
                        </Step>
                      </MultiStepForm>

                      {active !== 1 && (
                        <button
                          class="btn btn-gradient-primary me-2"
                          onClick={(e) => {
                            return e.preventDefault(), setActive(active - 1);
                          }}
                        >
                          Previous
                        </button>
                      )}
                      {active !== 7 && (
                        <>
                          {inputData?._id ? (
                            <button
                              class="btn btn-gradient-primary me-2"
                              onClick={onUpdateNextButton}
                              style={{ float: "right" }}
                            >
                              Update & Next
                            </button>
                          ) : (
                            <button
                              class="btn btn-gradient-primary me-2"
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
                          class="btn btn-gradient-primary me-2"
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
