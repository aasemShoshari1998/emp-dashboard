import { useRef, useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthContext from "../../../context/AuthContext";
function RequestVacationForm() {
  const [vacationType, setVacationType] = useState(true);
  const name = useRef();
  const type = useRef();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const numberOfDays = useRef();
  const numberOfHours = useRef();
  const [error, setError] = useState({});
  const [message, setMessage] = useState(false);
  const { employees } = useContext(AuthContext);

  const handleVacationType = (e) => {
    if (e.target.value === "Annual" || e.target.value === "Sick") {
      setVacationType(true);
    } else {
      setVacationType(false);
    }
  };

  const handleVacation = async () => {
    let errors = {};
    if (
      numberOfDays?.current?.value?.length < 1 ||
      numberOfDays?.current?.value?.length > 2
    ) {
      errors.numberOfDaysErr = "please enter a valid number of days";
    }
    if (
      Number(numberOfHours?.current?.value) > 8 ||
      Number(numberOfHours?.current?.value) < 1
    ) {
      errors.numberOfHoursErr = "please enter a valid number of hours";
    }
    setError(errors);
    console.log(startDate);
    if (JSON.stringify(errors) === "{}") {
      const vacation = {
        name: name.current.value,
        type: type.current.value,
        startDate: startDate,
        numberOfDays: numberOfDays?.current?.value,
        numberOfHours: numberOfHours?.current?.value,
        endDate: endDate,
      };
      await fetch(`https://emp-dashboard-api.vercel.app/request-vacation`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(vacation),
      }).then(() => {
        setTimeout(() => {
          setMessage(true);
        }, 0);
      });
    }
  };

  const handleEndDate = async () => {
    const date = new Date(startDate);
    const days = numberOfDays.current.value;
    date.setDate(date.getDate() + Number(days));
    const dateAfterAddiction = new Date(date);
    let month = dateAfterAddiction.getMonth() + 1;
    let day = dateAfterAddiction.getDate();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    const finalDate = `${dateAfterAddiction.getFullYear()}-${month}-${day}`;
    setEndDate(new Date(finalDate));
  };
  if (employees.length === 0) {
    return (
      <div className="formContainer">
        <h1 style={{ textAlign: "center", fontSize: "3rem" }}>
          There are no employees to request vacation.
        </h1>
      </div>
    );
  } else {
    return (
      <div
        className="formContainer"
        style={{ width: message ? "100%" : "50%" }}
      >
        {message ? (
          <p className="message">Vacation has been requested successfully</p>
        ) : (
          <form className="form">
            <div className="row">
              <label> Name</label>
              <select ref={name}>
                {employees &&
                  employees.map((emp) => (
                    <option key={emp._id}>{Object.values(emp)[2]}</option>
                  ))}
              </select>
            </div>

            <div className="row">
              <label>Choose vacation type:</label>
              <select onChange={handleVacationType} ref={type}>
                <option>Annual</option>
                <option>Sick</option>
                <option>Day time leave</option>
              </select>
            </div>
            <div className="row">
              <label>Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={60}
                minDate={startDate}
              />
            </div>

            {vacationType ? (
              <>
                <div className="row">
                  <label>Number of days</label>
                  <input
                    type="number"
                    ref={numberOfDays}
                    onChange={handleEndDate}
                  />
                  <p className="error">{error.numberOfDaysErr}</p>
                </div>
                <div className="row">
                  <label>End date</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={60}
                    maxDate={endDate}
                  />
                </div>
              </>
            ) : (
              <div className="row">
                <label>Number of hours</label>
                <input type="number" ref={numberOfHours} />
                <p className="error">{error.numberOfHoursErr}</p>
              </div>
            )}

            <div className="row">
              <button type="button" className="btn" onClick={handleVacation}>
                Request
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default RequestVacationForm;
