import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { form12bb_validation } from "../Utils/Validation_Form";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCookies } from "react-cookie";
import { BaseURL, headersCors } from "../Utils/AxiosApi";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Navbar from "../Partials/Navbar";
import Sidebar from "../Partials/Sidebar";
import Page_Header from "../Partials/Page_Header";

const Form12BB = () => {
  const navigate = useNavigate();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));

  const [cookies, setCookie, removeCookie] = useCookies([]);
  const date = new Date();
  let day = date.getDate();
  let month = `0${date.getMonth() + 1}`;
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`;
  const [inputData, setInputData] = useState({
    financial_year: "2023-2024",
    date: currentDate,
  });

  const [getSection, setGetSection] = useState();
  const [houseRentAllowance, sethouseRentAllowance] = useState(false);
  const [
    leavetravelconcessionsorassistance,
    setleavetravelconcessionsorassistance,
  ] = useState(false);
  const [deductionofinterestonborrowing, setDeductionofinterestonborrowing] =
    useState(false);
  const [deductions, setDeductions] = useState([]);

  //   const [inputs, setInputs] = useState({
  //     section: "",
  //     section_type: "",
  //     section_amount: "",
  //   });
  const [data, setData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(form12bb_validation),
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

  function capitalizeBothStrings(str) {
    const words = str.split(" ");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  }
  // capitalizeBothStrings(dd);

  const onSaveButton = (e) => {
    // e.preventDefault();
    const jsonDate = {
      ...inputData,
      status: false,
      email: LocalStorageData?.email,
      emp_id: LocalStorageData?.emp_id,
      name:
        inputData?.name !== undefined && capitalizeBothStrings(inputData?.name),
      deductions:
        deductions[0]?.section === undefined
          ? [
              {
                section: "NA",
                section_type: "NA",
                section_amount: "NA",
              },
            ]
          : deductions,
      rent_paid_to_the_landlord:
        inputData?.rent_paid_to_the_landlord === "" ||
        inputData?.rent_paid_to_the_landlord === undefined
          ? "NA"
          : inputData?.rent_paid_to_the_landlord,
      name_of_the_landlord:
        inputData?.name_of_the_landlord === "" ||
        inputData?.name_of_the_landlord === undefined
          ? "NA"
          : inputData?.name_of_the_landlord,

      permanent_account_number_of_the_landloard:
        inputData?.permanent_account_number_of_the_landloard === "" ||
        inputData?.permanent_account_number_of_the_landloard === undefined
          ? "NA"
          : inputData?.permanent_account_number_of_the_landloard,
      leave_travel_concessions_or_assistance_amount:
        inputData?.leave_travel_concessions_or_assistance_amount === "" ||
        inputData?.leave_travel_concessions_or_assistance_amount === undefined
          ? "NA"
          : inputData?.leave_travel_concessions_or_assistance_amount,
      interest_payable_paid_to_the_lender:
        inputData?.interest_payable_paid_to_the_lender === "" ||
        inputData?.interest_payable_paid_to_the_lender === undefined
          ? "NA"
          : inputData?.interest_payable_paid_to_the_lender,
      name_of_the_lender:
        inputData?.name_of_the_lender === "" ||
        inputData?.name_of_the_lender === undefined
          ? "NA"
          : inputData?.name_of_the_lender,
      address_of_the_lender:
        inputData?.address_of_the_lender === "" ||
        inputData?.address_of_the_lender === undefined
          ? "NA"
          : inputData?.address_of_the_lender,
      permanent_account_number_of_the_lender:
        inputData?.permanent_account_number_of_the_lender === "" ||
        inputData?.permanent_account_number_of_the_lender === undefined
          ? "NA"
          : inputData?.permanent_account_number_of_the_lender,
      financial_institutions:
        inputData?.financial_institutions === "" ||
        inputData?.financial_institutions === undefined
          ? "NA"
          : inputData?.financial_institutions,
      employer:
        inputData?.employer === "" || inputData?.employer === undefined
          ? "NA"
          : inputData?.employer,
      others:
        inputData?.others === "" || inputData?.others === undefined
          ? "NA"
          : inputData?.others,
    };
    async function postData() {
      const result = await axios.post(`${BaseURL}/form_12_bb`, jsonDate, {
        headers: headersCors,
      });
      // console.log(jsonDate);
      const resp = result.data;
      alert(resp.message);
      if (resp?.message === "Form has been submitted") {
        navigate("/");
      }
    }
    postData();
  };
  const onSubmitButton = (e) => {
    // e.preventDefault();
    const jsonDate = {
      ...inputData,
      status: true,
      name:
        inputData?.name !== undefined && capitalizeBothStrings(inputData?.name),
      vpf_apply:
        inputData?.vpf_apply === undefined ? "No" : inputData?.vpf_apply,
      deductions:
        deductions[0]?.section === undefined
          ? [
              {
                section: "NA",
                section_type: "NA",
                section_amount: "NA",
              },
            ]
          : deductions,
      rent_paid_to_the_landlord:
        inputData?.rent_paid_to_the_landlord === "" ||
        inputData?.rent_paid_to_the_landlord === undefined
          ? "NA"
          : inputData?.rent_paid_to_the_landlord,
      name_of_the_landlord:
        inputData?.name_of_the_landlord === "" ||
        inputData?.name_of_the_landlord === undefined
          ? "NA"
          : inputData?.name_of_the_landlord,

      permanent_account_number_of_the_landloard:
        inputData?.permanent_account_number_of_the_landloard === "" ||
        inputData?.permanent_account_number_of_the_landloard === undefined
          ? "NA"
          : inputData?.permanent_account_number_of_the_landloard,
      leave_travel_concessions_or_assistance_amount:
        inputData?.leave_travel_concessions_or_assistance_amount === "" ||
        inputData?.leave_travel_concessions_or_assistance_amount === undefined
          ? "NA"
          : inputData?.leave_travel_concessions_or_assistance_amount,
      interest_payable_paid_to_the_lender:
        inputData?.interest_payable_paid_to_the_lender === "" ||
        inputData?.interest_payable_paid_to_the_lender === undefined
          ? "NA"
          : inputData?.interest_payable_paid_to_the_lender,
      name_of_the_lender:
        inputData?.name_of_the_lender === "" ||
        inputData?.name_of_the_lender === undefined
          ? "NA"
          : inputData?.name_of_the_lender,
      address_of_the_lender:
        inputData?.address_of_the_lender === "" ||
        inputData?.address_of_the_lender === undefined
          ? "NA"
          : inputData?.address_of_the_lender,
      permanent_account_number_of_the_lender:
        inputData?.permanent_account_number_of_the_lender === "" ||
        inputData?.permanent_account_number_of_the_lender === undefined
          ? "NA"
          : inputData?.permanent_account_number_of_the_lender,
      financial_institutions:
        inputData?.financial_institutions === "" ||
        inputData?.financial_institutions === undefined
          ? "NA"
          : inputData?.financial_institutions,
      employer:
        inputData?.employer === "" || inputData?.employer === undefined
          ? "NA"
          : inputData?.employer,
      others:
        inputData?.others === "" || inputData?.others === undefined
          ? "NA"
          : inputData?.others,
    };
    async function postData() {
      const result = await axios.post(`${BaseURL}/form_12_bb`, jsonDate, {
        headers: headersCors,
      });
      // console.log(jsonDate);
      const resp = result.data;
      alert(resp.message);
      if (resp?.message === "Form has been submitted") {
        navigate("/");
      }
    }
    postData();
  };
  const style = {
    display: "inline",
    color: "red",
  };

  // =========Excelsheet==========

  function removeData(index) {
    setDeductions((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  }
  const section_80C = [
    {
      name: "Life Insurance Premiums",
    },
    {
      name: "Investment in ELSS mutual funds",
    },
    {
      name: "Public Provident Fund (PPF)",
    },
    {
      name: "Employees’ Provident Fund (EPF)",
    },
    {
      name: "Tax Saving Fixed Deposit",
    },
    {
      name: "National Pension System (NPS)",
    },
    {
      name: "National Savings Certificate",
    },
    {
      name: "Senior Citizens’ Savings Scheme (SCSS)",
    },
    {
      name: "Sukanya Samriddhi Yojana",
    },
    {
      name: "Tuition fees",
    },
    {
      name: "Home loan",
    },
    {
      name: "Stamp duty/fee",
    },
    {
      name: "Investment",
    },
  ];
  const section_80CCC = [
    {
      name: "Investment in Pension Funds",
    },
  ];
  const section_80CCD1 = [
    {
      name: "Atal Pension Yojana",
    },
    {
      name: "National Pension Scheme Contribution",
    },
  ];
  const section_80CCD1B = [
    {
      name: "Atal Pension Yojana(additional deduction)",
    },
    {
      name: "National Pension Scheme Contribution (additional deduction)",
    },
  ];
  const section_80CCD2 = [
    {
      name: "National Pension Scheme Contribution by Employer",
    },
  ];
  const section_80D = [
    {
      name: "Medical Insurance Premium",
    },
    {
      name: "Preventive health checkup",
    },
    {
      name: "Medical Expenditure",
    },
    {
      name: "Parental Insurance",
    },
  ];
  const section_80DD = [
    {
      name: "Medical Treatment of a Dependent with Disability",
    },
  ];
  const section_80DDB = [
    {
      name: "Medical expenditure for treatment of Specified Diseases",
    },
  ];
  const section_80E = [
    {
      name: "Interest paid on Loan taken for Higher Education",
    },
  ];
  const section_80EE = [
    {
      name: "Interest paid on Housing Loan",
    },
  ];
  const section_80EEA = [
    {
      name: "Interest Paid on Housing Loan",
    },
  ];
  const section_80EEB = [
    {
      name: "Interest paid on Electric Vehicle Loan",
    },
  ];
  const section_80G = [
    {
      name: "Donation to specified funds/institutions.",
    },
  ];
  const section_80GG = [
    {
      name: "Income Tax Deduction for House Rent Paid.",
    },
  ];
  const section_80GGA = [
    {
      name: "Donation to Scientific Research & Rural Development",
    },
  ];
  const section_80GGB = [
    {
      name: "Contribution to Political Parties",
    },
  ];
  const section_80GGC = [
    {
      name: "Individuals on contribution to Political Parties",
    },
  ];
  const section_80RRB = [
    {
      name: "Royalty on Patents",
    },
  ];
  const section_80QQB = [
    {
      name: "Royalty Income of Authors",
    },
  ];
  const section_80TTA = [
    {
      name: "Interest earned on Savings Accounts",
    },
  ];
  const section_80TTB = [
    {
      name: "Interest Income earned on deposits(Savings/ FDs)",
    },
  ];
  const section_80U = [
    {
      name: "Disabled Individuals",
    },
  ];
  const [deductionss, setDeductionss] = useState([]);

  // Calculate the total amount
  const totalAmount = deductions.reduce(
    (acc, curr) => parseInt(acc) + parseInt(curr.section_amount),
    0
  );

  // Function to remove a row from the table

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <Sidebar />
          <div class="main-panel">
            <div class="content-wrapper">
              <Page_Header
                page_title="Form 12 BB (See rule 26C)"
                page_title_button="Overview"
                page_title_icon="mdi-book-plus"
              />
              <div className="content-wrapper d-flex align-items-center auth">
                <div className="row flex-grow">
                  <div className="col-lg-12 mx-auto">
                    <div className="auth-form-light text-left p-5">
                      {/* <h2 className="text-center">
                        FORM NO.12BB (See rule 26C)
                      </h2>

                      <h6 className="font-weight-light text-center">
                        (See rule 26C)
                      </h6> */}
                      {/* <div className="text-end mb-4">
                    <button className="btn btn-success">
                      <NavLink
                        to="/get_form12bb_data"
                        className="text-light ms-2 text-decoration-none fw-lighter fs-6"
                      >
                        Download 12BB Data
                      </NavLink>
                    </button>
                    <button className="btn btn-success ms-3">
                      <NavLink
                        to="/flexible_benefit_plan"
                        className="text-light ms-2 text-decoration-none fw-lighter fs-6"
                      >
                        Flexible Benefit Plan
                      </NavLink>
                    </button>
                  </div> */}

                      <form
                        class="forms-sample"
                        onSubmit={handleSubmit(onSaveButton)}
                      >
                        <div class="form-group">
                          <label for="exampleInputUsername1">Name</label>
                          <span style={style}> *</span>
                          <input
                            className={classNames(
                              "form-control form-control-sm",
                              {
                                "is-invalid": errors.name,
                              }
                            )}
                            {...register("name", {
                              value: inputData?.name,
                            })}
                            name="name"
                            onChange={inputEvent}
                            placeholder="Enter First name"
                            value={inputData?.name}
                            // autoSave
                          />
                          <small class="invalid-feedback">
                            {errors.name?.message}
                          </small>
                        </div>

                        <div className="form-group">
                          <label for="exampleInputUsername1">Email</label>

                          <input
                            className="form-control form-control-sm bg-light"
                            name="email"
                            onChange={inputEvent}
                            placeholder="Enter Email"
                            value={LocalStorageData?.email}
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label for="exampleInputUsername1">Employee Id</label>

                          <input
                            className="form-control form-control-sm bg-light"
                            name="emp_id"
                            onChange={inputEvent}
                            placeholder="Enter Employee id"
                            value={LocalStorageData?.emp_id}
                            disabled
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputUsername1">Address</label>
                          <span style={style}> *</span>
                          <input
                            className={classNames(
                              "form-control form-control-sm",
                              {
                                "is-invalid": errors.address,
                              }
                            )}
                            {...register("address", {
                              value: inputData?.address,
                            })}
                            name="address"
                            onChange={inputEvent}
                            placeholder="Enter First address"
                            value={inputData?.address}
                            // autoSave
                          />
                          <small class="invalid-feedback">
                            {errors.address?.message}
                          </small>
                        </div>
                        <div class="form-group">
                          <label for="exampleInputUsername1">
                            Permanent Account Number of the employee
                          </label>
                          <span style={style}> *</span>
                          <input
                            className={classNames(
                              "form-control form-control-sm",
                              {
                                "is-invalid":
                                  errors.permanent_account_number_of_the_employee,
                              }
                            )}
                            {...register(
                              "permanent_account_number_of_the_employee",
                              {
                                value:
                                  inputData?.permanent_account_number_of_the_employee,
                              }
                            )}
                            name="permanent_account_number_of_the_employee"
                            onChange={inputEvent}
                            placeholder="Enter Permanent Account Number of the employee"
                            value={
                              inputData?.permanent_account_number_of_the_employee
                            }
                            // autoSave
                          />
                          <small class="invalid-feedback">
                            {
                              errors.permanent_account_number_of_the_employee
                                ?.message
                            }
                          </small>
                        </div>
                        <div class="form-group">
                          <label>Financial year</label>
                          <span style={style}> *</span>
                          <select
                            class="form-control form-control-sm"
                            value="2023-2024"
                            disabled
                          >
                            <option>2023-2024</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="">
                            Would you like to opt for VPF?
                          </label>
                          <select
                            onChange={inputEvent}
                            name="vpf_apply"
                            className="form-control form-control-sm"
                            value={inputData?.vpf_apply}
                          >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                          </select>
                        </div>
                        <div class="d-flex flex-row align-items-center mb-3">
                          <i class="mdi mdi-hand-pointing-right icon-md text-secondary"></i>
                          <p class="mb-0 ms-1"> Investment Declaration Self </p>
                        </div>

                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">
                            House Rent Allowance
                          </label>
                          <div class="col-sm-3">
                            <div class="form-check">
                              <label class="form-check-label">
                                <input
                                  type="radio"
                                  className={classNames(
                                    "form-check-input form-control-sm",
                                    {
                                      "is-invalid": errors.houseRentAllowance,
                                    }
                                  )}
                                  {...register("houseRentAllowance", {
                                    value: inputData?.houseRentAllowance,
                                  })}
                                  name="houseRentAllowance"
                                  value={houseRentAllowance}
                                  onChange={(e) =>
                                    sethouseRentAllowance(!houseRentAllowance)
                                  }
                                  checked={houseRentAllowance ? true : false}
                                />
                                Yes <i class="input-helper"></i>
                                <small class="invalid-feedback">
                                  {errors.houseRentAllowance?.message}
                                </small>
                              </label>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div class="form-check">
                              <label class="form-check-label">
                                <input
                                  type="radio"
                                  className={classNames(
                                    "form-check-input form-control-sm",
                                    {
                                      "is-invalid": errors.houseRentAllowance,
                                    }
                                  )}
                                  {...register("houseRentAllowance", {
                                    value: inputData?.houseRentAllowance,
                                  })}
                                  name="houseRentAllowance"
                                  value={houseRentAllowance}
                                  onChange={(e) => {
                                    return (
                                      sethouseRentAllowance(
                                        !houseRentAllowance
                                      ),
                                      setInputData({
                                        ...inputData,
                                        rent_paid_to_the_landlord: "",
                                        name_of_the_landlord: "",
                                        permanent_account_number_of_the_landloard:
                                          "",
                                      })
                                    );
                                  }}
                                  checked={
                                    houseRentAllowance === false ? true : false
                                  }
                                />
                                No <i class="input-helper"></i>
                                <small class="invalid-feedback">
                                  {errors.houseRentAllowance?.message}
                                </small>
                              </label>
                            </div>
                          </div>
                        </div>
                        {houseRentAllowance && (
                          <>
                            <div class="form-group">
                              <label for="exampleInputUsername1">
                                Rent paid to the landlord
                              </label>
                              <span style={style}> *</span>
                              <input
                                className={classNames(
                                  "form-control form-control-sm",
                                  {
                                    "is-invalid":
                                      errors.rent_paid_to_the_landlord,
                                  }
                                )}
                                {...register("rent_paid_to_the_landlord", {
                                  value: inputData?.rent_paid_to_the_landlord,
                                })}
                                name="rent_paid_to_the_landlord"
                                onChange={inputEvent}
                                placeholder="Enter Amount(Rs.) Paid to the landlord"
                                value={inputData?.rent_paid_to_the_landlord}
                                // autoSave
                              />
                              <small class="invalid-feedback">
                                {errors.rent_paid_to_the_landlord?.message}
                              </small>
                            </div>
                            <div class="form-group">
                              <label for="exampleInputUsername1">
                                Name of the landlord
                              </label>
                              <span style={style}> *</span>
                              <input
                                className={classNames(
                                  "form-control form-control-sm",
                                  {
                                    "is-invalid": errors.name_of_the_landlord,
                                  }
                                )}
                                {...register("name_of_the_landlord", {
                                  value: inputData?.name_of_the_landlord,
                                })}
                                name="name_of_the_landlord"
                                onChange={inputEvent}
                                placeholder="Enter Name of the landlord"
                                value={inputData?.name_of_the_landlord}
                                // autoSave
                              />
                              <small class="invalid-feedback">
                                {errors.name_of_the_landlord?.message}
                              </small>
                            </div>

                            <div class="form-group">
                              <label for="exampleInputUsername1">
                                Permanent Account Number of the landlord
                              </label>
                              <span style={style}> *</span>
                              <input
                                className={classNames(
                                  "form-control form-control-sm",
                                  {
                                    "is-invalid":
                                      errors.permanent_account_number_of_the_landloard,
                                  }
                                )}
                                {...register(
                                  "permanent_account_number_of_the_landloard",
                                  {
                                    value:
                                      inputData?.permanent_account_number_of_the_landloard,
                                  }
                                )}
                                name="permanent_account_number_of_the_landloard"
                                onChange={inputEvent}
                                placeholder="Enter Permanent Account Number of the landloard"
                                value={
                                  inputData?.permanent_account_number_of_the_landloard
                                }
                                // autoSave
                              />
                              <small class="invalid-feedback">
                                {
                                  errors
                                    .permanent_account_number_of_the_landloard
                                    ?.message
                                }
                              </small>
                              <small>
                                <span className="text-danger ">Note</span> :
                                Permanent Account Number shall be furnished if
                                the aggregate rent paid during the previous year
                                exceeds one lakh rupees.
                              </small>
                            </div>
                          </>
                        )}

                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">
                            Leave travel concessions or assistance (LTA)
                          </label>
                          <div class="col-sm-3">
                            <div class="form-check">
                              <label class="form-check-label">
                                <input
                                  type="radio"
                                  className={classNames(
                                    "form-check-input form-control-sm",
                                    {
                                      "is-invalid":
                                        errors.leavetravelconcessionsorassistance,
                                    }
                                  )}
                                  {...register(
                                    "leavetravelconcessionsorassistance",
                                    {
                                      value:
                                        inputData?.leavetravelconcessionsorassistance,
                                    }
                                  )}
                                  name="leavetravelconcessionsorassistance"
                                  value={leavetravelconcessionsorassistance}
                                  onChange={(e) =>
                                    setleavetravelconcessionsorassistance(
                                      !leavetravelconcessionsorassistance
                                    )
                                  }
                                  checked={
                                    leavetravelconcessionsorassistance
                                      ? true
                                      : false
                                  }
                                />
                                Yes <i class="input-helper"></i>
                                <small class="invalid-feedback">
                                  {
                                    errors.leavetravelconcessionsorassistance
                                      ?.message
                                  }
                                </small>
                              </label>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div class="form-check">
                              <label class="form-check-label">
                                <input
                                  type="radio"
                                  className={classNames(
                                    "form-check-input form-control-sm",
                                    {
                                      "is-invalid":
                                        errors.leavetravelconcessionsorassistance,
                                    }
                                  )}
                                  {...register(
                                    "leavetravelconcessionsorassistance",
                                    {
                                      value:
                                        inputData?.leavetravelconcessionsorassistance,
                                    }
                                  )}
                                  name="leavetravelconcessionsorassistance"
                                  value={leavetravelconcessionsorassistance}
                                  onChange={(e) => {
                                    return (
                                      setleavetravelconcessionsorassistance(
                                        !leavetravelconcessionsorassistance
                                      ),
                                      setInputData({
                                        ...inputData,

                                        leave_travel_concessions_or_assistance_amount:
                                          "",
                                      })
                                    );
                                  }}
                                  checked={
                                    leavetravelconcessionsorassistance === false
                                      ? true
                                      : false
                                  }
                                />
                                No <i class="input-helper"></i>
                                <small class="invalid-feedback">
                                  {
                                    errors.leavetravelconcessionsorassistance
                                      ?.message
                                  }
                                </small>
                              </label>
                            </div>
                          </div>
                        </div>
                        {leavetravelconcessionsorassistance && (
                          <>
                            <div class="form-group">
                              <label for="exampleInputUsername1">
                                Amount(Rs.)
                              </label>
                              <span style={style}> *</span>

                              <input
                                className={classNames(
                                  "form-control form-control-sm",
                                  {
                                    "is-invalid":
                                      errors.leave_travel_concessions_or_assistance_amount,
                                  }
                                )}
                                {...register(
                                  "leave_travel_concessions_or_assistance_amount",
                                  {
                                    value:
                                      inputData?.leave_travel_concessions_or_assistance_amount,
                                  }
                                )}
                                name="leave_travel_concessions_or_assistance_amount"
                                onChange={inputEvent}
                                placeholder="Enter Amount(Rs.) Paid to the landlord"
                                value={
                                  inputData?.leave_travel_concessions_or_assistance_amount
                                }
                                // autoSave
                              />
                              <small class="invalid-feedback">
                                {
                                  errors
                                    .leave_travel_concessions_or_assistance_amount
                                    ?.message
                                }
                              </small>
                              <small>
                                <span className="text-danger">Note</span> : LTA
                                can be claim only twice in 4 years as per IT
                                Laws.
                              </small>
                            </div>
                          </>
                        )}

                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">
                            Deduction of interest on borrowing
                          </label>

                          <div class="col-sm-3">
                            <div class="form-check">
                              <label class="form-check-label">
                                <input
                                  type="radio"
                                  className={classNames(
                                    "form-check-input form-control-sm",
                                    {
                                      "is-invalid":
                                        errors.deductionofinterestonborrowing,
                                    }
                                  )}
                                  {...register(
                                    "deductionofinterestonborrowing",
                                    {
                                      value:
                                        inputData?.deductionofinterestonborrowing,
                                    }
                                  )}
                                  name="deductionofinterestonborrowing"
                                  value={deductionofinterestonborrowing}
                                  onChange={(e) =>
                                    setDeductionofinterestonborrowing(
                                      !deductionofinterestonborrowing
                                    )
                                  }
                                  checked={
                                    deductionofinterestonborrowing
                                      ? true
                                      : false
                                  }
                                />
                                Yes <i class="input-helper"></i>
                                <small class="invalid-feedback">
                                  {
                                    errors.deductionofinterestonborrowing
                                      ?.message
                                  }
                                </small>
                              </label>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div class="form-check">
                              <label class="form-check-label">
                                <input
                                  type="radio"
                                  className={classNames(
                                    "form-check-input form-control-sm",
                                    {
                                      "is-invalid":
                                        errors.deductionofinterestonborrowing,
                                    }
                                  )}
                                  {...register(
                                    "deductionofinterestonborrowing",
                                    {
                                      value:
                                        inputData?.deductionofinterestonborrowing,
                                    }
                                  )}
                                  name="deductionofinterestonborrowing"
                                  value={deductionofinterestonborrowing}
                                  onChange={(e) => {
                                    return (
                                      setDeductionofinterestonborrowing(
                                        !deductionofinterestonborrowing
                                      ),
                                      setInputData({
                                        ...inputData,
                                        interest_payable_paid_to_the_lender: "",
                                        name_of_the_lender: "",
                                        address_of_the_lender: "",
                                        permanent_account_number_of_the_lender:
                                          "",
                                        financial_institutions: "",
                                        employer: "",
                                        others: "",
                                      })
                                    );
                                  }}
                                  checked={
                                    deductionofinterestonborrowing === false
                                      ? true
                                      : false
                                  }
                                />
                                No <i class="input-helper"></i>
                                <small class="invalid-feedback">
                                  {
                                    errors.deductionofinterestonborrowing
                                      ?.message
                                  }
                                </small>
                              </label>
                            </div>
                          </div>
                        </div>
                        {deductionofinterestonborrowing && (
                          <>
                            <div class="form-group">
                              <label for="exampleInputUsername1">
                                Interest payable/paid to the lender
                              </label>
                              <span style={style}> *</span>
                              <input
                                type="number"
                                className={classNames(
                                  "form-control form-control-sm",
                                  {
                                    "is-invalid":
                                      errors.interest_payable_paid_to_the_lender,
                                  }
                                )}
                                {...register(
                                  "interest_payable_paid_to_the_lender",
                                  {
                                    value:
                                      inputData?.interest_payable_paid_to_the_lender,
                                  }
                                )}
                                name="interest_payable_paid_to_the_lender"
                                onChange={inputEvent}
                                placeholder="Enter Amount(Rs.) Interest payable/paid to the lender"
                                value={
                                  inputData?.interest_payable_paid_to_the_lender
                                }
                                // autoSave
                              />
                              <small class="invalid-feedback">
                                {
                                  errors.interest_payable_paid_to_the_lender
                                    ?.message
                                }
                              </small>
                            </div>
                            <div class="form-group">
                              <label for="exampleInputUsername1">
                                Name of the lender
                              </label>
                              <span style={style}> *</span>
                              <input
                                className={classNames(
                                  "form-control form-control-sm",
                                  {
                                    "is-invalid": errors.name_of_the_lender,
                                  }
                                )}
                                {...register("name_of_the_lender", {
                                  value: inputData?.name_of_the_lender,
                                })}
                                name="name_of_the_lender"
                                onChange={inputEvent}
                                placeholder="Enter Name of the lender"
                                value={inputData?.name_of_the_lender}
                                // autoSave
                              />
                              <small class="invalid-feedback">
                                {errors.name_of_the_lender?.message}
                              </small>
                            </div>
                            <div class="form-group">
                              <label for="exampleInputUsername1">
                                Address of the lender
                              </label>
                              <span style={style}> *</span>
                              <input
                                className={classNames(
                                  "form-control form-control-sm",
                                  {
                                    "is-invalid": errors.address_of_the_lender,
                                  }
                                )}
                                {...register("address_of_the_lender", {
                                  value: inputData?.address_of_the_lender,
                                })}
                                name="address_of_the_lender"
                                onChange={inputEvent}
                                placeholder="Enter Address of the lender"
                                value={inputData?.address_of_the_lender}
                                // autoSave
                              />
                              <small class="invalid-feedback">
                                {errors.address_of_the_lender?.message}
                              </small>
                            </div>
                            <div class="form-group">
                              <label for="exampleInputUsername1">
                                Permanent Account Number of the lender
                              </label>
                              <span style={style}> *</span>
                              <input
                                className={classNames(
                                  "form-control form-control-sm",
                                  {
                                    "is-invalid":
                                      errors.permanent_account_number_of_the_lender,
                                  }
                                )}
                                {...register(
                                  "permanent_account_number_of_the_lender",
                                  {
                                    value:
                                      inputData?.permanent_account_number_of_the_lender,
                                  }
                                )}
                                name="permanent_account_number_of_the_lender"
                                onChange={inputEvent}
                                placeholder="Enter Permanent Account Number of the lender"
                                value={
                                  inputData?.permanent_account_number_of_the_lender
                                }
                                // autoSave
                              />
                              <small class="invalid-feedback">
                                {
                                  errors.permanent_account_number_of_the_lender
                                    ?.message
                                }
                              </small>
                            </div>
                            <div class="form-group">
                              <label for="exampleInputUsername1">
                                Financial Institutions(if available)
                              </label>
                              <input
                                className="form-control form-control-sm"
                                name="financial_institutions"
                                onChange={inputEvent}
                                placeholder="Enter Financial Institutions(if available) "
                                value={inputData?.financial_institutions}
                                // autoSave
                              />
                            </div>

                            <div class="form-group">
                              <label for="exampleInputUsername1">Others</label>
                              <input
                                className="form-control form-control-sm"
                                name="others"
                                onChange={inputEvent}
                                placeholder="Enter Others"
                                value={inputData?.others}
                                // autoSave
                              />
                            </div>
                          </>
                        )}

                        <p class="card-description fw-bold fs-6">
                          Investment Declarations
                        </p>
                        <table class="table table-bordered">
                          <thead>
                            <tr>
                              <th> # </th>
                              <th> Section </th>
                              <th> Type </th>
                              <th> Amount </th>
                              <th> Action </th>
                            </tr>
                          </thead>
                          <tbody>
                            {deductions?.map((val, index) => {
                              return (
                                <tr>
                                  <td> {index + 1} </td>
                                  <td style={{ textTransform: "uppercase" }}>
                                    {val.section.split("section_")}
                                  </td>

                                  <td> {val.section_type} </td>
                                  <td> {val.section_amount} </td>
                                  <td>
                                    <i
                                      class="mdi mdi-delete-forever btn-outline-danger fs-4"
                                      onClick={() => {
                                        removeData(index);
                                      }}
                                    ></i>
                                  </td>
                                </tr>
                              );
                            })}
                            <tr className="bg-light">
                              <td className="fw-bold ">Total:</td>
                              <td></td>
                              <td></td>
                              <td className="fw-bold ">
                                {Number(totalAmount)}
                              </td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>

                        <div class="form-group row mt-4">
                          <div className="col-md-4">
                            <label>Section</label>
                            <select
                              class="form-control form-control-sm"
                              name="section"
                              value={
                                data.section !== undefined ? data.section : ""
                              }
                              onChange={(event) => {
                                return (
                                  setData({
                                    ...data,
                                    section: event.target.value,
                                  }),
                                  setGetSection(eval(event.target.value))
                                );
                              }}
                            >
                              <option value="">-- Select One --</option>
                              <option value="section_80C">80C </option>
                              <option value="section_80CCC">80CCC </option>
                              <option value="section_80CCD1">80CCD(1)</option>
                              <option value="section_80CCD1B">80CCD(1B)</option>
                              <option value="section_80CCC2">80CCD(2)</option>
                              <option value="section_80D"> 80D</option>
                              <option value="section_80DD">80DD</option>
                              <option value="section_80DDB">80DDB</option>
                              <option value="section_80A">80E</option>
                              <option value="section_80EE">80EE</option>
                              <option value="section_80EEA">80EEA</option>
                              <option value="section_80EEB">80EEB</option>
                              <option value="section_80G">80G</option>
                              <option value="section_80GG">80GG</option>
                              <option value="section_80GGA">80GGA</option>
                              <option value="section_80GGB">80GGB</option>
                              <option value="section_80GGC">80GGC</option>
                              <option value="section_80RRB">80RRB</option>
                              <option value="section_80QQB">80QQB</option>
                              <option value="section_80TTA">80TTA</option>
                              <option value="section_80TTB">80TTB</option>
                              <option value="section_80U">80U</option>
                            </select>
                          </div>
                          <div className="col-md-4">
                            <label>Type</label>
                            <select
                              class="form-control form-control-sm"
                              name="section_type"
                              value={
                                data.section_type !== undefined
                                  ? data.section_type
                                  : ""
                              }
                              onChange={(event) =>
                                setData({
                                  ...data,
                                  section_type: event.target.value,
                                })
                              }
                            >
                              <option value="">-- Select One --</option>
                              {getSection?.map((val) => {
                                return (
                                  <option
                                    value={val.name}
                                    style={{
                                      display: deductions
                                        ?.map((value, index) => {
                                          return value?.section_type;
                                        })
                                        .includes(val?.name)
                                        ? "none"
                                        : "block",
                                    }}
                                  >
                                    {val.name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="col-md-2">
                            <label>Amount</label>
                            <input
                              className="form-control form-control-sm"
                              name="section_amount"
                              placeholder="Enter Session Amount"
                              value={
                                data.section_amount !== undefined
                                  ? data.section_amount
                                  : ""
                              }
                              onChange={(event) =>
                                setData({
                                  ...data,
                                  section_amount: event.target.value,
                                })
                              }
                            />
                          </div>
                          <div
                            className="col-md-2"
                            style={{ marginTop: "1.7rem" }}
                          >
                            <button
                              type="button"
                              class="btn btn-sm btn-gradient-success me-2 "
                              onClick={() => {
                                deductions.push(data);
                                setData({});
                              }}
                              disabled={
                                data?.section === undefined ||
                                data?.section_type === undefined ||
                                data?.section_amount === undefined
                                  ? true
                                  : false
                              }
                            >
                              Add
                            </button>
                          </div>
                          {/* <div className="col-md-1" style={{ marginTop: "20px" }}>
                          {index !== 0 && (
                            <button
                              type="button"
                              class="btn btn-inverse-danger btn-icon"
                              onClick={() => removeInput(index)}
                            >
                              <i className="mdi mdi-delete-forever"></i>
                            </button>
                          )}
                        </div> */}
                        </div>

                        {/* <div class="d-flex flex-row align-items-center">
                      <i
                        class="mdi mdi-plus icon-md text-success"
                        // onClick={addInput}
                      ></i>
                      <p class="mb-0 ms-1"> Add Row </p>
                    </div> */}
                        <div class="d-flex flex-row align-items-center mb-3">
                          <i class="mdi mdi-hand-pointing-right icon-md text-secondary"></i>
                          <p class="mb-0 ms-1">Verification </p>
                        </div>
                        <div className="row">
                          <p>
                            I,
                            <span className="fw-bold"> {inputData?.name}</span>,
                            son/daughter of <span style={style}> *</span>
                            <input
                              className={classNames(
                                "form-control form-control-sm",
                                {
                                  "is-invalid": errors.father_name,
                                }
                              )}
                              {...register("father_name", {
                                value: inputData?.father_name,
                              })}
                              name="father_name"
                              onChange={inputEvent}
                              placeholder="Enter father_name"
                              value={inputData?.father_name}
                              // autoSave
                            />
                            . do hereby certify that the information given above
                            is complete and correct.
                          </p>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <div class="form-group">
                              <label for="exampleInputUsername1">
                                Submitted Date
                              </label>
                              <span style={style}> *</span>
                              <input
                                type="date"
                                className="form-control form-control-sm"
                                name="date"
                                onChange={inputEvent}
                                placeholder="Enter Date"
                                value={inputData?.date}
                                disabled
                              />
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div class="form-group">
                              <label for="exampleInputUsername1">Place</label>
                              <span style={style}> *</span>
                              <input
                                className={classNames(
                                  "form-control form-control-sm",
                                  {
                                    "is-invalid": errors.place,
                                  }
                                )}
                                {...register("place", {
                                  value: inputData?.place,
                                })}
                                name="place"
                                onChange={inputEvent}
                                placeholder="Enter Place"
                                value={inputData?.place}
                                // autoSave
                              />
                              <small class="invalid-feedback">
                                {errors.place?.message}
                              </small>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div class="form-group">
                              <label for="exampleInputUsername1">
                                Designation
                              </label>
                              <span style={style}> *</span>
                              <input
                                className={classNames(
                                  "form-control form-control-sm",
                                  {
                                    "is-invalid": errors.designation,
                                  }
                                )}
                                {...register("designation", {
                                  value: inputData?.designation,
                                })}
                                name="designation"
                                onChange={inputEvent}
                                placeholder="Enter Designation"
                                value={inputData?.designation}
                                // autoSave
                              />
                              <small class="invalid-feedback">
                                {errors.designation?.message}
                              </small>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            class="btn btn-sm btn-gradient-success me-2"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            class="btn btn-sm btn-gradient-primary me-2"
                            onClick={() => onSubmitButton()}
                          >
                            Save & Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form12BB;
