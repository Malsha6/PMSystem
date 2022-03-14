import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import "./Dropdown.scss";
import { ref } from "yup";

function Dropdown({ prompt, value, onChange }) {
  const [medicines, setMedicine] = useState([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("click", close);
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
    return () => document.removeEventListener("click", close);
  }, []);

  function close(e) {
    setOpen(e && e.target === ref.current);
  }

  function filter(options) {
    return options.filter(
      (option) => option.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  function displayValue(){
      if(query.length>0) return query;
      if(value) return value.name;
      return "";
  }

  return (
    <div className="dropdown">
      <div className="control" onClick={() => setOpen((prev) => !prev)}>
        <div className="selected-value" >
          <input type="text" ref={ref} placeholder={value? value.name: prompt} value={displayValue()} onChange={e=>{
              setQuery(e.target.value)
              onChange(null)
          }}
          onClick={()=> setOpen(prev=>!prev)}
          >

          </input>
        </div>
        <div className={`arrow ${open ? "open" : null}`}></div>
      </div>
      <div className={`options ${open ? "open" : null}`}>
        {filter(medicines).map((option) => (
          <div
            className="option"
            onClick={() => {
              onChange(option);
              setOpen(false);
              setQuery("")
            }}
          >
            {option.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;
