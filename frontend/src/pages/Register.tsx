import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";

const Register: FunctionComponent = () => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const navigate = useNavigate();
  const onRegister = (event: SubmitEvent) => {
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
      console.log(response);
      if (response.response.data.message) {
        setErrorMessages(response.response.data.message);
      }
    });
  };
  return (<>
    <h1>Login</h1>
    {errorMessages.map(error => <div style={{ color: "red" }}>{error}</div>)}
    <form onSubmit={onRegister} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <input name="email" placeholder="email" type="email" />
      <input name="city" placeholder="city" type="text" />
      <input name="street" placeholder="street" type="text" />
      <input name="firstName" placeholder="firstName" type="text" />
      <input name="lastName" placeholder="lastName" type="text" />
      <input name="password" placeholder="haslo" type="password" />
      <button type="submit">Zarejestruj się</button>
    </form>
  </>);
};

export default Register;
