import React, { useState, useEffect } from "react";
import "./ViewAllPatients.scss";
import Table from "react-bootstrap/Button";
import * as Icon from "react-bootstrap-icons";
// import { BsFillPersonLinesFill } from "react-icons/bs"
import { Modal, Button, Nav,
  Navbar,
  NavDropdown,
  MenuItem,
  NavItem, } from "react-bootstrap";
import SearchField from "react-search-field";
import { useHistory } from "react-router-dom";
import logooImage from "../../assets/images/logoo-image.png";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from 'react-router-dom';
import axios from "axios";

const ViewSinglePatientRecords = (props) => {
  const [showModal, setShow] = useState(false);
  const [showEditModal, setEditShow] = useState(false);
  const { id } = useParams();
  const [name, setName] = useState(false);
  const [age, setAge] = useState(false);
  const [dieseases, setDiseases] = useState(false);
  const [allergies, setAllergies] = useState(false);
  const [medicines, setMedicines] = useState(false);
  const [visits, setVisits] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseEditModal = () => setEditShow(false);
  const handleShowEditModal = () => setEditShow(true);

  const history = useHistory();

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:6039/patient/"+id,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        console.log(response.data);
        setName(response.data.name);
        setAge(response.data.age);
        setDiseases(response.data.diseases)
        setMedicines(response.data.medicines)
        setAllergies(response.data.allergies)
        setVisits(response.data.visits)
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addpatient = () => {
    history.push("/add-patient");
  };

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
            <div class="nav-bar-items"><LinkContainer to="view-all-patients">
                <NavItem eventKey={1}>Patients</NavItem>
              </LinkContainer></div>
          </div>
          <div class="col-1 ">
            <div class="nav-bar-items"><LinkContainer to="/home">
                <NavItem eventKey={1}>Medicines</NavItem>
              </LinkContainer></div>
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
            <h2>{name}</h2>
            <p>{age} yrs</p>
            <p>{dieseases}</p>
            <p>{allergies}</p>
            <p>{medicines}</p>
          </div>
        </div>
        <div class="col">
          <div class="main-search">
            {/* <SearchField placeholder="Search..." searchText="Search..." /> */}
            <input
              class="form-control"
              id="search"
              placeholder="Search..."
            ></input>
          </div>
        </div>
        <div class="col-5">
          <button type="button" class="btn-save" onClick={addpatient}>
            + Add New Record
          </button>
        </div>
      </div>
      <div>
        <hr class="hr-line" />
      </div>

      <div class="container">
        <div class="row">
        <div class="col-1">RID</div>
          <div class="col-1">Date</div>
          <div class="col-4">Diseases</div>
          <div class="col-4">Medicine</div>
          <div class="col-2">Actions</div>
        </div>
      </div>
      <div class="container">
        <div class="boxed">
          <div class="row">
          <div class="col-1">1</div>
            <div class="col-1">20/10/2021</div>
            <div class="col-4">Dengue</div>
            <div class="col-4">Panadols</div>
            <div class="col-2">
              <div class="row">
                <div class="col-4" style={{ paddingLeft: 0 }}>
                  <a href="#" onClick={handleShowEditModal}>
                    Edit
                  </a>
                  <Modal show={showEditModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Patient Record</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form>
                        <div class="form-group row">
                          <label
                            for="inputDiseases"
                            class="col-sm-2 col-form-label"
                          >
                            Diseases
                          </label>
                          <div class="text-box col-sm-10">
                            <input
                              class="form-control"
                              id="inputDiseases"
                              placeholder="Enter Diseases"
                            ></input>
                          </div>
                        </div>
                        <div class="form-group row">
                          <label
                            for="inputMedicines"
                            class="col-sm-2 col-form-label"
                          >
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
                      <Button
                        variant="secondary"
                        onClick={handleCloseEditModal}
                      >
                        Cancel
                      </Button>
                      <Button variant="primary" onClick={handleCloseEditModal}>
                        Edit
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
                <div class="col-4" style={{ paddingLeft: 0 }}>
                  <a href="#" onClick={handleShow}>
                    Dele
                  </a>
                  <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Alert!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Are you sure, you want to delete this record?
                    </Modal.Body>
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
                <div class="col-4" style={{ paddingLeft: 0 }}>
                  <a href="#" onClick={handleShow}>
                    Print
                  </a>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSinglePatientRecords;
