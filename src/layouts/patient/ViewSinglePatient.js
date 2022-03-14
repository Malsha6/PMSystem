import React from "react";
import "./AddPatient.scss";
import Button from 'react-bootstrap/Button';
import logooImage from "../../assets/images/logoo-image.png";

const ViewSinglePatient = (props) => {

  function addPatient() {
    console.log("Hi there, user!");
  }

  function cancelFunction() {
    // Alert shoupd br poped up
    console.log("Cancel");
  }
  
  return (
    <div>
      <nav class="navbar-sub">
        <a class="navbar-brand" href="http://localhost:3000/">
          Logo
        </a>
      </nav>
      <div class="main-heading">
        <h2>View Patient Details</h2>
      </div>
      <div>
        <form>
          <div class="form-group row">
            <label for="inputName" class="col-sm-2 col-form-label">
              Name
            </label>
            <div class="text-box col-sm-10">
            <label for="inputName" class="col-sm-6 col-form-label">
              Malsha Madushani
            </label>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputNIC" class="col-sm-2 col-form-label">
              NIC
            </label>
            <div class="text-box col-sm-10">
            <label for="inputName" class="col-sm-6 col-form-label">
              966161949V
            </label>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputDOB" class="col-sm-2 col-form-label">
              DOB
            </label>
            <label for="inputName" class="col-sm-6 col-form-label">
              25/04/1996
            </label>
          </div>
          <div class="form-group row">
            <label for="inputAllergies" class="col-sm-2 col-form-label">
              Allergies
            </label>
            <div class="text-box col-sm-10">
            <label for="inputName" class="col-sm-6 col-form-label">
              No Allergies
            </label>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputDiseases" class="col-sm-2 col-form-label">
              Diseases
            </label>
            <div class="text-box col-sm-10">
            <label for="inputName" class="col-sm-6 col-form-label">
              Fever
            </label>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputMedicines" class="col-sm-2 col-form-label">
              Medicines
            </label>
            <label for="inputName" class="col-sm-6 col-form-label">
             Medicines for diabetic
            </label>
          </div>
        </form>
      </div>
      <div class="btn-group">
        <button type="button" class="btn-cancel" onClick={cancelFunction}>
          Cancel
        </button>
        <button type="button" class="btn-save" onClick={addPatient}>
          Save
        </button>
      </div>
    </div>
  );
};
export default ViewSinglePatient;
