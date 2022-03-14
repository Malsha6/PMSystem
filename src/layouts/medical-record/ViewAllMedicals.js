import React, { useEffect, useState } from "react";
import "./ViewAllMedicals.scss";
import Table from "react-bootstrap/Button";
import * as Icon from "react-bootstrap-icons";
// import { BsFillPersonLinesFill } from "react-icons/bs"
import { Modal, Button, NavItem } from "react-bootstrap";
import SearchField from "react-search-field";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import logooImage from "../../assets/images/logoo-image.png";
import axios from "axios";
import MedicalPreview from './MedicalPreview'

const ViewAllMedicals = (props) => {
  const [showModal, setShow] = useState(false);
  const [showEditModal, setEditShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [dob, setDOB] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [daysCount, setDaysCount] = useState("");
  const [medicals, setMedicals] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseEditModal = () => setEditShow(false);
  const handleShowEditModal = () => setEditShow(true);

  const history = useHistory();

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:6039/medical/active",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        setMedicals(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addpatient = () => {
    history.push("/add-medical-record");
  };

  const viewMedicalRecords = (name) => {
    console.log(name);
    history.push("/medical-preview/"+ name);
  };

  const viewPatientRecords = (name) => {
    console.log(name);
    // history.push("/medical-preview/" + name);
  };



  const TableDataRow = (props) => (
    <div class="container">
      <div class="boxed">
        <div class="row">
          <div class="col-1">{props.id}</div>
          <div class="col-2">{props.name}</div>
          <div class="col-1">{props.nic}</div>
          <div class="col-1">{props.age}</div>
          <div class="col-1">{props.fromDate}</div>
          <div class="col-1">{props.toDate}</div>
          <div class="col-3">{props.reason}</div>
          <div class="col-2">
            <div class="row">
              <div class="col-4" style={{ paddingLeft: 0 }}>
              <a
                  href="#"
                  onClick={() => {
                    viewPatientRecords(props.name);
                  }}
                >
                  View
                </a>
              </div>
              <div class="col-3" style={{ paddingLeft: 0 }}>
                <a href="#" onClick={handleShowEditModal}>
                  Edit
                </a>
              </div>
              <div class="col" style={{ paddingLeft: 0 }}>
                <a href="#" onClick={handleShow}>
                  Dele
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <nav class="navbar-sub">
        <div class="row">
          <div class="col-4">
            <a class="navbar-brand" href="http://localhost:3000/">
              <div class="navbar-iamge">
                <img src={logooImage} alt="doctor-patient" />
              </div>
            </a>
          </div>

          <div class="col-1 ">
            <div class="nav-bar-items">
              <LinkContainer to="view-all-patients">
                <NavItem eventKey={1}>Patients</NavItem>
              </LinkContainer>
            </div>
          </div>
          <div class="col-1 ">
            <div class="nav-bar-items">
              <LinkContainer to="/home">
                <NavItem eventKey={1}>Medicines</NavItem>
              </LinkContainer>
            </div>
          </div>
          <div class="col-1 ">
            <div class="nav-bar-items">
              <LinkContainer to="/view-patient-records">
                <NavItem>Medicals</NavItem>
              </LinkContainer>
            </div>
          </div>
        </div>
      </nav>
      <div class="row">
        <div class="col-3">
          <div class="main-heading">
            <h2>Medical Details</h2>
          </div>
        </div>
        <div class="col">
          <div class="main-search">
            {/* <SearchField placeholder="Search..." searchText="Search..." /> */}
            <input
              class="form-control"
              id="search"
              placeholder="Search..."
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            ></input>
          </div>
        </div>
        <div class="col-5">
          <button type="button" class="btn-save" onClick={addpatient}>
            + Add New record
          </button>
        </div>
      </div>

      <div>
        <hr class="hr-line" />
      </div>

      <div class="container">
        <div class="table-headers">
          <div class="row">
            <div class="col-1">MID</div>
            <div class="col-2">Name</div>
            <div class="col-1">NIC</div>
            <div class="col-1">Age</div>
            <div class="col-1">From</div>
            <div class="col-1">To</div>
            <div class="col-3">Disease</div>
            <div class="col-2">Actions</div>
          </div>
        </div>
      </div>

      {medicals
        .filter((p) => {
          if (searchTerm == "") {
            console.log(p.name.toLowerCase);
            return p;
          } 
          else if (p.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return p;
          } 
          // else if (p.nic.toLowerCase().includes(searchTerm.toLowerCase())) {
          //   return p;
          // }
        })
        .map((item) => {
          return (
            <TableDataRow
              id={item.id}
              name={item.name}
              nic={item.nic}
              age={item.age}
              fromDate={item.fromDate}
              toDate={item.toDate}
              reason={item.reason}
              daysCount={item.daysCount}
            />
          );
        })}
      <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                ></input>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputNIC" class="col-sm-2 col-form-label">
                NIC
              </label>
              <div class="text-box col-sm-10">
                <input
                  class="form-control"
                  id="inputNIC"
                  placeholder="Enter NIC"
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
                ></input>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputAllergies" class="col-sm-2 col-form-label">
                Allergies
              </label>
              <div class="text-box col-sm-10">
                <input
                  class="form-control"
                  id="inputAllergies"
                  placeholder="Enter Allergies"
                ></input>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputDiseases" class="col-sm-2 col-form-label">
                Diseases
              </label>
              <div class="text-box col-sm-10">
                <input
                  class="form-control"
                  id="inputDiseases"
                  placeholder="Enet Diseases"
                ></input>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputMedicines" class="col-sm-2 col-form-label">
                Medicines
              </label>
              <div class="text-box col-sm-10">
                <input
                  class="form-control"
                  id="inputMedicines"
                  placeholder="Enter Medicines"
                ></input>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCloseEditModal}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure, you want to delete this record?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewAllMedicals;
