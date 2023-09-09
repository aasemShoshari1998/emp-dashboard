import React, { useContext } from "react";
import { useState, useRef } from "react";
import AuthContext from "../../../../context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddEmployee({ setAddEmployee }) {
  const nameAr = useRef();
  const nameEn = useRef();
  const accountNumber = useRef();
  const age = useRef();
  const phoneNumber = useRef();
  const city = useRef();
  const gender = useRef();
  const maritalStatus = useRef();
  const designation = useRef();
  const isManager = useRef();
  const [error, setError] = useState({});
  const [birthDate, setBirthDate] = useState(new Date());
  const [hireDate, setHireDate] = useState(new Date());

  const { dispatch, getEmployees } = useContext(AuthContext);

  const handleAdd = (e) => {
    let errors = {};

    const isArabic =
      /^([\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufbc1]|[\ufbd3-\ufd3f]|[\ufd50-\ufd8f]|[\ufd92-\ufdc7]|[\ufe70-\ufefc]|[\ufdf0-\ufdfd]|[ ])*$/g;

    const isEnglish = /^[a-zA-Z]|[ ]+$/;

    if (!isArabic.test(nameAr.current.value)) {
      errors.nameArErr = "Arabic name must be in arabic";
    }

    if (!isEnglish.test(nameEn.current.value)) {
      errors.nameEnErr = "English name must be in english";
    }

    let arr = nameEn.current.value.split(" ");
    let counter = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "") continue;
      counter++;
    }
    if (counter < 3) {
      errors.nameEnErr = "please provide your full name";
    }

    let arr2 = nameAr.current.value.split(" ");
    let counter2 = 0;
    for (let i = 0; i < arr2.length; i++) {
      if (arr2[i] === "") continue;
      counter2++;
    }
    if (counter2 < 3) {
      errors.nameArErr = "please provide your full name";
    }

    if (accountNumber.current.value === "") {
      errors.accountNumberErr = "account number can't be empty";
    }
    if (
      Number(age.current.value) > 60 ||
      Number(age.current.value) < 18 ||
      age.current.value === ""
    ) {
      errors.ageErr = "please enter a valid age";
    }

    if (phoneNumber.current.value.length !== 10) {
      errors.phoneNumberErr = "please enter a valid phone number";
    }

    setError(errors);

    if (JSON.stringify(errors) === "{}") {
      const employee = {
        nameAR: nameAr.current.value,
        nameEN: nameEn.current.value,
        accountNumber: accountNumber.current.value,
        age: age.current.value,
        phoneNumber: phoneNumber.current.value,
        city: city.current.value,
        gender: gender.current.value,
        maritalStatus: maritalStatus.current.value,
        designation: designation.current.value,
        isManager: isManager.current.checked,
        hireDate: hireDate,
        birthDate: birthDate,
      };
      dispatch({ type: "DARKEN", payload: false });

      fetch("https://emp-dashboard-api.vercel.app/add-employee", {
        method: "POST",
                mode: "no-cors",

        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(employee),
      }).then(() => {
        setAddEmployee(false);
        getEmployees();
      });
    }
  };

  return (
    <div className="window">
      <form className="form">
        <div
          className="cancelForm"
          onClick={() => {
            setAddEmployee(false);
            dispatch({ type: "DARKEN", payload: false });
          }}
        >
          X
        </div>

        <div className="row">
          <label>Arabic name</label>
          <input type="text" ref={nameAr} />
        </div>
        <p className="error">{error.nameArErr}</p>

        <div className="row">
          <label>English name</label>
          <input type="text" ref={nameEn} />
        </div>
        <p className="error">{error.nameEnErr}</p>

        <div className="row">
          <label>Account number</label>
          <input type="text" ref={accountNumber} />
        </div>
        <p className="error">{error.accountNumberErr}</p>

        <div className="row">
          <label> </label>
          <select ref={gender}>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        <div className="row">
          <label>Age</label>
          <input type="number" ref={age} />
        </div>
        <p className="error">{error.ageErr}</p>

        <div className="row">
          <label>Marital Status</label>
          <select ref={maritalStatus}>
            <option>single</option>
            <option>married</option>
            <option>widowed</option>
            <option>divorced</option>
            <option>separated</option>
          </select>
        </div>
        <div className="row">
          <label>Designation</label>
          <select ref={designation}>
            <option>Project Manager</option>
            <option>Analyst</option>
            <option>Full-stack developer</option>
            <option>Back-end developer</option>
            <option>Front-end developer</option>
            <option>UX designer/Graphic designer</option>
            <option>The (quality) tester</option>
          </select>
        </div>

        <div className="row">
          <label>Phone number</label>
          <input type="tel" ref={phoneNumber} />
        </div>
        <p className="error">{error.phoneNumberErr}</p>

        <div className="row">
          <label>City</label>
          <select ref={city}>
            <option>Amman</option>
            <option>Zarqa</option>
            <option>Irbid</option>
            <option>Aqaba</option>
            <option>Mafraq</option>
            <option>Madaba</option>
            <option>Salt</option>
            <option>Ajloun</option>
            <option>Karak</option>
            <option>Ma'an</option>
            <option>Jerash</option>
            <option>Tafilah</option>
          </select>
        </div>

        <div className="isManager">
          Manager <input type="checkbox" ref={isManager} />
        </div>
        <div className="row">
          <label>Hire date</label>
          <DatePicker
            selected={hireDate}
            onChange={(date) => setHireDate(date)}
            showYearDropdown
            scrollableMonthYearDropdown
            yearDropdownItemNumber={60}
            maxDate={hireDate}
          />
        </div>
        <div className="row">
          <label>Birth Date</label>
          <DatePicker
            selected={birthDate}
            onChange={(date) => setBirthDate(date)}
            showYearDropdown
            scrollableMonthYearDropdown
            yearDropdownItemNumber={60}
            maxDate={birthDate}
          />
        </div>

        <div className="row">
          <button type="button" onClick={handleAdd} className="btn">
            Add
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setAddEmployee(false);
              dispatch({ type: "DARKEN", payload: false });
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
