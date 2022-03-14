import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import "./MedicalPreview.scss";

class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      
        <div class="container">
          <div class="sub-container">
          <div class="row">
            <div class="col-3">
              <p>S.S.Family Medical Center</p>
              <p>Galle Rd, Yakkalamulla</p>
              <p>Tel:076-7666933</p>
              <p>Fax:091-2286771</p>
            </div>

            <div class="col-4">
              <p>Dr.G.G.Lakmal</p>
              <p>MBBS Colombo</p>
              <p>SLMC Reg. no: 32359</p>
              <p>Tel:076-7666933</p>
            </div>
          </div>
          <div >
            <hr />
          </div>
          <div class="letter-body">
            <p>10/10/2021</p>
          </div>
          <div class="letter-body">
            <p>
              This is to certify that Malsha Madushani is under treatments for
              Dengue and is recommended 02 days leave from 10/10/2021 to
              12/10/2021
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const MedicalPreview = () => {
  const componentRef = useRef();

  return (
    <div>
      <ComponentToPrint ref={componentRef} />
      <ReactToPrint
        trigger={() => <button class="btn-save">Print this out!</button>}
        content={() => componentRef.current}
      />
    </div>
  );
};

export default MedicalPreview;
