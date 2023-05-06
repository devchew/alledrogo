import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import "./reset.css";
import "./shared.css";
import "./App.css";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Auction from "../pages/Auction";
import { AuthContext, AuthGuard } from "../context/auth";
import CreateAuction from "../pages/CreateAuction";


export function App() {
  return <>
    <AuthContext>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auction/add" element={<AuthGuard><CreateAuction /></AuthGuard>} />
          <Route path="/auction/:id" element={<Auction />} />
        </Routes>
      </BrowserRouter>
    </AuthContext>
  </>;
}
