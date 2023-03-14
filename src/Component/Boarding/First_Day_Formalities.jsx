import React, { useState } from "react";

const First_Day_Formalities = () => {
  const [adminFormData, setAdminFormData] = useState([]);

  const handleAdminInput = (e) => {
    // e.preventDefault();
    const { name, value } = e.target;
    setAdminFormData({ ...adminFormData, [name]: value });
  };
  return (
    <form class="forms-sample">
      <div className="row">
        <div className="col-md-3">
          <div class="form-group">
            <label>Wifi Passwords</label>
            <select
              name="wifi_passwords"
              onChange={handleAdminInput}
              value={adminFormData?.wifi_passwords}
              className="form-control mt-2 "
              type="text"
            >
              <option>Please Select</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
              <option value="Na">NA</option>
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <div class="form-group">
            <label>Generate Mail Id</label>
            <select
              name="genrate_mail_id"
              onChange={handleAdminInput}
              value={adminFormData?.genrate_mail_id}
              className="form-control mt-2 "
              type="text"
            >
              <option>Please Select</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
              <option value="Na">NA</option>
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <div class="form-group">
            <label>One Drive Access</label>
            <select
              name="one_drive_access"
              onChange={handleAdminInput}
              value={adminFormData?.one_drive_access}
              className="form-control mt-2 "
              type="text"
            >
              <option>Please Select</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
              <option value="Na">NA</option>
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <div class="form-group">
            <label>Add To Official DLs</label>
            <select
              name="add_to_official_dls"
              onChange={handleAdminInput}
              value={adminFormData?.add_to_official_dls}
              className="form-control mt-2 "
              type="text"
            >
              <option>Please Select</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
              <option value="Na">NA</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div class="form-group">
            <label>Teams Access</label>
            <select
              name="teams_access"
              onChange={handleAdminInput}
              value={adminFormData?.teams_access}
              className="form-control mt-2 "
              type="text"
            >
              <option>Please Select</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
              <option value="Na">NA</option>
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <div class="form-group">
            <label>Biometric</label>
            <select
              name="biometric"
              onChange={handleAdminInput}
              value={adminFormData?.biometric}
              className="form-control mt-2 "
              type="text"
            >
              <option>Please Select</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
              <option value="Na">NA</option>
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <div class="form-group">
            <label>Induction Call</label>
            <select
              name="induction_call"
              onChange={handleAdminInput}
              value={adminFormData?.induction_call}
              className="form-control mt-2 "
              type="text"
            >
              <option>Please Select</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
              <option value="Na">NA</option>
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <div class="form-group">
            <label>Induction Call With</label>
            <select
              name="induction_call_with"
              onChange={handleAdminInput}
              value={adminFormData?.induction_call_with}
              className="form-control mt-2 "
              type="text"
            >
              <option>Please Select</option>
              <option value="No">No</option>
              <option value="sunil">Sunil</option>
              <option value="amit">Amit</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div class="form-group">
            <label>Acenet Laptop</label>
            <select
              name="acenet_laptop"
              onChange={handleAdminInput}
              value={adminFormData?.acenet_laptop}
              className="form-control mt-2 "
              type="text"
            >
              <option>Please Select</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
              <option value="Na">NA</option>
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <div class="form-group">
            <label>Client Laptop</label>
            <select
              name="client_laptop"
              onChange={handleAdminInput}
              value={adminFormData?.client_laptop}
              className="form-control mt-2 "
              type="text"
            >
              <option>Please Select</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
              <option value="Na">NA</option>
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <div class="form-group">
            <label>Notepad</label>
            <select
              name="notepad"
              onChange={handleAdminInput}
              value={adminFormData?.notepad}
              className="form-control mt-2 "
              type="text"
            >
              <option>Please Select</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
              <option value="Na">NA</option>
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <div class="form-group">
            <label>Welcome Kit</label>
            <select
              name="welcome_kit"
              onChange={handleAdminInput}
              value={adminFormData?.welcome_kit}
              className="form-control mt-2 "
              type="text"
            >
              <option>Please Select</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
              <option value="Na">NA</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div class="form-group">
            <label>Intro Slide Shared</label>
            <select
              name="intro_slide_shared"
              onChange={handleAdminInput}
              value={adminFormData?.intro_slide_shared}
              className="form-control mt-2 "
              type="text"
            >
              <option>Please Select</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
              <option value="Na">NA</option>
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <div class="form-group">
            <label>T-shirt</label>
            <select
              name="t_shirt"
              onChange={handleAdminInput}
              value={adminFormData?.t_shirt}
              className="form-control mt-2 "
              type="text"
            >
              <option>Please Select</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
              <option value="Na">NA</option>
            </select>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-gradient-primary me-2">
        Save & Next
      </button>
    </form>
  );
};

export default First_Day_Formalities;
