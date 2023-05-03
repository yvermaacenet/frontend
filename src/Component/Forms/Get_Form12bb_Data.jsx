import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import { useNavigate } from "react-router-dom";
const Get_Form12bb_Data = () => {
  const navigate = useNavigate();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));

  const [loading, setLoading] = useState(false);
  const [getForm12bbdata, setForm12bbdata] = useState([]);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      await axios
        .get(`form_12_bb`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((result) => {
          const resp = result.data;
          return setForm12bbdata(resp), setLoading(false);
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

  const clickbuttondata = async (id) => {
    setLoading(true);
    await axios
      .get(`get_form_12_bb_controller_by_id/${id}`, {
        headers: { Access_Token: LocalStorageData?.generate_auth_token },
      })
      .then((result) => {
        const resp = result.data[0];

        const ded = [
          ["Sr.No", "#", "#"],
          ["1", "Name", resp.name],
          ["2", "Email", resp.email],
          ["3", "Employee ID", resp.emp_id],
          ["4", "Fathers Name", resp.father_name],
          ["5", "Address", resp.address],
          ["6", "PAN", resp.permanent_account_number_of_the_employee],
          ["7", "Place", resp.place],
          ["8", "Financial Year", resp.financial_year],
          ["9", "VPF", resp?.vpf_apply],
          ["10", "Self Occupied or Rented", resp?.self_occupied_or_rented],
          ["11", "Rent Paid to the landlord", resp.rent_paid_to_the_landlord],
          ["12", "Name of the landlord", resp.name_of_the_landlord],
          [
            "13",
            "Address of the Rental Property",
            resp.address_of_the_rental_property,
          ],
          [
            "14",
            "PAN of landlord",
            resp.permanent_account_number_of_the_landloard,
          ],
          ["15", "Availed in last 4 Years", resp.availed_in_last_4_years],
          [
            "16",
            "Leave travel concession /assistance",
            resp.leave_travel_concessions_or_assistance_amount,
          ],
          [
            "17",
            "Interest Paid to the lender",
            resp.interest_payable_paid_to_the_lender,
          ],
          ["18", "Name of the lender", resp.name_of_the_lender],
          [
            "19",
            "Permanent Account Number of the lender",
            resp.permanent_account_number_of_the_lender,
          ],
          [
            "20",
            "Financial Institutions(if available)",
            resp.financial_institutions,
          ],
          ["21", "Others", resp.others],
          ["22", "Section Name", "Section Type", "Amount"],
        ];
        const rr = [];
        async function romanize(num) {
          if (isNaN(num)) return NaN;
          var digits = String(+num).split(""),
            key = [
              "",
              "C",
              "CC",
              "CCC",
              "CD",
              "D",
              "DC",
              "DCC",
              "DCCC",
              "CM",
              "",
              "X",
              "XX",
              "XXX",
              "XL",
              "L",
              "LX",
              "LXX",
              "LXXX",
              "XC",
              "",
              "I",
              "II",
              "III",
              "IV",
              "V",
              "VI",
              "VII",
              "VIII",
              "IX",
            ],
            roman = "",
            i = 3;
          while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
          return Array(+digits.join("") + 1).join("M") + roman;
        }
        resp?.deductions.map((val, index) => {
          rr.push([
            `(${romanize(index + 1)})`,
            val.section.split("section_")[1],
            val.section_type,
            val.section_amount,
            ,
          ]);
        });

        const mergedData = ded.concat(rr);
        const worksheet = XLSX.utils.aoa_to_sheet(mergedData);
        worksheet["!cols"] = [
          { width: 5 },
          { width: 25 },
          { width: 25 },
          { width: 25 },
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users", {
          editable: true,
        });
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
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 500) {
          navigate("/error_500");
        } else {
          navigate("/error_403");
        }
      });
  };

  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <Page_Header
              page_title="Form 12 BB (See rule 26C)"
              page_title_icon="mdi-home-modern"
              page_title_button="Back"
              page_title_button_link="/dashboard"
            />
            {loading && (
              <div className="loader-container">
                <div class="loader"></div>
              </div>
            )}

            <div>
              <div className="row">
                <div class="col-lg-12 grid-margin stretch-card">
                  <div class="card">
                    <div class="card-body">
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
                                    className="btn btn-sm btn-outline-primary"
                                    type="button"
                                    onClick={() =>
                                      clickbuttondata(val?.user_id)
                                    }
                                  >
                                    Download
                                  </button>
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
          <footer className="footer">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Get_Form12bb_Data;
