import React from "react";

const Documents = ({ inputData }) => {
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
                  <td>Aadhar Card</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="aadhar_card"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.aadhar_card}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> PAN Card</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="pan_card"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.pan_card}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> Passport </td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="passport"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.passport}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> DL </td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="dl"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.dl}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> 10th </td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="ten_th"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.ten_th}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> 12th </td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="tweleve_th"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.tweleve_th}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> Graduation </td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="graduation"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.graduation}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> Post Graduation</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="post_graduation"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.post_graduation}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    Experience proof - Relieving letter from previous employers
                    (if previously employed)
                  </td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="experience_proof"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.experience_proof}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> Passport size photograph</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="passport_size_photo"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.passport_size_photo}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> Signed Offer Letter</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="signed_offer_latter"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.signed_offer_latter}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> Document Verification</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="documents_verification"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.documents_verification}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> Covid Certificate</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="covid_certificate"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.covid_certificate}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Employee Data Sheet (Bank Details)</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="employee_data_sheet_bank_details"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.employee_data_sheet_bank_details}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> Other official document</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="other_official_documents"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.other_official_documents}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> Pay slips - Last 3 months</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="pay_slips"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.pay_slips}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    Form 16 or Taxable income statement duly certified by
                    previous employer(Statement showing deductions and Taxable
                    income with break up)
                  </td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="forms_16"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.forms_16}
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

export default Documents;
