import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../../context/AuthContext";
import "../../../../assets/common.css";

function Edit({ content, table, setEdit, state, updateState }) {
  const [updatedData, setUpdatedData] = useState(content);
  const [isBtnDisabled, setisBtnDisabled] = useState();
  const { dispatch, getEmployees } = useContext(AuthContext);
  const [isChecked, setIsChecked] = useState(content.Manager);
  useEffect(() => {
    setisBtnDisabled(JSON.stringify(content) === JSON.stringify(updatedData));
  }, [updatedData, content]);

  const handleEdit = async (e) => {
    dispatch({ type: "DARKEN", payload: false });
    table === "Employee"
      ? await fetch("https://emp-dashboard-api-henna.vercel.app/edit-employee", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }).then((res) => {
          setEdit(false);
          getEmployees();
        })
      : await fetch("https://emp-dashboard-api-henna.vercel.app/edit-salary", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }).then(() => {
          updateState(!state);
          setEdit(false);
        });
  };

  return (
    <div className="window">
      <form className="form">
        <div
          className="cancelForm"
          onClick={() => {
            setEdit(false);
            dispatch({ type: "DARKEN", payload: false });
          }}
        >
          X
        </div>
        {Object.entries(updatedData).map(([key, val]) => (
          <div
            key={key}
            className={key === "Manager" ? "isManager" : "row"}
            style={{
              display:
                key === "Total Earnings" ||
                key === "Total Deductions" ||
                key === "Net Salary"
                  ? "none"
                  : "flex",
            }}
          >
            <p key={key}>{key}</p>
            {key === "Manager" ? (
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => {
                  setIsChecked(!isChecked);
                  setUpdatedData({
                    ...updatedData,
                    Manager: e.target.checked,
                  });
                }}
              />
            ) : (
              <input
                value={val}
                onChange={(e) => {
                  setUpdatedData({
                    ...updatedData,
                    [key]: e.target.value,
                  });
                }}
                disabled={
                  key === "_id" ||
                  key === "Account Number" ||
                  key === "employeeId" ||
                  key === "SSC" ||
                  key === "Hire Date" ||
                  key === "Birth Date" ||
                  key === "createdAt" ||
                  key === "updatedAt"
                }
              />
            )}
          </div>
        ))}
        <div className="row">
          <button
            type="button"
            className="btn"
            disabled={isBtnDisabled}
            onClick={handleEdit}
            style={{
              opacity: !isBtnDisabled ? "1" : "0.6",
            }}
          >
            CONFIRM
          </button>
          <button
            className="btn"
            onClick={() => {
              setEdit(false);
              dispatch({ type: "DARKEN", payload: false });
            }}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
