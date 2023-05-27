import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import "./Register.css";
import { toast } from "react-toastify";

const Register: FunctionComponent = () => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const navigate = useNavigate();
  const onRegister = (event: SubmitEvent) => {
    setErrorMessages([]);
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    const email = data.get("email").toString();
    const city = data.get("city").toString();
    const street = data.get("street").toString();
    const password = data.get("password").toString();
    const firstName = data.get("firstName").toString();
    const lastName = data.get("lastName").toString();

    registerUser({
      email,
      city,
      password,
      firstName,
      lastName,
      street
    }).then(() => {
      navigate("/login");
    }).catch((response) => {
      if (response.response?.data.message) {
        const message = response.response?.data.message;
        const isArray = Array.isArray(message);
        isArray ? setErrorMessages(message) : toast.error(message);
      } else toast.error("Przepraszamy. Proszę spróbować pożniej");
    });
  };
  return (<>
    <main className="main-register">
      <div className="register-form-container">
        <h1 className="register-form-title">Rejestracja</h1>
        <div className="register-form-fields">
          <form onSubmit={onRegister}>
            {errorMessages.map(error => <div style={{ color: "red" }}>{error}</div>)}
            <div className="register-form-field">
              <input className="register-input" name="firstName" placeholder="Imię" type="text"/>
            </div>
            <div className="register-form-field">
              <input className="register-input" name="lastName" placeholder="Nazwisko" type="text"/>
            </div>
            <div className="register-form-field">
              <input className="register-input" name="email" placeholder="Email" type="email"/>
            </div>
            <div className="register-form-field">
              <input className="register-input" name="password" placeholder="Haslo" type="password"/>
            </div>
            <div className="register-form-field">
              <input className="register-input" name="city" placeholder="Miasto" type="text"/>
            </div>
            <div className="register-form-field">
              <input className="register-input" name="street" placeholder="Ulica" type="text"/>
            </div>
            <div className="register-form-button">
              <button className="button" type="submit">Zarejestruj się</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </>);
};

export default Register;
