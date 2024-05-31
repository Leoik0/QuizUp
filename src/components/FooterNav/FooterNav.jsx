import { NavLink, useLocation } from "react-router-dom";
import "./FooterNav.css";
import { GiTrophy } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";

function FooterNav() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="footer-nav">
      <NavLink to="/home">
        <div className={`nav-item ${isActive("/home") ? "active" : ""}`}>
          <FaHome />
          <span>Home</span>
        </div>
      </NavLink>
      <NavLink to="/store">
        <div className={`nav-item ${isActive("/store") ? "active" : ""}`}>
          <GiTwoCoins />
          <span>Loja</span>
        </div>
      </NavLink>
      <NavLink to="/rank">
        <div className={`nav-item ${isActive("/rank") ? "active" : ""}`}>
          <GiTrophy />
          <span>Rank</span>
        </div>
      </NavLink>
    </div>
  );
}

export default FooterNav;
