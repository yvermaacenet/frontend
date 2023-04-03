import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const Get_Form_Flexi_Benefit_Data = () => {
  const [getForm12bbdata, setForm12bbdata] = useState([]);
  const [getForm12bbdatabyid, setForm12bbdatabyid] = useState([]);
  useEffect(() => {
    async function getData() {
      const result = await axios.get(`form_flexi`);
      const resp = result.data;
      setForm12bbdata(resp);
    }
    getData();
  }, []);

  const clickbuttonalldata = async () => {
    const result = await axios.get(`form_flexi`);
    const resp = result.data;
    const ArrayData = [];
    await resp.map((val) => {
      return ArrayData.push({
        Name: val?.name,
        Email: val?.email,
        "Employee ID": val?.emp_id,
        "Salary band": val?.salary_band,
        Stream: val?.stream,
        Position: val?.position,
        "Children allowance": val?.children_allowance,
        "Telephone Allowance": val?.telephone_allowance,
        Fuel: val?.fuel_allowance,
        Driver: val?.driver_allowance,
        "Meals Allowance": val?.meals_allowance,
        "Books and Periodicals": val?.books_and_periodicals_allowance,
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(ArrayData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    // console.log(excelBuffer);
    const downloadExcel = async () => {
      const blob = await new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      const fileName = `All_Data_Of_Flexible_Benefit_Plan_Form.xlsx`;
      saveAs(blob, fileName);
    };
    downloadExcel();
  };
  const clickbuttondata = async (id) => {
    const result = await axios.get(`get_form_flexible_by_id/${id}`);
    const resp = result.data[0];
    const ded = [
      ["Sr.No", "#", "Value"],
      ["1", "Name", resp.name],
      ["2", "Email", resp.email],
      ["3", "Employee ID", resp.emp_id],
      ["4", "Salary band", resp.salary_band],
      ["5", "Stream", resp.stream],
      ["6", "Position", resp.position],
      ["7", "Children allowance", resp.children_allowance],
      ["8", "Telephone Allowance", resp.telephone_allowance],
      ["9", "Fuel", resp.fuel_allowance],
      ["10", "Driver", resp.driver_allowance],
      ["11", "Meals Allowance", resp.meals_allowance],
      ["12", "Books and Periodicals", resp.books_and_periodicals_allowance],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(ded);
    worksheet["!cols"] = [{ width: 15 }, { width: 15 }];
    const workbook = XLSX.utils.book_new();
    // console.log("workbook", workbook);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    // console.log(excelBuffer);
    const downloadExcel = async () => {
      const blob = await new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      const fileName = `${resp.name}_Flexible_Benefit_Plan_Form.xlsx`;
      saveAs(blob, fileName);
    };
    downloadExcel();
  };

  // console.log("dsada", [getForm12bbdatabyid]);
  // console.log("dsada", [getForm12bbdatabyid.deductions]);
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex justify-content-center align-items-center auth">
          <div class="grid-margin stretch-card w-75">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Flexible Benefit Plan Form Data</h4>
                {/* <p class="card-description">
                Add class <code>.table</code>
              </p> */}
                <button
                  className="btn btn-outline-primary btn-sm"
                  type="button"
                  onClick={() => clickbuttonalldata()}
                  style={{ float: "right" }}
                >
                  Download All Data
                </button>
                <table class="table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Stream</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getForm12bbdata?.map((val, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{val?.name}</td>
                          <td>{val.stream}</td>
                          <td>
                            <button
                              className="btn btn-outline-primary btn-sm"
                              type="button"
                              onClick={() => clickbuttondata(val?.user_id)}
                            >
                              Download
                            </button>
                            {/* <button type="button" onClick={() => downloadExcel()}>
                            Download
                          </button> */}
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
      </div>
    </div>
  );
};

export default Get_Form_Flexi_Benefit_Data;
