import { useState } from "react";
import React from "react";
import logooImage from "./../../assets/images/logoo-image.png";
import "./AddVisit.scss";
import { BsFillPlusCircleFill, BsDashCircle } from "react-icons/bs";
import { GrAddCircle, GrSubtractCircle } from "react-icons/gr";
import Button from "react-bootstrap/Button";
import { Heart } from "react-bootstrap-icons";
import Dropdown from "./../../components/Dropdown";

function AddVisit() {
  const [inputFields, setInputFields] = useState([{ name: "", qunatity: "" }]);
  const [diagnosis, setDiagnosis] = useState("");
  const [dropDwonValue, setDropDwonValue] = useState(null);

  const handleAddFields = () => {
    setInputFields([...inputFields, { name: "", qunatity: "" }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleChangeInput = (index, e) => {
    const values = [...inputFields]
    // console.log(values[index].name);
    values[index].name = e.target.value
    setInputFields(values)
    // console.log("y");
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputFields);
  }

  return (
    <div>
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
        <h2>Add New Visit</h2>
      </div>
      <div class="container">
        <form onSubmit={handleSubmit}>
          <div class="form-group row">
            <label for="inputName" class="col-sm-2 col-form-label">
              Diagnosis
            </label>
            <div class="text-box col-sm-10">
              <input
                class="form-control"
                id="inputDiagnosis"
                placeholder="Enter Diagnosis"
                value={diagnosis}
                required
                // onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputName" class="col-xs-10 col-sm-2 col-form-label">
              Medicine
            </label>
            <div class="col-sm-10">
              {inputFields.map((inputField, index) => (
                <div>
                  <div class="row">
                    <div class="medicine-text-field col-3">
                      <div key={index}>
                        <label for="inputName" class="col-form-label">
                          Name
                        </label>
                      </div>
                    </div>
                    <div class="col-1">
                      <div key={index}>
                        <label for="inputName" class="col-form-label">
                          Count
                        </label>
                      </div>
                    </div>
                    <div class="col-2">
                      <div key={index}>
                        <label for="inputName" class="col-form-label">
                          Frequency
                        </label>
                      </div>
                    </div>
                    <div class="col-1">
                      <div key={index}>
                        <label for="inputName" class="col-form-label">
                          Days
                        </label>
                      </div>
                    </div>
                    <div class="col-1">
                      <div key={index}>
                        <label for="inputName" class="col-form-label">
                          In Stock
                        </label>
                      </div>
                    </div>
                    <div class="col-1">
                      <div key={index}>
                        <label for="inputName" class="col-form-label">
                          Cost
                        </label>
                      </div>
                    </div>
                    <div class="col-3">
                      <div key={index}>
                        <label for="inputName" class="col-form-label"></label>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <div class="medicine-text-field col-3">
                      <div key={index}>
                        <Dropdown
                          prompt="Select medicine..."
                          value={dropDwonValue}
                          onChange={(val) => setDropDwonValue(val)}
                        />
                      </div>
                    </div>
                    <div class="medicine-text-field col-1">
                      <div key={index}>
                        <input
                          class="form-control"
                          id="inputName"
                          placeholder=""
                          value={inputField.name}
                          onChange={(e)=>handleChangeInput(index, e)}
                        ></input>
                      </div>
                    </div>
                    <div class="medicine-text-field col-2">
                      <div key={index}>
                        <div>
                          <select class="form-control">
                            <option value="tds">tds</option>
                            <option value="bds">bds</option>
                            <option value="mango">qds</option>
                            <option value="mango">once daily</option>
                            <option selected value="noctae">
                              noctae
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="medicine-text-field col-1">
                      <div key={index}>
                        <input
                          class="form-control"
                          id="inputName"
                          placeholder=""
                          value={inputField.name}
                          // onChange={(e) => setContact(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    <div class="medicine-text-field col-1">
                      <div key={index}>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                      </div>
                    </div>
                    <div class="medicine-text-field col-1">
                      <div key={index}>
                        <input
                          class="form-control"
                          id="inputName"
                          placeholder=""
                          value={inputField.name}
                          // onChange={(e) => setContact(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    <div class="medicine-text-field col-2">
                      <div key={index}>
                        <div class="row">
                          <div class="col">
                            <Button
                              size="lg"
                              variant="info"
                              onClick={(e) => handleRemoveFields(index)}
                            >
                              <GrSubtractCircle />
                            </Button>
                          </div>

                          <div class="col">
                            <Button
                              size="lg"
                              variant="info"
                              onClick={(e) => handleAddFields()}
                            >
                              <GrAddCircle />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div class="btn-group">
        {/* <button type="button" class="btn-cancel" onClick={cancelFunction}>
          Cancel
        </button> */}
        <button type="button" class="btn-save" onClick={handleSubmit}>
          Save
        </button>
      </div>
        </form>
      </div>
    </div>
  );
}

export default AddVisit;
