import "../../../assets/common.css";
import jsPDF from "jspdf";
import { useState, useRef, useContext } from "react";
import autoTable from "jspdf-autotable";
import AuthContext from "../../../context/AuthContext";
function ReportsComponent() {
  const [err, setErr] = useState("");
  const name = useRef();
  const month = useRef();
  const year = useRef();
  const [employee, setEmployee] = useState();
  const [showTable, setShowTable] = useState(false);
  const { employees } = useContext(AuthContext);
  const downloadPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      html: "#table",
      theme: "grid",
      headStyles: { fontSize: "15", halign: "center", fillColor: "#136629" },
      bodyStyles: { cellWidth: 45 },
      didParseCell: function (data) {
        if (data.row.index === 4) {
          data.cell.styles.fillColor = "#136629";
          data.cell.styles.textColor = "#fff";
        }
        if (data.row.index === 5) {
          data.row.cells[1].styles.fillColor = "#aed1b7";
          data.row.cells[3].styles.fillColor = "#aed1b7";
          data.cell.styles.halign = "center";
        }
        if (data.row.index === 16) {
          data.row.cells[1].styles.fillColor = "#136629";
          data.row.cells[1].styles.textColor = "#fff";
        }
      },
    });
    doc.save("table.pdf");
  };
  const handleGo = async () => {
    if (
      year.current.value === "" ||
      year.current.value > new Date().getFullYear()
    ) {
      setErr("please enter a valid year");
    } else if (
      Number(month.current.value) > 12 ||
      Number(month.current.value) < 1
    ) {
      setErr("please enter a valid month");
    } else {
      const employee = {
        name: name.current.value,
        month: month.current.value,
        year: year.current.value,
      };
      const response = await fetch("https://emp-dashboard-api.vercel.app/report", {
        method: "POST",
                mode: "no-cors",

        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      const data = await response.json();
      if (!data) {
        setErr("Report data not found in our system");
      } else {
        setEmployee(data);
        setShowTable(true);
      }
    }
  };

  return (
    <>
      {!showTable ? (
        <div className="formContainer">
          <div>
            <p className="error">{err}</p>
          </div>
          <form className="form">
            <div className="row">
              <label> Name</label>
              <select ref={name}>
                {employees.map((emp) => (
                  <option key={emp._id}>{Object.values(emp)[3]}</option>
                ))}
              </select>
            </div>

            <div className="row">
              <label> Month</label>
              <input type="text" ref={month} defaultValue={8} />
            </div>

            <div className="row">
              <label> Year</label>
              <input type="text" ref={year} defaultValue={2023} />
            </div>

            <div className="row">
              <button type="button" onClick={handleGo}>
                GO
              </button>
            </div>
          </form>
        </div>
      ) : (
        <table border="1" id="table" className="report">
          <thead>
            <tr>
              <th
                colSpan="4"
                style={{ textAlign: "center", fontSize: "2.4rem" }}
              >
                Salary Statement of the Month
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="bold" rowSpan="1">
                Employee Name
              </td>
              <td>{employee?.name} </td>
              <td className="bold">Joining Date</td>
              <td>{employee?.joiningDate}</td>
            </tr>
            <tr>
              <td className="bold">Emoployee Number</td>
              <td>{employee?.id}</td>
              <td className="bold">Designation</td>
              <td>{employee?.designation}</td>
            </tr>
            <tr>
              <td className="bold">Account Number</td>
              <td>{employee?.accNumber}</td>
              <td className="bold">Total Paid Leaves</td>
              <td>{employee?.totalPaidLeaves}</td>
            </tr>
            <tr>
              <td className="bold">Salary Month</td>
              <td>{employee?.month}</td>
              <td className="bold">Day Present</td>
              <td>{employee?.dayPresent}</td>
            </tr>

            <tr>
              <th colSpan="2" style={{ textAlign: "center" }}>
                Earnings
              </th>
              <th colSpan="2" style={{ textAlign: "center" }}>
                Deductions
              </th>
            </tr>
            <tr>
              <td></td>
              <td className="bold" style={{ textAlign: "center" }}>
                Amount
              </td>
              <td></td>
              <td className="bold" style={{ textAlign: "center" }}>
                Amount
              </td>
            </tr>
            <tr>
              <td className="bold">Basic Salary</td>
              <td>{employee?.basicSalary}</td>
              <td className="bold">SSC</td>
              <td>{employee?.SSC}</td>
            </tr>
            <tr>
              <td className="bold">Acommodation</td>
              <td>{employee?.accomodation}</td>
              <td className="bold">Income tax</td>
              <td>{employee?.incomeTax}</td>
            </tr>
            <tr>
              <td className="bold">Transportation</td>
              <td>{employee?.transportation}</td>
              <td className="bold">Medical Insurance</td>
              <td>{employee?.medicalInsurance}</td>
            </tr>
            <tr>
              <td className="bold">Phone</td>
              <td>{employee?.phone}</td>
              <td className="bold">Loan</td>
              <td>{employee?.loan}</td>
            </tr>
            <tr>
              <td className="bold">Meals</td>
              <td>{employee?.meals}</td>
              <td className="bold">Advance</td>
              <td>{employee?.advance}</td>
            </tr>
            <tr>
              <td className="bold">Fuel</td>
              <td>{employee?.fuel}</td>
              <td className="bold">Misc. Deductions</td>
              <td>{employee?.miscDeductions}</td>
            </tr>
            <tr>
              <td className="bold">Guaranteed Bonus</td>
              <td>{employee?.bonus}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="bold">Perf Incentives</td>
              <td>{employee?.incentives}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="bold">Arrears</td>
              <td>{employee?.arrears}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th className="bold">Gross Earnings</th>
              <td>{employee?.totalEarnings}</td>
              <th className="bold">Gross Deductions</th>
              <td>{employee?.totalDeductions}</td>
            </tr>
            <tr>
              <td></td>
              <th className="bold">NET PAY</th>
              <td className="bold">{employee?.netSalary}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      )}
      {showTable ? (
        <div className="downloadBtn" style={{ textAlign: "center" }}>
          <button onClick={downloadPDF} style={{ width: "35%" }}>
            Download
          </button>
        </div>
      ) : null}
    </>
  );
}

export default ReportsComponent;
