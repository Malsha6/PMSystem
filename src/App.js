import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./layouts/login/Login";
import AddPatient from "./layouts/patient/AddPatient"
import AddMedicalRecords from './layouts/medical-record/AddMedicalRecords'
import AddMedicine from './layouts/medicine/AddMedicine'
import ViewSinglePatient from './layouts/patient/ViewSinglePatient'
import ViewAllPatients from './layouts/patient/ViewAllPatients'
import ViewSinglePatientRecords from './layouts/patient/ViewSinglePatientRecords'
import ViewAllMedicals from './layouts/medical-record/ViewAllMedicals'
import MedicalPreview from "./layouts/medical-record/MedicalPreview"
import ViewAllMedicines from './layouts/medicine/ViewAllMedicines'
// import EditPatient from './layouts/patient/EditPatient'
import TestForm from './layouts/patient/TestForm'
import AddVisit from './layouts/visits/AddVisit'


const App = () => {
  return (
    <Router>
      <div className="main">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/add-patient" exact component={AddPatient} />
          <Route path="/add-medical-record" exact component={AddMedicalRecords} />
          <Route path="/add-medicine" exact component={AddMedicine}/>
          <Route path="/view-single-patient" exact component={ViewSinglePatient}/>
          <Route path="/view-all-patients" exact component={ViewAllPatients}/>
          <Route path="/view-patient-records/:id" exact component={ViewSinglePatientRecords}/>
          <Route path="/view-medical-records" exact component={ViewAllMedicals}/>
          <Route path="/medical-preview/:name" exact component={MedicalPreview}/>
          <Route path="/view-all-medicines" exact component={ViewAllMedicines}/>
          {/* <Route path="/edit-patients" exact component={EditPatient}/> */}
          <Route path="/test-form" exact component={TestForm}/>
          <Route path="/add-visits-temp" exact component={AddVisit}/>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
