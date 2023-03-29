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
      //   console.log(resp);
    }
    getData();
  }, []);
  const ded = [
    {
      name: "dada",
      father_name: "fsfds",
      place: "fsfsfsd",
      address: "ddada",
      financial_year: "2023-2024",
      permanent_account_number_of_the_employee: "1234567890",
      rent_paid_to_the_landlord: 1234567890,
      name_of_the_landlord: "",
      address_of_the_landlord: "sdadad",
      permanent_account_number_of_the_landloard: "1234567890I",
    },
  ];
  const ded2 = getForm12bbdatabyid.deductions;

  //   const mergedData = ded.concat(ded2);
  //   const worksheet = XLSX.utils.json_to_sheet(mergedData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
  //   const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  //   const downloadExcel = () => {
  //     const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  //     const fileName = "users.xlsx";
  //     saveAs(blob, fileName);
  //   };
  const clickbuttondata = async (id) => {
    const result = await axios.get(`form_12_bb/${id}`);
    const resp = result.data[0];
    console.log(resp);
    // setForm12bbdatabyid(resp);
    const ded = [
      {
        name: resp.name,
        father_name: resp.father_name,
        place: resp.place,
      },
    ];
    const ded2 = resp.deductions.map((val) => {
      return {
        section: val.section,
        section_type: val.section_type,
        section_amount: val.section_amount,
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
    console.log(excelBuffer);
    const downloadExcel = async () => {
      const blob = await new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      const fileName = `${resp.name}.xlsx`;
      saveAs(blob, fileName);
    };
    downloadExcel();
  };

  console.log("dsada", [getForm12bbdatabyid]);
  console.log("dsada", [getForm12bbdatabyid.deductions]);
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
                        <td>{val._id}</td>
                        <td>{val?.name}</td>
                        <td>{val.address}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => clickbuttondata(val?._id)}
                          >
                            dassss
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
