import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { form12bb_validation } from "../../Utils/Validation_Form";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import axios from "axios";
import Navbar from "../../Partials/Navbar";
import Sidebar from "../../Partials/Sidebar";
import Page_Header from "../../Partials/Page_Header";
import { useAlert } from "react-alert";
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

const Form12BB = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  let [loading, setLoading] = useState(false);
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [button_id, setbutton_id] = useState(1);
  const [getFormDataByID, setGetFormDataByID] = useState([]);
  const date = new Date();
  let day = `${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}`;
  let month = `${
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  }`;
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: getFormDataByID?.status === undefined ? "" : " ",
    },
    resolver: yupResolver(form12bb_validation),
  });
  const [inputData, setInputData] = useState([]);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const result = await axios
        .get(`get_form_12_bb_controller_by_id/${LocalStorageData?.user_id}`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((resp) => {
          return (
            setGetFormDataByID(resp?.data[0]),
            setInputData(resp?.data[0]),
            setDeductions(
              resp?.data[0]?.deductions === undefined
                ? []
                : resp?.data[0]?.deductions
            ),
            sethouseRentAllowance(
              resp?.data[0]?.house_rent_allowance === undefined
                ? true
                : resp?.data[0]?.house_rent_allowance
            ),
            setleavetravelconcessionsorassistance(
              resp?.data[0]?.leave_travel_concessions_or_assistance ===
                undefined
                ? true
                : resp?.data[0]?.leave_travel_concessions_or_assistance
            ),
            setDeductionofinterestonborrowing(
              resp?.data[0]?.deduction_of_interest_on_borrowing === undefined
                ? true
                : resp?.data[0]?.deduction_of_interest_on_borrowing
            ),
            setLoading(false)
          );
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

  const [getSection, setGetSection] = useState();
  const [houseRentAllowance, sethouseRentAllowance] = useState(true);
  const [
    leavetravelconcessionsorassistance,
    setleavetravelconcessionsorassistance,
  ] = useState(true);
  const [deductionofinterestonborrowing, setDeductionofinterestonborrowing] =
    useState(true);
  const [deductions, setDeductions] = useState([]);

  const [data, setData] = useState({});

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

  const onSaveButton = (e) => {
    const jsonDate = {
      ...inputData,
      financial_year: "2023-2024",
      status: button_id === 1 ? false : true,
      email: LocalStorageData?.email,
      emp_id: LocalStorageData?.emp_id,
      user_id: LocalStorageData?.user_id,
      house_rent_allowance: houseRentAllowance,
      leave_travel_concessions_or_assistance:
        leavetravelconcessionsorassistance,
      deduction_of_interest_on_borrowing: deductionofinterestonborrowing,
      name: LocalStorageData?.name,
      vpf_apply:
        inputData?.vpf_apply === undefined ? "No" : inputData?.vpf_apply,

      availed_in_last_4_years:
        inputData?.availed_in_last_4_years === undefined ||
        !leavetravelconcessionsorassistance
          ? "No"
          : inputData?.availed_in_last_4_years,

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
        inputData?.rent_paid_to_the_landlord === undefined ||
        !houseRentAllowance
          ? "NA"
          : inputData?.rent_paid_to_the_landlord,
      name_of_the_landlord:
        inputData?.name_of_the_landlord === "" ||
        inputData?.name_of_the_landlord === undefined ||
        !houseRentAllowance
          ? "NA"
          : inputData?.name_of_the_landlord,
      address_of_the_rental_property:
        inputData?.address_of_the_rental_property === "" ||
        inputData?.address_of_the_rental_property === undefined ||
        !houseRentAllowance
          ? "NA"
          : inputData?.address_of_the_rental_property,
      permanent_account_number_of_the_landloard:
        inputData?.permanent_account_number_of_the_landloard === "" ||
        inputData?.permanent_account_number_of_the_landloard === undefined ||
        !houseRentAllowance
          ? "NA"
          : inputData?.permanent_account_number_of_the_landloard,
      leave_travel_concessions_or_assistance_amount:
        inputData?.leave_travel_concessions_or_assistance_amount === "" ||
        inputData?.leave_travel_concessions_or_assistance_amount ===
          undefined ||
        !leavetravelconcessionsorassistance
          ? "NA"
          : inputData?.leave_travel_concessions_or_assistance_amount,
      interest_payable_paid_to_the_lender:
        inputData?.interest_payable_paid_to_the_lender === "" ||
        inputData?.interest_payable_paid_to_the_lender === undefined ||
        !deductionofinterestonborrowing
          ? "NA"
          : inputData?.interest_payable_paid_to_the_lender,
      name_of_the_lender:
        inputData?.name_of_the_lender === "" ||
        inputData?.name_of_the_lender === undefined ||
        !deductionofinterestonborrowing
          ? "NA"
          : inputData?.name_of_the_lender,
      address_of_the_lender:
        inputData?.address_of_the_lender === "" ||
        inputData?.address_of_the_lender === undefined ||
        !deductionofinterestonborrowing
          ? "NA"
          : inputData?.address_of_the_lender,
      permanent_account_number_of_the_lender:
        inputData?.permanent_account_number_of_the_lender === "" ||
        inputData?.permanent_account_number_of_the_lender === undefined ||
        !deductionofinterestonborrowing
          ? "NA"
          : inputData?.permanent_account_number_of_the_lender,
      financial_institutions:
        inputData?.financial_institutions === "" ||
        inputData?.financial_institutions === undefined ||
        !deductionofinterestonborrowing
          ? "NA"
          : inputData?.financial_institutions,
      self_occupied_or_rented:
        inputData?.self_occupied_or_rented === "" ||
        inputData?.self_occupied_or_rented === undefined ||
        !deductionofinterestonborrowing
          ? "Occupied"
          : inputData?.self_occupied_or_rented,
      others:
        inputData?.others === "" ||
        inputData?.others === undefined ||
        !deductionofinterestonborrowing
          ? "NA"
          : inputData?.others,
    };
    async function postData() {
      setLoading(true);
      await axios
        .post(`form_12_bb`, jsonDate, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((resp) => {
          return (
            alert.success(resp.data.message),
            resp?.data?.message === "Form has been submitted" && navigate("/"),
            setLoading(false)
          );
        })
        .catch((err) => {
          if (err.response.status === 500) {
            navigate("/error_500");
          } else {
            navigate("/error_403");
          }
        });
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

  // Calculate the total amount
  const totalAmount = deductions?.reduce(
    (acc, curr) => parseInt(acc) + parseInt(curr?.section_amount),
    0
  );

  // Function to remove a row from the table
  function convertDateFormate(str) {
    const date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <Page_Header
                page_title="Form 12 BB (See rule 26C)"
                page_title_icon="mdi-book-plus"
                page_title_button="Back"
                page_title_button_link="/dashboard"
              />
              {loading && (
                <div className="loader-container">
                  <div class="loader"></div>
                </div>
              )}
              <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
                  <div class="card">
                    <div class="card-body">
                      <form
                        className="forms-sample"
                        onSubmit={handleSubmit(onSaveButton)}
                      >
                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Name</label>

                              <input
                                className="form-control form-control-sm"
                                name="name"
                                placeholder="Enter Name"
                                value={LocalStorageData?.name}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Email</label>
                              <input
                                className="form-control form-control-sm"
                                name="email"
                                onChange={inputEvent}
                                placeholder="Enter Email"
                                value={LocalStorageData?.email}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Employee Id</label>

                              <input
                                className="form-control form-control-sm"
                                name="emp_id"
                                onChange={inputEvent}
                                placeholder="Enter Employee id"
                                value={LocalStorageData?.emp_id}
                                disabled
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Address</label>
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
                            disabled={inputData?.status && true}
                          />
                          <small className="invalid-feedback">
                            {errors.address?.message}
                          </small>
                        </div>
                        <div className="form-group">
                          <label>
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
                            disabled={inputData?.status && true}
                          />
                          <small className="invalid-feedback">
                            {
                              errors.permanent_account_number_of_the_employee
                                ?.message
                            }
                          </small>
                        </div>
                        <div className="form-group">
                          <label>Financial year</label>
                          <span style={style}> *</span>
                          <input
                            className="form-control form-control-sm"
                            value="2023-2024"
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label>Would you like to opt for VPF?</label>
                          <select
                            onChange={inputEvent}
                            name="vpf_apply"
                            className="form-control form-control-sm"
                            value={inputData?.vpf_apply}
                            disabled={inputData?.status && true}
                          >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                          </select>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="mdi mdi-hand-pointing-right icon-md text-secondary"></i>
                          <p className="mb-0 ms-1">
                            Investment Declaration Self
                          </p>
                        </div>

                        <div className="form-group row">
                          <label className="col-sm-6 col-form-label">
                            House Rent Allowance
                          </label>
                          <div className="col-sm-3">
                            <div className="form-check">
                              <label className="form-check-label">
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
                                  disabled={inputData?.status && true}
                                />
                                Yes <i className="input-helper"></i>
                                <small className="invalid-feedback">
                                  {errors.houseRentAllowance?.message}
                                </small>
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="form-check">
                              <label className="form-check-label">
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
                                    return sethouseRentAllowance(
                                      !houseRentAllowance
                                    );
                                  }}
                                  checked={
                                    houseRentAllowance === false ? true : false
                                  }
                                  disabled={inputData?.status && true}
                                />
                                No <i className="input-helper"></i>
                                <small className="invalid-feedback">
                                  {errors.houseRentAllowance?.message}
                                </small>
                              </label>
                            </div>
                          </div>
                        </div>
                        {houseRentAllowance && (
                          <>
                            <div className="form-group">
                              <label>Rent paid to the landlord</label>
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
                                disabled={inputData?.status && true}
                              />
                              <small className="invalid-feedback">
                                {errors.rent_paid_to_the_landlord?.message}
                              </small>
                            </div>
                            <div className="form-group">
                              <label>Name of the landlord</label>
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
                                disabled={inputData?.status && true}
                              />
                              <small className="invalid-feedback">
                                {errors.name_of_the_landlord?.message}
                              </small>
                            </div>
                            <div className="form-group">
                              <label for="exampleInputUsername1">
                                Address of the Rental Property
                              </label>
                              <span style={style}> *</span>
                              <input
                                className={classNames(
                                  "form-control form-control-sm",
                                  {
                                    "is-invalid":
                                      errors.address_of_the_rental_property,
                                  }
                                )}
                                {...register("address_of_the_rental_property", {
                                  value:
                                    inputData?.address_of_the_rental_property,
                                })}
                                name="address_of_the_rental_property"
                                onChange={inputEvent}
                                placeholder="Enter Address of the Rental Property"
                                value={
                                  inputData?.address_of_the_rental_property
                                }
                                disabled={inputData?.status && true}
                              />
                              <small className="invalid-feedback">
                                {errors.address_of_the_rental_property?.message}
                              </small>
                            </div>
                            <div className="form-group">
                              <label>
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
                                disabled={inputData?.status && true}
                              />
                              <small className="invalid-feedback">
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

                        <div className="form-group row">
                          <label className="col-sm-6 col-form-label">
                            Leave travel concessions or assistance (LTA)
                          </label>
                          <div className="col-sm-3">
                            <div className="form-check">
                              <label className="form-check-label">
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
                                  disabled={inputData?.status && true}
                                />
                                Yes <i className="input-helper"></i>
                                <small className="invalid-feedback">
                                  {
                                    errors.leavetravelconcessionsorassistance
                                      ?.message
                                  }
                                </small>
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="form-check">
                              <label className="form-check-label">
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
                                    return setleavetravelconcessionsorassistance(
                                      !leavetravelconcessionsorassistance
                                    );
                                  }}
                                  checked={
                                    leavetravelconcessionsorassistance === false
                                      ? true
                                      : false
                                  }
                                  disabled={inputData?.status && true}
                                />
                                No <i className="input-helper"></i>
                                <small className="invalid-feedback">
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
                            <div className="form-group">
                              <label>Availed in last 4 Years?</label>
                              <select
                                onChange={inputEvent}
                                name="availed_in_last_4_years"
                                className="form-control form-control-sm"
                                value={inputData?.availed_in_last_4_years}
                                disabled={inputData?.status && true}
                              >
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label>Amount(Rs.)</label>
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
                                disabled={inputData?.status && true}
                              />
                              <small className="invalid-feedback">
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

                        <div className="form-group row">
                          <label className="col-sm-6 col-form-label">
                            Deduction of interest on home loan
                          </label>

                          <div className="col-sm-3">
                            <div className="form-check">
                              <label className="form-check-label">
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
                                  disabled={inputData?.status && true}
                                />
                                Yes <i className="input-helper"></i>
                                <small className="invalid-feedback">
                                  {
                                    errors.deductionofinterestonborrowing
                                      ?.message
                                  }
                                </small>
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="form-check">
                              <label className="form-check-label">
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
                                    return setDeductionofinterestonborrowing(
                                      !deductionofinterestonborrowing
                                    );
                                  }}
                                  checked={
                                    deductionofinterestonborrowing === false
                                      ? true
                                      : false
                                  }
                                  disabled={inputData?.status && true}
                                />
                                No <i className="input-helper"></i>
                                <small className="invalid-feedback">
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
                            <div className="form-group">
                              <label>Self Occupied or Rented?</label>
                              <select
                                onChange={inputEvent}
                                name="self_occupied_or_rented"
                                className="form-control form-control-sm"
                                value={inputData?.self_occupied_or_rented}
                                disabled={inputData?.status && true}
                              >
                                <option value="Occupied">Occupied</option>
                                <option value="Rented">Rented</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label>Interest payable/paid to the lender</label>
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
                                disabled={inputData?.status && true}
                              />
                              <small className="invalid-feedback">
                                {
                                  errors.interest_payable_paid_to_the_lender
                                    ?.message
                                }
                              </small>
                            </div>
                            <div className="form-group">
                              <label>Name of the lender</label>
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
                                disabled={inputData?.status && true}
                              />
                              <small className="invalid-feedback">
                                {errors.name_of_the_lender?.message}
                              </small>
                            </div>
                            <div className="form-group">
                              <label>Address of the lender</label>
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
                                disabled={inputData?.status && true}
                              />
                              <small className="invalid-feedback">
                                {errors.address_of_the_lender?.message}
                              </small>
                            </div>
                            <div className="form-group">
                              <label>
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
                                disabled={inputData?.status && true}
                              />
                              <small className="invalid-feedback">
                                {
                                  errors.permanent_account_number_of_the_lender
                                    ?.message
                                }
                              </small>
                            </div>
                            <div className="form-group">
                              <label>
                                Financial Institutions(if available)
                              </label>
                              <input
                                className="form-control form-control-sm"
                                name="financial_institutions"
                                onChange={inputEvent}
                                placeholder="Enter Financial Institutions(if available) "
                                value={inputData?.financial_institutions}
                                disabled={inputData?.status && true}
                              />
                            </div>

                            <div className="form-group">
                              <label>Others</label>
                              <input
                                className="form-control form-control-sm"
                                name="others"
                                onChange={inputEvent}
                                placeholder="Enter Others"
                                value={inputData?.others}
                                disabled={inputData?.status && true}
                              />
                            </div>
                          </>
                        )}

                        <p className="card-description ">
                          Investment Declarations
                        </p>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th> # </th>
                              <th> Section </th>
                              <th> Type </th>
                              <th> Amount </th>
                              {!inputData?.status && <th> Action </th>}
                            </tr>
                          </thead>
                          <tbody>
                            {deductions?.map((val, index) => {
                              return (
                                <tr>
                                  <td> {index + 1} </td>
                                  <td style={{ textTransform: "uppercase" }}>
                                    {val?.section?.split("section_")}
                                  </td>

                                  <td> {val?.section_type} </td>
                                  <td>
                                    {val?.section_amount === "NA"
                                      ? 0
                                      : val?.section_amount}
                                  </td>
                                  {!inputData?.status && (
                                    <td>
                                      <i
                                        className="mdi mdi-delete-forever btn-outline-danger fs-4"
                                        onClick={() => {
                                          removeData(index);
                                        }}
                                      ></i>
                                    </td>
                                  )}
                                </tr>
                              );
                            })}
                            <tr className="bg-light">
                              <td></td>
                              <td></td>
                              <td className="fw-bold ">Total:</td>
                              <td className="fw-bold">
                                {/* {deductions?.map((val) => {
                                    return val?.section_amount === "NA"
                                      ? 0
                                      : Number(totalAmount);
                                  })} */}
                                {deductions[0]?.section_amount === "NA"
                                  ? 0
                                  : Number(totalAmount)}
                              </td>
                              {!inputData?.status && <td></td>}
                            </tr>
                          </tbody>
                        </table>

                        {!inputData?.status && (
                          <>
                            <div className="form-group row mt-4">
                              <div className="col-md-4">
                                <label>Section</label>
                                <select
                                  className="form-control form-control-sm"
                                  name="section"
                                  value={
                                    data?.section !== undefined
                                      ? data?.section
                                      : ""
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
                                  <option value="section_80CCD1">
                                    80CCD(1)
                                  </option>
                                  <option value="section_80CCD1B">
                                    80CCD(1B)
                                  </option>
                                  <option value="section_80CCC2">
                                    80CCD(2)
                                  </option>
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
                                  className="form-control form-control-sm"
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
                                  className="btn btn-sm btn-gradient-success me-2 "
                                  onClick={() => {
                                    deductions?.push(data);
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
                            </div>
                          </>
                        )}

                        <div className="d-flex flex-row align-items-center mt-3">
                          <i className="mdi mdi-hand-pointing-right icon-md text-secondary"></i>
                          <p className="mb-0 ms-1">Verification </p>
                        </div>
                        <div className="row">
                          <p>
                            I,
                            <span className="fw-bold ms-1">
                              {inputData?.name}
                            </span>
                            , son/daughter of
                            {inputData?.status ? (
                              <span className="fw-bold ms-1">
                                {inputData?.father_name}
                              </span>
                            ) : (
                              <>
                                <span style={style}> *</span>
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
                                  disabled={inputData?.status && true}
                                />
                              </>
                            )}
                            . do hereby certify that the information given above
                            is complete and correct.
                          </p>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Submitted Date</label>
                              <span style={style}> *</span>
                              <input
                                type="date"
                                className="form-control form-control-sm"
                                name="date"
                                onChange={inputEvent}
                                placeholder="Enter Date"
                                value={
                                  inputData?.status !== undefined
                                    ? convertDateFormate(inputData?.date)
                                    : currentDate
                                }
                                disabled
                              />
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Place</label>
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
                                disabled={inputData?.status && true}
                              />
                              <small className="invalid-feedback">
                                {errors.place?.message}
                              </small>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Designation</label>
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
                                disabled={inputData?.status && true}
                              />
                              <small className="invalid-feedback">
                                {errors.designation?.message}
                              </small>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          {/* {inputData?.status ? (
                              <button
                                type="submit"
                                className="btn btn-sm btn-gradient-success me-2"
                                disabled
                              >
                                Submitted
                              </button>
                            ) : inputData?.status !== undefined ? (
                              <>
                                <button
                                  type="submit"
                                  className="btn btn-sm btn-gradient-primary me-2"
                                  onClick={() => setbutton_id(1)}
                                >
                                  Update
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-sm btn-gradient-success me-2"
                                  onClick={() => setbutton_id(2)}
                                >
                                  Update & Submit
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="submit"
                                  className="btn btn-sm btn-gradient-primary me-2"
                                  onClick={() => setbutton_id(1)}
                                >
                                  Save
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-sm btn-gradient-success me-2"
                                  onClick={() => setbutton_id(2)}
                                >
                                  Save & Submit
                                </button>
                              </>
                            )} */}
                          {!inputData?.status && (
                            <button
                              type="submit"
                              className="btn btn-sm btn-gradient-success me-2"
                              onClick={() => setbutton_id(2)}
                            >
                              Submit
                            </button>
                          )}
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
