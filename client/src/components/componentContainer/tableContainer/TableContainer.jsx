import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext.js";
import Edit from "./windows/Edit";
import Delete from "./windows/Delete";
import AddEmployee from "./windows/AddEmployee";
import AddSalary from "./windows/AddSalary";
// import moment from "moment";

function TableContainer({ table }) {
  const [data, setData] = useState([{}]);
  const [searchField, setSearchField] = useState("");
  const [edit, setEdit] = useState("");
  const [add, setAdd] = useState(false);
  const [del, setDel] = useState(false);
  const [componentShouldUpdate, setComponentShouldUpdate] = useState(false);
  const [dataId, setDataId] = useState("");
  const { dispatch, employees } = useContext(AuthContext);

  // const dateIsValid = (dateStr) => {
  //   const regex = /^\d{4}-\d{2}-\d{2}$/;

  //   if (dateStr.match(regex) === null) {
  //     return false;
  //   }

  //   const date = new Date(dateStr);

  //   const timestamp = date.getTime();

  //   if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
  //     return false;
  //   }

  //   return date.toISOString().startsWith(dateStr);
  // };

  useEffect(() => {
    const getData = async () => {
      if (table === "Employee") {
        setData(employees);
      } else if (table === "Salary") {
        const response = await fetch("https://emp-dashboard-api.vercel.app/get-salaries",{        mode: "no-cors"
});
        const data = await response.json();
        setData(data);
      } else if (table === "Vacation") {
        const response = await fetch("https://emp-dashboard-api.vercel.app/get-vacations",{        mode: "no-cors"});
        const data = await response.json();
        setData(data);
      }
    };
    getData();
  }, [componentShouldUpdate, table, employees]);

  const filteredData = data?.filter((d) =>
    Object.values(d).join(" ").includes(searchField)
  );

  const handleSearch = (e) => {
    setSearchField(e.target.value.toLowerCase());
  };

  const handleApprove = (e, vacationId) => {
    if (e.target.value === "approve") {
      fetch(`https://emp-dashboard-api.vercel.app/approve-vacation/${vacationId}`, {
        method: "POST",
                mode: "no-cors",

      }).then(() => {
        setComponentShouldUpdate(!componentShouldUpdate);
      });
    } else {
      fetch(`https://emp-dashboard-api.vercel.app/reject-vacation/${vacationId}`, {
        method: "POST",
                mode: "no-cors",

      }).then(() => {
        setComponentShouldUpdate(!componentShouldUpdate);
      });
    }
  };
  return (
    <div className="container">
      {data?.length === 0 ? (
        <h1 style={{ textAlign: "center", fontSize: "3rem" }}>
          {`Oops... ${table} table is Empty!`}
        </h1>
      ) : (
        <div className="tableSearch">
          <input
            type="search"
            placeholder="Search employees.."
            className="searchInput"
            onChange={handleSearch}
            autoFocus
          />
        </div>
      )}

      <div
        className="tableContainer"
        style={{ display: data?.length === 0 ? "none" : "block" }}
      >
        <table className="table">
          <thead>
            <tr>
              {filteredData?.length > 0 &&
                Object.keys(filteredData[0]).map((key) => (
                  <th
                    style={{
                      display: key === "_id" ? "none" : "table-cell",
                    }}
                    key={key}
                  >
                    {key}
                  </th>
                ))}
              <th colSpan="2" style={{ backgroundColor: "#fff" }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.length > 0 &&
              filteredData?.map((item, i) => (
                <tr key={i}>
                  {Object.values(item).map((val, i) => (
                    <td
                      style={{
                        display: i === 0 ? "none" : "table-cell",
                      }}
                      key={i}
                    >
                      {String(val)}
                    </td>
                  ))}

                  {table === "Vacation" ? (
                    <td>
                      <button
                        disabled={item.Status === "approved"}
                        className="btn"
                        value="approve"
                        style={{
                          backgroundColor:
                            item.Status === "approved"
                              ? "lightgrey"
                              : "#136629",
                        }}
                        onClick={(e) => handleApprove(e, item._id)}
                      >
                        APPROVE
                      </button>
                    </td>
                  ) : (
                    <td>
                      <button
                        className="btn"
                        onClick={() => {
                          setEdit(item);
                          dispatch({ type: "DARKEN", payload: true });
                        }}
                      >
                        EDIT
                      </button>
                    </td>
                  )}

                  {table === "Vacation" ? (
                    <td>
                      <button
                        className="deleteBtn"
                        disabled={item.Status === "rejected"}
                        value="reject"
                        style={{
                          backgroundColor:
                            item.Status === "rejected" ? "lightgrey" : "red",
                        }}
                        onClick={(e) => handleApprove(e, item._id)}
                      >
                        REJECT
                      </button>
                    </td>
                  ) : (
                    <td>
                      <button
                        className="deleteBtn"
                        onClick={() => {
                          setDel(true);
                          setDataId(item._id);
                          dispatch({ type: "DARKEN", payload: true });
                        }}
                      >
                        DELETE
                      </button>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {edit ? (
        <Edit
          content={edit}
          table={table}
          setEdit={setEdit}
          state={componentShouldUpdate}
          updateState={setComponentShouldUpdate}
        />
      ) : null}

      {add && table === "Employee" ? (
        <AddEmployee setAddEmployee={setAdd} />
      ) : null}

      {add && table === "Salary" ? (
        <AddSalary
          setAddSalary={setAdd}
          state={componentShouldUpdate}
          updateState={setComponentShouldUpdate}
        />
      ) : null}
      {del ? (
        <Delete
          id={dataId}
          data={table}
          setDelete={setDel}
          state={componentShouldUpdate}
          updateState={setComponentShouldUpdate}
        />
      ) : null}

      <div className="addBtnContainer">
        {!add && table !== "Vacation" ? (
          <button
            className="btn"
            onClick={() => {
              setAdd(!add);
              dispatch({ type: "DARKEN", payload: true });
            }}
          >
            Add {table}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default TableContainer;
