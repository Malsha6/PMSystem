import React, { useState, useEffect } from "react";
import "./ViewAllPatients.scss";
import Table from "react-bootstrap/Button";
import * as Icon from "react-bootstrap-icons";
import axios from "axios";
// import { BsFillPersonLinesFill } from "react-icons/bs"
import {
  Modal,
  Button,
  Nav,
  Navbar,
  NavDropdown,
  MenuItem,
  NavItem,
} from "react-bootstrap";
import SearchField from "react-search-field";
import { useHistory } from "react-router-dom";
import logooImage from "../../assets/images/logoo-image.png";
import { LinkContainer } from "react-router-bootstrap";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ViewAllPatients = (props) => {
  const [showModal, setShow] = useState(false);
  const [showEditModal, setEditShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([]);
  const [id, editID] = useState("");
  const [name, editName] = useState("");
  const [nic, editNIC] = useState("");
  const [age, editAge] = useState("");
  const [dob, editDOB] = useState("");
  const [dieseases, editDiseases] = useState("");
  const [allergies, editAllergies] = useState("");
  const [medicines, editMedicines] = useState("");
  const [deleteID, setDeleteID] = useState("");
  const [visits, editVisits] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowDeleteModal = (id) => {
    setShow(true);
    setDeleteID(id);
  };

  const handleDelete = () => {
    axios({
      method: "DELETE",
      url: "http://localhost:6039/patient/" + deleteID,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    setShow(false);
  };

  const handlEdit = (id) => {
    setEditShow(false);
    axios({
      method: "PUT",
      url: "http://localhost:6039/patient/" + id,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        name: name,
        age: 35.1,
        nic: nic,
        dob: dob,
        address: "Galle",
        allergies: allergies,
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShowEditModal = (id) => {
    setEditShow(true);
    axios({
      method: "GET",
      url: "http://localhost:6039/patient/" + id,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        editID(response.data.id);
        editName(response.data.name);
        editAge(response.data.age);
        editNIC(response.data.nic);
        editDOB(response.data.dob);
        editDiseases(response.data.diseases);
        editAllergies(response.data.allergies);
        editVisits(response.data.visits);
        console.log(response.data.dob);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseEditModal = () => {
    setEditShow(false);
  };

  const history = useHistory();

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:6039/patient/active",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addpatient = () => {
    history.push("/add-patient");
  };

  const viewPatientRecords = (id) => {
    history.push("/view-patient-records/" + id);
  };

  const TableDataRow = (props) => (
    <div class="container">
      <div class="boxed">
        <div class="row">
          <div class="col-1">{props.id}</div>
          <div class="col-3">{props.name}</div>
          <div class="col-1">{props.nic}</div>
          <div class="col-4">{props.address}</div>
          <div class="col-1">{props.contact}</div>
          <div class="col-2">
            <div class="row">
              <div class="col-3" style={{ paddingLeft: 0 , }}>
                <a
                  href="#"
                  onClick={() => {
                    viewPatientRecords(props.id);
                  }}
                >
                  View
                </a>
              </div>
              <div class="col-3" style={{ paddingLeft: 0 , marginRight: -10  }}>
                <a href="#" onClick={() => handleShowEditModal(props.id)}>
                  Edit
                </a>
              </div>
              <div class="col-3" style={{ paddingLeft: 0 ,  marginRight: -2 }}>
                <a href="#" onClick={() => handleShowDeleteModal(props.id)}>
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
              <LinkContainer to="/view-all-medicines">
                <NavItem eventKey={1}>Medicines</NavItem>
              </LinkContainer>
            </div>
          </div>
          <div class="col-1 ">
            <div class="nav-bar-items">
              <LinkContainer to="/view-medical-records">
                <NavItem>Medicals</NavItem>
              </LinkContainer>
            </div>
          </div>
        </div>
      </nav>
      <div class="row">
        <div class="col-3">
          <div class="main-heading">
            <h2>Patient Details</h2>
          </div>
        </div>
        <div class="col">
          <div class="main-search">
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
            + Add New Patient
          </button>
        </div>
      </div>

      <div>
        <hr class="hr-line" />
      </div>

      <div class="container">
        <div class="table-headers">
          <div class="row">
            <div class="col-1">PID</div>
            <div class="col-3">Name</div>
            <div class="col-1">NIC</div>
            <div class="col-4">Address</div>
            <div class="col-1">Contact</div>
            <div class="col-2">Actions</div>
          </div>
        </div>
      </div>

      {/* {patients.filter(p=>p.name).map((item) => {
        return(
          <div>GOD</div>
        )
      })
      } */}

      {patients
        .filter((p) => {
          if (searchTerm == "") {
            return p;
          } else if (p.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return p;
          } else if (p.nic.toLowerCase().includes(searchTerm.toLowerCase())) {
            return p;
          }
        })
        .map((item) => {
          return (
            <TableDataRow
              id={item.id}
              name={item.name}
              nic={item.nic}
              address={item.address}
              contact={item.contact}
            />
          );
        })}

      <Modal
        show={showModal}
        onHide={handleClose}
        style={{ overlay: { background: "red" } }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Alert!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure, you want to delete this patient?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit patient Details</Modal.Title>
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
                  value={name}
                  onChange={(e) => editName(e.target.value)}
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
                  value={nic}
                  onChange={(e) => editNIC(e.target.value)}
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
                  value={moment(dob).format("YYYY-MM-DD")}
                  onChange={(e) => editDOB(e.target.value)}
                ></input>
                {/* <DatePicker selected={dob} onChange={(date) => editDOB(date)} /> */}
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
                  value={allergies}
                  onChange={(e) => editAllergies(e.target.value)}
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
                  placeholder="Enter Diseases"
                  value={dieseases}
                  onChange={(e) => editDiseases(e.target.value)}
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
                  value={medicines}
                  onChange={(e) => editMedicines(e.target.value)}
                ></input>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handlEdit(id)}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewAllPatients;
