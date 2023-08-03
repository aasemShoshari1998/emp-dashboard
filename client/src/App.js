import { useContext, useState } from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import Home from "./routes/Home";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import SidebarComponent from "./components/sidebar/SidebarComponent";
import ComponentContainer from "./components/componentContainer/ComponentContainer";
import MobileNav from "./components/mobileNav/MobileNav.jsx";
import AuthContext from "./context/AuthContext";
import "./App.css";

function App() {
  const { darken, user, dispatch } = useContext(AuthContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const className = showSidebar ? `sideBar display` : `sideBar`;

  const handleLoginLogout = (e) => {
    e.preventDefault();
    setShowSidebar(!showSidebar);
    if (user) {
      dispatch({ type: "LOGOUT" });
    }
    navigate("/login");
  };

  return (
    <div className="app">
      <MobileNav setState={setShowSidebar} state={showSidebar} />
      <div className={className}>
        <SidebarComponent setState={setShowSidebar} state={showSidebar} />
      </div>
      <div className="routes">
        <Link to="/" className="loginLogout" onClick={handleLoginLogout}>
          {user ? <p>Logout</p> : <p>Login</p>}
        </Link>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:component" element={<ComponentContainer />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>

      {darken ? <div className="darken"></div> : null}
    </div>
  );
}

export default App;
