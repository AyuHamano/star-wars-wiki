import "../styles/layout.css";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <main>
      <header>
        <nav className="navbar">
          <div className="logo">
            <img src="/star-wars-logo-1002.png" alt="Logo" />
          </div>
          <div className="options">
            <NavLink
              to={""}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Films
            </NavLink>
            <NavLink
              to={"characters"}
              key="2"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Characters
            </NavLink>
            <NavLink
              to={"species"}
              key="2"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Species
            </NavLink>
            <NavLink
              to={"planets"}
              key="3"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Planets
            </NavLink>
          </div>
        </nav>
      </header>
      <Outlet />
    </main>
  );
};

export default Layout;
