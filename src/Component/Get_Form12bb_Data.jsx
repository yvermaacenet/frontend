import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const Get_Form12bb_Data = () => {
  const [getForm12bbdata, setForm12bbdata] = useState([]);
  const [getForm12bbdatabyid, setForm12bbdatabyid] = useState([]);
  useEffect(() => {
    async function getData() {
      const result = await axios.get(`form_12_bb`);
      const resp = result.data;
      setForm12bbdata(resp);
    }
    getData();
  }, []);

  const clickbuttondata = async (id) => {
    const result = await axios.get(`form_12_bb/${id}`);
    const resp = result.data[0];
    const ded = [
      {
        Name: resp.name,
        Email: resp.email,
        "Employee ID": resp.emp_id,
        "Fathers Name": resp.father_name,
        Address: resp.address,
        PAN: resp.permanent_account_number_of_the_employee,
        Place: resp.place,
        "Financial Year": resp.financial_year,
        VPF: resp?.vpf_apply,
        "Rent Paid to the landlord": resp.rent_paid_to_the_landlord,
        "Name of the landlord": resp.name_of_the_landlord,
        "Address of the landlord": resp.address_of_the_landlord,
        "PAN of landlord": resp.permanent_account_number_of_the_landloard,
        "Leave travel concession /assistance":
          resp.leave_travel_concessions_or_assistance_amount,
        "Interest Paid to the lender": resp.interest_payable_paid_to_the_lender,
        "Name of the lender": resp.name_of_the_lender,
        "Address of the lender": resp.address_of_the_lender,
        "Permanent Account Number of the lender":
          resp.permanent_account_number_of_the_lender,
        "Financial Institutions(if available)": resp.financial_institutions,
        Others: resp.others,
      },
    ];
    const ded2 = resp.deductions.map((val) => {
      return {
        "Section Name": val.section.split("section_")[1],
        "Section Type": val.section_type,
        "Section Amount": val.section_amount,
      };
    });

    const mergedData = ded.concat(ded2);
    const worksheet = XLSX.utils.json_to_sheet(mergedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const downloadExcel = async () => {
      const blob = await new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      const fileName = `${resp.name}_Form_12_BB.xlsx`;
      saveAs(blob, fileName);
    };
    downloadExcel();
  };

  return (
    <div>
      <div className="row">
        <div class="col-lg-6 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Form 12BB Data</h4>
              {/* <p class="card-description">
                Add class <code>.table</code>
              </p> */}
              <table class="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getForm12bbdata?.map((val, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{val?.name}</td>
                        <td>{val.address}</td>
                        <td>
                          <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={() => clickbuttondata(val?._id)}
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
  );
};

export default Get_Form12bb_Data;
