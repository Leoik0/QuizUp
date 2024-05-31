import "./Header.css";
import { Link } from "react-router-dom";

function Header({ userId }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="title">
          Quiz<span>Up</span>
        </h1>
      </div>
      <div className="header-right">
        <Link to={`/profile/${userId}`}>
          <img className="img-profile" src="/anonimo.webp" alt="" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
