import React, { useState, useEffect } from "react";
import { MultiStepForm, Step } from "react-multi-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Employee_Details = ({ inputData }) => {
  console.log("csecw", inputData);
  const { _id } = useParams();
  const [adminFormData, setAdminFormData] = useState([]);
  const [active, setActive] = useState(1);
  const [getUserListByID, setGetUserListByID] = useState({});
  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    // async function get_on_boarding_list() {
    //   const result = await axios.get(`/on_boarding/${_id}`);
    //   const resp = result.data[0];
    //   setInputData(resp);
    //   setRenderComponent(false);
    // }
    // get_on_boarding_list();
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
  return (
    // <MultiStepForm activeStep={active}>
    //   <Step label="Employee Details">
    <>
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
                    {`${inputData?.f_name} ${inputData?.m_name} ${inputData?.l_name}`}
                  </td>
                </tr>
                <tr>
                  <td> Designation</td>
                  <td>{inputData?.designation}</td>
                </tr>
                <tr>
                  <td> Date of Joining</td>
                  <td>{inputData?.joining_date?.split("T")[0]}</td>
                </tr>
                <tr>
                  <td> Phone No.</td>
                  <td>{inputData?.phone}</td>
                </tr>
                <tr>
                  <td> Current Address</td>
                  <td>{inputData?.communication_address}</td>
                </tr>
                <tr>
                  <td> Permanent Address</td>
                  <td>{inputData?.permanent_address}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* {active !== 7 && (
        <>
          <NavLink
            class="btn btn-sm btn-gradient-primary me-2"
            onClick={(e) => setActive(active + 1)}
            style={{ float: "right" }}
          >
            Next
          </NavLink>
        </>
      )} */}
    </>
    //   </Step>
    // </MultiStepForm>
  );
};

export default Employee_Details;
