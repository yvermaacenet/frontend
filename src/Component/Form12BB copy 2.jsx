import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { user_sign_up_validation } from "../Utils/Validation_Form";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCookies } from "react-cookie";

const Form12BB = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [inputData, setInputData] = useState({
    financial_year: "2023-2024",
  });
  const [houseRentAllowance, sethouseRentAllowance] = useState(false);
  const [
    leavetravelconcessionsorassistance,
    setLeavetravelconcessionsorassistance,
  ] = useState(false);
  const [deductionofinterestonborrowing, setDeductionofinterestonborrowing] =
    useState(false);
  const [inputs, setInputs] = useState([
    { section: "", section_type: "", section_amount: "" },
  ]);
  const [inputsSection, setInputsSection] = useState([
    { section_type: "", section_amount: "" },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(user_sign_up_validation),
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
    // alert();
    async function postData() {
      const result = await axios.post(`sign_up`, inputData);
      const resp = result.data;
      if (resp?.message === "Registered successfully") {
        alert("Registration has been successfully.");
        navigate("/");
      } else {
        alert(resp?.message);
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
  function addInputSection() {
    setInputsSection((prevInputs) => [
      ...prevInputs,
      { section: [{ section_type: "", section_amount: "" }] },
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
                              class="form-check-input"
                              name="house_rent_allowance"
                              //   value="yes"
                              onChange={(e) =>
                                sethouseRentAllowance(!houseRentAllowance)
                              }
                              checked={houseRentAllowance ? true : false}
                            />
                            Yes <i class="input-helper"></i>
                          </label>
                        </div>
                      </div>
                      <div class="col-sm-3">
                        <div class="form-check">
                          <label class="form-check-label">
                            <input
                              type="radio"
                              class="form-check-input"
                              name="house_rent_allowance"
                              //   value="no"
                              onChange={(e) =>
                                sethouseRentAllowance(!houseRentAllowance)
                              }
                              checked={
                                houseRentAllowance === false ? true : false
                              }
                            />
                            No <i class="input-helper"></i>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="exampleInputUsername1">
                        Rent paid to the landlord
                      </label>
                      <input
                        className={classNames("form-control form-control-sm", {
                          "is-invalid": errors.rent_paid_to_the_landlord,
                        })}
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
                        className={classNames("form-control form-control-sm", {
                          "is-invalid": errors.name_of_the_landlord,
                        })}
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
                        className={classNames("form-control form-control-sm", {
                          "is-invalid": errors.address_of_the_landlord,
                        })}
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
                        className={classNames("form-control form-control-sm", {
                          "is-invalid":
                            errors.permanent_account_number_of_the_landloard,
                        })}
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
                    <div class="form-group row">
                      <label class="col-sm-6 col-form-label">
                        Leave travel concessions or assistance
                      </label>
                      <div class="col-sm-3">
                        <div class="form-check">
                          <label class="form-check-label">
                            <input
                              type="radio"
                              class="form-check-input"
                              name="leave_travel_concessions_or_assistance"
                              onChange={(e) =>
                                setLeavetravelconcessionsorassistance(
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
                          </label>
                        </div>
                      </div>
                      <div class="col-sm-3">
                        <div class="form-check">
                          <label class="form-check-label">
                            <input
                              type="radio"
                              class="form-check-input"
                              name="leave_travel_concessions_or_assistance"
                              onChange={(e) =>
                                setLeavetravelconcessionsorassistance(
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
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputUsername1">Amount(Rs.)</label>
                      <input
                        className={classNames("form-control form-control-sm", {
                          "is-invalid":
                            errors.leave_travel_concessions_or_assistance_amount,
                        })}
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
                          errors.leave_travel_concessions_or_assistance_amount
                            ?.message
                        }
                      </small>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-6 col-form-label">
                        Deduction of interest on borrowing
                      </label>
                      <div class="col-sm-3">
                        <div class="form-check">
                          <label class="form-check-label">
                            <input
                              type="radio"
                              class="form-check-input"
                              name="deduction_of_interest_on_borrowing"
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
                          </label>
                        </div>
                      </div>
                      <div class="col-sm-3">
                        <div class="form-check">
                          <label class="form-check-label">
                            <input
                              type="radio"
                              class="form-check-input"
                              name="deduction_of_interest_on_borrowing"
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
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputUsername1">
                        Interest payable/paid to the lender
                      </label>
                      <input
                        className={classNames("form-control form-control-sm", {
                          "is-invalid":
                            errors.interest_payable_paid_to_the_lender,
                        })}
                        {...register("interest_payable_paid_to_the_lender", {
                          value: inputData?.interest_payable_paid_to_the_lender,
                        })}
                        name="interest_payable_paid_to_the_lender"
                        onChange={inputEvent}
                        placeholder="Enter Amount(Rs.) Interest payable/paid to the lender"
                        value={inputData?.interest_payable_paid_to_the_lender}
                        // autoSave
                      />
                      <small class="invalid-feedback">
                        {errors.interest_payable_paid_to_the_lender?.message}
                      </small>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputUsername1">
                        Name of the lander
                      </label>
                      <input
                        className={classNames("form-control form-control-sm", {
                          "is-invalid": errors.name_of_the_lander,
                        })}
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
                        className={classNames("form-control form-control-sm", {
                          "is-invalid": errors.address_of_the_lander,
                        })}
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
                        className={classNames("form-control form-control-sm", {
                          "is-invalid":
                            errors.permanent_account_number_of_the_lander,
                        })}
                        {...register("permanent_account_number_of_the_lander", {
                          value:
                            inputData?.permanent_account_number_of_the_lander,
                        })}
                        name="permanent_account_number_of_the_lander"
                        onChange={inputEvent}
                        placeholder="Enter Permanent Account Number of the lander"
                        value={
                          inputData?.permanent_account_number_of_the_lander
                        }
                        // autoSave
                      />
                      <small class="invalid-feedback">
                        {errors.permanent_account_number_of_the_lander?.message}
                      </small>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputUsername1">
                        Financial Institutions(if available)
                      </label>
                      <input
                        className={classNames("form-control form-control-sm", {
                          "is-invalid": errors.financial_institutions,
                        })}
                        {...register("financial_institutions", {
                          value: inputData?.financial_institutions,
                        })}
                        name="financial_institutions"
                        onChange={inputEvent}
                        placeholder="Enter Financial Institutions(if available) "
                        value={inputData?.financial_institutions}
                        // autoSave
                      />
                      <small class="invalid-feedback">
                        {errors.financial_institutions?.message}
                      </small>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputUsername1">
                        Employer(if available)
                      </label>
                      <input
                        className={classNames("form-control form-control-sm", {
                          "is-invalid": errors.employer,
                        })}
                        {...register("employer", {
                          value: inputData?.employer,
                        })}
                        name="employer"
                        onChange={inputEvent}
                        placeholder="Enter Employer(if available)"
                        value={inputData?.employer}
                        // autoSave
                      />
                      <small class="invalid-feedback">
                        {errors.employer?.message}
                      </small>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputUsername1">Others</label>
                      <input
                        className={classNames("form-control form-control-sm", {
                          "is-invalid": errors.others,
                        })}
                        {...register("others", {
                          value: inputData?.others,
                        })}
                        name="others"
                        onChange={inputEvent}
                        placeholder="Enter Others"
                        value={inputData?.others}
                        // autoSave
                      />
                      <small class="invalid-feedback">
                        {errors.others?.message}
                      </small>
                    </div>

                    {inputs.map((input, index) => (
                      <div key={index}>
                        <div class="form-group row">
                          <div className="col-md-4">
                            <label>Section</label>
                            <select
                              class="form-control form-control-sm"
                              name="section"
                              value={input.section}
                              onChange={(event) =>
                                updateInput(
                                  index,
                                  "section",
                                  event.target.value
                                )
                              }
                            >
                              <option value="">-- Select One --</option>
                              <option value="80c">80C</option>
                              <option value="80cc">80CC</option>
                              <option value="80ccd1">80CCD(1)</option>
                              <option value="80ccdb">80CCD(1B)</option>
                              <option value="80ccd2">80CCD(2)</option>
                            </select>
                          </div>
                          <div
                            className="col-md-4"
                            style={{ marginTop: "20px" }}
                          >
                            <button
                              type="button"
                              class="btn btn-inverse-danger btn-icon"
                              onClick={() => removeInput(index)}
                            >
                              <i className="mdi mdi-delete-forever"></i>
                            </button>
                          </div>
                        </div>
                        {inputsSection.map((input, index) => (
                          <>
                            <div className="form-group row">
                              <div className="col-md-4"></div>
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
                                  <option value="1">1</option>
                                  <option value="2">2</option>
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
                                <button
                                  type="button"
                                  class="btn btn-inverse-danger btn-icon"
                                  //   onClick={addInputSection}
                                >
                                  <i className="mdi mdi-delete-forever"></i>
                                </button>
                              </div>
                            </div>
                          </>
                        ))}
                        <div className="row">
                          <div className="col-md-11"></div>
                          <div
                            className="col-md-1"
                            style={{ marginTop: "20px" }}
                          >
                            <button
                              type="button"
                              class="btn btn-sm btn-inverse-success btn-icon"
                              onClick={addInputSection}
                            >
                              <i className="mdi mdi-plus"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      type="submit"
                      class="btn btn-sm btn-gradient-success me-2"
                      onClick={addInput}
                    >
                      Add Section
                    </button>

                    <div className="text-center">
                      <button
                        type="submit"
                        class="btn btn-sm btn-gradient-primary me-2"
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
