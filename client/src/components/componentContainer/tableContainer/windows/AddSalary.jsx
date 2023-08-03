import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../../../context/AuthContext";

function VacationsComponent({ setAddSalary, state, updateState }) {
  const [employees, setEmployees] = useState([]);
  const name = useRef();
  const month = useRef();
  const year = useRef();
  const basicSalary = useRef();
  const accomodation = useRef();
  const transportation = useRef();
  const bonus = useRef();
  const incomeTax = useRef();
  const medicalInsurance = useRef();
  const loan = useRef();
  const [error, setError] = useState({});
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    const getEmployees = async () => {
      const response = await fetch("http://localhost:8000/get-employees");
      const data = await response.json();

      setEmployees(data);
    };
    getEmployees();
  }, []);

  const handleSalary = async () => {
    let errors = {};
    if (Number(month.current.value) > 12 || Number(month.current.value) < 1) {
      errors.monthErr = "please enter a valid month";
    }
    if (year.current.value === "") {
      errors.yearErr = "please enter a valid year";
    }
    if (basicSalary.current.value === "") {
      errors.basicSalaryErr = "please enter a valid salary";
    }
    setError(errors);
    if (JSON.stringify(errors) === "{}") {
      dispatch({ type: "DARKEN", payload: false });

      const salary = {
        name: name.current.value,
        month: month.current.value,
        year: year.current.value,
        basicSalary: Number(basicSalary.current.value),
        accomodation: Number(accomodation.current.value),
        transportation: Number(transportation.current.value),
        bonus: Number(bonus.current.value),
        incomeTax: Number(incomeTax.current.value),
        medicalInsurance: Number(medicalInsurance.current.value),
        loan: Number(loan.current.value),
      };

      await fetch(`http://localhost:8000/add-salary`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(salary),
      }).then(() => {
        updateState(!state);
        setAddSalary(false);
      });
    }
  };

  return (
    <div className="window">
      <form className="form">
        <div
          className="cancelForm"
          onClick={() => {
            setAddSalary(false);
            dispatch({ type: "DARKEN", payload: false });
          }}
        >
          X
        </div>
        <div className="row">
          <label> Name</label>
          <select ref={name}>
            {employees.map((emp) => (
              <option key={emp._id}>{Object.values(emp)[2]}</option>
            ))}
          </select>
        </div>
        <div className="row">
          <label> Month</label>
          <input type="text" ref={month} />
        </div>
        <p className="error">{error.monthErr}</p>

        <div className="row">
          <label> Year</label>
          <input type="text" ref={year} />
        </div>
        <p className="error">{error.yearErr}</p>

        <div className="row">
          <label>Basic salary</label>
          <input type="number" ref={basicSalary} />
        </div>
        <p className="error">{error.basicSalaryErr}</p>

        <div className="row">
          <label>Accomodation</label>
          <input type="number" ref={accomodation} />
        </div>

        <div className="row">
          <label>Transportation</label>
          <input type="number" ref={transportation} />
        </div>

        <div className="row">
          <label>Bonus</label>
          <input type="number" ref={bonus} />
        </div>

        <div className="row">
          <label>Income tax</label>
          <input type="number" ref={incomeTax} />
        </div>

        <div className="row">
          <label>Medical insurance</label>
          <input type="number" ref={medicalInsurance} />
        </div>

        <div className="row">
          <label>Loan</label>
          <input type="number" ref={loan} />
        </div>

        <div className="row">
          <button type="button" className="btn" onClick={handleSalary}>
            Request
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setAddSalary(false);
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

export default VacationsComponent;
