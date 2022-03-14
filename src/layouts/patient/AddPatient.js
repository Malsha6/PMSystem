import React, { useState, useEffect } from "react";
import "./AddPatient.scss";
import Button from "react-bootstrap/Button";
import axios from "axios";
import logooImage from "../../assets/images/logoo-image.png";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {patientSchema} from './../../validations/PatientValidations'
import * as yup from 'yup';
import {useFormik} from 'formik'

const AddPatient = (props) => {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [nic, setNIC] = useState("");
  const [dob, setDOB] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [allergies, setAllergies] = useState("");
  const [diseases, setDiseases] = useState("");
  const [medicines, setMedicines] = useState("");
  const [showAlert, setShowAlert] = useState(true);
  const history = useHistory();
  const [startDate, setStartDate] = useState(new Date());
  const [isValid, setIsValid] = useState("");

  const addPatient = async (event) => {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    let formData = {
      name : name,
      nic : nic
    }

    const tempIsValid = await patientSchema.isValid(formData)
    setIsValid(tempIsValid)

    axios({
      method: "POST",
      url: "http://localhost:6039/patient/create",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        name: name,
        age: age,
        nic: nic,
        contact: contact,
        dob: dob,
        address: address,
        diseases: diseases,
        allergies: allergies,
      },
    })
      .then((response) => {
        console.log(response.data);
        history.push("/view-all-patients");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function cancelFunction() {
    history.push("/view-all-patients");
  }

  return (
    <div class="add-patient">
      <nav class="navbar-sub">
        <div class="col-4">
          <a class="navbar-brand" href="http://localhost:3000/">
            <div class="navbar-iamge">
              <img src={logooImage} alt="doctor-patient" />
            </div>
          </a>
        </div>
      </nav>
      <div class="main-heading container">
        <h2>Add New Patient</h2>
      </div>
      <div class="container">
        <form onSubmit={addPatient}>
          <div class="form-group row">
            <label for="inputName" class="col-sm-2 col-form-label">
              Name *
            </label>
            <div class="text-box col-sm-10">
              <input
                class="form-control"
                id="inputName"
                placeholder="Enter Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            
          </div>
          <div class="form-group row">
            <label for="inputNIC" class="col-sm-2 col-form-label">
              NIC
            </label>
            <div class="text-box col-sm-9">
              <input
                class="form-control"
                id="inputNIC"
                placeholder="Enter NIC"
                value={nic}
                onChange={(e) => setNIC(e.target.value)}
              ></input>
            </div>
            
          </div>
          <div class="form-group row">
            <label for="inputDOB" class="col-sm-2 col-form-label">
              DOB *
            </label>
            <div class="text-box col-sm-9">
              {/* <DatePicker selected={dob} onChange={(date) => setDOB(date)} /> */}
              <input
                className="input-date"
                type="date"
                id="birthday"
                name="birthday"
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
              ></input>
            </div>
            <div class="text-box col-sm-1">
              {/* <label>*</label> */}
            </div>
          </div>
          <div class="form-group row">
            <label for="inputAddress" class="col-sm-2 col-form-label">
              Address
            </label>
            <div class="text-box col-sm-10">
              <input
                class="form-control"
                id="inputAddress"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputContact" class="col-sm-2 col-form-label">
              Contact
            </label>
            <div class="text-box col-sm-10">
              <input
                class="form-control"
                id="inputContact"
                placeholder="Enter Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              ></input>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputAllergies" class="col-sm-2 col-form-label">
              Allergies
            </label>
            <div class="text-box col-sm-10">
              <textarea
                class="form-control"
                id="inputAllergies"
                placeholder="Enter Allergies"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputDiseases" class="col-sm-2 col-form-label">
              Diseases
            </label>
            <div class="text-box col-sm-10">
              <textarea
                class="form-control"
                id="inputDiseases"
                placeholder="Enter Diseases"
                value={diseases}
                onChange={(e) => setDiseases(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputMedicines" class="col-sm-2 col-form-label">
              Medicines
            </label>
            <div class="text-box col-sm-10">
              <textarea
                class="form-control"
                id="inputMedicines"
                placeholder="Enter Medicines"
                value={medicines}
                onChange={(e) => setMedicines(e.target.value)}
              ></textarea>
            </div>
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
export default AddPatient;
