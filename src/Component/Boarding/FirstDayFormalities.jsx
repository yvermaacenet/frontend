import React from "react";

const FirstDayFormalities = ({ inputData }) => {
  return (
    <div>
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
                  <td> Wifi Passwords </td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="wifi_passwords"
                          class="form-control form-control-sm"
                          checked={inputData?.wifi_passwords}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> Generate Mail Id </td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="genrate_mail_id"
                          class="form-control form-control-sm"
                          checked={inputData?.genrate_mail_id}
                          disabled
                          style={{ opacity: 0 }}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> One Drive Access </td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="one_drive_access"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.one_drive_access}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> Add To Official DLs</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="add_to_official_dls"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.add_to_official_dls}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> Teams Access</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="teams_access"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.teams_access}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> Biometric </td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="biometric"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.biometric}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> Induction Call</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="induction_call"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.induction_call}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                {inputData?.induction_call === true ? (
                  <tr>
                    <td> Induction Call With</td>
                    <td>
                      <select
                        name="induction_call_with"
                        value={inputData?.induction_call_with}
                        className="form-control mt-2 "
                        type="text"
                      >
                        <option>Please Select</option>
                        <option value="sunil">Sunil</option>
                        <option value="amit">Amit</option>
                      </select>
                    </td>
                  </tr>
                ) : (
                  ""
                )}
                <tr>
                  <td> Acenet Laptop</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="acenet_laptop"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.acenet_laptop}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> Client Laptop</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="client_laptop"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.client_laptop}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> Notepad </td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="notpad"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.notpad}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> T-Shirt</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="t_shirt"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.t_shirt}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> Welcome Kit</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="welcome_kit"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.welcome_kit}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span>Yes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td> Intro Slide Shared</td>
                  <td>
                    <div className="board">
                      <span>No</span>
                      <label class="switch ms-1 me-1 mt-1 ">
                        <input
                          type="checkbox"
                          name="intro_slide_shared"
                          class="form-control form-control-sm"
                          disabled
                          style={{ opacity: 0 }}
                          checked={inputData?.intro_slide_shared}
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
    </div>
  );
};

export default FirstDayFormalities;
