import React, { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import { IfAuth, useAuth } from "../context/auth";


const Navbar: FunctionComponent = () => {

  const { isAuth, logout } = useAuth();

  return (
    <div style={{ boxShadow: "0 0 10px #333", display: "flex", marginBottom: "20px", gap: 10, padding: 15 }}>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Alledrogo
      </NavLink>

      <IfAuth ifNot>
        <NavLink
          to="/register"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Rejestracja
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          zaloguj
        </NavLink>
      </IfAuth>
      <IfAuth>
        <button type="button" onClick={logout}>Wyloguj się</button>
        <NavLink
          style={{ marginLeft: "auto" }}
          to="/auction/add"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Dodaj +
        </NavLink>
      </IfAuth>
    </div>
  );
};

export default Navbar;
