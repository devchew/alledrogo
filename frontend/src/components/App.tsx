import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./Navbar";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Auction from "../pages/Auction";
import { AuthContext, AuthGuard } from "../context/auth";
import CreateAuction from "../pages/CreateAuction";
import { Profile } from "../pages/profile/Profile";

import "./reset.css";
import "./shared.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import EditAuction from "../pages/EditAuction";


export function App() {
  return <>
    <AuthContext>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
          <Route path="/auction/add" element={<AuthGuard><CreateAuction /></AuthGuard>} />
          <Route path="/auction/:id" element={<Auction />} />
          <Route path="/auction/:id/edit" element={<EditAuction />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </AuthContext>
  </>;
}
