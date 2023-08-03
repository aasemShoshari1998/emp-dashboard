import React from "react";
import { useParams } from "react-router-dom";
import ProjectsComponent from "./projects/ProjectsComponent";
import RequestVacationForm from "./formContainer/RequestVacationForm";
import ReportsComponent from "./reports/ReportsComponent";
import CareerForm from "./formContainer/CareerForm";
import ContactUsComponent from "./contactUs/ContactUsComponent";
import TableContainer from "./tableContainer/TableContainer";
function ComponentContainer() {
  const { component } = useParams();

  if (component === "employees") {
    return (
      <div className="componentContainer">
        <TableContainer table={"Employee"} />
      </div>
    );
  } else if (component === "projects") {
    return (
      <div className="componentContainer">
        <ProjectsComponent />
      </div>
    );
  } else if (component === "request-vacation") {
    return (
      <div className="componentContainer">
        <RequestVacationForm />
      </div>
    );
  } else if (component === "vacations") {
    return (
      <div className="componentContainer">
        <TableContainer table={"Vacation"} />
      </div>
    );
  } else if (component === "salaries") {
    return (
      <div className="componentContainer">
        <TableContainer table={"Salary"} />
      </div>
    );
  } else if (component === "reports") {
    return (
      <div className="componentContainer">
        <ReportsComponent />
      </div>
    );
  } else if (component === "careers") {
    return (
      <div className="componentContainer">
        <CareerForm />
      </div>
    );
  } else if (component === "contact") {
    return (
      <div className="componentContainer">
        <ContactUsComponent />
      </div>
    );
  }
}

export default ComponentContainer;
