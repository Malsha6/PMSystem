import React , {useState} from "react";
// import "./AddPatient.scss";
import Button from "react-bootstrap/Button";
import logooImage from "../../assets/images/logoo-image.png";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddMedicalRecords = (props) => {
  const [name, setName] = useState("");
  const [dob, setDOB] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [daysCount, setDaysCount] = useState("");

  const history = useHistory();

  function addMedicalRecord() {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    var Difference_In_Time = Date.parse( toDate ) - Date.parse( fromDate );
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    
    setDaysCount(Difference_In_Days)

    axios({
      method: "POST",
      url: "http://localhost:6039/medical/create",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        name:name,
        age: age,
        dob: dob,
        fromDate: fromDate,
        toDate: toDate,
        reason: reason,
        daysCount: daysCount
      },
    })
      .then((response) => {
        console.log(response.data);
        history.push("/view-medical-records");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function cancelFunction() {
    history.push("/view-medical-records");
  }

  return (
    <div class="add-patient">
      <nav class="navbar-sub">
        <a class="navbar-brand" href="http://localhost:3000/">
          <div class="navbar-iamge">
            <img src={logooImage} alt="doctor-patient" />
          </div>
        </a>
      </nav>
      <div class="main-heading">
        <h2>Add New Medical Record</h2>
      </div>
      <div>
        <form>
          <div class="form-group row">
            <label for="inputName" class="col-sm-2 col-form-label">
              Name
            </label>
            <div class="text-box col-sm-10">
              <input
                class="form-control"
                id="inputName"
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
          </div>

          <div class="form-group row">
            <label for="inputDOB" class="col-sm-2 col-form-label">
              DOB
            </label>
            <div class="text-box col-sm-10">
              <input
                className="input-date"
                type="date"
                id="birthday"
                name="birthday"
                onChange={(e) => setDOB(e.target.value)}
              ></input>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputfrom" class="col-sm-2 col-form-label">
              From
            </label>
            <div class="text-box col-sm-10">
              <input
                className="input-date"
                type="date"
                id="from"
                name="from"
                onChange={(e) => setFromDate(e.target.value)}
              ></input>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputTo" class="col-sm-2 col-form-label">
              To
            </label>
            <div class="text-box col-sm-10">
              <input
                className="input-date"
                type="date"
                id="to"
                name="to"
                onChange={(e) => setToDate(e.target.value)}
              ></input>
            </div>
          </div>

          <div class="form-group row">
            <label for="inputreason" class="col-sm-2 col-form-label">
              Reason
            </label>
            <div class="text-box col-sm-10">
              <input
                class="form-control"
                id="inputreason"
                placeholder="Enter Reason"
                onChange={(e) => setReason(e.target.value)}
              ></input>
            </div>
          </div>
        </form>
      </div>
      <div class="btn-group">
        <button type="button" class="btn-cancel" onClick={cancelFunction}>
          Cancel
        </button>
        <button type="button" class="btn-save" onClick={addMedicalRecord}>
          Save
        </button>
      </div>
    </div>
  );
};
export default AddMedicalRecords;
