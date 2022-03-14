import React, { useState, useEffect } from "react";
import "./ViewAllMedicines.scss";
import Table from "react-bootstrap/Button";
import * as Icon from "react-bootstrap-icons";
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
import axios from "axios";
import moment from "moment";

const ViewAllMedicines = (props) => {
  const [showModal, setShow] = useState(false);
  const [showEditModal, setEditShow] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [id, editID] = useState("");
  const [name, editName] = useState("");
  const [strength, editStrength] = useState("");
  const [quantity, editQuantity] = useState("");
  const [minLimit, editMinLimit] = useState("");
  const [expDate, editExpDate] = useState("");

  const [medicines, setMedicine] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseEditModal = () => setEditShow(false);
  const handleShowEditModal = (
    id,
    name,
    strength,
    quantity,
    minLimit,
    expDate
  ) => {
    setEditShow(true);
    editID(id);
    editName(name);
    editStrength(strength);
    editQuantity(quantity);
    editMinLimit(minLimit);
    editExpDate(expDate);

    console.log(expDate);
  };

  const handleShowDeleteModal = (id) => {
    setShow(true);
    setDeleteID(id);
  };

  const handleEdit = (id) => {
    setEditShow(false);
  };

  const getOutofScopeMedicines = () => {
    setSearchTerm("Outofstock")
  }

  const history = useHistory();

  const addMedicine = () => {
    history.push("/add-medicine");
  };

  const viewPatientRecords = () => {
    history.push("/view-patient-records");
  };

  const handleDelete = () => {
    axios({
      method: "PUT",
      url: "http://localhost:6039/medicine/delete/" + deleteID,
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

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:6039/medicine/active",
      headers: {
        Accept: "application/json",
        "Conent-Type": "application/json",
        "Access-COntrol-Origin": "*",
      },
    })
      .then((response) => {
        setMedicine(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // If you only want to execute useEffect once(if not it keep calling infinitely), you should just pass an empty array on the useEffect, like this

  const TableDataRow = (props) => {
    let dateUpdated = moment(props.updatedDte).format(moment.HTML5_FMT.DATE);
    let dateExpiration = moment(props.expDate).format(moment.HTML5_FMT.DATE);

    return (
      <div class="container">
        <div class="boxed">
          <div class="row">
            <div class="col-1">{props.id}</div>
            <div class="col-3">{props.name}</div>
            <div class="col-1">{props.strength}</div>
            <div class="col-1">{props.quantity}</div>
            <div class="col-2">{dateExpiration}</div>
            <div class="col-2">{dateUpdated}</div>
            <div class="col-1">{props.minLimit}</div>
            <div class="col-1">
              <div class="row">
                <div class="col-5" style={{ paddingLeft: 0 }}>
                  <a
                    href="#"
                    onClick={() =>
                      handleShowEditModal(
                        props.id,
                        props.name,
                        props.strength,
                        props.quantity,
                        props.minLimit,
                        dateExpiration
                      )
                    }
                  >
                    Edit
                  </a>
                </div>
                <div class="col-6" style={{ paddingLeft: 0 }}>
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
            <h2>Medicine Details</h2>
          </div>
        </div>
        <div class="col-2">
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
        <div class="col-7">
          <div class="row">
            <div class="col-7">
              <button type="button" class="btn-save" onClick={addMedicine}>
                + Add New Medicine
              </button>
            </div>
            <div class="col-5">
              <button
                type="button"
                class="btn-out-of-stock"
                onClick={getOutofScopeMedicines}
              >
                - Out of Stock
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <hr class="hr-line" />
      </div>

      <div class="container">
        <div class="table-headers">
          <div class="row">
            <div class="col-1">MID</div>
            <div class="col-3">Name</div>
            <div class="col-1">Strength</div>
            <div class="col-1">Quantity</div>
            <div class="col-2">Expire Date</div>
            <div class="col-2">Updated Date</div>
            <div class="col-1">Min Limit</div>
            <div class="col-1">Actions</div>
          </div>
        </div>
      </div>

      {medicines
        .filter((m) => {
          if (searchTerm == "") {
            return m;
          } else if (m.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return m;
          }else if(searchTerm == "Outofstock" && m.outOfScope==true){
            return m;
          }

        })
        .map((item) => {
          return (
            <TableDataRow
              id={item.id}
              name={item.name}
              strength={item.strength}
              quantity={item.quantity}
              expDate={item.expDate}
              updatedDte={item.updatedDte}
              minLimit={item.minLimit}
            />
          );
        })}

      <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Medicine Details</Modal.Title>
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
                Quantity
              </label>
              <div class="text-box col-sm-10">
                <input
                  class="form-control"
                  id="inputQuantity"
                  placeholder="Enter Quantity"
                  value={quantity}
                  onChange={(e) => editQuantity(e.target.value)}
                ></input>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputStrength" class="col-sm-4 col-form-label">
                Strength
              </label>
              <div class="text-box col-sm-10">
                <input
                  class="form-control"
                  id="inputStrength"
                  placeholder="Enter Strength"
                  value={strength}
                  onChange={(e) => editStrength(e.target.value)}
                ></input>
              </div>
            </div>

            <div class="form-group row">
              <label for="inputMinLimit" class="col-sm-4 col-form-label">
                Min Limit
              </label>
              <div class="text-box col-sm-10">
                <input
                  class="form-control"
                  id="inputMinLimit"
                  placeholder="Enter min Limit"
                  value={minLimit}
                  onChange={(e) => editMinLimit(e.target.value)}
                ></input>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputMinLimit" class="col-sm-4 col-form-label">
                Expiration Date
              </label>
              <div class="text-box col-sm-10">
                <input
                  className="input-date"
                  type="date"
                  id="expDate"
                  name="expDate"
                  value={moment(expDate).format("YYYY-MM-DD")}
                  onChange={(e) => editExpDate(e.target.value)}
                ></input>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleShowEditModal(id)}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure, you want to delete this medicine?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleEdit(id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewAllMedicines;
