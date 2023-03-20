import React from "react";

const Compliance_Documents = ({ inputData }) => {
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
                  <td> PF Form Received</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="pf_form_recieved"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.pf_form_recieved}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> PF Form submitted to CA Team</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="pf_submitted_to_ca_team"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.pf_submitted_to_ca_team}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>PF Number shared with the employee</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="PF_number_shared_with_the_employee"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={
                            inputData?.PF_number_shared_with_the_employee
                          }
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> Gratuity Form Received</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="gratuity_Form_Received"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.gratuity_Form_Received}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Gratuity Form submitteed to CA Team</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="gratuity_Form_submitteed_to_CA_Team"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={
                            inputData?.gratuity_Form_submitteed_to_CA_Team
                          }
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> GHI Documents Received</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="ghi_documents_received"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.ghi_documents_received}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>GHI Initiated</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="ghi_initiated"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.ghi_initiated}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>GHI E-Card issued</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="ghi_eCard_issued"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.ghi_eCard_issued}
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

export default Compliance_Documents;
