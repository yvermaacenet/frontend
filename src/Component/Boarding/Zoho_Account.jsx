import React from "react";

const Zoho_Account = ({ inputData }) => {
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
                  <td> ZOHO People Account Created</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="zoho_people_account_created"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.zoho_people_account_created}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> Zoho People Account Activated</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="zoho_people_account_activated"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.zoho_people_account_activated}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> Zoho Payroll Integrated</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="zoho_payroll_integrated"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.zoho_payroll_integrated}
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

export default Zoho_Account;
