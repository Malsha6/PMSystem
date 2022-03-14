import React, {useState} from "react";
import "./AddMedicine.scss";
import Button from "react-bootstrap/Button";
import logooImage from "../../assets/images/logoo-image.png";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const AddMedicine = (props) => {
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [strength, setStrength] = useState("")
  const [minLimit, setMinLimit] = useState("")
  const [expDate, setExpDate] = useState("")
  const history = useHistory();

  function addMedicine() {
    axios({
      method: "POST",
      url: "http://localhost:6039/medicine/create",
      hearders:{
        Accept: "application/json",
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin":"**"
      },
      data:{
        name:name,
        quantity: quantity,
        minLimit: minLimit,
        strength: strength,
        expDate: expDate
        
      },
    })
    .then((response)=>{
      console.log(response.data);
      history.push("/view-all-medicines")
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  function cancelFunction() {
    history.push("/view-all-medicines")
  }

  return (
    <div class="add-patient">
      <nav class="navbar-sub">
        <div class="row">
          <div class="col-4">
            <a class="navbar-brand" href="http://localhost:3000/">
              <div class="navbar-iamge">
                <img src={logooImage} alt="doctor-patient" />
              </div>
            </a>
          </div>
        </div>
      </nav>
      <div class="main-heading">
        <h2>Add New Medicine</h2>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputQuantity" class="col-sm-2 col-form-label">
              Quantity
            </label>
            <div class="text-box col-sm-10">
              <input
                class="form-control"
                id="inputQuantity"
                placeholder="Enter Qunatity"
                value={quantity}
                onChange={(e)=> setQuantity(e.target.value)}
              ></input>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputStrength" class="col-sm-2 col-form-label">
              Strength
            </label>
            <div class="text-box col-sm-10">
              <input
                class="form-control"
                id="inputStrength"
                placeholder="Enter Strength"
                value={strength}
                onChange={(e)=> setStrength(e.target.value)}
              ></input>
            </div>
          </div>

          <div class="form-group row">
            <label for="inputMinLimit" class="col-sm-2 col-form-label">
              Min Limit
            </label>
            <div class="text-box col-sm-10">
              <input
                class="form-control"
                id="inputMinLimit"
                placeholder="Enter min Limit"
                value={minLimit}
                onChange={(e) =>setMinLimit(e.target.value)}
              ></input>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputMinLimit" class="col-sm-2 col-form-label">
              Expiration Date
            </label>
            <div class="text-box col-sm-10">
            <input
                className="input-date"
                type="date"
                id="expDate"
                name="expDate"
                value={expDate}
                onChange={(e)=> setExpDate(e.target.value)}
              ></input>
            </div>
          </div>
          {/* Add unit price */}
        </form>
      </div>
      <div class="btn-group">
        <button type="button" class="btn-cancel" onClick={cancelFunction}>
          Cancel
        </button>
        <button type="button" class="btn-save" onClick={addMedicine}>
          Save
        </button>
      </div>
    </div>
  );
};
export default AddMedicine;
