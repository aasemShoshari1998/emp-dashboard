import { useState } from "react";
import { Link } from "react-router-dom";
import BadgeIcon from "@mui/icons-material/Badge";
// import TaskIcon from "@mui/icons-material/Task";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import InfoIcon from "@mui/icons-material/Info";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SummarizeIcon from "@mui/icons-material/Summarize";
import WorkIcon from "@mui/icons-material/Work";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

function Sidebar({ state, setState }) {
  const className = `vacationsTabs animate`;

  const [show, setShow] = useState(false);

  const handleClick = () => {
    setState(!state);
    setShow(!show);
  };

  return (
    <div className="sidebarc">
      <ul className="sidebarNav">
        <Link
          to="/"
          className="sidebarNavLinks"
          onClick={() => setState(!state)}
        >
          <InfoIcon className="icon" /> <p>Home</p>
        </Link>
        <Link
          to="/employees"
          className="sidebarNavLinks"
          onClick={() => setState(!state)}
        >
          <BadgeIcon className="icon" /> <p>Employees</p>
        </Link>
        {/* <Link
          to="/projects"
          className="sidebarNavLinks"
          onClick={() => setState(!state)}
        >
          <TaskIcon className="icon" /> <p>Projects</p>
        </Link> */}
        <div
          className="vacationsTab"
          style={{ cursor: "pointer" }}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <div className="vacationTitle">
            <AccessibilityNewIcon className="icon" />
            <p>
              Vacations <i>{show ? "↓" : "→"}</i>
            </p>
            <div className={show ? className : "vacationsTabs"}>
              <Link
                to="/request-vacation"
                className="requestVacation"
                onClick={handleClick}
              >
                Request vacation
              </Link>
              <Link
                to="/vacations"
                className="vacationsTabHeadline"
                onClick={handleClick}
              >
                Vacations
              </Link>
            </div>
          </div>
        </div>

        <Link
          to="/salaries"
          className="sidebarNavLinks"
          onClick={() => setState(!state)}
        >
          <AttachMoneyIcon className="icon" /> <p>Salaries</p>
        </Link>
        <Link
          to="/reports"
          className="sidebarNavLinks"
          onClick={() => setState(!state)}
        >
          <SummarizeIcon className="icon" /> <p>Reports</p>
        </Link>
        <Link
          to="/careers"
          className="sidebarNavLinks"
          onClick={() => setState(!state)}
        >
          <WorkIcon className="icon" /> <p>Careers</p>
        </Link>
        <Link
          to="/contact"
          className="sidebarNavLinks"
          onClick={() => setState(!state)}
        >
          <PermContactCalendarIcon className="icon" /> <p>Contact us</p>
        </Link>
        <Link
          to="/"
          className="sidebarNavLinks"
          onClick={() => setState(!state)}
        >
          <InfoIcon className="icon" /> <p>About us</p>
        </Link>
      </ul>
    </div>
  );
}

export default Sidebar;
