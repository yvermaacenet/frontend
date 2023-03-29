import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { form12bb_validation } from "../Utils/Validation_Form";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCookies } from "react-cookie";

const Form12BB = () => {
  const navigate = useNavigate();
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
  const [inputs, setInputs] = useState([
    { section: "", section_type: "", section_amount: "" },
  ]);

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
  const onSignUpButton = () => {
    const jsonDate = {
      ...inputData,
      deductions: inputs,
    };
    async function postData() {
      const result = await axios.post(`form_12_bb`, jsonDate);
      const resp = result.data;
      if (resp?.message === "updated") {
        alert("Created");
        window.location.reload();
      }
    }
    postData();
  };

  function addInput() {
    setInputs((prevInputs) => [
      ...prevInputs,
      { section: "", section_type: "", section_amount: "" },
    ]);
  }
  function updateInput(index, key, value) {
    setInputs((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs[index][key] = value;
      return newInputs;
    });
  }
  function removeInput(index) {
    setInputs((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs.splice(index, 1);
      return newInputs;
    });
  }
  const section_80c = [
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
  const section_80ccc = [
    {
      name: "Investment in Pension Funds",
    },
  ];
  const section_80ccd1 = [
    {
      name: "Atal Pension Yojana",
    },
    {
      name: "National Pension Scheme Contribution",
    },
  ];
  const section_80ccdb = [
    {
      name: "Atal Pension Yojana(additional deduction)",
    },
    {
      name: "National Pension Scheme Contribution (additional deduction)",
    },
  ];
  const section_80ccd2 = [
    {
      name: "National Pension Scheme Contribution by Employer",
    },
  ];
  const section_80d = [
    {
      name: "Medical Insurance Premium",
    },
    {
      name: "preventive health checkup",
    },
    {
      name: "Medical Expenditure",
    },
  ];
  const section_80dd = [
    {
      name: "Medical Treatment of a Dependent with Disability",
    },
  ];
  const section_80ddb = [
    {
      name: "Medical expenditure for treatment of Specified Diseases",
    },
  ];
  const section_80e = [
    {
      name: "Interest paid on Loan taken for Higher Education",
    },
  ];
  const section_80ee = [
    {
      name: "Interest paid on Housing Loan",
    },
  ];
  const section_80eea = [
    {
      name: "Interest Paid on Housing Loan",
    },
  ];
  const section_80eeb = [
    {
      name: "Interest paid on Electric Vehicle Loan",
    },
  ];
  const section_80g = [
    {
      name: "Donation to specified funds/institutions.",
    },
  ];
  const section_80gg = [
    {
      name: "Income Tax Deduction for House Rent Paid.",
    },
  ];
  const section_80gga = [
    {
      name: "	Donation to Scientific Research & Rural Development",
    },
  ];
  const section_80ggb = [
    {
      name: "	Contribution to Political Parties",
    },
  ];
  const section_80ggc = [
    {
      name: "	Individuals on contribution to Political Parties",
    },
  ];
  const section_80rrb = [
    {
      name: "	Royalty on Patents",
    },
  ];
  const section_80qqb = [
    {
      name: "Royalty Income of Authors",
    },
  ];
  const section_80tta = [
    {
      name: "Interest earned on Savings Accounts",
    },
  ];
  const section_80ttb = [
    {
      name: "Interest Income earned on deposits(Savings/ FDs)",
    },
  ];
  const section_80u = [
    {
      name: "Disabled Individuals",
    },
  ];
  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth">
            <div className="row flex-grow">
              <div className="col-lg-9 mx-auto">
                <div className="auth-form-light text-left p-5">
                  <h2 className="text-center">FORM NO.12BB</h2>
                  <h6 className="font-weight-light text-center">
                    (See rule 26C)
                  </h6>

                  <form
                    class="forms-sample"
                    onSubmit={handleSubmit(onSignUpButton)}
                  >
                    <div class="form-group">
                      <label for="exampleInputUsername1">Name</label>
                      <input
                        className={classNames("form-control form-control-sm", {
                          "is-invalid": errors.name,
                        })}
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
                    <div class="form-group">
                      <label for="exampleInputUsername1">Address</label>
                      <input
                        className={classNames("form-control form-control-sm", {
                          "is-invalid": errors.address,
                        })}
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
                      <input
                        className={classNames("form-control form-control-sm", {
                          "is-invalid":
                            errors.permanent_account_number_of_the_employee,
                        })}
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
                      <select
                        class="form-control form-control-sm"
                        value="2023-2024"
                        disabled
                      >
                        <option>2023-2024</option>
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
                              onChange={(e) =>
                                sethouseRentAllowance(!houseRentAllowance)
                              }
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
                          <input
                            className={classNames(
                              "form-control form-control-sm",
                              {
                                "is-invalid": errors.rent_paid_to_the_landlord,
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
                            Address of the landlord
                          </label>
                          <input
                            className={classNames(
                              "form-control form-control-sm",
                              {
                                "is-invalid": errors.address_of_the_landlord,
                              }
                            )}
                            {...register("address_of_the_landlord", {
                              value: inputData?.address_of_the_landlord,
                            })}
                            name="address_of_the_landlord"
                            onChange={inputEvent}
                            placeholder="Enter Address of the landlord"
                            value={inputData?.address_of_the_landlord}
                            // autoSave
                          />
                          <small class="invalid-feedback">
                            {errors.address_of_the_landlord?.message}
                          </small>
                        </div>
                        <div class="form-group">
                          <label for="exampleInputUsername1">
                            Permanent Account Number of the landlord
                          </label>
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
                              errors.permanent_account_number_of_the_landloard
                                ?.message
                            }
                          </small>
                        </div>
                      </>
                    )}

                    <div class="form-group row">
                      <label class="col-sm-6 col-form-label">
                        Leave travel concessions or assistance
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
                              onChange={(e) =>
                                setleavetravelconcessionsorassistance(
                                  !leavetravelconcessionsorassistance
                                )
                              }
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
                        {" "}
                        <div class="form-group">
                          <label for="exampleInputUsername1">Amount(Rs.)</label>
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
                              {...register("deductionofinterestonborrowing", {
                                value:
                                  inputData?.deductionofinterestonborrowing,
                              })}
                              name="deductionofinterestonborrowing"
                              value={deductionofinterestonborrowing}
                              onChange={(e) =>
                                setDeductionofinterestonborrowing(
                                  !deductionofinterestonborrowing
                                )
                              }
                              checked={
                                deductionofinterestonborrowing ? true : false
                              }
                            />
                            Yes <i class="input-helper"></i>
                            <small class="invalid-feedback">
                              {errors.deductionofinterestonborrowing?.message}
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
                              {...register("deductionofinterestonborrowing", {
                                value:
                                  inputData?.deductionofinterestonborrowing,
                              })}
                              name="deductionofinterestonborrowing"
                              value={deductionofinterestonborrowing}
                              onChange={(e) =>
                                setDeductionofinterestonborrowing(
                                  !deductionofinterestonborrowing
                                )
                              }
                              checked={
                                deductionofinterestonborrowing === false
                                  ? true
                                  : false
                              }
                            />
                            No <i class="input-helper"></i>
                            <small class="invalid-feedback">
                              {errors.deductionofinterestonborrowing?.message}
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
                          <input
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
                            Name of the lander
                          </label>
                          <input
                            className={classNames(
                              "form-control form-control-sm",
                              {
                                "is-invalid": errors.name_of_the_lander,
                              }
                            )}
                            {...register("name_of_the_lander", {
                              value: inputData?.name_of_the_lander,
                            })}
                            name="name_of_the_lander"
                            onChange={inputEvent}
                            placeholder="Enter Name of the lander"
                            value={inputData?.name_of_the_lander}
                            // autoSave
                          />
                          <small class="invalid-feedback">
                            {errors.name_of_the_lander?.message}
                          </small>
                        </div>
                        <div class="form-group">
                          <label for="exampleInputUsername1">
                            Address of the lander
                          </label>
                          <input
                            className={classNames(
                              "form-control form-control-sm",
                              {
                                "is-invalid": errors.address_of_the_lander,
                              }
                            )}
                            {...register("address_of_the_lander", {
                              value: inputData?.address_of_the_lander,
                            })}
                            name="address_of_the_lander"
                            onChange={inputEvent}
                            placeholder="Enter Address of the lander"
                            value={inputData?.address_of_the_lander}
                            // autoSave
                          />
                          <small class="invalid-feedback">
                            {errors.address_of_the_lander?.message}
                          </small>
                        </div>
                        <div class="form-group">
                          <label for="exampleInputUsername1">
                            Permanent Account Number of the lander
                          </label>
                          <input
                            className={classNames(
                              "form-control form-control-sm",
                              {
                                "is-invalid":
                                  errors.permanent_account_number_of_the_lander,
                              }
                            )}
                            {...register(
                              "permanent_account_number_of_the_lander",
                              {
                                value:
                                  inputData?.permanent_account_number_of_the_lander,
                              }
                            )}
                            name="permanent_account_number_of_the_lander"
                            onChange={inputEvent}
                            placeholder="Enter Permanent Account Number of the lander"
                            value={
                              inputData?.permanent_account_number_of_the_lander
                            }
                            // autoSave
                          />
                          <small class="invalid-feedback">
                            {
                              errors.permanent_account_number_of_the_lander
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
                          <label for="exampleInputUsername1">
                            Employer(if available)
                          </label>
                          <input
                            className="form-control form-control-sm"
                            name="employer"
                            onChange={inputEvent}
                            placeholder="Enter Employer(if available)"
                            value={inputData?.employer}
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

                    {inputs.map((input, index) => (
                      <div key={index}>
                        <div class="form-group"></div>
                        <div class="form-group row">
                          <div className="col-md-4">
                            <label>Section</label>
                            <select
                              class="form-control form-control-sm"
                              name="section"
                              value={input.section}
                              onChange={(event) => {
                                return (
                                  updateInput(
                                    index,
                                    "section",
                                    event.target.value
                                  ),
                                  setGetSection(eval(event.target.value))
                                );
                              }}
                            >
                              <option value="">-- Select One --</option>
                              <option value="section_80c">80C </option>
                              <option value="section_80ccc">80CCC </option>
                              <option value="section_80ccd1">80CCD(1)</option>
                              <option value="section_80ccdb">80CCD(1B)</option>
                              <option value="section_80ccd2">80CCD(2)</option>
                              <option value="section_80d"> 80D</option>
                              <option value="section_80dd">80DD</option>
                              <option value="section_80ddb">80DDB</option>
                              <option value="section_80e">80E</option>
                              <option value="section_80ee">80EE</option>
                              <option value="section_80eea">80EEA</option>
                              <option value="section_80eeb">80EEB</option>
                              <option value="section_80g">80G</option>
                              <option value="section_80gg">80GG</option>
                              <option value="section_80gga">80GGA</option>
                              <option value="section_80ggb">80GGB</option>
                              <option value="section_80ggc">80GGC</option>
                              <option value="section_80rrb">80RRB</option>
                              <option value="section_80qqb">80QQB</option>
                              <option value="section_80tta">80TTA</option>
                              <option value="section_80ttb">80TTB</option>
                              <option value="section_80u">80U</option>
                            </select>
                          </div>
                          <div className="col-md-4">
                            <label>Type</label>
                            <select
                              class="form-control form-control-sm"
                              name="section_type"
                              value={input.section_type}
                              onChange={(event) =>
                                updateInput(
                                  index,
                                  "section_type",
                                  event.target.value
                                )
                              }
                            >
                              <option value="">-- Select One --</option>
                              {getSection?.map((val) => {
                                return (
                                  <option value={val.name}>{val.name}</option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="col-md-3">
                            <label>Amount</label>
                            <input
                              className="form-control form-control-sm"
                              name="section_amount"
                              placeholder="Enter Session Amount"
                              value={input.section_amount}
                              onChange={(event) =>
                                updateInput(
                                  index,
                                  "section_amount",
                                  event.target.value
                                )
                              }
                            />
                          </div>
                          <div
                            className="col-md-1"
                            style={{ marginTop: "20px" }}
                          >
                            {index !== 0 && (
                              <button
                                type="button"
                                class="btn btn-inverse-danger btn-icon"
                                onClick={() => removeInput(index)}
                              >
                                <i className="mdi mdi-delete-forever"></i>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div class="d-flex flex-row align-items-center">
                      <i
                        class="mdi mdi-plus icon-md text-success"
                        onClick={addInput}
                      ></i>
                      <p class="mb-0 ms-1"> Add Row </p>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-3">
                      <i class="mdi mdi-hand-pointing-right icon-md text-secondary"></i>
                      <p class="mb-0 ms-1">Verification </p>
                    </div>
                    <div className="row">
                      <p>
                        I,
                        <input
                          className="form-control form-control-sm"
                          value={inputData?.name}
                          disabled
                        />
                        ,son/daughter of{" "}
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
                        . do hereby certify that the information given above is
                        complete and correct.
                      </p>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div class="form-group">
                          <label for="exampleInputUsername1">
                            Submitted Date
                          </label>
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
                          <label for="exampleInputUsername1">Designation</label>
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
                        Submit
                      </button>
                    </div>
                  </form>
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
