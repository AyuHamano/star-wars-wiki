import "../styles/NavBar.css";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <main>
      <header>
        <nav className="navbar">
          <div className="logo">
            <img src="../../public/star-wars-logo-1002.png" alt="Logo" />
          </div>
          <div className="options">
            <a key="1">Films</a>
            <a key="2">Characters</a>
            <a key="3">Planets</a>
          </div>
        </nav>
      </header>

      <Outlet />
    </main>
  );
};

export default Layout;
