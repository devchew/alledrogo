import React, { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import { IfAuth, useAuth } from "../context/auth";
import "./Navbar.css";

const navLinkStyle = ({ isActive, isPending }) =>
  `navbar__link ${isPending ? "pending" : isActive ? "active" : ""}`;
const navLinkStyleButton = ({ isActive, isPending }) =>
  `navbar__button ${isPending ? "pending" : isActive ? "active" : ""}`;

const Navbar: FunctionComponent = () => {

  const { logout } = useAuth();

  return (
    <div className="navbar">
      <NavLink to="/" className="navbar__branding">Alledrogo</NavLink>
      <div className="navbar__links">
        <NavLink to="/auctions" className={navLinkStyle}>Aukcje</NavLink>
        <NavLink to="/auctions" className={navLinkStyle}>Inne aukcje</NavLink>
        <NavLink to="/auctions" className={navLinkStyle}>Jeszcze inne aukcje</NavLink>
      </div>

      <IfAuth ifNot>
        <NavLink to="/register" className={navLinkStyle}>Rejestracja</NavLink>
        <NavLink to="/login" className={navLinkStyle}>Zaloguj</NavLink>
      </IfAuth>
      <IfAuth>
        <NavLink to="/profile" className={navLinkStyleButton}>Konto</NavLink>
        <NavLink to="/auction/add" className={navLinkStyleButton}>Dodaj +</NavLink>
        <button type="button" onClick={logout} className="navbar__link">Wyloguj się</button>
      </IfAuth>
    </div>
  );
};

export default Navbar;
