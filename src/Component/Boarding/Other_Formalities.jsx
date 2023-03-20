import React from "react";

const Other_Formalities = ({ inputData }) => {
  return (
    <>
      <div className="row">
        <div class="card">
          <div class="card-body">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th> Field Name </th>
                  <th> Action </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> BGV Initiated</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="bgv_initiated"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.bgv_initiated}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> BGV Invoice Paid</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="bgv_invoice_Paid"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.bgv_invoice_Paid}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> BGV Report Received</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="bgv_report_Received"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.bgv_report_Received}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> Update LinkedIn</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="update_linkedIn"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.update_linkedIn}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Other_Formalities;
